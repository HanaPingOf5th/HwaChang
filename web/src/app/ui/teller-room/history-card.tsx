import React, { useState } from "react";
import Badge from "../component/atom/badge/badge";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

interface CardItem {
  title: string;
  category: string;
  date: string;
  content: string;
}

interface HistoryCardProps {
  cardItem: CardItem;
}

export default function HistoryCard({ cardItem }: HistoryCardProps) {
  const { title, category, date, content } = cardItem;
  const [isOpen, setIssOpen] = useState(false);

  const toggleOpen = () => {
    setIssOpen((prev) => !prev);
  };

  return (
    <div
      className={`border-2 border-hwachang-gray3 rounded-lg ${isOpen ? "rounded-b-none" : ""}`}
      onClick={toggleOpen}
    >
      <div className="flex justify-between items-center p-4">
        <div>
          <div className="text-2xl font-semibold">{title}</div>
          <div className="flex space-x-4 mt-3 items-center">
            <Badge className="bg-hwachang-lightgreen1 rounded-sm px-8 text-lg font-normal text-black hover:bg-hwachang-lightgreen1">
              {category}
            </Badge>
            <div className="font-normal">{date}</div>
          </div>
        </div>
        <div className="mr-5">
          {isOpen ? <SlArrowUp size="40" color="gray" /> : <SlArrowDown size="40" color="gray" />}
        </div>
      </div>

      {/* 구분선 */}
      {isOpen && (
        <hr className="border-t-2 border-hwachang-gray3" />
      )}

      {/* 카드를 펼쳤을 때 나타날 공간 */}
      {isOpen && (
        <div className="p-4 text-xl font-medium">
          {content}
        </div>
      )}
    </div>
  );
}