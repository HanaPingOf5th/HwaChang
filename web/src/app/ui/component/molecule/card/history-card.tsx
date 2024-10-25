import React, { useState } from "react";
import Badge from "../../atom/badge/badge";
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from "react-icons/io";

interface CardItem {
  title: string;
  category: string;
  date: string;
  children: string;
}

interface HistoryCardProps {
  CardItem: CardItem;
}

export default function HistoryCard({ title, category, date, children }) {
  const [isOpen, setIssOpen] = useState(false);
  
  const toggleOpen = () => {
    setIssOpen((prev) => !prev);
  };

  return (
    <div className="border-2 border-hwachang-gray3 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="flex space-x-4 mt-3">
          <Badge className="bg-hwachang-lightgreen1 rounded-none px-7 text-black">
            {category}
          </Badge>
          <div className="font-medium">{date}</div>
        </div>
      </div>
      <button onClick={toggleOpen} className="ml-auto">
      {isOpen ? <IoIosArrowUp size="50" /> : <IoIosArrowDown size="50" />}
      </button>
    </div>

    {isOpen && (
      <div className="mt-4 p-4 border-t border-hwachang-gray3">
      {children}
      </div>
    )}
    </div>
  );
}
