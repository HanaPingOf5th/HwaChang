"use client";

import React, { useState } from "react";
import SummaryPage from "./summary/page";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { DateSelector } from "./components/date-selector";
import { Card, CardContent } from "@/app/ui/component/molecule/card/card";
import { ConsultingRecord, records } from "./mock-records";

export default function Home() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState< ConsultingRecord | null>(null);

  const handleOpenSummary = (record: ConsultingRecord) => {
    setSelectedRecord(record);
    setIsSummaryVisible(true);
  };

  const handleCloseSummary = () => {
    setIsSummaryVisible(false);
    setIsFullScreen(false);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev); //전체화면 토글
  };

  const RecordCards = records.map((value, index)=>{
    return (
      <main key={index}>
      <Card className="grid grid-cols-7 gap-3">
        <CardContent className="py-5">image</CardContent>
        <CardContent className="py-5">{value.title}</CardContent>
        <CardContent className="py-5">{value.consultant}</CardContent>
        <CardContent className="py-5">{value.cartegoryType}</CardContent>
        <CardContent className="py-5">{value.cartegory}</CardContent>
        <CardContent className="py-5">{value.date}</CardContent>
        <CardContent className="py-5"><button onClick={() => handleOpenSummary(value)}>{'->'}</button></CardContent>
      </Card>
      </main>
    )
  })

  function searchAction(prevState: FormState, formData:FormData){
    const value = formData.get('search')
    console.log(value,'가 검색되었습니다.')
    return{
      isSuccess: true,
      isFailure: false,
      message: '',
      validationError: {}
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <Form id={"search-form"} action={searchAction} failMessageControl={"alert"}>
          <div className="grid grid-cols-[5fr_1fr] items-center gap-2">
            <FormTextInput id={"search"} placeholder={"화창 기록을 검색해보세요"} className="rounded-full bg-slate-100"/>
            <FormSubmitButton label={"검색"}/>
          </div>
        </Form>
      </div>  
      <DateSelector/>

      <div style={{ fontSize: "30px", fontWeight: "Bold" }}>화창기록</div>
      <div className="grid grid-rows-1 gap-3 text-hwachang-hwachanggray text-lg text-center">
        <Card className="grid grid-cols-7 gap-3 shadow-none border-white">
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
                      overflow-y-auto pt-10 ${isFullScreen ? "p-10" : "py-7 px-8"}`}
        >
          <div
            className={`fixed top-0 right-0 ${isFullScreen ? "w-screen" : "w-1/2"}
                        bg-white p-2 flex justify-start gap-2 z-60`}
          >
            <button
              onClick={handleCloseSummary}
              className="p-1 border-none bg-transparent cursor-pointer text-sm"
            >
              &gt;&gt;
            </button>
            <button
              onClick={handleToggleFullScreen}
              className="p-1 border-none bg-transparent cursor-pointer text-sm"
            >
              &lt;&gt;
            </button>
          </div>
          <SummaryPage record={selectedRecord} />
        </div>
      )}
      </div>
    </div>
  );
}
