"use client";

import { HouseEmoji, EnterPriseEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import red_eclipse from "@/app/utils/public/red_eclipse.svg";
import green_eclipse from "@/app/utils/public/green_eclipse.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCustomerMyInfo } from "@/app/business/auth/customer/customer-auth-myinfo";
import { useCustomerStore } from "@/app/stores/customerStore";

export default function Home() {
  const [individualWaitTime, setIndividualWaitTime] = useState<number>(3);
  const [companyWaitTime, setCompanyWaitTime] = useState<number>(99);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const congestionTime: number = 10;
  const { setCustomerName } = useCustomerStore();

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetchCustomerMyInfo();

      if (response.isSuccess) {
        console.log(response.data);
        setUserInfo(response.data);
        setCustomerName(response.data.name);
        setIndividualWaitTime(response.data.individualWaitTime || 3);
        setCompanyWaitTime(response.data.companyWaitTime || 11);
      } else {
        console.error(response.message);
        setError(response.message);
      }
    }

    getUserInfo();
  }, []);

  return (
    <main className="p-5">
      <div className={`grid sm:grid-cols-1 lg:grid-cols-2 text-center gap-20 mt-16`}>
        <Link href="./main/enterance?isIndividual=true">
          <Card
            className="hover:bg-hwachang-brightgreen"
            style={{ boxShadow: "0 0 10px 0 #1FAB89" }}
          >
            <CardHeader>
              <p className="text-6xl mt-8 mb-8" style={{ color: "#1FAB89" }}>
                <strong>개인</strong>
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center py-5">
                <HouseEmoji heignt={300} width={300} />
              </div>
              <div className="flex justify-center items-center pt-12 text-2xl">
                <p className="text-black font-semibold mr-2">예상 대기 시간 :</p>
                <p
                  className={individualWaitTime > congestionTime ? "text-red-500" : "text-blue-400"}
                >
                  <strong>{individualWaitTime}분</strong>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-center mb-16">
              {individualWaitTime > 10 ? (
                <>
                  <p className="text-xl">혼잡 상태</p>
                  <Image src={red_eclipse} alt="red_eclipse" width={20} height={20} />
                </>
              ) : (
                <>
                  <p className="text-xl">원활 상태</p>
                  <Image src={green_eclipse} alt="green_eclipse" width={20} height={20} />
                </>
              )}
            </CardFooter>
          </Card>
        </Link>

        <Link href="./main/enterance?isIndividual=false">
          <Card
            className="bg-hwachang-darkgreen hover:bg-hwachang-green"
            style={{ boxShadow: "0 0 10px 0 #1FAB89" }}
          >
            <CardHeader>
              {" "}
              <p className="text-6xl mt-8 mb-8 text-white">
                <strong>기업</strong>
              </p>{" "}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center py-5">
                <EnterPriseEmoji heignt={300} width={300} />
              </div>
              <div className="flex justify-center items-center pt-12 text-2xl">
                <p className="text-white mr-2 font-semibold">예상 대기 시간 :</p>
                <p className={companyWaitTime > 10 ? "text-red-500" : "text-blue-300"}>
                  <strong>{companyWaitTime}분</strong>
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center mb-16 flex gap-2">
              {companyWaitTime > 10 ? (
                <>
                  <p className="text-xl text-white">혼잡 상태</p>
                  <Image src={red_eclipse} alt="red_eclipse" width={20} height={20} />
                </>
              ) : (
                <>
                  <p className="text-xl text-white">원활 상태</p>
                  <Image src={green_eclipse} alt="green_eclipse" width={20} height={20} />
                </>
              )}
            </CardFooter>
          </Card>
        </Link>
      </div>
    </main>
  );
}
