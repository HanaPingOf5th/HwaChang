'use client'

import AchromaticButton from "../component/atom/button/achromatic-button"
import { NameTag } from "../component/atom/name-tag"
import TextInput from "../component/atom/text-input/text-input"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"
import { MyChat, OtherChat } from "./chat-box"

export default function ConsultingRoomSideBar() {
  return (
    <div className="flex h-full w-full flex-col px-4 py-4 md:px-2">
      <div className="mb-2 flex h-10 justify-start items-center rounded-md bg-emerald-300 p-4 border-2\"/>
      <div className="flex justify-between flex-col space-x-0 space-y-2">
        <div className="h-auto w-full grow block">
          <Card className="h-full flex flex-col">
            <CardHeader className="text-center">
              <NameTag name={"채팅방에 입장하셨습니다. 윤영헌"}/>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto min-h-80 p-4">
              <div className="flex flex-col space-y-2">
                <MyChat chat={`안녕하세요`}></MyChat>
                <OtherChat name="윤영헌 행원" chat="반갑습니다 고객님 ^^"></OtherChat>
              </div>
            </CardContent>
            <CardContent className="flex justify-center space-x-4">
              <TextInput placeholder="궁금하신 내용을 입력해주세요."/>
              <AchromaticButton>전송</AchromaticButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}