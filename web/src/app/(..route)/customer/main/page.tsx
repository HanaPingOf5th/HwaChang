"use client";

import { Card, CardHeader } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import { useEffect } from "react";
import { fetchCustomerMyInfo } from "@/app/business/auth/customer/customer-auth-myinfo";
import { useCustomerStore } from "@/app/stores/customerStore";

export default function Home() {
  const { setCustomerName } = useCustomerStore();

  useEffect(() => {
    localStorage.clear();
    async function getUserInfo() {
      const response = await fetchCustomerMyInfo();

      if (response.isSuccess) {
        console.log(response.data);
        setCustomerName(response.data.name);
      } else {
        console.error(response.message);
      }
    }

    getUserInfo();
  }, []);

  return (
    <main className="mt-14 p-10">
        <h1 className="mb-4 text-4xl text-center">
          <strong>안녕하세요 고객님!</strong>
          <div className="p-3"/>
          <strong>상담을 원하시는 업무를 선택해 주세요.</strong>
        </h1>
        <div className="p-3"/>
      <div className={`grid sm:grid-cols-1 lg:grid-cols-2 text-center gap-20 mt-16`}>
        <Link href="./main/enterance?isIndividual=true">
        <Card
          className="bg-slate-50 shadow-xl"
        >
          <CardHeader>
            <div className="flex flex-col items-center justify-center h-full p-10">
              <p className="text-5xl mt-3 text-hwachang-darkgreen">
                <strong>개인금융 상담</strong>
              </p>
              <div className="p-10"/>
              <button className="mt-10 px-10 py-4 flex items-center justify-center bg-white text-white text-xl font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
                <span className="text-hwachang-darkgreen">선택</span>
              </button>
            </div>
          </CardHeader>
        </Card>
        </Link>

        <Link href="./main/enterance?isIndividual=false">
        <Card
          className="bg-slate-50 shadow-xl"
        >
          <CardHeader>
            <div className="flex flex-col items-center justify-center h-full p-10">
              <p className="text-5xl mt-3 text-hwachang-darkgreen">
                <strong>기업금융 상담</strong>
              </p>
              <div className="p-10"/>
              <button className="mt-10 px-10 py-4 flex items-center justify-center bg-white text-white text-xl font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
                <span className="text-hwachang-darkgreen">선택</span>
              </button>
            </div>
          </CardHeader>
        </Card>
        </Link>
      </div>
    </main>
  );
}
