"use client";

import React, { useEffect, useState } from "react";
import TextInput from "../component/atom/text-input/text-input";
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Image from "next/image"
import DocumentImage from "@/app/utils/public/DocumentImage.png";
import { Category, ConsultingType, getCategories } from "@/app/business/categoty/category.service";
import { getDocumentsByCategoryId, Document, getDocumentsByKeyword } from "@/app/business/consulting-room/document.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export default function DocumentSearch() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const tellerType = useConsultingRoomStore(state => state.tellerType);
  const consultingType:ConsultingType = `${tellerType===0?'PERSONAL':'CORPORATE'}`
  const documentsPerPage = 6;

  const totalPages = Math.ceil(documents.length / documentsPerPage);

  const currentPageDocuments = documents.slice(
    (currentPage - 1) * documentsPerPage,
    currentPage * documentsPerPage
  );

  useEffect(() => {
    getCategories(consultingType).then((response) => {
      const categoriesData = response.data as Category[];
      setCategories(categoriesData);
      setSelectedCategory(categoriesData[0]);
    });
  }, []);
  
  useEffect(() => {
    if (!selectedCategory) return;
    getDocumentsByCategoryId(selectedCategory.categoryId).then((response) => {
      console.log(selectedCategory.categoryId)
      setDocuments(response.data as Document[]);
    });
  }, [selectedCategory]);

  useEffect(() => {
    getDocumentsByKeyword(searchText).then((response) => {
      console.log(searchText);
      setDocuments(response.data as Document[]);
    })
  },[searchText])

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

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
    <div className="p-4 max-w-3xl mx-auto h-full ">
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
        {categories.length!==0?(categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
            }}
            className={`text-sm hover:underline ${selectedCategory.categoryName === category.categoryName? "font-bold underline" : ""}`}
          >
            {category.categoryName}
          </button>
        ))):<></>}
      </div>

      <div className="grid grid-cols-3 overflow-y-scroll h-2/4">

        {currentPageDocuments.length!==0?(currentPageDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col items-center p-3">
            <button
              className="flex flex-col items-center"
              onClick={() => openPDF(doc.path)}
            >
              <Image
                src={DocumentImage}
                alt="Page Facing Up"
                width={80}
                height={80}
              />
              <p className="text-left text-sm font-medium">{doc.title}</p>
            </button>
          </div>
        ))):<></>}
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