import React from "react";
import SideBar from "@/app/ui/teller-room/side-bar";
import WaitingContent from "@/app/ui/teller-room/waiting-content";

export default function EntrancePage() {
  return (
    <div className="flex">
      <WaitingContent />
      <SideBar />
    </div>
  )
}