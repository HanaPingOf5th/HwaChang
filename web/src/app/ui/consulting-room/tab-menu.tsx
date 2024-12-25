"use client";
import React, { useState } from "react";
import { Card } from "../component/molecule/card/card";
import AchromaticButton from "../component/atom/button/achromatic-button";
import Library from "./library";
import DocumentSearch from "./document-search";
import ConsultationHistory from "./consultation-history";
import { ConsultingType } from "@/app/business/categoty/category.service";

interface TabItem {
  id: number;
  button: string;
  content: JSX.Element;
}

export default function TabMenu({type}:{type: ConsultingType}) {
  const TabData: TabItem[] = [
    { id: 1, button: "과거 상담 기록", content: <ConsultationHistory name="유유정" /> },
    { id: 2, button: "문서 검색", content: <DocumentSearch type={type} /> },
    { id: 3, button: "자료실", content: <Library type={type} /> },
  ];

  const [selectedTab, setSelectedTab] = useState(TabData[0].id);

  return (
    <div className="min-w-[311.6px]">
      <div>
        {TabData.map((tab) => (
          <AchromaticButton
            className={`text-white rounded-t-3xl rounded-b-none px-6 py-6 text-sm
            ${selectedTab === tab.id ? "bg-hwachang-green" : "bg-hwachang-hanasilver"}`}
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.button}
          </AchromaticButton>
        ))}
      </div>

      <Card className="rounded-lg rounded-tl-none h-[55vh] overflow-y-scroll">
        {TabData.find((tab) => tab.id === selectedTab)?.content}
      </Card>
    </div>
  );
}
