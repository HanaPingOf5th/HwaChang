"use client";
import React, { useState } from "react";
import { Card } from "../card/card";
import AchromaticButton from "../../atom/button/achromatic-button";
import CounselHistory from "@/app/ui/teller-room/counsel-history";
import DocumentSearch from "@/app/ui/teller-room/document-search";
import Library from "@/app/ui/teller-room/library";

export default function TabMenu() {
  const TabData = [
    { id: 1, button: "과거 상담 기록", content: <CounselHistory /> },
    { id: 2, button: "문서 검색", content: <DocumentSearch /> },
    { id: 3, button: "자료실", content: <Library /> },
  ]; 

  const [selectedTab, setSelectedTab] = useState(TabData[0].id);

  return (
    <div>
        {TabData.map((tab) => (
          <AchromaticButton
            className={
              `text-white rounded-t-3xl rounded-b-none px-10 py-6 text-lg ${selectedTab === tab.id 
            ? "bg-hwachang-green"
              : "bg-hwachang-hanasilver"
            }`}
            key={tab.id}
            data-active={selectedTab === tab.id ? "true" : "false"}
            onClick={() => setSelectedTab(tab.id)}>
            {tab.button}
          </AchromaticButton>
        ))}
      <Card className="rounded-none">
        {TabData.find((a) => a.id === selectedTab)?.content}
      </Card>
    </div>
  );
}