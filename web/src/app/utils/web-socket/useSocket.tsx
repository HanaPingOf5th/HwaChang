import { useState } from "react";
import SockJS from "sockjs-client";
import { Client  } from "@stomp/stompjs";

/*
  ... 미완성 현재 송신 상태만 가능
  연결 확인하려면 레퍼런스 코드에서 확인해야함
*/

// 전역으로 관리해줘도 좋을것 같은 데이터
const roomId = 11;
const myKey:string = Math.random().toString(36).substring(2, 11);
//const access:string ='@@@mockToekn@@@';

export function useSocket(){
  const socket = new SockJS("http://52.78.117.221:8080/consulting-room");
  const otherKeyList: string[] = [];

  const pcListMap = new Map<string, RTCPeerConnection>();
  const [videoElements, setVideoElements] = useState<React.ReactNode[]>([]);
  
  const client = new Client({
    webSocketFactory: () => socket,
    // connectHeaders:{Authorization: `Bearer ${access}`},
    debug: (str:string) => {console.log(str)},
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
        console.log(message.body);
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
  
          pcListMap.set(key, createPeerConnection(key));
          console.log("만들어진 피어커넥션", createPeerConnection(key))
          pcListMap.get(key).setRemoteDescription(
            new RTCSessionDescription({type: message.type, sdp: message.sdp})
          );
          console.log("sendAnswer 메서드에 담아서 보낼 pcList: ", pcListMap.get(key), 'key: ', key);
          sendAnswer(pcListMap.get(key), key);
        }
      )

      client.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, (answer)=>{
          console.log('answer')
          console.log(answer.body)
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;
          pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
        }
      )
  
      client.subscribe( `/topic/peer/iceCandidate/${myKey}/${roomId}`, (candidate)=>{
          console.log('iceCandidate')
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
      )
    } 
  });

  const startStream = async ()=>{
    if(client.connected){
      console.log("start steam ... ")
      setTimeout(() => {
        if(client.connected){
          // app/call/key: 서버에 브로드 캐스트 해야함 - 현재 먹통 ... 
          client.publish({ destination: `/app/call/key`, body:"publish: call/key" });
          /*
          app/call/key -> topic/call/key
          -> app/send/key(를 통해 내 키 전송) -> topic/call/key(모든 키를 otherList에 담아버림)
          */
          setTimeout(()=>{
            console.log("스트림 누른 후 비동기 처리 후 키 리스트: ", otherKeyList)
            otherKeyList.map((key)=>{
            if(!pcListMap.has(key)){
              pcListMap.set(key, createPeerConnection(key));
              sendOffer(pcListMap.get(key), key);
              }
            })
          }, 1000)

        }
      }, 1000);
    }
  }

  const connectSocket = ()=>{
    client.activate();
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
      client.publish({
        destination: `/app/peer/iceCandidate/${otherKey}/${roomId}`,
        body: JSON.stringify({ key: myKey, body: event.candidate }),
      });
    }
  };

  const sendAnswer = (pc:RTCPeerConnection, otherKey:string)=>{
    console.log(otherKey, "로 answer를 보냅니다 !: ", pc)
    pc.createAnswer().then((answer)=>{
      setLocalAndSendMessage(pc, answer);
      client.publish({
        destination: `/app/peer/answer/${otherKey}/${roomId}`,
        body: JSON.stringify({ key: myKey, body: answer}),
        skipContentLengthHeader: true,
      })
    })
  }

  const sendOffer = (pc:RTCPeerConnection, otherKey:string)=>{
    pc.createOffer().then((offer)=>{
      setLocalAndSendMessage(pc, offer);
      client.publish({
        destination:`/app/peer/offer/${otherKey}/${roomId}`,
        body: JSON.stringify({ key: myKey, body: offer,})
      })
      console.log("Send offer");
    })
  }
  
  const setLocalAndSendMessage = (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
    pc.setLocalDescription(sessionDescription);
  }

  return {
    client: client, 
    video: videoElements,
    otherKeyList: otherKeyList, 
    pcListMap: pcListMap,
    startStream: startStream,
    connectSocket: connectSocket
  };
}