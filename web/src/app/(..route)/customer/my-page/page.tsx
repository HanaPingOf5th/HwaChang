"use client";

import React, { useState, useEffect } from "react";
import Summary from "./components/summary";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { DateSelector } from "./components/date-selector";
import { Card } from "@/app/ui/component/molecule/card/card";
import { ConsultingRecord } from "./mock/mock-records"; // 필요한 타입 가져오기
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { fetchCustomerConsultings } from "../../../business/auth/customer/customer.service"; // 서버 함수 불러오기

export default function Home() {
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // 날짜 상태와 검색값 상태 관리
  const [startDate, setStartDate] = useState<string>(threeMonthsAgo.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(today.toISOString().slice(0, 10));
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState<ConsultingRecord[]>([]);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ConsultingRecord | null>(null);

  const handleOpenSummary = (record: ConsultingRecord) => {
    setSelectedRecord(record);
    setIsSummaryVisible(true);
    console.log(isFullScreen);
    console.log(isSummaryVisible);
  };

  const handleCloseSummary = () => {
    setIsSummaryVisible(false);
    setIsFullScreen(false);
    console.log(isFullScreen);
    console.log(isSummaryVisible);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev); // 전체화면 토글
    console.log(isFullScreen);
    console.log(isSummaryVisible);
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split("T")[0]; // "2024-12-19" 형식으로 변환
  };

  const RecordCards =
    records.length === 0 ? (
      <div className="flex justify-center items-center h-[300px]">
        {" "}
        <p className="text-center text-gray-500">상담 기록이 없습니다.</p>
      </div>
    ) : (
      records.map((value, index) => (
        <main key={index}>
          <Card className="grid grid-cols-7 gap-3 h-20">
            <div className="flex items-center justify-center mb-2 mt-2 text-sm md:text-sm lg:text-xl">
              <Image
                src={value.image as unknown as StaticImport}
                alt="프로필 사진"
                className="object-cover w-10 h-10 rounded-full border-1 border-white shadow-lg"
              />
            </div>
            <div className="flex items-center justify-center text-sm md:text-sm lg:text-xl">
              {value.summary}
            </div>
            <div className="flex items-center justify-center text-sm md:text-sm lg:text-xl">
              {value.tellerName}
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <div
                className={`flex justify-center items-center w-[80px] h-[40px] 
    ${
      value.type === "개인금융"
        ? "bg-[#CADCFF] text-[#2C71F6] rounded-md"
        : value.type === "기업금융"
          ? "bg-[#FFCACA] text-[#F62C2C] rounded-md"
          : ""
    }`}
              >
                {value.type === "개인금융"
                  ? "개인"
                  : value.type === "기업금융"
                    ? "기업"
                    : value.type}
              </div>
            </div>

            <div className="flex items-center justify-center text-sm md:text-sm lg:text-xl">
              {value.category} {/* typo 수정: 'cartegory' -> 'category' */}
            </div>
            <div className="flex items-center justify-center text-sm md:text-sm lg:text-xl">
              {formatDate(value.date)} {/* 날짜 포맷 변환 */}
            </div>
            <div className="flex items-center justify-center text-sm md:text-sm lg:text-xl">
              <button onClick={() => handleOpenSummary(value)}>{"->"}</button>
            </div>
          </Card>
        </main>
      ))
    );

  useEffect(() => {
    const payload = {
      summaryKeyword: searchValue,
      startDate,
      endDate,
    };

    fetchCustomerConsultings(payload).then((response) => {
      console.log(response.data);
      setRecords(response.data as ConsultingRecord[]);
    });
  }, [startDate, endDate, searchValue]);

  const handleSearch = (prevState: FormState, formData: FormData) => {
    const value = formData.get("search") as string;
    setSearchValue(value); // 상태만 업데이트
    return {
      isSuccess: true,
      isFailure: false,
      message: "",
      validationError: {},
    };
  };
  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <Form id={"search-form"} action={handleSearch} failMessageControl={"alert"}>
          <div className="grid grid-cols-[12fr_1fr] gap-2">
            <FormTextInput
              id={"search"}
              placeholder={"화창 기록을 검색해보세요"}
              className="rounded-full bg-slate-100"
            />
            <FormSubmitButton label={"검색"} />
          </div>
        </Form>
      </div>
      <DateSelector
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <div style={{ fontSize: "30px", fontWeight: "Bold" }}>화창기록</div>
      <div className="grid grid-rows-1 gap-3 text-hwachang-hwachanggray text-lg text-center">
        <Card className="grid grid-cols-7 gap-3 shadow-none border-white font-semibold text-sm md:text-sm lg:text-xl">
          <div></div>
          <div>주제</div>
          <div>담당자</div>
          <div>유형</div>
          <div>카테고리</div>
          <div>화창 날짜</div>
          <div></div>
        </Card>
        {RecordCards}
      </div>

      <div className="flex-col w-full mt-5">
        {isSummaryVisible && (
          <div
            className={`fixed top-0 right-0 h-full ${isFullScreen ? "w-screen" : "w-1/2"}
                      bg-white shadow-lg transition-width duration-300 z-50 
                      overflow-y-auto pt-5 ${isFullScreen ? "p-10" : "py-7 px-8"}`}
          >
            <div className="relative">
              <button
                onClick={handleCloseSummary}
                className="p-1 border-none bg-transparent cursor-pointer text-sm"
              >
                &gt;&gt;
              </button>
              <button
                onClick={handleToggleFullScreen}
                className="absolute top-0 right-0 p-1 border-none bg-transparent cursor-pointer text-sm"
              >
                &lt;&gt;
              </button>
            </div>
            <Summary record={selectedRecord as ConsultingRecord} />
          </div>
        )}
      </div>
    </div>
  );
}
