'use client'

import Chatting from "./chatting"

export default function CustomerConsultingRoomSideBar() {
  return (
    <div className="grid grid-cols-1 gap-10 bg-hwachang-darkgreen h-full p-7">
      <Chatting isCustomer={true} />
    </div>
  )
}