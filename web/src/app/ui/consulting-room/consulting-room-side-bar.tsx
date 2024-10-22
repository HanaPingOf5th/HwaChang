'use client'

import TextInput from "../component/atom/text-input"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"

export default function ConsultingRoomSideBar() {
  return (
    <div className="flex h-full flex-col px-4 py-4 md:px-2">
      <div className="mb-2 flex h-10 justify-start items-center rounded-md bg-emerald-300 p-4 border-2\"/>
      <div className="justify-between flex-col space-x-0 space-y-2">
        <div className="h-auto w-full grow block">
          <Card>
            <CardHeader>
              채팅방
            </CardHeader>
            <CardContent>
              <TextInput></TextInput>
            </CardContent>
          </Card>
        </div>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white-50 p-3 text-sm text-slate-700 font-medium hover:bg-red-50 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
            나가기
        </button>
      </div>
    </div>
  )
}