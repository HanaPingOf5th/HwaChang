import { useState } from "react";
import SockJS from "sockjs-client";
import { Stomp  } from "@stomp/stompjs";

export function useSocket(){
  const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
  // const socket = new SockJS("http://localhost:8080/consulting-room");
  const otherKeyList: string[] = [];

  const pcListMap = new Map<string, RTCPeerConnection>();
  const myKey:string = Math.random().toString(36).substring(2, 11);
  const roomId = 11;
  const [videoElements, setVideoElements] = useState<React.ReactNode[]>([]);
  const stompClient = Stomp.over(socket);

  const connectSocket = async ()=>{
    stompClient.debug = (res: string)=>{console.log(res)};

    stompClient.connect({}, function(){
      console.log("Connected to WebRTC server");
      stompClient.subscribe(
        `/topic/peer/iceCandidate/${myKey}/${roomId}`,
        (candidate)=>{
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;

          pcListMap.get(key).addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMLineIndex: message.sdpMLineIndex,
              sdpMid: message.sdpMid,
            })
          )
        }
      );

      stompClient.subscribe(`/topic/peer/offer/${myKey}/${roomId}`, (offer) => {
        const key = JSON.parse(offer.body).key;
        const message = JSON.parse(offer.body).body;

        pcListMap.set(key, createPeerConnection(key));
        pcListMap.get(key).setRemoteDescription(
          new RTCSessionDescription({ type: message.type, sdp: message.sdp })
        );
        sendAnswer(pcListMap.get(key), key);
      });

      stompClient.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, (answer) => {
        const key = JSON.parse(answer.body).key;
        const message = JSON.parse(answer.body).body;
        pcListMap
          .get(key)
          .setRemoteDescription(new RTCSessionDescription(message));
      });

      stompClient.subscribe(`/topic/call/key`, (message) => {
        console.log(message);
        stompClient.send(`/app/send/key`, {}, JSON.stringify(myKey));
      });

      stompClient.subscribe(`/topic/send/key`, (message) => {
        const key = JSON.parse(message.body);
        if (
          myKey !== key &&
          otherKeyList.find((mapKey) => mapKey === myKey) === undefined
        ) {
          otherKeyList.push(key);
        }
        console.log(otherKeyList);
      });
    })

   }

   const startStream = async()=>{
    stompClient.send(`/app/call/key`, {}, "");
    setTimeout(() => {
      console.log('스트림 누른후 비동기 처리', otherKeyList);
      otherKeyList.map((key) => {
        if (!pcListMap.has(key)) {
          pcListMap.set(key, createPeerConnection(key));
          sendOffer(pcListMap.get(key), key);
        }
      });
    }, 1000);
  }

  const createPeerConnection = (otherKey: string)=>{
    const pc = new RTCPeerConnection();
    console.log("만들어지기 전 피어커넥션", pc)
    try{
      pc.addEventListener("icecandidate", (event)=>{
        console.log("iceCandidate 이벤트 발생")
        onIceCandidate(event, otherKey);
      });
    
      pc.addEventListener("track", (event)=>{
        console.log("track 이벤트 발생")
        onTrack(event, otherKey);
      });
  
      navigator.mediaDevices.getUserMedia({ video: { width: 800, height: 450, facingMode: "user" }, audio: true })
        .then((localStream)=>{
          localStream.getTracks().forEach((track)=>{
            console.log("---------------------");
            console.log("보낼 트랙 확인", track);
            console.log("보낼 로컬 스트림 확인", track);
            pc.addTrack(track, localStream)
            console.log(pc)
            console.log(pc.getSenders())
            console.log("---------------------");
          })
          console.log("송출완료")
        })
    
       pc.onconnectionstatechange = ()=> {
        if(["disconnected", "failed", "closed"].includes(pc.iceConnectionState)){
          console.log("연결이 끊어졌습니다.")
        }
      }
    }catch(e){
      console.log(e)
    }
    console.log("만들어진 후 피어커넥션", pc)
    return pc;
  }

  const onTrack = (event: RTCTrackEvent, otherKey: string)=>{
    const newVideoElement = (
      <video
        className="rounded-xl aspect-[16/9] object-cover"
        key={otherKey}
        autoPlay
        playsInline
        ref={(videoElem: HTMLVideoElement | null) => {
          if (videoElem) {
            videoElem.srcObject = event.streams[0];
          }
        }}
      />
    );
    setVideoElements((prev) => [...prev, newVideoElement]);
  }

  const onIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey: string) => {
    const peerConnection = pcListMap.get(otherKey);
    if (peerConnection && event.candidate) {
      stompClient.send(
        `/app/peer/iceCandidate/${otherKey}/${roomId}`,
        {},
        JSON.stringify({ key: myKey, body: event.candidate,})
      );
    }
  };

  const sendAnswer = (pc:RTCPeerConnection, otherKey:string)=>{
    console.log(otherKey, "로 answer를 보냅니다 !: ", pc)
    pc.createAnswer().then((answer)=>{
      setLocalAndSendMessage(pc, answer);
      stompClient.send(
        `/app/peer/answer/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: answer,
        })
      );
    })
  }

  const sendOffer = (pc:RTCPeerConnection, otherKey:string)=>{
    pc.createOffer().then((offer)=>{
      setLocalAndSendMessage(pc, offer);
      stompClient.send(
        `/app/peer/offer/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: offer,
        })
      );
      console.log("Send offer");
    })
  }
  
  const setLocalAndSendMessage = (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
    pc.setLocalDescription(sessionDescription);
  }

  return {
    client: stompClient, 
    video: videoElements[0],
    otherKeyList: otherKeyList, 
    pcListMap: pcListMap,
    connectSocket: connectSocket,
    startStream: startStream,
  };
}