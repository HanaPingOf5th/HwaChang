"use client";

import Chatting from "./chatting";

export default function CustomerConsultingRoomSideBar() {
  return (
    <div className="grid grid-cols-1 gap-10 p-6">
      <Chatting isCustomer={true} />
    </div>
  )
}