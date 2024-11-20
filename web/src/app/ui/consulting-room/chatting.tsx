"use client";

import { useEffect, useRef, useState } from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import { Card, CardContent, CardHeader } from "../component/molecule/card/card";
import Form from "../component/molecule/form/form-index";
import { FormState } from "../component/molecule/form/form-root";
import { FormTextInput } from "../component/molecule/form/form-textinput";
import { LuSendHorizonal } from "react-icons/lu";
import { MyChat, OtherChat } from "./chat-box";
import { BsChatDots } from "react-icons/bs";

interface ChattingRoomProps {
  isCustomer: boolean;
}

export default function Chatting({ isCustomer }: ChattingRoomProps) {
  const userName = "윤영헌";
  const tellerName = "김하나 행원";
  const [myMessages, setMyMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  function sendMessage(prevState: FormState, formData: FormData) {
    const value: string = formData.get("chat") as string;

    if (value.trim() !== "") {
      // 메시지 전송
      setMyMessages((prevMessages) => [...prevMessages, value]);
      setInputValue("");
    }

    return {
      isSuccess: true,
      isFailure: false,
      message: "성공적으로 메세지를 보냈습니다.",
      validationError: {},
    };
  }

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
              {isCustomer
                ? `${userName}님 반갑습니다. 상담원과 매칭되기전 궁금하신 정보를 미리 입력해주세요.`
                : "채팅을 통해 고객님께 필요한 정보를 먼저 제공하거나 돕기 위해 다음 안내를 준비해주세요."}
            </div>
            {isCustomer ?
              <div className="space-y-5">
                <div className="px-2 space-y-1 text-xs">
                  <div>• 화상 상담 전, 미리 작성하실 것들이 있다면 이용해주세요.</div>
                  <div>• 채팅창에 작성된 내용은 상담사에게 전달됩니다.</div>
                </div>
              </div>
              : (
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
              {isCustomer && (
                <OtherChat name={`${tellerName}`} chat={`${userName}님 반갑습니다^^`}></OtherChat>
              )}
              {myMessages.map((value, index) => (
                <main key={index}>
                  <MyChat chat={value}></MyChat>
                </main>
              ))}
            </div>
          </CardContent>
          <hr className="bg-hwachang-gray4"></hr>
          <Form id={"chatMessage"} action={sendMessage} failMessageControl={"alert"}>
            <CardContent className="grid grid-cols-[5fr_1fr] items-center gap-2 p-2">
              <FormTextInput
                placeholder="메시지를 입력해주세요."
                id={"chat"}
                className="w-full border-none"
                value={inputValue}
                onValueChange={(value) => setInputValue(value)}
              />
              <AchromaticButton className={`w-full ${inputValue.trim() !== "" ? "bg-hwachang-hwachangcolor" : "bg-hwachang-gray4"}`}>
                <LuSendHorizonal size="20" />
              </AchromaticButton>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  );
}
