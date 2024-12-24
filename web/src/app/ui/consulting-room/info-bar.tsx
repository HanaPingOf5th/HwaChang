"use client";

import React, { useEffect, useState } from "react";
import InfoContent from "./info-content";
import { useTellerStore } from "@/app/stores/tellerStore";
import { getQueueData } from "@/app/business/teller/teller.service";

const tellerTypeMapper = {
  기업금융: 1,
  개인금융: 0,
};

export default function InfoBar() {
  const [waitingCustomer, setWaitingCustomer] = useState<number>(0);
  const [waitingTeller, setWaitingTeller] = useState<number>(0);
  const [calling, setCalling] = useState<number>(0);
  const [postProcessing, setPostProcessing] = useState<number>(0);

  const { tellerType, setTellerType } = useTellerStore();

  useEffect(() => {
    async function getData() {
      console.log(tellerType);
      const response = await getQueueData(tellerType);
      console.log(response);
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
