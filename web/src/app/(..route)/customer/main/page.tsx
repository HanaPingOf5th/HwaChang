"use client";

import { HouseEmoji, EnterPriseEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";
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
    <main className="mt-16 p-10">
        <h1 className="mb-4 text-3xl text-center">
          <strong>상담을 원하시는 업무를 선택해 주세요.</strong>
        </h1>
      <div className={`grid sm:grid-cols-1 lg:grid-cols-2 text-center gap-20 mt-16`}>
        <Link href="./main/enterance?isIndividual=true">
        <Card
          className="bg-hwachang-darkgreen border-2 border-[#277864] rounded-lg"
        >
          <CardHeader>
            <div className="flex flex-col items-center justify-center h-full p-10">
              <p className="text-4xl mt-6 text-white">
                <strong>개인</strong>
              </p>
              <button className="mt-10 px-10 py-4 flex items-center justify-center bg-white text-white text-xl font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
                <span className="mr-3 text-black">선택</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </CardHeader>
        </Card>
        </Link>

        <Link href="./main/enterance?isIndividual=false">
        <Card
          className="bg-hwachang-darkgreen border-2 border-[#277864] rounded-lg"
        >
          <CardHeader>
            <div className="flex flex-col items-center justify-center h-full p-10">
              <p className="text-4xl mt-6 text-white">
                <strong>기업</strong>
              </p>
              <button className="mt-10 px-10 py-4 flex items-center justify-center bg-white text-white text-xl font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
                <span className="mr-3 text-black">선택</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </CardHeader>
        </Card>
        </Link>
      </div>
    </main>
  );
}
