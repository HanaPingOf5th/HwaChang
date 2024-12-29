"use client";

import { Card, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Category, ConsultingType, getCategories } from "@/app/business/categoty/category.service";

function CategoryList() {
  const params = useSearchParams();
  const key = params.get("isIndividual");
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [pageTitle, setPageTitle] = useState<ConsultingType>(null);

  useEffect(() => {
    if (key === "true") {
      setPageTitle("PERSONAL");
      getCategories("PERSONAL").then((response) => {
        setCategories(response.data as Category[]);
      });
    } else {
      setPageTitle("CORPORATE");
      getCategories("CORPORATE").then((response) => {
        setCategories(response.data as Category[]);
      });
    }
  }, []);
  console.log(categories);
  const Categories: JSX.Element[] = categories.map((value, index) => {
    // const Icon = value.icon;

    return (
      <main key={index}>
        <div className="p-2">
          <Card
            className="bg-gradient-to-br from-[#225b4e] to-[#277864] text-white cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-lg"
            onClick={() => {
              router.push(
                `/customer-room/waiting?categoryId=${value.categoryId}&type=${value.categoryType === "PERSONAL" ? 0 : 1}`,
              );
            }}
          >
            <CardHeader className="p-6">
              <div className="flex flex-col items-center">
                <strong className="text-xl lg:text-2xl">{value.categoryName}</strong>
                <span className="mt-2 text-sm text-gray-200 opacity-80">
                  {key === "true" ? "개인 금융 서비스" : "기업 금융 서비스"}
                </span>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end p-4">
              <svg
                className="w-6 h-6 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </CardFooter>
          </Card>
        </div>
      </main>
    );
  });

  return (
    <div>
      <h1 className="mb-4 text-4xl md:text-4xl text-center">
        <strong>{pageTitle == "PERSONAL" ? "개인 금융" : "기업 금융"}</strong>
      </h1>
      <div className="">
        <h1 className="mb-4 text-2xl md:text-2xl text-center">
          <strong>어떤 업무를 원하시나요?</strong>
        </h1>
      </div>
      <div className="grid gap-3 grid-cols-3 text-center">{Categories}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="px-20">
        <Suspense fallback={<div>로딩 중...</div>}>
          <CategoryList />
        </Suspense>
      </div>
    </main>
  );
}
