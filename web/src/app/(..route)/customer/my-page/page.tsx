"use client";

import React, { useState } from "react";
import Arrow from "@/app/utils/public/Arrow.png";
import Select from "@/app/utils/public/Select.png";
import Image from "next/image";
import SummaryPage from "./summary/page";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  //상담 기록 데이터
  const records = [
    {
      id: 1,
      title: "주제주제주제주제주제",
      담당자: "김동은",
      유형: "기업",
      카테고리: "예금 관리",
      날짜: "2024년 10월 22일",
    },
    {
      id: 2,
      title: "다른 주제1",
      담당자: "임수진",
      유형: "개인",
      카테고리: "대출 상담",
      날짜: "2024년 10월 23일",
    },
    {
      id: 3,
      title: "다른 주제2",
      담당자: "김인영",
      유형: "기업",
      카테고리: "방카슈랑스",
      날짜: "2024년 10월 23일",
    },
    {
      id: 4,
      title: "다른 주제3",
      담당자: "유유정",
      유형: "개인",
      카테고리: "이체",
      날짜: "2024년 10월 24일",
    },
  ];

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsSummaryVisible(true); // SummaryPage 열기
  };

  const handleArrowClick = () => {
    setIsSummaryVisible(!isSummaryVisible); //버튼 클릭 시 슬라이드 패널 보임/숨김 토글
  };

  const handleCloseClick = () => {
    setIsSummaryVisible(false); // SummaryPage 닫기
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev); //전체화면 토글
  };

  const getTypeStyles = (type: string) => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "hidden", // 슬라이드 밖의 스크롤 방지
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: "653px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="화창 기록을 검색해보세요."
          style={{
            width: "100%",
            height: "45px",
            background: "#F2F2F7",
            borderRadius: "50px",
            border: "none",
            padding: "0 45px 0 20px",
            outline: "none",
          }}
        />
        {/* Select 버튼 추가 */}
        <button
          onClick={() => alert("Select 버튼 클릭됨")}
          style={{
            position: "absolute",
            top: "50%",
            right: "15px",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            padding: "0",
            cursor: "pointer",
          }}
        >
          <Image
            src={Select}
            alt="Select icon"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </div>

      {/* 기간 텍스트 및 날짜 입력창 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        {/* 기간 텍스트 */}
        <div
          style={{
            width: "65px",
            height: "28px",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "150%",
            color: "#8E8E8E",
          }}
        >
          기간
        </div>

        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
        >
          {/* 시작 날짜 입력창 및 캘린더 아이콘 */}
          <div style={{ position: "relative", flex: "0 1 200px" }}>
            {" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                background: "#F2F2F7",
                borderRadius: "50px",
                border: "none",
                padding: "0 50px 0 20px",
                outline: "none",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => document.querySelector('input[type="date"]').showPicker()}
            ></button>
          </div>

          <div
            style={{
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "150%",
              color: "#8E8E8E",
              margin: "0 15px",
            }}
          >
            ~
          </div>

          {/* 종료 날짜 입력창 및 캘린더 아이콘 */}
          <div style={{ position: "relative", flex: "0 1 200px" }}>
            {" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                background: "#F2F2F7",
                borderRadius: "50px",
                border: "none",
                paddingLeft: "45px",
                padding: "0 50px 0 20px",
                outline: "none",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => document.querySelector('input[type="date"]').showPicker()}
            ></button>
          </div>
        </div>
      </div>

      <div style={{ fontSize: "30px", fontWeight: "Bold" }}>화창기록</div>

      {/* 상담 기록 영역 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* 컬럼명 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px 0",
            fontWeight: "500",
            fontSize: "18px",
            color: "#8E8E8E",
            textAlign: "center",
            marginBottom: "5px",
          }}
        >
          <div style={{ flex: 0.2 }}></div>
          <div style={{ flex: 2 }}>주제</div>
          <div style={{ flex: 0.7 }}>담당자</div>
          <div style={{ flex: 0.3 }}>유형</div>
          <div style={{ flex: 1 }}>카테고리</div>
          <div style={{ flex: 1 }}>화창 날짜</div>
          <div style={{ flex: 0.2 }}></div>
        </div>

        {/* 상담 기록 항목 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {records.map((record) => (
            <div
              key={record.id}
              style={{
                background: "#F2F2F7",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                width: "100%",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* 각 항목 정보 */}
              <div style={{ display: "flex", gap: "20px", flex: 1, alignItems: "center" }}>
                {/* 이미지 영역 */}
                <div style={{ flex: 0.5, textAlign: "center" }}>
                  <img
                    src="https://i.ytimg.com/vi/zthlkEptCSg/maxresdefault.jpg"
                    alt="기업 이미지"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 2,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    color: "#8E8E8E",
                    textAlign: "center",
                  }}
                >
                  {record.title}
                </div>
                <div
                  style={{
                    flex: 0.7,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    color: "#8E8E8E",
                    textAlign: "center",
                  }}
                >
                  {record.담당자}
                </div>
                <div
                  style={{
                    ...getTypeStyles(record.유형),
                    flex: 0.3,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    textAlign: "center",
                  }}
                >
                  {record.유형}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    color: "#8E8E8E",
                    textAlign: "center",
                  }}
                >
                  {record.카테고리}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    color: "#8E8E8E",
                    textAlign: "center",
                  }}
                >
                  {record.날짜}
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "20px",
                    marginRight: "10px",
                  }}
                  onClick={() => handleRecordClick(record)} // 클릭 시 summary 패널 열기
                >
                  <Image src={Arrow} alt="Arrow icon" width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* SummaryPage 슬라이드 패널 */}
        {isSummaryVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: isFullScreen ? "100vw" : "50vw",
              backgroundColor: "white",
              boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
              transition: "width 0.3s ease",
              zIndex: 1000,
              overflowY: "auto",
              paddingTop: "40px", // 버튼 영역에 맞는 여백 추가
              padding: isFullScreen ? "40px" : "30px 35px",
            }}
          >
            {/* 고정된 상단 버튼 박스 */}
            <div
              style={{
                position: "fixed", // 고정 위치 설정
                top: 0,
                right: 0,
                width: isFullScreen ? "100vw" : "50vw",
                backgroundColor: "white",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                zIndex: 1001, // 본문보다 위로 설정
              }}
            >
              <button
                onClick={handleCloseClick}
                style={{
                  padding: "5px 8px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                &gt;&gt; {/* 닫기 버튼 */}
              </button>
              <button
                onClick={handleToggleFullScreen}
                style={{
                  padding: "5px 8px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                &lt;&gt; {/* 전체 화면 토글 버튼 */}
              </button>
            </div>

            {/* SummaryPage 내용 */}
            <SummaryPage record={selectedRecord} />
          </div>
        )}
      </div>
    </div>
  );
}
