"use client";

import Chatting from "./chatting";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";

export default function CustomerConsultingRoomSideBar() {
  return (
    <div className="grid grid-cols-1 gap-10 h-full p-7">
      <Chatting isCustomer={true} />
      <div className="flex justify-end pb-5">
        <Image src={Logo} alt="Logo" width={90} height={70} />
      </div>
    </div>
  )
}