import CustomerWaitingChatting from "@/app/ui/consulting-room/customer/customer-waiting-chatting";
import { Suspense } from "react";

export default function Layout({ children }:{ children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="w-[70%] overflow-y-auto">
      <Suspense fallback={<div>로딩 중...</div>}>
        {children}
      </Suspense>
      </div>
      <div className="w-[30%] overflow-x-auto bg-hwachang-main">
        <div className="grid grid-cols-1 gap-10 h-full p-7">
          <CustomerWaitingChatting/>
        </div>
      </div>
    </div>
  );
}