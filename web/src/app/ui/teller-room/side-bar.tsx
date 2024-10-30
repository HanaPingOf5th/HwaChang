import React from "react";
import TabMenu from "./tab-menu";
import Chatting from "./chatting";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";

export default function SideBar() {
  return (
    <div className="bg-hwachang-darkgreen p-7 space-y-8">
      <TabMenu />
      <Chatting />
      <div className="flex justify-end">
        {/* 로고 */}
        <Image src={Logo} alt="Logo" width={80} height={60} />
      </div>
    </div>
  )
}