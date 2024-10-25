import TellerNav from "@/app/ui/nav/teller-nav";

export default function Layout({ children }: { children: React.ReactNode; }) {
  const tellerInfo = {
    name: '임수진',
    position: '대리',
    branch: '성수역점',
    department: '개인 금융 (대출 상담)',
    availability: '상담 가능',
  };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-1/4">
        <TellerNav tellerInfo={tellerInfo}></TellerNav>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}