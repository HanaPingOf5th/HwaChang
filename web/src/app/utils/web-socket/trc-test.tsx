/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Profile, Video, VideoView } from "@/app/(..route)/consulting-room/components/video-view";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Client  } from "@stomp/stompjs";
import { LegacyRef, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

export default function WebCamTest() {
  const videoRef = useRef<HTMLVideoElement | undefined | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null)

  const otherKeyList:string[] = [];
  const pcListMap = new Map();

  async function startCam(){
    const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(
        {video: {width: 800, height: 450, facingMode: "user"}, audio: true}
      )
    setVideoStream(mediaStream);
  }

  useEffect(()=>{
    const getMedia = async () => {
      try{
        const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(
          {video: {width: 800, height: 450, facingMode: "user"}, audio: true}
        )
        setVideoStream(mediaStream);
        if (videoRef.current){ videoRef.current.srcObject = mediaStream;}

        setIsVideoEnabled(true);
        
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
      } catch (error){
        throw new Error(error as string);
      }
    };
    getMedia();

    return () => {
      if(videoStream){
        videoStream.getTracks().forEach((track)=>track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    }
  }, [isVideoEnabled])

  useEffect(()=>{
    const access:string ='@@@mockToekn@@@';
    const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
    const myKey:string = Math.random().toString(36).substring(2, 11);
    const roomId = 1231;

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders:{Authorization: `Bearer ${access}`},
      debug: (str: string) => { console.log(str) },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
  
      onConnect: ()=>{
        client.subscribe(
          `/topic/call/key`,
          (message)=>{
            client.publish({
              destination: `/app/send/key`,
              body: JSON.stringify(myKey),
              skipContentLengthHeader: true,
            })
          }
        )
  
        client.subscribe(
          `/topic/send/key`,
          (message)=>{
            const key: string = JSON.parse(message.body);
            if((myKey !== key && otherKeyList.find((otherKey) => (otherKey === myKey)) === undefined && !otherKeyList.includes(key))){
              otherKeyList.push(key);
              console.log("------------전달받은 키 목록-----------");
              console.log(otherKeyList);
            }
          }
        )
  
        client.subscribe(
          `/topic/peer/offer/${myKey}/${roomId}`,
          (offer)=>{
            console.log(offer.body);
            const key = JSON.parse(offer.body).key;
            const message = JSON.parse(offer.body).body;
  
            pcListMap.set(key, createPeerConnection(key));
            console.log(pcListMap);
            pcListMap.get(key).setRemoteDescription(
              new RTCSessionDescription({type: message.type, sdp: message.sdp})
            );
            sendAnswer(pcListMap.get(key), key);
          }
        )
  
        client.subscribe(
          `/topic/peer/answer/${myKey}/${roomId}`,
          (answer)=>{
            const key = JSON.parse(answer.body).key;
            const message = JSON.parse(answer.body).body;
            pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
          }
        )
  
        client.subscribe(
          `/topic/peer/iceCandidate/${myKey}/${roomId}`,
          (candidate)=>{
            const key = JSON.parse(candidate.body).key;
            const message = JSON.parse(candidate.body).body;
            pcListMap.get(key).addIceIndicator(
              new RTCIceCandidate({
                candidate: message.candidate,
                sdpMLineIndex: message.sdpMLineIndex,
                sdpMid: message.sdpMid,
              })
            )
          }
        )
      }
    });
  
    const createPeerConnection = (otherKey: string)=>{
      const pc = new RTCPeerConnection();
      try{
        pc.addEventListener("icecandidate", (event)=>{
          onIceCandidate(event, otherKey);
        });
  
        pc.addEventListener("track", (event)=>{
          onTrack(event, otherKey);
        });
  
        const localStream = videoStream as MediaStream;
        if(localStream){
          localStream.getTracks().forEach((track)=>{
            pc.addTrack(track, localStream);
          })
        };
  
        pc.onconnectionstatechange = ()=> {
          if(["disconnected", "failed", "closed"].includes(pc.iceConnectionState)){
            return {status: "disconnected"};
          }
        }
      } catch (error){
        throw new Error(error as string);
      }
      return pc;
    }
  
    const onIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey: string) => {
      if(event.candidate){
        console.log("on ICE Candidate");
        client.publish({
          destination: `/app/peer/iceCandidate/${otherKey}/${roomId}`,
          body: JSON.stringify({key:myKey, body: event.candidate}),
          skipContentLengthHeader: true,
        })
      }
    }
  
    const onTrack = (event: RTCTrackEvent, otherKey: string)=>{
      if (document.getElementById(`${otherKey}`) === null) {
        const video = document.createElement("video");
        
        video.autoplay = true;
        video.controls = true;
        video.id = otherKey;
        video.srcObject = event.streams[0];
        // To-Do: video Element 생성을 Documnet가 아닌 React.ReactNode를 생성하고 videoRef를 참조할 수 있도록 설계
        // const videoView = (<VideoView video={video as unknown as React.ReactNode} onCam={false}></VideoView>)
          
        document.getElementById("remoteStreamDiv")?.appendChild(video);
      }
    }
  
    const sendOffer = (pc:RTCPeerConnection, otherKey:string)=>{
      pc.createOffer().then((offer)=>{
        client.publish(
          {
            destination:`/app/peer/offer/${otherKey}/${roomId}`,
            body: JSON.stringify({ key: myKey, body: offer }),
            skipContentLengthHeader: true,
          }
        )
      })
    }
  
    const sendAnswer = (pc:RTCPeerConnection, otherKey:string)=>{
      pc.createAnswer().then((answer)=>{
        setLocalAndSendMessage(pc, answer);
        client.publish({
          destination: `/app/peer/answer/${otherKey}/${roomId}`,
          body: JSON.stringify({ key: myKey, body: answer}),
          skipContentLengthHeader: true,
        })
      })
    }
  
    const setLocalAndSendMessage = (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
      pc.setLocalDescription(sessionDescription);
    }

    setStompClient(client);
    client.activate();
  }, [])

  const mockProfile: Profile ={
    picture: <div>------</div>,
    name: "이수민",
  }

  return (
    <main>
      <div className="font-semibold">웹 소켓 연결 확인 ...</div>
      <div>
      <AchromaticButton type="button" onClick={()=>{startCam()}}>캠 상태 전역 On + 커넥션 연결 (캠상태 관리해주고 커넥션이랑 로직 분리 반드시 필요..)</AchromaticButton>
      <AchromaticButton type="button" onClick={async ()=>{}}>Stream Start</AchromaticButton>
      
      <VideoView
        video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} />}
        onCam={true}
        profile={mockProfile}
      />
      
      <div id="remoteStreamDiv" style={{ transform: 'rotateY(180deg)', WebkitTransform: 'rotateY(180deg)' }}/>
    </div>
    </main>
  )
}