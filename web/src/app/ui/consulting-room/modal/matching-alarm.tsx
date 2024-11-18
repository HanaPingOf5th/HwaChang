'use client'
import { HiMiniBellAlert } from "react-icons/hi2";

import AchromaticButton from "../../component/atom/button/achromatic-button";
import { useRouter } from "next/navigation";
export function MatchingAlarm(){
    const router = useRouter();
    return(
        <>
            <div className="justify-items-center">
                <HiMiniBellAlert className="mb-4" size={50} color="#1FAB89"/>
                <p className="text-center ">상담사와 매칭되었습니다.</p>
                <p className="text-center mb-4">입장하시겠습니까?</p>
                <div className="flex gap-8">
                    <AchromaticButton onClick={()=>{router.push("/customer/main")}} className="bg-red-500 hover:bg-red-400">거절</AchromaticButton>
                    <AchromaticButton onClick={()=>{router.push("/consulting-room")}} >수락</AchromaticButton>
                </div>            
            </div>
        </>
    )
}