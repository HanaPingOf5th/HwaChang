import React from "react";
import TabMenu from "./tab-menu";
import Chatting from "./chatting";

export default function SideBar() {
  return (
    <div className="bg-hwachang-darkgreen p-7 space-y-8">
      <TabMenu />
      <Chatting />
    </div>
  )
}