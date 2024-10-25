import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/ui/component/molecule/card/card";
import ApexChart from "@/app/ui/component/molecule/Chart/ApexChart";
import MyResponsiveRadialBarDynamic from "@/app/ui/component/molecule/Chart/MyResponsiveRadialBarDynamic";

const sampleData = [
  {
    id: '불만족 고객',
    data: [
      { x: '만족 고객', y:0.3 },
    ],
  },
  {
    id: '중립 고객',
    data: [
      { x: '중립 고객', y: 0.2 },
    ],
  },
  {
    id: '만족 고객',
    data: [
      { x: '불만족 고객', y: 0.5 },
    ],
  },
];

export default function Main(){
    return(
        <main>
            
            <div className={`grid gap-12 grid-cols-3 mx-10`}>
                <div className={`grid gap-12 grid-rows-2 col-span-2`}>
                    <Card className="border-none row-span-1 shadow-banker-card">
                        <CardHeader> <p className="text-3xl font-semibold text-hwachang-green1"> 최근 나의 화창 만족도 </p> </CardHeader>
                        <CardContent>
                            <div className="pt-4 flex justify-items-center">
                            <MyResponsiveRadialBarDynamic data={sampleData} />
                            <div className="m-auto">
                                <Card className="bg-hwachang-hwachangcolor mx-2 pb-8 pt-5 shadow-hwachang-hwachangcolor">
                                    <CardHeader className="font-semibold text-4xl text-white text-center">
                                        <p className="font-bold mb-1">임수진 대리 </p> NPS 점수
                                    </CardHeader>
                                    <CardContent className="font-black text-5xl text-white text-center py-1">80점</CardContent>
                                </Card>
                                <p className="text-sm text-hwachang-hwachangcolor font-semibold pt-2">NPS란 ?</p>
                                <p className="text-sm text-hwachang-hwachangcolor">Net Promoter Score의 약자로, <br/>
                                브랜드에 대한 고객 충성도를 측정하는 지표 <br/>
                                NPS = 추천고객비율(%) - 비추천고객비율(%)</p>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none row-span-1 shadow-banker-card">
                    <CardHeader>  <p className="text-3xl font-semibold text-hwachang-green1"> 나의 화창 일지 </p> </CardHeader>
                    <CardContent>
                        <div className="pt-6">
                          <ApexChart></ApexChart>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                <div className={`grid gap-12 grid-rows-3`}>
                    <Card className="border-none row-span-1 shadow-banker-card">
                        <CardHeader className="text-2xl font-semibold text-hwachang-green1">내가 상담한 손님 중 ... </CardHeader>
                        <CardContent className="text-2xl font-semibold text-hwachang-green1 flex justify-center items-end"> 
                          <p className="text-7xl font-bold text-hwachang-hwachangcolor">80명</p>이
                          </CardContent>
                        <CardHeader className="text-2xl font-semibold text-hwachang-green1 text-right pt-2">나를 또 만나고 싶어해요 ! 
                        </CardHeader>
                    </Card>
                    <Card className="border-none row-span-2 shadow-banker-card">
                    <CardHeader>  <p className="text-3xl font-semibold text-hwachang-green1 "> 나의 상담 후기 </p> </CardHeader>
                    <CardContent>
                    </CardContent>
                    </Card>
                </div>
                
            </div>
        </main>
    )

}