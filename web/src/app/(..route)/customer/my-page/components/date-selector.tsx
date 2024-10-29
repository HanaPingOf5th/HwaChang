'use client'
import { useState } from "react";

export function DateSelector(){
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  // 시작 날짜 설정 함수
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      alert("시작 날짜는 종료 날짜보다 앞서야 합니다.");
    } else {
      setStartDate(newStartDate);
    }
  };

  // 종료 날짜 설정 함수
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      alert("종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <>
    <div className ='flex mb-4 items-center'>
      <div className="w-12 h-6 text-xl text-hwachang-hwachanggray">기간</div>

      <div className="flex items-center justify-center w-full">
          <div>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              style={{
                width: "100%",
                height: "45px",
                background: "#F2F2F7",
                borderRadius: "50px",
                border: "none",
                padding: "0 30px 0 30px",
                outline: "none",
                textAlign: "center",
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
            />
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
          
          <div style={{ position: "relative", flex: "0 1 200px" }}>
            {" "}
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              style={{
                width: "100%",
                height: "45px",
                background: "#F2F2F7",
                borderRadius: "50px",
                border: "none",
                paddingLeft: "45px",
                padding: "0 30px 0 30px",
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
    </>
  )
}