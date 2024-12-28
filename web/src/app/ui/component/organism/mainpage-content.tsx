import React from "react";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";
import Teller from "@/app/utils/public/Teller.svg";
import Sun from "@/app/utils/public/Sun.svg";

export default function MainPageContent() {
  return (
    <>
      <div className="relative p-20 flex flex-col justify-between text-white text-7xl w-1/2 h-full bg-hwachang-main">
        <Image
          className="absolute top-0 -right-32"
          src={Sun}
          alt="Sun"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-start gap-5">
          <p>은행</p>
          <p>업무도</p>
          <p>
            <span className="text-8xl font-bold">화창</span>하게
          </p>
        </div>

        {/* 로고 이미지 */}
        <div className="text-2xl flex items-end justify-between">
          <Image src={Teller} alt="Teller" width={150} height={150} />
          <div className="flex items-end">
            <p>화상 창구,</p>
            <Image src={Logo} alt="Logo" width={150} height={150} />
          </div>
        </div>
      </div>
    </>
  );
}
