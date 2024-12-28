"use client";

import React, { useEffect, useState } from "react";
import AchromaticButton from "../component/atom/button/achromatic-button";
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";
import ProfileImg from "@/app/utils/public/lalalping.png";
import { Card } from "../component/molecule/card/card";
import TellerNavLinks from "./teller-nav-link";
import Link from "next/link";
import { fetchTellerStatus, patchTellerStatus } from "@/app/business/teller/teller.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

const statusOptions = [
  { name: "상담가능", color: "bg-hwachang-active" },
  { name: "다른 업무중", color: "bg-[#FFFB01]" },
  { name: "상담 불가", color: "bg-[#FF2500]" },
];

const statusColorMapper = {
  상담가능: "bg-hwachang-active",
  "다른 업무중": "bg-[#FFFB01]",
  "상담 불가": "bg-[#FF2500]",
};

const tellerTypeMapper = {
  기업금융: 1,
  개인금융: 0,
};

export default function TellerNav() {
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("bg-gray-300");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const updateTellerType = useConsultingRoomStore((state) => state.updateTellerType);
  const updateTellerName = useConsultingRoomStore((state) => state.updateTellerName);
  useEffect(() => {
    async function getData() {
      const response = await fetchTellerStatus();
      setName(response.data.result.name);
      setType(response.data.result.type);
      setPosition(response.data.result.position);
      setCurrentStatus(response.data.result.status);
      setCurrentColor(statusColorMapper[response.data.result.status]);
      console.log("TELLER NAV", tellerTypeMapper[response.data.result.type]);
      updateTellerType(tellerTypeMapper[response.data.result.type]);
      updateTellerName(response.data.result.name);
    }

    getData();
  }, []);

  const handleStatusChange = () => {
    setIsEditing(!isEditing);
  };

  const handleStatusSelect = (status: string, color: string) => {
    setSelectedStatus(status);
    setSelectedColor(color);
  };

  const handleStatusConfirm = () => {
    if (selectedStatus === "" || selectedStatus === currentStatus) return;
    let value = "";
    if (selectedStatus === "상담가능") {
      value = "AVAILABLE";
    } else if (selectedStatus === "다른 업무중") {
      value = "BUSY";
    } else if (selectedStatus === "상담 불가") {
      value = "UNAVAILABLE";
    }
    patchTellerStatus(value);
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
                <p className="text-3xl font-semibold">{name}</p>
                <p className="text-xl text-gray1">{position}</p>
              </div>
            </div>

            {/* 상태 변경 모드가 아닐 때만 표시 */}
            {!isEditing && (
              <>
                <p className="text-hwachang-black text-lg">{type}</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentColor}`}></div>
                  <p className="text-hwachang-black text-lg">{currentStatus}</p>
                </div>
              </>
            )}

            {/* 상태 변경 모드일 때 */}
            {isEditing && (
              <div className="flex flex-col items-center space-y-2">
                {statusOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleStatusSelect(item.name, item.color)}
                    className={`flex items-center justify-center w-full px-4 rounded-lg ${selectedStatus === item.name ? "font-bold" : "font-normal"
                      }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></div>
                    <span>{item.name}</span>
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
