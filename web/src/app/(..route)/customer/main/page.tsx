"use client";

import { HouseEmoji, EnterPriseEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import { useEffect } from "react";
import { fetchCustomerMyInfo } from "@/app/business/auth/customer/customer-auth-myinfo";
import { useCustomerStore } from "@/app/stores/customerStore";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export default function Home() {
  const { setCustomerName } = useCustomerStore();
  const {initConsultingRoomStore} = useConsultingRoomStore(state => state);

  useEffect(() => {
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
            </CardContent>
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
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
