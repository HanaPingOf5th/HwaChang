'use client';
import { useState } from "react";

export function DateSelector() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      alert("시작 날짜는 종료 날짜보다 앞서야 합니다.");
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      alert("종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
    } else {
      setEndDate(newEndDate);
    }
  };

  const dateInputStyles = "w-full h-6.5 bg-slate-100 rounded-full border-none outline-none text-center px-4 text-sm";

  return (
    <div className='flex mb-4 items-center'>
      <span className="w-12 h-6 text-xl text-hwachang-hwachanggray">기간</span>
      <div className="flex justify-start w-1/2 space-x-2">
        <div>
          <input type="date" value={startDate} onChange={handleStartDateChange} className={dateInputStyles} />
          <button className="absolute top-0 right-0 h-full px-2 flex items-center justify-center" />
        </div>
        <span className="font-semibold text-xl text-gray-600">~</span>
        <div>
          <input type="date" value={endDate} onChange={handleEndDateChange} className={dateInputStyles} />
          <button className="absolute top-0 right-0 h-full px-2 flex items-center justify-center"/>
        </div>
      </div>
    </div>
  );
}
