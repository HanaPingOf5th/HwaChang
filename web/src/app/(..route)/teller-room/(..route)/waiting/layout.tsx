import TabMenu from "@/app/ui/consulting-room/tab-menu";
import TellerWaitingChatting from "@/app/ui/consulting-room/teller/teller-waiting-chatting";

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="w-[70%] overflow-y-auto">{children}</div>
      <div className="w-[30%] overflow-x-auto bg-hwachang-main">
        <div className="grid grid-cols-1 gap-10 p-6">
          <TabMenu />
          <TellerWaitingChatting />
        </div>
      </div>
    </div>
  );
}