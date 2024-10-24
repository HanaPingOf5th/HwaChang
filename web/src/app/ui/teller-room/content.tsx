import React from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";

export default function Content() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
      <div className="flex text-green1 font-bold text-6xl mb-10">
        고객과의 화상 상담을 시작하세요
      </div>
      <div className="text-green1 text-2xl">
        현재 6명의 고객이 대기 중에 있습니다.
      </div>
      <AchromaticButton className="bg-primary w-1/4 rounded-3xl py-10 text-2xl">
        입장하기
      </AchromaticButton>
    </div>
  );
}
