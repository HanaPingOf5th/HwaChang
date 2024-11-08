/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Profile, Video, VideoView } from "@/app/(..route)/consulting-room/components/video-view";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";

export default function WebCam() {
  const videoRef = useRef<HTMLVideoElement | undefined | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const myKey:string = Math.random().toString(36).substring(2, 11);
  const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
  const stompClient = Stomp.over(socket);
  const roomId = 1234;
  const pcListMap = new Map();
  const otherKeyList:string[] = [];

  // TO-DO:토큰 전역으로 관리하면서, 웹 소켓 연결 시 헤더에 전달
  const access:string ='@@@mockToekn@@@';


  async function startCam(){
    const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(
        {video: {width: 800, height: 450, facingMode: "user"}, audio: true}
      )
    setVideoStream(mediaStream);
    connectSocket();
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

  // 스트림 버튼 클릭시 , 다른 웹 key들 웹소켓을 가져 온뒤에 offer -> answer -> iceCandidate 통신
  const handleStreamStart = () => {
    console.log(stompClient);
    // 지금 여기서 타입 에러가 발생합니다...
    stompClient.send(`/app/call/key`, {priority: 9}, "Hello, STOMP");
  
    setTimeout(() => {
      console.log(otherKeyList);
        otherKeyList.map((key) => {
          if (!pcListMap.has(key)) {
            pcListMap.set(key, createPeerConnection(key));
            sendOffer(pcListMap.get(key), key);
          }
        });
      }, 1000);
  };
  
  const mockProfile: Profile ={
    picture: <div>------</div>,
    name: "이수민",
  }

  // RTC pipe-line
  const connectSocket = async () => {
  stompClient.connect(
        {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json'
        },
        () => {
        // step1: exchange key
        stompClient.subscribe(
            `/topic/call/key`,
            (message)=>{
            stompClient.send(`/app/send/key`, {}, JSON.stringify(myKey));
            }
        );

        stompClient.subscribe(
            `/topic/send/key`,
            (message)=>{
            const key:string = JSON.parse(message.body);
            if((myKey !== key && otherKeyList.find((otherKey) => (otherKey === myKey)) === undefined && !otherKeyList.includes(key))){
                otherKeyList.push(key);
                console.log(otherKeyList);
            }
            }
        );

        // signaling
        //offer peer 교환을 위한 subscribe
        stompClient.subscribe(
            `/topic/peer/offer/${myKey}/${roomId}`,
            (offer)=>{
            console.log('offer');
            console.log(offer.body);
            const key = JSON.parse(offer.body).key;
            const message = JSON.parse(offer.body).body;
            console.log('---------offer 메세지 파싱 완료----------');
            
            pcListMap.set(key, createPeerConnection(key));
            console.log(key, ": ",pcListMap);

            pcListMap.get(key).setRemoteDescription(
                new RTCSessionDescription({ type: message.type, sdp: message.sdp })
            );
            sendAnswer(pcListMap.get(key), key);
            },
        );

        stompClient.subscribe(
            `/topic/peer/answer/${myKey}/${roomId}`,
            (answer)=>{
            console.log('answer');
            console.log(answer.body);
            const key = JSON.parse(answer.body).key;
            const message = JSON.parse(answer.body).body;
            pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
            }
        );

        stompClient.subscribe(
            `/topic/peer/iceCandidate/${myKey}/${roomId}`,
            (candidate)=>{
            const key = JSON.parse(candidate.body).key;
            const message = JSON.parse(candidate.body).body;
            console.log("----------여기서는 key에 값이 안찍힘 ... 그래서 addIceIndicator를 못읽음------------");
            console.log(pcListMap);

            pcListMap.get(key).addIceIndicator(
                new RTCIceCandidate({
                candidate: message.candidate,
                sdpMLineIndex: message.sdpMLineIndex,
                sdpMid: message.sdpMid,
                })
            )
            }
        );

        }
    );
    }

    const createPeerConnection = (otherKey: string)=>{
      const pc = new RTCPeerConnection();
      try{
        pc.addEventListener("icecandidate", (event)=>{
          onIceCandidate(event, otherKey)
        });

        pc.addEventListener("track", (event)=>{
          onTrack(event, otherKey);
        });

        // fetching, To-Do: 해당 로직을 훅으로 만들기?
        const localStream = videoStream as MediaStream;
        if(localStream){
            localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });
        }

        console.log("PeerConnection created for ", otherKey);
        console.log("PeerConnection: ", pc)
        pc.oniceconnectionstatechange = ()=>{
        if( ["disconnected", "failed", "closed"].includes(pc.iceConnectionState) ){
            return {status: "disconnected"}
        }
        }

    } catch(error){
        throw Error(error as string)
    }
      return pc;
    }

    const onIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey: string)=>{
      if(event.candidate){
        console.log("on ICE Candidate")
        stompClient.send(
          `/app/peer/iceCandidate/${otherKey}/${roomId}`,
          {},
          JSON.stringify({key:myKey, body: event.candidate})
        )
      }
    }

    function sendOffer(pc:RTCPeerConnection, otherKey:string){
      pc.createOffer().then((offer)=>{
        stompClient.send(
          `/app/peer/offer/${otherKey}/${roomId}`,
          {},
          JSON.stringify({
            key: myKey,
            body: offer,
          })
        )
      })
    };

    function sendAnswer(pc:RTCPeerConnection, otherKey:string){
      pc.createAnswer().then((answer)=>{  
        setLocalAndSendMessage(pc, answer);
        stompClient.send(
        `/app/peer/answer/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: answer,
        }))
      })
    };

    const onTrack = (event: RTCTrackEvent, otherKey: string) => {
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

    const setLocalAndSendMessage = (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
      pc.setLocalDescription(sessionDescription);
    };

  return (
    <div>
      <AchromaticButton type="button" onClick={()=>{startCam()}}>캠 상태 전역 On + 커넥션 연결 (캠상태 관리해주고 커넥션이랑 로직 분리 반드시 필요..)</AchromaticButton>
      <AchromaticButton type="button" onClick={async ()=>{handleStreamStart();}}>Stream Start</AchromaticButton>
      
      <VideoView
        video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} />}
        onCam={true}
        profile={mockProfile}
      />
      
      <div id="remoteStreamDiv" style={{ transform: 'rotateY(180deg)', WebkitTransform: 'rotateY(180deg)' }}/>
    </div>
  );
}
