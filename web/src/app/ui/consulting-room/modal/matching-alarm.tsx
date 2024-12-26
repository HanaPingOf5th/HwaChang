'use client'
import { HiMiniBellAlert } from "react-icons/hi2";

import AchromaticButton from "../../component/atom/button/achromatic-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { findCustomerRoomId, initialConsultingRoomInfoType } from "@/app/business/waiting-room/waiting-queue.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

interface MatchingAlarmProps {
  categoryId: string,
  typeId: string,
}
export function MatchingAlarm(matchingAlarmProps: MatchingAlarmProps){
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>("");
    const {updateConsultingRoomId, consultingRoomId} = useConsultingRoomStore(state => state)

    // 렌더링 후 api 요청
    useEffect(()=>{
      findCustomerRoomId().then((response)=>{
        console.log(response.data)
        const data = response.data as initialConsultingRoomInfoType
        setRoomId(data.consultingRoomId as string);
        updateConsultingRoomId(data.consultingRoomId as string)
      })
    }, [roomId])

    useEffect(()=>{console.log(consultingRoomId)}, [consultingRoomId])
    return(
        <>
            <div className="justify-items-center">
                <HiMiniBellAlert className="mb-4" size={50} color="#1FAB89"/>
                <p className="text-center ">상담사와 매칭되었습니다.</p>
                <p className="text-center mb-4">입장하시겠습니까?</p>
                <div className="flex gap-8">
                    <AchromaticButton onClick={()=>{router.push("/customer/main")}} className="bg-red-500 hover:bg-red-400">거절</AchromaticButton>
                    <AchromaticButton onClick={()=>{router.push(`/customer-room/consulting?categoryId=${matchingAlarmProps.categoryId}&type=${matchingAlarmProps.typeId}&roomId=${roomId}`)}} >수락</AchromaticButton>
                </div>            
            </div>
        </>
    )
}