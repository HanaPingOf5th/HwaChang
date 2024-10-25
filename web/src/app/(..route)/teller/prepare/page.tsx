import Content from "@/app/ui/teller-room/content";
import InfoBar from "@/app/ui/teller-room/info-bar";
import React from "react";

export default function PrepareCounsel() {
  const waitingCount = 6;
  return (
    <div>
      <InfoBar />
      <Content waitingCount={waitingCount} />
    </div>
  )
}
