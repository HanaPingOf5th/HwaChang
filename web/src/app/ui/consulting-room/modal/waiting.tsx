import { IoRefresh } from "react-icons/io5";
import { GestureXEmoji } from "../../component/atom/fluent-emoji";
import { HiInformationCircle } from "react-icons/hi2";

export function WaitingModal(){
    return(
        <>
            <div className="flex flex-col items-center">
                <div className="flex justify-center p-10">
                    <GestureXEmoji width={200} heignt={200} />
                </div>
                <p className="text-center text-lg font-semibold">현재 접속량이 많아</p>
                <p className="text-center text-lg font-semibold text-green-600">상담 대기 중입니다.</p>
                <p className="text-center text-sm text-gray-500 pt-3">조금만 기다려 주세요.</p>
                <div className="w-full mt-6">
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-lg font-medium">대기 인원</p>
                        <IoRefresh className="mt-1" width={16} height={16} color="gray" />
                        <p className="text-lg font-semibold">154,721명</p>
                    </div>
                    <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                        <HiInformationCircle className="mr-1" width={16} height={16} color="gray" />
                        <p className="pt-5">
                          화상 상담 전 채팅을 통해 상담할 내용을 적어주시면
                          <br /> 빠른 상담이 가능합니다.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}