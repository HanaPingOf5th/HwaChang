'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { customerCategories, enterpriseCategories } from "./categories";

function CategoryList() {
  const params = useSearchParams();
  const key = params.get("isIndividual");
  const router = useRouter();

  let pageTitle: string;
  let pageCategory;

  if (key === "true") {
    pageTitle = "개인 금융";
    pageCategory = customerCategories;
  } else {
    pageTitle = "기업 금융";
    pageCategory = enterpriseCategories;
  }

  const Categories: JSX.Element[] = pageCategory.map((value, index) => {
    const Icon = value.icon;

    return (
      <main key={index}>
        <div className="p-2">
          <Card
            className="bg-hwachang-darkgreen hover:bg-hwachang-green text-white"
            onClick={() => {
              router.push("/customer-room/waiting");
            }}
          >
            <CardHeader className="text-2xl">
              <strong>{value.title}</strong>
            </CardHeader>
            <CardContent className="" />
            <CardFooter className="items-end justify-end">
              <Icon color="white" size="60" />
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
