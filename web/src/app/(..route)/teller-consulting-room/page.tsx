"use client";

import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Card } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainView } from "./components/main-view";
import { AiOutlineAudio } from "react-icons/ai";
import {
  IoShareSocialOutline,
  IoSettingsOutline,
  IoVideocamOutline
} from "react-icons/io5";
import {
  SlArrowDown,
  SlArrowUp,
  SlArrowLeft,
  SlArrowRight
} from "react-icons/sl";
import { MdChangeCircle } from "react-icons/md";

export default function Home() {
  const params = useSearchParams();
  const [key, setKey] = useState<string | null>("true");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setKey(params.get("isWait") as string);
  }, [params]);

  const buttonStatus = key === "true" ? "대기중" : "상담 종료";

  return (
    <main className="h-full">
      {key === "true" ? (
        <div className="grid grid-row-1 gap-1 p-10">
          <p className={`mb-6 text-4xl font-semibold text-hwachang-green1`}>
            상담 준비중
          </p>
          <div className="flex justify-between space-x-2">
            <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
              손님을 기다리고 있습니다...
            </p>
          </div>
          <MainView isTop={false} />
          <div className="flex justify-center space-x-4 mt-4">
            <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><AiOutlineAudio color="black" size={20} /></div></AchromaticButton>
            <AchromaticButton className="rounded-full  bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoVideocamOutline color="black" size={20} /></div></AchromaticButton>
            <AchromaticButton className="rounded-full bg-hwachang-mute text-white"><div className="p-2">{buttonStatus}</div></AchromaticButton>
            <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoShareSocialOutline color="black" size={20} /></div></AchromaticButton>
            <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoSettingsOutline color="black" size={20} /></div></AchromaticButton>
          </div>
        </div>
      ) : (
        <div
          className={`${isChanged ? "grid grid-rows-[3fr_7fr]" : "grid grid-cols-[3fr_7fr]"} gap-6 h-full`}
        >
          <Card className={`${isChanged ? "grid-rows-1" : "grid-cols-1"} grid p-5 rounded-none bg-hwachang-gray7`}>
            <div className={`${isChanged ? "w-[20%]" : "w-[80%]"} bg-hwachang-darkgreen text-white text-center text-sm rounded-sm font-extralight h-6`}>
              함께 참여하고 있는 고객
            </div>

            {!isChanged && (
              <div className="flex justify-center items-center my-2">
                <SlArrowUp size={24} className="text-gray-500" />
              </div>
            )}

            <div className="flex justify-between items-center">
              {isChanged && (
                <div className="flex justify-center items-center mr-4">
                  <SlArrowLeft size={24} className="text-gray-500" />
                </div>
              )}

              <div className={`${isChanged ? "grid grid-cols-3" : "grid grid-cols-1"} gap-10 w-full h-full`}>
                <MainView isTop={true} />
                <MainView isTop={true} />
                <MainView isTop={true} />
              </div>

              {isChanged && (
                <div className="flex justify-center items-center ml-4">
                  <SlArrowRight size={24} className="text-gray-500" />
                </div>
              )}
            </div>

            {!isChanged && (
              <div className="flex justify-center items-center my-2">
                <SlArrowDown size={24} className="text-gray-500" />
              </div>
            )}
          </Card>

          <Card className={`${isChanged ? "grid grid-rows-1" : "grid grid-rows-2"} gap-4 p-5 h-full border-white rounded-none shadow-none`}
          >
            {isChanged ?
              <>
                <MainView isTop={true} />
              </> :
              <>
                <MainView isTop={true} />
                <MainView isTop={true} />
              </>
            }
            <div className="flex justify-center space-x-4 mt-4">
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><AiOutlineAudio color="black" size={20} /></div></AchromaticButton>
              <AchromaticButton className="rounded-full  bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoVideocamOutline color="black" size={20} /></div></AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-mute text-white"><div className="p-2">{buttonStatus}</div></AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoShareSocialOutline color="black" size={20} /></div></AchromaticButton>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"><div className="p-2"><IoSettingsOutline color="black" size={20} /></div></AchromaticButton>
              <button
                onClick={() => setIsChanged((prev) => !prev)}
              >
                <MdChangeCircle size="40" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </main >
  );
}