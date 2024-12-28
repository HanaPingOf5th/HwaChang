"use client";
import React from "react";
import HistoryCard from "./history-card";
import { useState,useEffect } from "react";
import { getConsultingList,ConsultingList } from "@/app/business/consulting-room/customer-consulting.service";

interface CustomerProps {
  customerId: string
}

export default function ConsultationHistory({ customerId }: CustomerProps) {
  const [historyData, setHistoryData] = useState<ConsultingList[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if(customerId===null) return;
    console.log("고객 id", customerId)
    getConsultingList(customerId).then((response) => {
      const consultingListData = response.data as ConsultingList[];
      setHistoryData(consultingListData);
      setName(consultingListData[0].customerName);
    })
  }, [customerId]);

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