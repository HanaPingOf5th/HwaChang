import React from "react";
import TabMenu from "./tab-menu";
import Chatting from "../consulting-room/chatting";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";

export default function TellerConsultingRoomSideBar() {
  return (
    <div className="grid grid-cols-1 gap-10 h-full p-6">
      <TabMenu />
      <Chatting isCustomer={false} />
      <div className="flex justify-end pb-5">
        <Image src={Logo} alt="Logo" width={90} height={70} />
      </div>
    </div>
  )
}