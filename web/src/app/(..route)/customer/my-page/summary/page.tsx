"use client";
import { useState } from "react";
import { MdSummarize } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { TbRewindForward5 } from "react-icons/tb";
import { TbRewindBackward5 } from "react-icons/tb";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/component/molecule/card/card";
import { MyChat, OtherChat } from "@/app/ui/consulting-room/chat-box";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { ConsultingRecord } from "../mock-records";
import { AISummaryData, SummaryData } from "./mock-summary";
import FormSelect from "@/app/ui/component/molecule/form/form-select-index";
import { FormSelectItem } from "@/app/ui/component/molecule/form/form-select-item";
import { Tag } from "@/app/ui/component/atom/Tag";

interface SSTContent{
  speaker: string;
  text: string;
  time: string;
}
interface SttSummary {
  id: number;
  title: string;
  speakers: string[];
  contents: SSTContent[];
  date: string;
  mainTopics: string[];
}
// Todo : 네이버 클로바 노트 api 응답값에 따라 변동 가능
interface AISummary {
  id: number;
  title: string;
  contents: string[];
  date: string;
  mainTopics: string[];
}

export default function SummaryPage({ record }: {record:ConsultingRecord}) {
  // 발화자 선택 관련 상태
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("전체");

  // 오디오 관련 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalDuration = 30 * 60;

  // 요약 데이터 관련 상태: 전달받은 record props 객체에 있는 id로 api fetching
  const [sttSummaries] = useState<SttSummary | null>(SummaryData);
  const [aiSummaries] = useState<AISummary | null>(AISummaryData);

  const filterStyles = (type: '기업'|'개인') => {
    const className = `flex flex-row justify-center items-center p-1 gap-2.5 w-[50px] h-[31px] ${type === '개인' ? 'bg-[#CADCFF] text-[#2C71F6]' : 'bg-[#FFCACA] text-[#F62C2C]'} rounded-sm`;
    return className;
  };

  // const handleTextClick = (index: number) => {
  //   console.log(`텍스트 ${index + 1} 클릭됨. 음성 재생.`);
  // };

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  // };

  const renderChat = (chat: { speaker: string; text: string }) => {
    if (chat.speaker === selectedSpeaker) {
      return <MyChat chat={chat.text} />;
    } else {
      return <OtherChat name={chat.speaker} chat={chat.text} />;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const clickX = e.clientX - rect.left;
  //   const newProgress = Math.floor((clickX / rect.width) * totalDuration);
  //   setProgress(newProgress);
  // };

  if (!record) return null;

  return (
    <main>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">상담 요약 페이지</h1>

      <div className="mt-6">
        <div className="grid gap-4 text-lg text-gray-500 font-pretendard">
          <div className="flex items-center">
            <span className="w-40">유형:</span>
            <span className={filterStyles(record.cartegoryType)}>{record.cartegoryType}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">카테고리:</span>
            <span className="text-black">{record.cartegory}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">담당자:</span>
            <span className="text-black">{record.consultant}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">화창 날짜:</span>
            <span className="text-black">{record.date}</span>
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
              {sttSummaries?.speakers.map((value, index)=>{
                return(
                  <FormSelectItem key={index} value={value} placeholder={value} onSelect={()=>setSelectedSpeaker(value)}/>
              )
              })}
            </FormSelect>
          </div>
        </CardContent>

        <CardContent>
          <div className="bg-gray-50 p-2 rounded-lg">
            {(sttSummaries as SttSummary) ? (
              (sttSummaries as SttSummary).contents.map((value, index) => (
                <div
                  key={index}
                  className="mb-4 cursor-pointer"
                  // onClick={() => handleTextClick(index)}
                >
                  {renderChat(value)}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">아직 상담 기록이 없습니다.</p>
            )}
          </div>

          {/* 플레이어 바 */}
          <div className="mt-4">
            {/* 진행상태 바 */}
            <div
              className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              // onClick={handleBarClick}
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${(progress / totalDuration) * 100}%`,
                  background: "linear-gradient(90deg, #38b2ac, #319795)",
                }}
              />
            </div>

            {/* 진행시간 */}
            <div className="flex justify-between text-sm mt-2 text-white">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>

            {/* 플레이버튼 */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <TbRewindBackward5
                className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
                title="Rewind 5s"
              />
              {isPlaying ? (
                <IoMdPause
                  // onClick={handlePlayPause}
                  className="cursor-pointer text-4xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
                  title="Pause"
                />
              ) : (
                <IoPlay
                  // onClick={handlePlayPause}
                  className="cursor-pointer text-4xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
                  title="Play"
                />
              )}
              <TbRewindForward5
                className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
                title="Forward 5s"
              />
            </div>
          </div>
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
          <div className="grid grid-cols-7">
          {
            (aiSummaries as AISummary).mainTopics.map((topic, index)=>{
              return(
                <div key={index}>
                  <Tag content={topic}/>
                </div>
              )
            })
          }
          </div>
        </CardContent>

        <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
          <CardTitle className="text-xl font-semibold mb-4">요약</CardTitle>
          {(aiSummaries as AISummary).contents.map((value, index)=>{
            return(
              <div key={index}>
                {value}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </main>
  );
}
