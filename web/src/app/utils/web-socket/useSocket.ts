import { useRef } from "react";
import SockJS from "sockjs-client";
import { Client  } from "@stomp/stompjs";

export function useSocket(){
  const client = useRef<Client | null>(null);
  const access:string ='@@@mockToekn@@@';
  const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
  const otherKeyList:string[] = [];
  // const pcListMap = new Map();
  const myKey:string = Math.random().toString(36).substring(2, 11);
  // const roomId = 1231;

  client.current = new Client({
    webSocketFactory: () => socket,
    connectHeaders:{Authorization: `Bearer ${access}`},

    debug: (str: string) => { console.log(str) },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: ()=>{
      client.current.subscribe(
        `/topic/call/key`,
        ()=>{
          client.current.publish({
            destination: `/app/send/key`,
            body: JSON.stringify(myKey),
            skipContentLengthHeader: true,
          })
        }
      )

      client.current.subscribe(
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
    } 
  });

  // const onTrack = (event: RTCTrackEvent, otherKey: string)=>{
  //   // To-Do: video Element 생성을 Documnet가 아닌 React.ReactNode를 생성하고 videoRef를 참조할 수 있도록 설계
  //   // const videoView = (<VideoView video={video as unknown as React.ReactNode} onCam={false}></VideoView>)
  //   if (document.getElementById(`${otherKey}`) === null) {
  //     const video = document.createElement("video");
        
  //     video.autoplay = true;
  //     video.controls = true;
  //     video.id = otherKey;
  //     video.srcObject = event.streams[0];
          
  //     document.getElementById("remoteStreamDiv")?.appendChild(video);
  //   }
  // }


  

  return client.current;
}