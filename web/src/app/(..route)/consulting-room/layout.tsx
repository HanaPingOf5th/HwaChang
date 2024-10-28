import ConsultingRoomSideBar from "@/app/ui/consulting-room/consulting-room-side-bar";

export default function Layout({ children }:{ children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex-grow md:overflow-y-auto p-12">{children}</div>
      <div className="w-1/4">
        <ConsultingRoomSideBar/>
      </div>
    </div>
  );
}