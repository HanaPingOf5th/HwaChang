"use client";

import React, { useEffect, useState } from "react";
import TextInput from "../component/atom/text-input/text-input";
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Image from "next/image"
import Pen from "@/app/utils/public/Pen.png"
import { ApplicationFormInfoType, getApplicationFormByKeyword, getApplicationFormInfoListByCategoryId, sendApplicaiotionForm } from "@/app/business/consulting-room/application-form.service";
import { Category, ConsultingType, getCategories } from "@/app/business/categoty/category.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export default function Library() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [applicationForms, setApplicationForms] = useState<ApplicationFormInfoType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const documentsPerPage = 6;
  const tellerType = useConsultingRoomStore(state => state.tellerType);
  const consultingType:ConsultingType = `${tellerType===0?'PERSONAL':'CORPORATE'}`

  const totalPages = Math.ceil(applicationForms.length / documentsPerPage);

  const currentDocuments = applicationForms.slice(
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

  useEffect(()=>{
    if(!selectedCategory) return;
    getApplicationFormInfoListByCategoryId(selectedCategory.categoryId).then((response)=>{
      setApplicationForms(response.data as ApplicationFormInfoType[])
    })
  }, [selectedCategory])

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  useEffect(()=>{
    getApplicationFormByKeyword(searchText).then((response)=>{
      console.log(searchText);
      setApplicationForms(response.data as ApplicationFormInfoType[])
    })
  },[searchText])

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto h-full">
      <div className="mb-4 flex gap-3">
        <TextInput
          type="text"
          icon={IoSearch}
          placeholder="찾고 싶은 신청서를 검색해보세요."
          value={searchText}
          onValueChange={handleSearchChange}
          className="flex-1 p-1 border rounded-l-lg h-10 border-gray-300"
        />
        <button className="px-4 bg-hwachang-darkgreen text-white rounded-md text-sm">검색</button>
      </div>

      <div className="p-2 flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
            }}
            className={`text-sm hover:underline ${selectedCategory.categoryName === category.categoryName ? "font-bold underline" : ""
              }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 overflow-y-scroll h-2/4">

        {currentDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col items-center p-3">
            <button
              className="flex flex-col items-center"
              onClick={async () => {
                await sendApplicaiotionForm('dw1234', doc.applicationFormId)
                alert('고객님에게 해당 신청서를 보냈습니다!');
              }}
            >
              <Image src={Pen} alt="Page Facing Up" width={80} height={80}/>
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