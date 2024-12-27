"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Category, ConsultingType, getCategories } from "@/app/business/categoty/category.service";

function CategoryList() {
  const params = useSearchParams();
  const key = params.get("isIndividual");
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
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
            className="bg-hwachang-darkgreen hover:bg-hwachang-green text-white cursor-pointer"
            onClick={() => {
              router.push(
                `/customer-room/waiting?categoryId=${value.categoryId}&type=${value.categoryType === "PERSONAL" ? 0 : 1}`,
              );
            }}
          >
            <CardHeader className="text-2xl">
              <strong>{value.categoryName}</strong>
            </CardHeader>
            <CardContent className="" />
            <CardFooter className="items-end justify-end">
              {/* <Icon color="white" size="60" /> */}
            </CardFooter>
          </Card>
        </div>
      </main>
    );
  });

  return (
    <div>
      <h1 className="mb-4 text-4xl md:text-4xl text-center">
        <strong>{pageTitle}</strong>
      </h1>
      <div className="">
        <h1 className="mb-2 text-xl md:text-xl text-center">
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
