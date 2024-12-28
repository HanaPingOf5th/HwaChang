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
        <h1 className="mb-4 text-2xl text-center">
          <strong>상담을 원하시는 업무를 선택해 주세요.</strong>
        </h1>
      <div className={`grid sm:grid-cols-1 lg:grid-cols-2 text-center gap-20 mt-16`}>
        <Link href="./main/enterance?isIndividual=true">
          <Card
            className="bg-hwachang-main"
            style={{ boxShadow: "0 0 10px 0 #A5E3F1" }}
          >
            <CardHeader>
              <p className="text-4xl mt-8 mb-8 p-10 text-white">
                <strong>개인</strong>
              </p>
            </CardHeader>
          </Card>
        </Link>

        <Link href="./main/enterance?isIndividual=false">
          <Card
            className="bg-hwachang-main"
            style={{ boxShadow: "0 0 10px 0 #A5E3F1" }}
          >
            <CardHeader>
              <p className="text-4xl mt-8 mb-8 p-10 text-white">
                <strong>기업</strong>
              </p>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
