'use client'

import { useEffect, useRef, useState } from "react";
import { FormState } from "../../component/molecule/form/form-root";
import { BsChatDots } from "react-icons/bs";
import { Card, CardContent, CardHeader } from "../../component/molecule/card/card";
import Form from "../../component/molecule/form/form-index";
import { FormTextInput } from "../../component/molecule/form/form-textinput";
import AchromaticButton from "../../component/atom/button/achromatic-button";
import { LuSendHorizonal } from "react-icons/lu";
import { ChatDataType, useChat } from "@/app/utils/web-socket/useChat";
import { MyChat, OtherChat } from "../chat-box";

export default function TellerConsultingChatting() {
    const [myMessages, setMyMessages] = useState<ChatDataType[]>([]);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const {client, chatMessage, messages} = useChat();
  
    async function sendMessage(prevState: FormState, formData: FormData) {
      const value: string = formData.get("chat") as string;
      const chatDate = {
        id: 'my',
        chat: value,
        time: new Date(),
      }
  
      if (value.trim() !== "") {
        setMyMessages((prevMessages) => [...prevMessages, chatDate]);
        chatMessage(value);
      }
  
      return {
        isSuccess: true,
        isFailure: false,
        message: "성공적으로 메세지를 보냈습니다.",
        validationError: {},
      };
    }

    useEffect(() => {
      if (client) {
        client.activate();
        console.log("Activating STOMP client...");
  
        return () => {
          console.log("Deactivating STOMP client...");
          client.deactivate();
        };
      }
    }, [client]);

    useEffect(() => {
      setMyMessages((prevMessages) => {
        const allMessages = [...prevMessages, ...messages];
    
        const uniqueMessages = allMessages.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.chat === value.chat && new Date(t.time).getTime() === new Date(value.time).getTime()
            )
        );
    
        uniqueMessages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    
        return uniqueMessages;
      });
    }, [messages]);
  
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [myMessages]);
  
    return (
      <div className="flex justify-center min-w-[311.6px] bg-hwachang-darkgreen">
        <div className="flex justify-center flex-col">
          <div className="flex bg-hwachang-green rounded-2xl rounded-b-none p-3 gap-2">
            <BsChatDots size="25" color="white" />
            <p className="text-lg font-medium text-white">채팅</p>
          </div>
          <Card className="rounded-none rounded-b-lg">
            <CardHeader className="space-y-5">
              <div className="bg-hwachang-gray6 rounded-3xl px-10 py-3 font-medium text-xs text-center text-slate-800">
                {"채팅을 통해 고객님께 필요한 정보를 먼저 제공하거나 돕기 위해 다음 안내를 준비해주세요."}
              </div>
              {(
                  <div className="space-y-5">
                    <div className="px-2 space-y-1 text-xs">
                      <div>• 연결 상태를 확인하고, 고객님께 화상 재시도를 요청합니다.</div>
                      <div>• 연결이 지속적으로 안될 경우, 전화 상담 또는 다른 방법을 제안합니다.</div>
                      <div>
                        • 상담 진행 중 제공해야 할 주요 서류 또는 정보가 있다면 채팅창을 통해
                        전달하세요.
                      </div>
                    </div>
                    <div className="font-medium text-center text-sm text-hwachang-hwachangred">
                      <p>필요 시, 상황에 맞는 응대 매뉴얼을 참조해 주시고,</p>
                      <p>고객님이 불편하지 않도록 빠른 응대를 부탁드립니다.</p>
                    </div>
                  </div>
                )}
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto h-96 p-4" ref={chatContainerRef}>
              <div className="flex flex-col space-y-2">
              {/* {messages.map((message, index) => (
                  <OtherChat key={index} name={message.id} chat={message.chat} />
              ))}
              {myMessages.map((data, index) => (
                <MyChat key={index} chat={data.chat} />
              ))} */}
              {myMessages.map((message, index) =>
                message.id === "my" ? (
                 <MyChat key={index} chat={message.chat} />
                ) : (
                  <OtherChat key={index} name={message.id} chat={message.chat} />
                )
                )}              
              </div>
            </CardContent>
            <hr className="bg-hwachang-gray4"></hr>
            <Form id={"chatMessage"} action={sendMessage} failMessageControl={"alert"}>
              <CardContent className="grid grid-cols-[5fr_1fr] items-center gap-2 p-2">
                <FormTextInput
                  placeholder="메시지를 입력해주세요."
                  id={"chat"}
                  className="w-full border-none"
                />
                <AchromaticButton className={`w-full bg-hwachang-hwachangcolor`}>
                  <LuSendHorizonal size="20" />
                </AchromaticButton>
              </CardContent>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
  