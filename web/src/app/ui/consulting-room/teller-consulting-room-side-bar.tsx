import React from "react";
import TabMenu from "./tab-menu";
import Chatting from "../consulting-room/chatting";

export default function TellerConsultingRoomSideBar() {
  return (
    <div className="grid grid-cols-1 gap-10 p-6">
      <TabMenu />
      <Chatting isCustomer={false} />
    </div>
  )
}