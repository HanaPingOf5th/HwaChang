import { HiMiniBellAlert } from "react-icons/hi2";

import Link from "next/link";
import AchromaticButton from "../../component/atom/button/achromatic-button";
export function MatchingAlarm(){
    return(
        <>
            <div className="justify-items-center">
                <HiMiniBellAlert className="mb-4" size={50} color="#1FAB89"/>
                <p className="text-center ">상담사와 매칭되었습니다.</p>
                <p className="text-center mb-4">입장하시겠습니까?</p>
                <div className="flex gap-8">
                    <Link href={"/customer/main"}><AchromaticButton className="bg-red-500 hover:bg-red-400">거절</AchromaticButton></Link>         
                    <Link href={"/consulting-room"}><AchromaticButton >수락</AchromaticButton></Link>
                </div>            
            </div>
        </>
    )
}