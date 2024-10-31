"use client";
import React from "react";
import HistoryCard from "./history-card";
import FormSelect from "../component/molecule/form/form-select-index";
import { FormSelectItem } from "../component/molecule/form/form-select-item";

interface CustomerProps {
  name: string;
}

export default function ConsultationHistory({ name }: CustomerProps) {
  const historyData = [
    {
      title: "신용대출, 사회초년생 상품",
      category: "대출",
      date: "2024. 10. 22. 16:42",
      content: "사회초년생을 위한 대출 상품 설명, 이자율 및 상환 방법 안내, 신용등급 영향 설명, 필요 서류 제공"
    },
    {
      title: "각 펀드의 위험도와 예상 수익률 안내",
      category: "펀드/신탁",
      date: "2024. 10. 22. 16:43",
      content: "사회초년생을 위한 대출 상품 설명, 이자율 및 상환 방법 안내, 신용등급 영향 설명, 필요 서류 제공"
    },
    {
      title: "집에 갈 시간",
      category: "우리팀짱",
      date: "2024. 10. 22. 17:50",
      content: "너무 졸리고 배고플 땐 어떻게 해야될지 상담을 나누었음"
    },
  ];

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