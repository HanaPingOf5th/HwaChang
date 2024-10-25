"use client";
import React, { useState } from "react";
import Arrow from "@/app/utils/public/Arrow.png";
import Select from "@/app/utils/public/Select.png";
import Image from "next/image";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

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

  function formAction(prevState: FormState, formData: FormData): FormState {
    const value = formData.get("search");
    if (value === "fail") {
      return {
        isSuccess: false,
        isFailure: true,
        message: "의도된 실패입니다.",
        validationError: {},
      };
    } else {
      console.log(value);
      return {
        isSuccess: true,
        isFailure: false,
        message: "",
        validationError: {},
      };
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 검색 입력창 */}

      {/* <Form id={"form"} action={formAction} onSuccess={() => {}} failMessageControl={"alert"}>
        <div className="space-x-2">
          <div>
            <FormTextInput
              // label={"나의 화창 검색"}
              id={"search"}
              placeholder={"화창 기록을 검색해보세요."}
              required={false} // 필수 입력 설정이 필요한 경우
            />
          </div>
          <div>
            <FormSubmitButton label={""} className="bg-white hover:bg-slate-50" />
          </div>
        </div>
      </Form> */}

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
          <div style={{ flex: 0.2 }}>유형</div>
          <div style={{ flex: 1 }}>카테고리</div>
          <div style={{ flex: 1 }}>화창 날짜</div>
          <div style={{ flex: 0.2 }}></div>
        </div>

        {/* 상담 기록 항목 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
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

                {/* 주제, 담당자, 기업/개인, 카테고리, 날짜 간격 조정 */}
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
                  주제주제주제주제주제
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
                  김동은
                </div>
                <div
                  style={{
                    ...getTypeStyles("기업"),
                    flex: 0.2,
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "150%",
                    textAlign: "center",
                  }}
                >
                  기업
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
                  예금 관리
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
                  2024년 10월 22일
                </div>
                {/* Arrow 버튼 추가 */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "20px",
                    marginRight: "10px",
                  }}
                  onClick={() => console.log("Arrow button clicked!")} // 버튼 클릭 시 이벤트
                >
                  <Image src={Arrow} alt="Arrow icon" width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
