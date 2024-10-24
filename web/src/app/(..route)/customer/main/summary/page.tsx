"use client";
import { useState } from "react";
import { MdSummarize } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { TbRewindForward5 } from "react-icons/tb";
import { TbRewindBackward5 } from "react-icons/tb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/ui/component/molecule/card/card"; // Importing Card components
import { MyChat, OtherChat } from "@/app/ui/consulting-room/chat-box";

interface SttSummary {
  id: number;
  title: string;
  content: { speaker: string; text: string; time: string }[];
  date: string;
  mainTopics: string[];
}

interface AiSummary {
  id: number;
  title: string;
  content: string[];
  date: string;
  mainTopics: string[];
}

export default function SummaryPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("전체");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalDuration = 30 * 60; // 총 30분을 초 단위로 설정

  const [sttSummaries] = useState<SttSummary[]>([
    {
      id: 1,
      title: "상담 기록 예시",
      content: [
        { speaker: "발화자1", text: "예금에 대해 알고 싶어요.", time: "00:01" },
        {
          speaker: "발화자2",
          text: "안녕하십니까 고객님. 예금은 크게 '자유입출금식예금'과 '정기예금'으로 나뉩니다.",
          time: "00:05",
        },
        {
          speaker: "발화자1",
          text: "감사합니다. 대출 상품도 설명해주세요.",
          time: "00:10",
        },
        {
          speaker: "발화자2",
          text: "대출 상품은 금융시장의 핵심 상품 중 하나로 볼 수 있습니다.",
          time: "00:15",
        },
      ],
      date: "2024-10-23",
      mainTopics: ["예금", "적금"],
    },
  ]);

  const [aiSummaries] = useState<AiSummary[]>([
    {
      id: 1,
      title: "예금 및 적금 상담 요약",
      content: [
        "고객1은 예금 상품에 대한 정보를 요청하였고, 상담사는 자유입출금식예금과 정기예금을 설명하였습니다.",
        "상담사는 대출 상품의 역할에 대해서도 설명하였습니다.",
      ],
      date: "2024-10-23",
      mainTopics: ["예금", "적금"],
    },
  ]);

  const handleTextClick = (index: number) => {
    console.log(`텍스트 ${index + 1} 클릭됨. 음성 재생.`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 발화자 필터링 로직
  const filteredConversations = (line: { speaker: string }) => {
    if (selectedSpeaker === "전체") return true;
    return line.speaker === selectedSpeaker;
  };

  const renderChat = (line: { speaker: string; text: string }) => {
    // 선택한 발화자는 MyChat으로 렌더링하고, 나머지는 OtherChat으로 렌더링
    if (line.speaker === selectedSpeaker) {
      return <MyChat chat={line.text} />;
    } else {
      return <OtherChat name={line.speaker} chat={line.text} />;
    }
  };

  const getBackgroundColor = (speaker: string) => {
    if (speaker === "발화자1") return "bg-blue-200";
    if (speaker === "발화자2") return "bg-green-200";
    return "bg-gray-200";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.floor((clickX / rect.width) * totalDuration);
    setProgress(newProgress);
  };

  return (
    <main>
      <div className="flex items-center justify-start">
        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 cursor-pointer">
          ←
        </button>
        <span className="ml-4 text-lg text-gray-700">
          {sttSummaries[0]?.date}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mt-4">
        상담 요약 페이지
      </h1>

      <div className="grid gap-6 grid-cols-2">
        {/* STT 상담 원문 */}
        <Card className="bg-[#62D2A2]">
          <CardHeader className="flex justify-between">
            <CardTitle className="flex items-center text-white text-2xl">
              <IoDocumentTextSharp className="mr-2" size={28} /> 상담 원문
            </CardTitle>

            <select
              className="ml-auto p-2 w-36 border border-teal-600 text-center rounded-md text-gray-800 focus:outline-none"
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
            >
              <option value="전체">발화자 설정</option>
              <option value="발화자1">발화자1</option>
              <option value="발화자2">발화자2</option>
            </select>
          </CardHeader>

          <CardContent>
            <div className="bg-gray-50 p-2 rounded-lg">
              {sttSummaries.length > 0 ? (
                sttSummaries[0].content.map((line, index) => (
                  <div
                    key={index}
                    className="mb-4 cursor-pointer"
                    onClick={() => handleTextClick(index)}
                  >
                    {renderChat(line)}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  아직 상담 기록이 없습니다.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI 요약 내용 */}
        <Card className="bg-[#62D2A2]">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-2xl">
              <MdSummarize className="mr-2" size={28} /> 상담 요약 내용
            </CardTitle>
          </CardHeader>

          {aiSummaries.length > 0 ? (
            aiSummaries.map((summary) => (
              <div key={summary.id} className="space-y-4">
                <CardContent>
                  <Card className="bg-white p-3 rounded-lg shadow-md">
                    <CardTitle>주요 주제</CardTitle>
                    <ul className="list-disc list-inside">
                      {summary.mainTopics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </Card>
                </CardContent>

                <CardContent>
                  <Card className="bg-white p-3 rounded-lg shadow-md">
                    <CardTitle>요약</CardTitle>
                    <ul className="list-disc list-inside">
                      {summary.content.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Card>
                </CardContent>
              </div>
            ))
          ) : (
            <CardContent>
              <p className="text-center text-gray-500">
                아직 상담 요약이 없습니다.
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      {/* 페이지 하단에 재생/일시정지, 앞으로 가기, 뒤로 가기 버튼 및 진행 바 */}
      <div className="fixed bottom-0 left-64 right-0 bg-teal-600 text-white p-4 shadow-lg">
        {/* Updated progress bar */}
        <div
          className="relative w-full h-2 bg-gray-400 rounded-full overflow-hidden cursor-pointer"
          onClick={handleBarClick}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${(progress / totalDuration) * 100}%`,
              background: "linear-gradient(90deg, #38b2ac, #319795)",
            }}
          />
        </div>

        {/* Time indicators */}
        <div className="flex justify-between text-sm mt-2">
          <span>00:00</span>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>

        {/* Player control buttons */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <TbRewindBackward5
            className="cursor-pointer text-3xl hover:text-teal-300 transition-all transform hover:scale-110"
            title="Rewind 5s"
          />
          {isPlaying ? (
            <IoMdPause
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl hover:text-teal-300 transition-all transform hover:scale-110"
              title="Pause"
            />
          ) : (
            <IoPlay
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl hover:text-teal-300 transition-all transform hover:scale-110"
              title="Play"
            />
          )}
          <TbRewindForward5
            className="cursor-pointer text-3xl hover:text-teal-300 transition-all transform hover:scale-110"
            title="Forward 5s"
          />
        </div>
      </div>
    </main>
  );
}
