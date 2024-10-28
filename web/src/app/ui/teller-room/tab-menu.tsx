"use client";
import React, { useState } from "react";
import { Card } from "../component/molecule/card/card";
import AchromaticButton from "../component/atom/button/achromatic-button";
import CounselHistory from "@/app/ui/teller-room/consultation-history";
import DocumentSearch from "@/app/ui/teller-room/document-search";
import Library from "@/app/ui/teller-room/library";

interface TabItem {
  id: number;
  button: string;
  content: JSX.Element;
}

export default function TabMenu() {
  const TabData: TabItem[] = [
    { id: 1, button: "과거 상담 기록", content: <CounselHistory name="유유정" /> },
    { id: 2, button: "문서 검색", content: <DocumentSearch /> },
    { id: 3, button: "자료실", content: <Library /> },
  ];

  const [selectedTab, setSelectedTab] = useState(TabData[0].id);

  return (
    <div>
      {TabData.map((tab) => (
        <AchromaticButton
          className=
          {
            `text-white rounded-t-3xl rounded-b-none px-8 py-6 text-sm
            ${selectedTab === tab.id ? "bg-hwachang-green" : "bg-hwachang-hanasilver"}`
          }
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.button}
        </AchromaticButton>
      ))}

      <Card className="rounded-lg rounded-tl-none">
        {TabData.find((tab) => tab.id === selectedTab)?.content}
      </Card>
    </div>
  );
}