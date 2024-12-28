"use client";
import { useState } from "react";
import { MdSummarize } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/component/molecule/card/card";
import { MyChat, OtherChat } from "@/app/ui/consulting-room/chat-box";
import FormSelect from "@/app/ui/component/molecule/form/form-select-index";
import { FormSelectItem } from "@/app/ui/component/molecule/form/form-select-item";
import { Tag } from "@/app/ui/component/atom/tag/name-tag";
import { AudioPlayer } from "./audio-player";

interface ConsultingDetail {
  summary: string;
  originalText: {
    speaker: string;
    startTime: string;
    endTime: string;
    text: string;
  }[];
  tellerName: string;
  type: string;
  category: string;
  date: string;
  voiceUrl: string;
}

interface SummaryProps {
  detail: ConsultingDetail;
  onClose: () => void;
  onExpand: () => void;
}

export default function Summary({ detail }: SummaryProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("전체");

  const filterStyles = (type: string) => {
    const className = `flex flex-row justify-center items-center p-1 gap-2.5 w-[50px] h-[31px] ${type === "개인" ? "bg-[#CADCFF] text-[#2C71F6]" : type === "기업" ? "bg-[#FFCACA] text-[#F62C2C]" : ""} rounded-sm`;
    return className;
  };

  const renderChat = (chat: { speaker: string; text: string; startTime: string }) => {
    return chat.speaker === selectedSpeaker ? (
      // 오른쪽에 표시되는 채팅 (MyChat)
      <div className="flex justify-end items-center gap-2">
        <p className="text-sm text-gray-500">{chat.startTime}</p>
        <MyChat chat={chat.text} />
      </div>
    ) : (
      // 왼쪽에 표시되는 채팅 (OtherChat)
      <div className="flex justify-start items-center gap-2">
        <OtherChat name={chat.speaker} chat={chat.text} />
        <p className="text-sm text-gray-500 mt-5">{chat.startTime}</p>
      </div>
    );
  };

  // 날짜 포맷 변환
  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split("T")[0]; // "2024-12-19" 형식으로 변환
  };

  const mainTopic =
    detail.summary.split("주요주제 :")[1]?.split("-")[0]?.trim() || "주요 주제 없음";
  const summaryLines = detail.summary
    .split("-")
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <main>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">상담 요약 페이지</h1>
      <div className="mt-6">
        <div className="grid gap-4 text-lg text-gray-500 font-pretendard">
          <div className="flex items-center">
            <span className="w-40">유형:</span>
            <span className={filterStyles(detail.type === "PERSONAL" ? "개인" : "기업")}>
              {detail.type === "PERSONAL" ? "개인" : "기업"}
            </span>{" "}
          </div>
          <div className="flex items-center">
            <span className="w-40">카테고리:</span>
            <span className="text-black">{detail.category}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">담당자:</span>
            <span className="text-black">{detail.tellerName}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">화창 날짜:</span>
            <span className="text-black">{formatDate(detail.date)}</span>
          </div>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      <Card className="bg-hwachang-green">
        <CardHeader className="flex justify-between">
          <CardTitle className="flex items-center text-white text-2xl">
            <IoDocumentTextSharp className="mr-2" size={28} /> 상담 원문
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-end">
          <div className="w-1/4">
            <FormSelect placeholder={"발화자 선택"}>
              <FormSelectItem
                value="전체"
                placeholder="전체"
                onSelect={() => setSelectedSpeaker("전체")}
              />
              {Array.from(new Set(detail.originalText.map((text) => text.speaker))).map(
                (speaker, index) => (
                  <FormSelectItem
                    key={index}
                    value={speaker}
                    placeholder={speaker}
                    onSelect={() => setSelectedSpeaker(speaker)}
                  />
                ),
              )}
            </FormSelect>
          </div>
        </CardContent>

        <CardContent>
          <div className="bg-gray-50 p-2 rounded-lg">
            {detail.originalText.length > 0 ? (
              detail.originalText.map((text, index) => (
                <div key={index} className="mb-4">
                  {renderChat(text)}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">아직 상담 기록이 없습니다.</p>
            )}
          </div>
        </CardContent>
        <CardContent>
          <AudioPlayer voiceUrl={detail.voiceUrl} />
        </CardContent>
      </Card>

      <hr className="my-6 border-t-2 border-gray-300" />

      <Card className="bg-hwachang-green mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-white text-2xl">
            <MdSummarize className="mr-2" size={28} /> 상담 요약 내용
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
          <CardTitle className="text-xl font-semibold mb-4">주요 주제</CardTitle>
          <Tag content={mainTopic} />
        </CardContent>

        <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
          <CardTitle className="text-xl font-semibold mb-4">요약</CardTitle>
          <div className="textlg text-gray-800">
            {summaryLines.map((line, index) => (
              <p key={index}>· {line}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
