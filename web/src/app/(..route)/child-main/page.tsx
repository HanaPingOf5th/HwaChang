import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  const credit:number = 100;
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        아이 메인 화면
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4 text-center">
      <Card>
        <CardHeader>
          신용도
        </CardHeader>
        <CardContent>그래프 올 자리</CardContent>
        <CardContent>
          내 신용점수: {credit} 점
        </CardContent>
      </Card>
      <div className={`grid gap-6 grid-cols-2 text-center`}>
      <Card>
      <CardHeader> 나의 용돈 </CardHeader>
        <CardContent>
          나의 용돈
        </CardContent>
        <CardContent>
          100000원
        </CardContent>
      </Card>
      <Card>
      <CardHeader> 나의 미션 </CardHeader>
        <CardContent>
          미션을 수행해 신용도와 용돈을 획득해보아요 !
        </CardContent>
      </Card>
      </div>
      <Card>
        <CardHeader>절약 레이스</CardHeader>
        <CardContent>
          친구들과 함께 절약 경쟁을 펼쳐봅시다.
        </CardContent>
      </Card>
      </div>
    </main>
  );
}
