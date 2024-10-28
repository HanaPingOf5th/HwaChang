"use client";

import React, { useState } from "react";
import TextInput from "../component/atom/text-input/text-input";
import { IoSearch } from "react-icons/io5";
// import Form from "../component/molecule/form/form-index";
// import { FormState } from "../component/molecule/form/form-root";
// import { FormTextInput } from "../component/molecule/form/form-textinput";
// import { FormSubmitButton } from "../component/molecule/form/form-submit-button";

type Document = {
  title: string;
};

const documents: Document[] = [
  { title: '주택청약 신청 자격 및 조건 요약' },
  { title: '청약 가점 계산 방법 안내' },
  { title: '주택청약 신청 시 필요한 서류 목록' },
  { title: '청약통장 가입 및 유지조건' },
  { title: '청약 당첨 이후 절차 및 유의사항' },
  { title: '특별공급 및 일반공급 차이점 설명 가이드' },
  { title: '주택청약1' },
  { title: '주택청약2' },
  { title: '주택청약3' },
  { title: '주택청약4' },
  { title: '주택청약5' },
  { title: '주택청약6' },
];

const categories = [
  '예금', '대출', '주택청약', '펀드/신탁', '인터넷/스마트뱅킹', '전자금융사기',
  '카드', '인증서/간편로그인', '입출금 알림', '외환', '자동이체'
];

export default function DocumentSearch() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  // 검색어 기반으로 필터링된 문서 반환
  const filteredDocuments = documents.filter(document =>
    document.title.includes(searchText)
  );

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
          className="flex-1 p-1 border rounded-l-lg border-gray-300"
        />
        <button className="px-5 py-1 bg-hwachang-darkgreen text-white rounded-lg">검색</button>
      </div>

      <div className="p-2 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className=" text-sm hover:underline"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 mb-4">
        {currentDocuments.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4"
          >
            <button className="flex flex-col items-center">
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20Facing%20Up.png" alt="Page Facing Up" width="80" height="80" />
              <p className="text-left text-sm font-medium">{doc.title}</p>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center">
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className="px-5 py-2 rounded-md border border-hwachang-darkgreen text-hwachang-darkgreen"
          >
            이전
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className="px-5 py-2 border rounded-md bg-hwachang-darkgreen text-white"
          >
            다음
          </button>
        )}
      </div>
    </div >
  );
};