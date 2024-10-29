'use client'

import { useState } from "react"
import AchromaticButton from "../component/atom/button/achromatic-button"
import { NameTag } from "../component/atom/tag/name-tag"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"
import { MyChat, OtherChat } from "./chat-box"
import Form from "../component/molecule/form/form-index"
import { FormState } from "../component/molecule/form/form-root"
import { FormTextInput } from "../component/molecule/form/form-textinput"
import { LuSendHorizonal } from "react-icons/lu";

export default function ConsultingRoomSideBar() {
  const userName = '윤영헌';
  const tellerName = '김하나 행원';
  const [myMessages, setMyMessages] = useState<string[]>([]);

  // To-Do: 실제 채팅 기능 구현 시, 해당 컴포넌트만 렌더링하는 방식으로 구현 -> 채팅 데이터는 전역으로 상태관리 (may be zustand ?)
  function sendMessage(prevState: FormState, formData:FormData){
    const value:string = formData.get('chat') as string;
    const messages = [...myMessages];
    messages.push(value);
    setMyMessages(messages);
    return(
      {
        isSuccess: true,
        isFailure: false,
        message: '성공적으로 메세지를 보냈습니다.',
        validationError: {}
      }
    )
  }

  return (
    <div className="flex h-full w-full justify-center px-4 py-20 bg-hwachang-darkgreen">
      <div className="flex justify-center flex-col space-x-0 space-y-2">
        <div className="h-full w-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="text-center">
              <NameTag name={`채팅방에 입장하셨습니다. ${userName}`}/>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto min-h-80 p-4">
              <div className="flex flex-col space-y-2">
                <OtherChat name={`${tellerName}`} chat="반갑습니다 고객님 ^^"></OtherChat>
                {myMessages.map((value, index)=>{
                  return (
                    <main key={index}>
                      <MyChat chat={value}>
                      </MyChat>
                    </main>
                  )
                })}
              </div>
            </CardContent>
            <Form id={"chatMessage"} action={sendMessage} onSuccess={()=>{}} failMessageControl={"alert"}>
            <CardContent className="grid grid-cols-[5fr_1fr] items-center gap-2">
              <FormTextInput placeholder="궁금한 내용을 입력해주세요." id={"chat"} className="w-full"/>
              <AchromaticButton className="w-full">
                <LuSendHorizonal size='20'/>
              </AchromaticButton>
            </CardContent>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}