"use client";
import React from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import { useRouter } from "next/navigation";
// import { processNextCustomer } from "@/app/business/queues/queues.service";


export default function ConsultationStartContent() {
  const router = useRouter();

  const handleEntrance = () => {
    router.push("/teller-room/waiting");
  }

  return (
    <div className="flex flex-col items-center space-y-8 mt-[28vh]">
      <div className="text-hwachang-green1 font-bold text-5xl mb-6">
        고객과의 화상 상담을 시작하세요
      </div>
      <AchromaticButton
        className="bg-hwachang-main w-1/4 rounded-2xl py-8 text-xl"
        onClick={handleEntrance}>
        입장하기
      </AchromaticButton>
    </div>
  );
}