"use client";

import React, { useEffect, useState } from "react";
import TextInput from "../component/atom/text-input/text-input";
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { documents } from "../../(..route)/consulting-room/mock/mock-documents";
// import Form from "../component/molecule/form/form-index";
// import { FormState } from "../component/molecule/form/form-root";
// import { FormTextInput } from "../component/molecule/form/form-textinput";
// import { FormSubmitButton } from "../component/molecule/form/form-submit-button";

type Document = {
  title: string;
  fileLink: string;
};

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

  // function formAction(prevState: FormState, formData: FormData): FormState {
  //   const value = formData.get('search');

  //   if (value == 'fail') {
  //     return {
  //       isSuccess: false,
  //       isFailure: true,
  //       message: "실패 !",
  //       validationError: {},
  //     };
  //   } else {
  //     console.log('검색 액션을 실행했습니다.');
  //     console.log('검색어: ', value);
  //     return {
  //       isSuccess: true,
  //       isFailure: false,
  //       message: "",
  //       validationError: {},
  //     };
  //   }
  // }

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
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex gap-3">
        {/* <Form id={"search-form"} action={formAction} failMessageControl={"alert"}>
          <div className="grid grid-rows-2">
            <FormTextInput label={""} id={"search"} placeholder={"찾으시는 자료의 제목이나 내용을 입력하세요"} />
            <FormSubmitButton label={"검색"} />
          </div>
        </Form> */}
        <TextInput
          type="text"
          icon={IoSearch}
          placeholder="찾고 싶은 문서를 검색해보세요."
          value={searchText}
          onValueChange={handleSearchChange}
          className="flex-1 p-1 border rounded-l-lg h-10 border-gray-300"
        />
        <button className="px-4 bg-hwachang-darkgreen text-white rounded-lg text-sm">검색</button>
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

      <div className="grid grid-cols-3 h-[30vh] overflow-y-auto">
        {currentDocuments.map((doc, index) => (
          <div key={index} className="flex flex-col items-center p-3">
            <button
              className="flex flex-col items-center"
              onClick={() => openPDF(doc.fileLink)}
            >
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20Facing%20Up.png"
                alt="Page Facing Up"
                width="80"
                height="80"
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