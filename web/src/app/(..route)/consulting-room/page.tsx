"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { GestureXEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { AiOutlineAudio } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import {
  IoRefresh,
  IoShareSocialOutline,
  IoSettingsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import Xemoji from "@/app/utils/public/Xemoji.svg";
import { MainView } from "./components/main-view";
import { ApplicationForm } from "./components/application-form";
import { MatchingAlarm } from "@/app/ui/consulting-room/matching-alarm";
import Webcam from "./components/webcam";

export default function Home() {
  const params = useSearchParams();
  const [key, setKey] = useState<string | null>("true");
  const [isDialogMounted, setIsDialogMounted] = useState(false);

  const [isForm, setIsForm] = useState<boolean>(false);

  useEffect(() => {
    setKey(params.get("isWait") as string);
    setIsDialogMounted(true);
  }, [params]);

  const buttonStatus = key === "true" ? "대기중" : "상담 종료";

  return (
    <main>
      {key == "true" ? (
        <div className="grid grid-row-1 gap-1">
          <p className={`mb-6 text-4xl text-hwachang-green1`}>
            <strong>상담 대기실</strong>
          </p>
          <div className="flex justify-between space-x-2">
            <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
              상담사를 기다리는 중입니다...
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
                  대기현황 보기
                </AchromaticButton>
              </DialogTrigger>
              {isDialogMounted && (
                <DialogContent>
                  <div className="flex flex-col items-center">
                    <div className="w-full flex justify-end">
                      <Image src={Xemoji} alt="xemoji" width={20} height={20} />
                    </div>
                    <div className="flex justify-center p-10">
                      <GestureXEmoji width={200} heignt={200} />
                    </div>
                    <p className="text-center text-lg font-semibold">현재 접속량이 많아</p>
                    <p className="text-center text-lg font-semibold text-green-600">
                      상담 대기 중입니다.
                    </p>
                    <p className="text-center text-sm text-gray-500 pt-3">조금만 기다려 주세요.</p>
                    <div className="w-full mt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-lg font-medium">대기 인원</p>
                        <IoRefresh className="mt-1" width={16} height={16} color="gray" />
                        <p className="text-lg font-semibold">154,721명</p>
                      </div>
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                        <HiInformationCircle className="mr-1" width={16} height={16} color="gray" />
                        <p className="pt-5">
                          화상 상담 전 채팅을 통해 상담할 내용을 적어주시면
                          <br /> 빠른 상담이 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
          {/* 웹캠 */}
          <Webcam />
          {/* <MainView isTop={false} /> */}
          <Dialog>
            <DialogTrigger asChild>
              <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
                (삭제 예정) 매칭 알림
              </AchromaticButton>
            </DialogTrigger>
            <DialogContent>
              <MatchingAlarm />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Card className="grid gap-6 grid-cols-3 text-center px-3 py-3 h-52">
            <MainView isTop={true} />
            <MainView isTop={true} />
            <MainView isTop={true} />
          </Card>
          <AchromaticButton
            onClick={() => {
              setIsForm(true);
            }}
          >
            mock form
          </AchromaticButton>
          <AchromaticButton
            onClick={() => {
              setIsForm(false);
            }}
          >
            mock view
          </AchromaticButton>
          <div className="pt-4">{isForm ? <ApplicationForm /> : <MainView />}</div>
        </div>
      )}
      {/* <div className="flex justify-center space-x-4 mt-4">
        <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3">
          <div className="p-2">
            <AiOutlineAudio color="black" size={20} />
          </div>
        </AchromaticButton>
        <AchromaticButton className="rounded-full  bg-hwachang-gray2 hover:bg-hwachang-gray3">
          <div className="p-2">
            <IoVideocamOutline color="black" size={20} />
          </div>
        </AchromaticButton>
        <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">
          <div className="p-2">{buttonStatus}</div>
        </AchromaticButton>
        <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3">
          <div className="p-2">
            <IoShareSocialOutline color="black" size={20} />
          </div>
        </AchromaticButton>
        <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3">
          <div className="p-2">
            <IoSettingsOutline color="black" size={20} />
          </div>
        </AchromaticButton>
      </div> */}
    </main>
  );
}
