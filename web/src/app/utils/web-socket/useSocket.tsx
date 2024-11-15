/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client  } from "@stomp/stompjs";

export function useSocket(){
  const access:string ='@@@mockToekn@@@';
  const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
  const [otherKeyList, setOtherKeyList] = useState<string[]>([]);

  const [pcListMap, setPcListMap] = useState(new Map<string, RTCPeerConnection>());
  const myKey:string = Math.random().toString(36).substring(2, 11);
  const roomId = 1231;
  const [videoElements, setVideoElements] = useState<React.ReactNode[]>([]);

  const client = new Client({
    webSocketFactory: () => socket,
    connectHeaders:{Authorization: `Bearer ${access}`},
    debug: (str:string) => {console.log(str)},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: ()=>{
      client.subscribe(`/topic/call/key`, ()=>{
        client.publish({
          destination: `/app/send/key`,
          body: JSON.stringify(myKey),
          skipContentLengthHeader: true,
        })
      })

      client.subscribe(`/topic/send/key`, (message)=>{
        const key: string = JSON.parse(message.body);
        if(myKey !== key && !otherKeyList.includes(key)){
          otherKeyList.push(key);
          setOtherKeyList(otherKeyList);
          console.log("------------전달받은 키 목록-----------\n", otherKeyList);
        }
      })

      client.subscribe(
        `/topic/peer/offer/${myKey}/${roomId}`,
        (offer)=>{
          console.log('offer')
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;
  
          pcListMap.set(key, createPeerConnection(key));
          setPcListMap(pcListMap);
          pcListMap.get(key).setRemoteDescription(
            new RTCSessionDescription({type: message.type, sdp: message.sdp})
          );
          sendAnswer(pcListMap.get(key), key);
        }
      )

      client.subscribe(
        `/topic/peer/answer/${myKey}/${roomId}`,
        (answer)=>{
          console.log('answer')
          console.log(answer)
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

  const startStream = ()=>{
    console.log("start steam ... ")
    client.publish({destination:`/app/call/key`});

    console.log("-------------------")
    console.log(client)
    console.log(otherKeyList)
    console.log(pcListMap)
    console.log("-------------------")

    setTimeout(() => {
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

    pc.addEventListener("icecandidate", (event)=>{
      onIceCandidate(event, otherKey);
    });
  
    pc.addEventListener("track", (event)=>{
      onTrack(event, otherKey);
    });

    navigator.mediaDevices.getUserMedia({ video: { width: 800, height: 450, facingMode: "user" }, audio: true })
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
    return pc;
  }

  const onTrack = (event: RTCTrackEvent, otherKey: string)=>{
    const newVideoElement = (
      <video
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
        skipContentLengthHeader: true,
      });
    }
  };

  const sendAnswer = (pc:RTCPeerConnection, otherKey:string)=>{
    pc.createAnswer().then((answer)=>{
      setLocalAndSendMessage(pc, answer);
      client.publish({
        destination: `/app/peer/answer/${otherKey}/${roomId}`,
        body: JSON.stringify({ key: myKey, body: answer}),
        skipContentLengthHeader: true,
      })
      console.log("send answer!")
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
    startStream: startStream};
}