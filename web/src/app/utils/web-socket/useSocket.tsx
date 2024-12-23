import { useState } from "react";
import SockJS from "sockjs-client";
import { Client  } from "@stomp/stompjs";

// 전역으로 관리데이터 -> consulting-room 객체 데이터임 consultingRoom의 UUID
const roomId = 11;
// 사용자의 UUID로 관리 -> Consulting-room으로 내 ID를 받을 수 있음
const myKey:string = Math.random().toString(36).substring(2, 11);

export function useSocket(){
  const socket = new SockJS("http://localhost:8080/ws/consulting-room");
  const [otherKeyList] = useState<string[]>([]);
  const [pcListMap] = useState<Map<string,RTCPeerConnection>>(new Map<string, RTCPeerConnection>());
  const [videoElements, setVideoElements] = useState<React.ReactNode[]>([]);
  
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const client = new Client({
    webSocketFactory: () => socket,
    debug: () => {},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    
    onConnect: () => {
      // 서버가 클라이언트에 보내는 응답
      // app/call/key와 매핑됨(startStream을 누를 경우 해당 end point로 응답값이 옴.)
      client.subscribe(`/topic/call/key`, (message)=>{
        console.log('서버에서 topic/call/key 응답 값을 받음', message);
        // 해당 응답값을 받을 경우 바디값에 자신의 키(cam key)를 보냄
        client.publish({
          destination: `/app/send/key`,
          body: JSON.stringify(myKey),
        })
      })

      // 서버가 클라이언트에게 보내는 응답값(참여중인 모든 참여자들의 키)
      client.subscribe(`/topic/send/key`, (message)=>{
        const key: string = JSON.parse(message.body);
        console.log(key);
        if (
          myKey !== key &&
          otherKeyList.find((mapKey) => mapKey === myKey) === undefined
        ) {
          otherKeyList.push(key);
        }
      })
      
      client.subscribe( `/topic/peer/offer/${myKey}/${roomId}`, 
        async (offer)=>{
          console.log('offer')
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;
          const connection = await createPeerConnection(key)
  
          pcListMap.set(key, connection);

          await pcListMap.get(key).setRemoteDescription(
            new RTCSessionDescription({type: message.type, sdp: message.sdp})
          );
          await sendAnswer(pcListMap.get(key), key);
        }
      )

      client.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, async (answer)=>{
          console.log('answer')
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;
          await pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
        }
      )
  
      client.subscribe( `/topic/peer/iceCandidate/${myKey}/${roomId}`, async (candidate)=>{
          console.log('iceCandidate')
          const key = JSON.parse(candidate.body).key as string;
          const message = JSON.parse(candidate.body).body;
          setTimeout(async ()=>{
            await pcListMap.get(key).addIceCandidate(
              new RTCIceCandidate({
                candidate: message.candidate,
                sdpMLineIndex: message.sdpMLineIndex,
                sdpMid: message.sdpMid,
              })
            )
          },1000)
        }
      )
    } 
  });

  const startStream = async ()=>{
    if(client.connected){
      console.log("start steam ... ")
      // setTimeout(() => {
        if(client.connected){ 
          client.publish({ destination: `/app/call/key`, body:"publish: call/key" });
          setTimeout(()=>{
            otherKeyList.map(async (key)=>{
            if(!pcListMap.has(key)){
              pcListMap.set(key, await createPeerConnection(key));
              await sendOffer(pcListMap.get(key), key);
              }
            })
          }, 1000)
        }
      // }, 1000);
    }
  }

  const createPeerConnection = async (otherKey: string)=>{
    const pc = new RTCPeerConnection();
    try{
      pc.addEventListener("icecandidate", (event)=>{
        console.log("iceCandidate 이벤트 발생")
        onIceCandidate(event, otherKey);
      });
    
      pc.addEventListener("track", (event)=>{
        console.log("track 이벤트 발생")
        onTrack(event, otherKey);
      });
  
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((localStream)=>{
          localStream.getTracks().forEach((track)=>{
            pc.addTrack(track, localStream)
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
    setRemoteStream(event.streams[0]);
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
      if(client.connected){
        client.publish({
          destination: `/app/peer/iceCandidate/${otherKey}/${roomId}`,
          body: JSON.stringify({ key: myKey, body: event.candidate }),
        });
      }
    }
  };

  const sendAnswer = async (pc:RTCPeerConnection, otherKey:string)=>{
    pc.createAnswer().then(async (answer)=>{
      await setLocalAndSendMessage(pc, answer).then(()=>{
        if(client.connected){
          client.publish({
            destination: `/app/peer/answer/${otherKey}/${roomId}`,
            body: JSON.stringify({ key: myKey, body: answer}),
            skipContentLengthHeader: true,
          })
        }
      })
    })
  }

  const sendOffer = async (pc:RTCPeerConnection, otherKey:string)=>{
    pc.createOffer().then(async (offer)=>{
      await setLocalAndSendMessage(pc, offer).then(()=>{
        client.publish({
          destination:`/app/peer/offer/${otherKey}/${roomId}`,
          body: JSON.stringify({ key: myKey, body: offer,})
        })
      });
      console.log("Send offer");
    })
  }
  
  const setLocalAndSendMessage = async (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
    await pc.setLocalDescription(sessionDescription);
  }

  return {
    client: client, 
    video: videoElements,
    startStream: startStream,
    remoteStream: remoteStream
  };
}