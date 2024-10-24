import React from "react";
import InfoContent from "@/app/ui/teller-room/info-content";

export default function InfoBar() {
  const infoData = [
    { status: "고객대기중", count: 10 },
    { status: "대기", count: 5 },
    { status: "통화중", count: 13 },
    { status: "후처리", count: 4 },
    { status: "이석", count: 2 },
  ];

  return (
    <div className="bg-secondary">
      <div className="flex space-x-5 items-center justify-center p-7">
        {infoData.map((info, index) => (
          <InfoContent key={index} status={info.status} count={info.count} />
        ))}
      </div>
    </div>
  );
}