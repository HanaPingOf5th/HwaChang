"use client";
import React from "react";
import HistoryCard from "./history-card";
import { useState,useEffect } from "react";
import { getConsultingList,ConsultingList } from "@/app/business/consulting-room/customer-consulting.service";

interface CustomerProps {
  name: string;
}

export default function ConsultationHistory({ name }: CustomerProps) {
  const [historyData, setHistoryData] = useState<ConsultingList[]>([]);

  useEffect(() => {
    getConsultingList("92d4abdc-196b-4ecb-aae7-78ffe86237d1").then((response) => {
      const consultingListData = response.data as ConsultingList[];
      setHistoryData(consultingListData);
    })
  }, []);

  return (
    <div className="p-5 space-y-4">
      {/* 고객 정보 */}
      <div className="items-center">
        <div className="flex items-center space-x-1">
          <p className="font-semibold text-xl">{name}</p>
          <p className="font-semibold text-sm">고객님</p>
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="space-y-3">
        {historyData.map((history, index) => (
          <HistoryCard
            key={index}
            cardItem={history}
          />
        ))}
      </div>
    </div>
  );
}