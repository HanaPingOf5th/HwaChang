import CustomerConsultingRoomSideBar from "@/app/ui/consulting-room/customer-consulting-room-side-bar";

export default function Layout({ children }:{ children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex-grow md:overflow-y-auto p-6">{children}</div>
      <div className="w-2/4 md:w-2/5 lg:w-2/5 overflow-x-auto">
        <CustomerConsultingRoomSideBar/>
      </div>
    </div>
  );
}