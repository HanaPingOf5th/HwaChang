import ConsultingRoomSideBar from "@/app/ui/consulting-room/consulting-room-side-bar";


export default function Layout({ children }:{ children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <div className="w-80">
        <ConsultingRoomSideBar/>
      </div>
    </div>
  );
}