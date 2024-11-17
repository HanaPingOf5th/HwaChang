"use client";

import React, { useState } from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";
import ProfileImg from "@/app/utils/public/lalalping.png";
import { Card } from "../component/molecule/card/card";
import TellerNavLinks from "./teller-nav-link";
import Link from "next/link";

const statusOptions = [
  { name: "상담 가능", color: "bg-hwachang-active" },
  { name: "다른 업무중", color: "bg-[#FFFB01]" },
  { name: "상담 불가", color: "bg-[#FF2500]" },
  { name: "업무 종료", color: "bg-[#8D8D8D]" },
];

export default function TellerNav() {
  const [currentStatus, setCurrentStatus] = useState("상담 가능");
  const [currentColor, setCurrentColor] = useState("bg-hwachang-active");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleStatusChange = () => {
    setIsEditing(!isEditing);
  };

  const handleStatusSelect = (status: string, color: string) => {
    setSelectedStatus(status);
    setSelectedColor(color);
  };

  const handleStatusConfirm = () => {
    setCurrentStatus(selectedStatus);
    setCurrentColor(selectedColor);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-hwachang-darkgreen">
      <div className="flex justify-center items-center">
        {/* 로고 */}
        <Link href="/teller/main">
          <Image src={Logo} alt="Logo" width={80} height={60} className="mt-5" />
        </Link>
      </div>

      {/* 행원 정보 */}
      <div className="relative flex flex-col items-center flex-grow justify-center">
        {/* 프로필 사진 */}
        <div className="relative z-10 mb-[-32px] mt-2">
          <Image
            src={ProfileImg}
            alt="프로필 사진"
            className="object-cover w-48 h-48 rounded-full border-4 border-white shadow-lg"
          />
          <div
            className={`absolute right-16 transform translate-x-8 bottom-1 w-9 h-9 rounded-full border-4 border-white shadow-lg z-20 ${currentColor}`}
          ></div>
        </div>

        {/* 상세 정보(Card) */}
        <Card className="relative bg-white shadow-lg rounded-3xl w-9/12 mt-5">
          <div className="p-5 text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-semibold">임수진</p>
                <p className="text-xl text-gray1">대리</p>
              </div>
            </div>

            {/* 상태 변경 모드가 아닐 때만 표시 */}
            {!isEditing && (
              <>
                <p className="text-hwachang-black text-lg">성수역점</p>
                <p className="text-hwachang-black text-lg">개인 금융 (대출 상담)</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentColor}`}></div>
                  <p className="text-hwachang-black text-lg">{currentStatus}</p>
                </div>
              </>
            )}

            {/* 상태 변경 모드일 때 */}
            {isEditing && (
              <div className="flex flex-col items-center space-y-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.name}
                    onClick={() => handleStatusSelect(status.name, status.color)}
                    className={`flex items-center justify-center w-full px-4 rounded-lg ${
                      selectedStatus === status.name ? "font-bold" : "font-normal"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${status.color}`}></div>
                    <span>{status.name}</span>
                  </button>
                ))}
              </div>
            )}

            <AchromaticButton
              onClick={isEditing ? handleStatusConfirm : handleStatusChange}
              className="bg-hwachang-green rounded-3xl font-medium text-xl w-full py-8 shadow-lg mt-4"
            >
              {isEditing ? "상태 변경 완료" : "상태 바꾸러 가기"}
            </AchromaticButton>
          </div>
        </Card>
      </div>

      <div className="flex grow flex-row justify-end space-x-2 md:flex-col md:space-x-0 md:space-y-2 ml-10 mt-7">
        <TellerNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-emerald-10 md:block"></div>
      </div>
    </div>
  );
}
