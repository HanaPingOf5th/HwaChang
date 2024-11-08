/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Client  } from "@stomp/stompjs";
import { useRef } from "react";
import SockJS from "sockjs-client";

const access:string ='@@@mockToekn@@@';
const socket = new SockJS("http://ec2-3-35-49-10.ap-northeast-2.compute.amazonaws.com:8080/consulting-room");
const myKey:string = Math.random().toString(36).substring(2, 11);

export default function WebCamVer2() {
  const client = useRef<Client | null>(null);
  const otherKeyList:string[] = [];

  client.current = new Client({
    webSocketFactory: () => socket,
    connectHeaders:{Authorization: `Bearer ${access}`},
    debug: (str: string) => { console.log(str) },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: ()=>{
      client.current?.subscribe(
        `/topic/call/key`,
        (message)=>{
          client.current.publish({
            destination: `/app/send/key`,
            body: JSON.stringify(myKey),
            skipContentLengthHeader: true,
          })
        }
      )

      client.current?.subscribe(
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
  client.current.activate();

  return (
    <main>
      <div className="font-semibold">웹 소켓 연결 확인 ...</div>
    </main>
  )
}