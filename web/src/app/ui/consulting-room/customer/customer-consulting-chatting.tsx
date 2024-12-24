"use client";

import { useEffect, useRef, useState } from "react";
import { FormState } from "../../component/molecule/form/form-root";
import { BsChatDots } from "react-icons/bs";
import { Card, CardContent, CardHeader } from "../../component/molecule/card/card";
import { MyChat, OtherChat } from "../chat-box";
import Form from "../../component/molecule/form/form-index";
import { FormTextInput } from "../../component/molecule/form/form-textinput";
import AchromaticButton from "../../component/atom/button/achromatic-button";
import { LuSendHorizonal } from "react-icons/lu";
import { ChatDataType, useChat } from "@/app/utils/web-socket/useChat";
import { useCustomerStore } from "@/app/stores/customerStore";

export default function CustomerConsultingChatting() {
  const { customerName } = useCustomerStore();
  const tellerName = "김하나 행원";
  const [myMessages, setMyMessages] = useState<ChatDataType[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { client, chatMessage, messages } = useChat();

  async function sendMessage(prevState: FormState, formData: FormData) {
    const value: string = formData.get("chat") as string;
    const chatDate = {
      id: "my",
      chat: value,
      time: new Date(),
    };

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
            (t) =>
              t.chat === value.chat &&
              new Date(t.time).getTime() === new Date(value.time).getTime(),
          ),
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
              {`${customerName || "고객"}님 반갑습니다. 상담원과 매칭되기전 궁금하신 정보를 미리 입력해주세요.`}
            </div>
            {
              <div className="space-y-5">
                <div className="px-2 space-y-1 text-xs">
                  <div>• 화상 상담 전, 미리 작성하실 것들이 있다면 이용해주세요.</div>
                  <div>• 채팅창에 작성된 내용은 상담사에게 전달됩니다.</div>
                </div>
              </div>
            }
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto h-96 p-4" ref={chatContainerRef}>
            <div className="flex flex-col space-y-2">
              <OtherChat name={`${tellerName}`} chat={`${customerName || "고객"}님 반갑습니다^^`} />
              {myMessages.map((message, index) =>
                message.id === "my" ? (
                  <MyChat key={index} chat={message.chat} />
                ) : (
                  <OtherChat key={index} name={message.id} chat={message.chat} />
                ),
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
