"use client";

import React, { useEffect, useState } from "react";
import InfoContent from "./info-content";
import { getQueueData } from "@/app/business/teller/teller.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export default function InfoBar() {
  const [waitingCustomer, setWaitingCustomer] = useState<number>(0);
  const [waitingTeller, setWaitingTeller] = useState<number>(0);
  const [calling, setCalling] = useState<number>(0);
  const [postProcessing, setPostProcessing] = useState<number>(0);
  const tellerType = useConsultingRoomStore((state) => state.tellerType);

  useEffect(() => {
    async function getData() {
      console.log("GET DATA", tellerType);
      const response = await getQueueData(tellerType);
      setWaitingCustomer(response.data.result.waitingCustomer);
      setWaitingTeller(response.data.result.waitingTeller);
      setCalling(response.data.result.calling);
      setPostProcessing(response.data.result.postProcessing);
    }
    getData();
  }, []);
  return (
    <div className="bg-hwachang-green">
      <div className="flex space-x-5 items-center justify-center p-7">
        <InfoContent status={"고객대기중"} count={waitingCustomer} />
        <InfoContent status={"대기"} count={waitingTeller} />
        <InfoContent status={"통화중"} count={calling} />
        <InfoContent status={"후처리"} count={postProcessing} />
      </div>
    </div>
  );
}
