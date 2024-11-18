"use client";

import React, { useEffect, useState } from "react";
import TextInput from "../component/atom/text-input/text-input";
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { documents } from "./mock/mock-documents";
import Image from "next/image"
import Document from "@/app/utils/public/Document.png";

const categories = [
  '예금', '대출', '주택청약', '펀드/신탁', '인터넷/스마트뱅킹', '전자금융사기',
  '카드', '인증서/간편로그인', '입출금 알림', '외환', '자동이체'
];

export default function DocumentSearch() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const documentsPerPage = 6;

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const filterDocuments = () => {
    const result = documents.filter((document) => {
      const matchesCategory = selectedCategory ? document.category === selectedCategory : true;
      const matchesSearchText = document.title.includes(searchText);
      return matchesCategory && matchesSearchText;
    });

    setFilteredDocuments(result);
  };

  useEffect(() => {
    filterDocuments();
  }, [searchText, selectedCategory]);

  // 필터링된 문서의 총 페이지 수 계산
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  // 현재 페이지에 표시할 문서 추출
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * documentsPerPage,
    currentPage * documentsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const openPDF = (pdfLink: string) => {
    window.open(pdfLink, '_blank');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto h-full">
      <div className="mb-4 flex gap-3">
        <TextInput
          type="text"
          icon={IoSearch}
          placeholder="찾고 싶은 문서를 검색해보세요."
          value={searchText}
          onValueChange={handleSearchChange}
          className="flex-1 p-1 border rounded-l-lg h-10 border-gray-300"
        />
        <button className="px-4 bg-hwachang-darkgreen text-white rounded-md text-sm">검색</button>
      </div>

      <div className="p-2 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
            }}
            className={`text-sm hover:underline ${selectedCategory === category ? "font-bold underline" : ""
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3">

        {currentDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col items-center p-3">
            <button
              className="flex flex-col items-center"
              onClick={() => openPDF(doc.fileLink)}
            >
              <Image
                src={Document}
                alt="Page Facing Up"
                width={80}
                height={80}
              />
              <p className="text-left text-sm font-medium">{doc.title}</p>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="flex gap-4 min-w-[120px] justify-between items-center">
          {currentPage > 1 ? (
            <button
              onClick={handlePrevPage}
              className="p-2 text-hwachang-darkgreen rounded-full hover:bg-gray-200 flex items-center justify-center"
            >
              <IoChevronBack size={24} />
            </button>
          ) : (
            <span className="w-6" />
          )}

          <span className="text-center font-medium">
            {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages ? (
            <button
              onClick={handleNextPage}
              className="p-2 text-hwachang-darkgreen rounded-full hover:bg-gray-200 flex items-center justify-center"
            >
              <IoChevronForward size={24} />
            </button>
          ) : (
            <span className="w-6" />
          )}
        </div>
      </div>
    </div>
  );
};