"use client";

import { useState } from "react";
import AchromaticButton from "../component/atom/button/achromatic-button"
import { NameTag } from "../component/atom/tag/name-tag"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"
import Form from "../component/molecule/form/form-index"
import { FormState } from "../component/molecule/form/form-root"
import { FormTextInput } from "../component/molecule/form/form-textinput"
import { LuSendHorizonal } from "react-icons/lu";
import { MyChat, OtherChat } from "../consulting-room/chat-box";
import { BsChatDots } from "react-icons/bs";


export default function Chatting() {
  const userName = '윤영헌';
  const tellerName = '김하나 행원';
  const [myMessages, setMyMessages] = useState<string[]>([]);

  // To-Do: 실제 채팅 기능 구현 시, 해당 컴포넌트만 렌더링하는 방식으로 구현 -> 채팅 데이터는 전역으로 상태관리 (may be zustand ?)
  function sendMessage(prevState: FormState, formData: FormData) {
    const value: string = formData.get('chat') as string;
    const messages = [...myMessages];
    messages.push(value);
    setMyMessages(messages);
    return (
      {
        isSuccess: true,
        isFailure: false,
        message: '성공적으로 메세지를 보냈습니다.',
        validationError: {}
      }
    )
  }

  return (
    <div className="flex justify-center bg-hwachang-darkgreen">
      <div className="flex justify-center flex-col space-x-0">
        <div className="flex bg-hwachang-green rounded-xl rounded-b-none p-3 gap-2">
          <BsChatDots size="25" color="white" />
          <p className="text-lg font-medium text-white">채팅</p>
        </div>
        <Card className="flex flex-col rounded-none">
          <CardHeader className="space-y-5">
            <div className="bg-hwachang-gray6 rounded-3xl px-10 py-4 font-medium">
              채팅을 통해 고객님께 필요한 정보를 먼저 제공하거나 돕기 위해 다음 안내를 준비해주세요.
            </div>
            <div className="px-8 space-y-1 text-sm">
              <div>
                • 연결 상태를 확인하고, 고객님께 화상 재시도를 요청합니다.
              </div>
              <div>
                • 연결이 지속적으로 안될 경우, 전화 상담 또는 다른 방법을 제안합니다.
              </div>
              <div>
                •상담 진행 중 제공해야 할 주요 서류 또는 정보가 있다면 채팅창을 통해 전달하세요.
              </div>
            </div>
            <div className="px-6 font-medium text-sm text-hwachang-mute">
              필요 시, 상황에 맞는 응대 매뉴얼을 참조해 주시고, 고객님이 불편하지 않도록 빠른 응대를 부탁드립니다.
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto min-h-80 p-4">
            <div className="flex flex-col space-y-2">
              <OtherChat name={`${tellerName}`} chat="반갑습니다 고객님 ^^"></OtherChat>
              {myMessages.map((value, index) => {
                return (
                  <main key={index}>
                    <MyChat chat={value}>
                    </MyChat>
                  </main>
                )
              })}
            </div>
          </CardContent>
          <hr className="bg-hwachang-gray4"></hr>
          <Form id={"chatMessage"} action={sendMessage} onSuccess={() => { }} failMessageControl={"alert"}>
            <CardContent className="grid grid-cols-[5fr_1fr] items-center gap-2 p-2">
              <FormTextInput placeholder="메시지를 입력해주세요." id={"chat"} className="w-full border-none" />
              <AchromaticButton className="w-full bg-hwachang-gray4">
                <LuSendHorizonal size="20" />
              </AchromaticButton>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  )
}