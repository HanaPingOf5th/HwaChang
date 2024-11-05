"use client";

import React from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import { useRouter } from "next/navigation";

interface waitingCountProps {
  waitingCount: number;
}

export default function ConsultationStartContent({ waitingCount }: waitingCountProps) {
  const router = useRouter();

  const handleEntrance = () => {
    router.push("/teller-consulting-room");
  }

  return (
    <div className="flex flex-col items-center space-y-8 mt-[28vh]">
      <div className="text-hwachang-green1 font-bold text-5xl mb-6">
        고객과의 화상 상담을 시작하세요
      </div>
      <div className="text-hwachang-green1 text-2xl">
        현재 {waitingCount}명의 고객이 대기 중에 있습니다.
      </div>
      <AchromaticButton
        className="bg-hwachang-darkgreen w-1/4 rounded-2xl py-8 text-xl"
        onClick={handleEntrance}>
        입장하기
      </AchromaticButton>
    </div>
  );
}