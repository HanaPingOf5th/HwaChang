'use client'

import AchromaticButton from "../component/atom/achromatic-button"
import TextInput from "../component/atom/text-input"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"

export default function ConsultingRoomSideBar() {
  return (
    <div className="flex h-full w-full flex-col px-4 py-4 md:px-2">
      <div className="mb-2 flex h-10 justify-start items-center rounded-md bg-emerald-300 p-4 border-2\"/>
      <div className="flex justify-between flex-col space-x-0 space-y-2">
        <div className="h-auto w-full grow block">
          {/* ToDo: 채팅 방 컴포넌트 사이즈 고정 */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              채팅방
            </CardHeader>
            <CardContent><div className="flex justify-center space-x-4"></div></CardContent>
            <CardContent className="flex justify-center space-x-4">
              <TextInput placeholder="궁금하신 내용을 입력해주세요."/>
              <AchromaticButton>전송</AchromaticButton>
            </CardContent>
          </Card>
        </div>
        <AchromaticButton className="bg-red-50 hover:bg-red-100 text-red-600">나가기</AchromaticButton>
      </div>
    </div>
  )
}