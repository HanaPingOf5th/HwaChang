"use client";

import Chatting from "./chatting";

export default function CustomerConsultingRoomSideBar() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Chatting isCustomer={true} />
    </div>
  )
}