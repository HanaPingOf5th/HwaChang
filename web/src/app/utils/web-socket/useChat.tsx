import { useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_PATH } from "../http/api-query";

// 사용자의 UUID로 관리
const myKey: string = Math.random().toString(36).substring(2, 11);

export interface ChatDataType {
  id: string;
  chat: string;
  time: Date;
}

export function useChat({id}:{id: string}) {
  const socket = new SockJS(`${API_PATH}/ws/consulting-room`);
  const [messages, setMessages] = useState<ChatDataType[]>([]);

  const roomId= `${id}chat`;
  console.log("room id: ", roomId);

  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str: string) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      client.subscribe(`/topic/peer/chat/message/${roomId}`, async (message) => {
        console.log("chat signam 수신");

        const { id, chat, time } = JSON.parse(message.body);

        setMessages((prevMessages) => [...prevMessages, { id, chat, time: new Date(time) }]);

        console.log(messages);
      });
    },
  });

  const chatMessage = (message: string) => {
    if (client.connected) {
      client.publish({
        destination: `/app/peer/chat/message/${roomId}`,
        body: JSON.stringify({ id: myKey, chat: message, time: new Date() }),
      });
    } else {
      console.log("소켓 연결이 끊겼음");
    }
  };

  return {
    client: client,
    messages: messages,
    chatMessage: chatMessage,
  };
}
