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

interface SttSummary {
  id: number;
  title: string;
  content: { speaker: string; text: string; time: string }[];
  date: string;
  mainTopics: string[];
}

// Todo : 네이버 클로바노트 api의 결과값에 따라 달라지는 부분
interface AiSummary {
  id: number;
  title: string;
  content: string[];
  date: string;
  mainTopics: string[];
}

export default function SummaryPage({ record }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("전체");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [type, setType] = useState<string>("개인"); // 개인일지 기업일지 가져와야함
  const totalDuration = 30 * 60; // 총 30분을 초 단위로 설정

  // my-page와 동일한 유형 스타일을 적용하는 함수
  const getTypeStyles = (type) => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "3px 8px",
      gap: "10px",
      width: "50px",
      height: "31px",
      background: type === "개인" ? "#CADCFF" : "#FFCACA",
      borderRadius: "3px",
      color: type === "개인" ? "#2C71F6" : "#F62C2C",
    };
  };

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

  const [aiSummaries, setAiSummaries] = useState<AiSummary[]>([
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedMainTopics, setEditedMainTopics] = useState<string[]>(aiSummaries[0].mainTopics);
  const [editedContent, setEditedContent] = useState<string[]>(aiSummaries[0].content);

  const handleTextClick = (index: number) => {
    console.log(`텍스트 ${index + 1} 클릭됨. 음성 재생.`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderChat = (line: { speaker: string; text: string }) => {
    // 선택한 발화자는 MyChat으로 렌더링하고, 나머지는 OtherChat으로 렌더링
    if (line.speaker === selectedSpeaker) {
      return <MyChat chat={line.text} />;
    } else {
      return <OtherChat name={line.speaker} chat={line.text} />;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.floor((clickX / rect.width) * totalDuration);
    setProgress(newProgress);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    setAiSummaries([
      {
        ...aiSummaries[0],
        mainTopics: editedMainTopics,
        content: editedContent,
      },
    ]);
    setIsEditing(false);
  };

  if (!record) return null;

  return (
    <main>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">상담 요약 페이지</h1>

      {/* 상담 정보 */}
      <div className="mt-6">
        <div className="grid gap-4 text-lg text-gray-500 font-pretendard">
          <div className="flex items-center">
            <span className="w-40">유형:</span>
            <span style={getTypeStyles(record.유형)}>{record.유형}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">카테고리:</span>{" "}
            <span className="text-black">{record.카테고리}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">담당자:</span>
            <span className="text-black">{record.담당자}</span>
          </div>
          <div className="flex items-center">
            <span className="w-40">화창 날짜:</span>{" "}
            <span className="text-black">{record.날짜}</span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="my-6 border-t-2 border-gray-300" />

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
              <p className="text-center text-gray-500">아직 상담 기록이 없습니다.</p>
            )}
          </div>

          {/* 플레이어 바 */}
          <div className="mt-4">
            {/* 진행상태 바 */}
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

            {/* 진행시간 */}
            <div className="flex justify-between text-sm mt-2">
              <span>00:00</span>
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
                  onClick={handlePlayPause}
                  className="cursor-pointer text-4xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
                  title="Pause"
                />
              ) : (
                <IoPlay
                  onClick={handlePlayPause}
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

      {/* AI 요약 내용 */}
      <Card className="bg-[#62D2A2] mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-white text-2xl">
            <MdSummarize className="mr-2" size={28} /> 상담 요약 내용
          </CardTitle>
        </CardHeader>

        {isEditing ? (
          <>
            <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
              <CardTitle className="text-xl font-semibold mb-4">주요 주제</CardTitle>
              <input
                type="text"
                value={editedMainTopics.join(", ")}
                onChange={(e) =>
                  setEditedMainTopics(e.target.value.split(", ").map((topic) => topic.trim()))
                }
                className="w-full p-2 border rounded"
              />
            </CardContent>

            <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
              <CardTitle className="text-xl font-semibold mb-4">요약</CardTitle>
              <textarea
                value={editedContent.join("\n")}
                onChange={(e) => setEditedContent(e.target.value.split("\n"))}
                className="w-full p-2 border rounded h-24"
              />
            </CardContent>

            <CardContent>
              <AchromaticButton onClick={handleSaveClick}>저장하기</AchromaticButton>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
              <CardTitle className="text-xl font-semibold mb-4">주요 주제</CardTitle>
              <ul className="list-disc list-inside space-y-2">
                {aiSummaries[0].mainTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </CardContent>

            <CardContent className="bg-gray-50 p-2 rounded-lg shadow-md mx-6 mb-6">
              <CardTitle className="text-xl font-semibold mb-4">요약</CardTitle>
              <ul className="list-disc list-inside space-y-2">
                {aiSummaries[0].content.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </CardContent>

            <CardContent>
              <AchromaticButton onClick={handleEditClick}>수정하기</AchromaticButton>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
