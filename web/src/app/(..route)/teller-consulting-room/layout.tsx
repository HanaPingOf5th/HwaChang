import SideBar from "@/app/ui/consulting-room/teller-consulting-room-side-bar";

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row">
      <div className="flex-grow md:overflow-y-auto">{children}</div>
      <div className="w-[33%] overflow-auto">
        <SideBar />
      </div>
    </div>
  );
}