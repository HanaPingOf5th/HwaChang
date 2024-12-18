import CustomerConsultingChatting from "@/app/ui/consulting-room/customer/customer-consulting-chatting";

export default function Layout({ children }:{ children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="w-[70%] overflow-y-auto">{children}</div>
      <div className="w-[30%] overflow-x-auto bg-hwachang-darkgreen">
        <div className="grid grid-cols-1 gap-10 h-full p-7">
          <CustomerConsultingChatting/>
        </div>
      </div>
    </div>
  );
}