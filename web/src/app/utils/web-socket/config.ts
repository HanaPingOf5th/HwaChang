/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
const stompClient = Stomp.over(socket);
const myKey = Math.random().toString(36).substring(2, 11);
const roomId = 1234;
const pcListMap = new Map();
const otherKeyList:string[] = [];

// TO-DO:토큰 전역으로 관리하면서, 웹 소켓 연결 시 헤더에 전달
const access:string ='@@@mockToekn@@@';

// RTC pipe-line
export const connectSocket = async (videoStream:MediaStream) => {
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


      
      // rtc
      // fetching 코드 작성
      

      // signaling
      stompClient.subscribe(
        `/topic/peer/offer/${myKey}/${roomId}`,
        (offer)=>{
          console.log('offer');
          console.log(offer);
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;

          pcListMap.set(key, createPeerConnection(key, videoStream));
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
          console.log(answer);
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;
          pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
        }
      );

      // iceCandidate
      stompClient.subscribe(
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
      );

      stompClient.subscribe(
        `/topic/peer/chat/message/${roomId}`,
        (message)=>{
          console.log("receive message !");
          const {id, chat, time} = JSON.parse(message.body);

          console.log(` ${id} send message ${chat} at ${time}`);
        }
      )
    }
  );
}

function createPeerConnection(otherKey: string, videoStream: MediaStream){
  const pc = new RTCPeerConnection();
  try{
    pc.addEventListener("icecandidate", (event)=>{
      onIceCandidate(event, otherKey)
    });

    pc.addEventListener("track", (event)=>{
      onTrack(event, otherKey);
    });

    // fetching, To-Do: 해당 로직을 훅으로 만들기?
    if(!videoStream==undefined){
      videoStream.getTracks().forEach((track) => {
        pc.addTrack(track, videoStream);
      });
    }

    pc.oniceconnectionstatechange = ()=>{
      if( pc.iceConnectionState === "disconnected" || "failed" || "closed" ){
        return {status: "disconnected"}
      }
    }

  } catch(error){
    throw Error(error as string)
  }
}

function onIceCandidate(event: RTCPeerConnectionIceEvent, otherKey: string){
  if(event.candidate){
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

// 사용 예
/*
// start Stram 시
document.querySelector("#startSteamBtn").addEventListener("click", async () => {
  await stompClient.send(`/app/call/key`, {}, {});

  setTimeout(() => {
    otherKeyList.map((key) => {
      if (!pcListMap.has(key)) {
        pcListMap.set(key, createPeerConnection(key));
        sendOffer(pcListMap.get(key), key);
      }
    });
  }, 1000);
});

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

// end Stream 시
document
  .querySelector("#finishStreamBtn")
  .addEventListener("click", async () => {
    stompClient.send(
      `/app/peer/disconnect/${roomId}`,
      {},
      JSON.stringify({
        key: myKey,
        message: `${myKey} is leaving the room`,
      })
    );

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStreamElement.srcObject = null;
    }

    // Close all peer connections
    pcListMap.forEach((pc, key) => pc.close());
    pcListMap.clear();

    console.log("Disconnected from the room.");
});

document.querySelector("#sendChatBtn").addEventListener("click",async () =>{
  const message = document.getElementById("chatInput");
  console.log("send Meesage");
  sendMeesage(message.value);
  message.value = '';

})

*/

function sendAnswer(pc:RTCPeerConnection, otherKey:string){
  pc.createAnswer().then((answer)=>{
    setLocalAndSendMessage(pc, answer);
    stompClient.send(
      `/app/peer/answer/${otherKey}/${roomId}`,
      {},
      JSON.stringify({
        key: myKey,
        body: answer,
      })
    )
  })
};

function onTrack(event: RTCTrackEvent, otherKey: string){
  return {
    videoId: otherKey,
    streamInfo: event.streams[0]
  }
};

const setLocalAndSendMessage = (pc:RTCPeerConnection, sessionDescription: RTCLocalSessionDescriptionInit | undefined) => {
  pc.setLocalDescription(sessionDescription);
};