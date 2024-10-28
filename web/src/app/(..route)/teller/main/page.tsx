"use client";

import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";
import ApexChart from "@/app/ui/component/molecule/Chart/ApexChart";
import RadialBarDynamic from "@/app/ui/component/molecule/Chart/RadialBarDynamic";
import { FormSelectItem } from "@/app/ui/component/molecule/form/form-select-item";
import FormSelect from "@/app/ui/component/molecule/form/form-select-index";
import { useState } from "react";
import { MyChat } from "@/app/ui/consulting-room/chat-box";

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

const sampleSeries = {
  day: [
    { name: "전날", data: [10, 2, 35, 40, 50, 60, 70] },
    { name: "오늘", data: [15, 45, 35, 5, 25, 5, 15] },
  ],
  week: [
    { name: "저번주", data: [100, 200, 150, 300, 400, 350, 450] }, 
    { name: "이번주", data: [120, 180, 160, 290, 410, 340, 480] },
  ],
  month: [
    { name: "저번달", data: Array(30).fill(120) },
    { name: "이번달", data: Array(30).fill(150) },
  ],
};
const categories = {
  day: Array.from({ length: 24 }, (_, i) => `${i + 9}시`),
  week: ["월", "화", "수", "목", "금", "토", "일"],
  month: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
};

const colors = {
  day : ['#CFCFCF', '#FFBFBF'],
  week : ['#CFCFCF', '#03BAE2'],
  month : ['#CFCFCF', '#FFEC6F'],
}


export default function Main(){
  const [selectedType, setSelectedType] = useState<"day" | "week" | "month">("day");
  const handleSelectChange = (value: "day" | "week" | "month") => {
    setSelectedType(value);
  }
    return(
        <main>
            
            <div className={`grid gap-12 grid-cols-3 px-10`}>
                <div className={`grid gap-12 grid-rows-2 col-span-2`}>
                    <Card className="border-none row-span-1 shadow-banker-card h-full">
                        <CardHeader> <p className="text-3xl font-semibold text-hwachang-green1"> 최근 나의 화창 만족도 </p> </CardHeader>
                        <CardContent>
                            <div className="flex justify-items-center">
                            <RadialBarDynamic data={sampleData} />
                            <div className="m-auto ">
                                <Card className="bg-hwachang-hwachangcolor mx-2 shadow-hwachang-hwachangcolor">
                                    <CardHeader className="font-semibold text-2xl text-white text-center">
                                        <p className="font-bold mb-1">임수진 대리 </p> NPS 점수
                                    </CardHeader>
                                    <CardContent className="font-black text-3xl text-white text-center pb-3">80점</CardContent>
                                </Card>
                                <p className="text-xs text-hwachang-hwachangcolor font-semibold pt-2">NPS란 ?</p>
                                <p className="text-xs text-hwachang-hwachangcolor">Net Promoter Score의 약자로, <br/>
                                브랜드에 대한 고객 충성도를 측정하는 지표 <br/>
                                NPS = 추천고객비율(%) - 비추천고객비율(%)</p>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none row-span-1 shadow-banker-card">
                    <CardHeader  className={`grid grid-cols-3`}>  
                      <p className="text-3xl font-semibold text-hwachang-green1"> 나의 화창 일지 </p> 
                      <div className="col-start-3">
                        <FormSelect placeholder={"기간을 설정하세요"}>
                          <FormSelectItem  value={"일일 통계"} placeholder={"일일 통계"} onSelect={() => handleSelectChange("day") }></FormSelectItem>
                          <FormSelectItem value={"이번 주 통계"} placeholder={"이번 주 통계"} onSelect={() => handleSelectChange("week")} ></FormSelectItem>
                          <FormSelectItem value={"이번 달 통계"} placeholder={"이번 달 통계"} onSelect={() => handleSelectChange("month")} ></FormSelectItem>
                        </FormSelect>
                      </div> 
                    </CardHeader>
                    <CardContent>
                        <div className="pt-6">
                          <ApexChart
                          series={sampleSeries[selectedType]}
                          xaxisCategories={categories[selectedType]}
                          colors={colors[selectedType]}
                          />
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
                      <div className="overflow-y-auto p-2 h-[450px]">
                        <MyChat chat="친절하세요 ~ "> </MyChat>
                        <MyChat chat="당신은 나의 별, 나의 태양, 나의 하늘, 나의 바다입니다. "> </MyChat>
                        <MyChat chat="친절하세요 ~ "> </MyChat>
                        <MyChat chat="당신은 나의 별, 나의 태양, 나의 하늘, 나의 바다입니다. "> </MyChat>
                        <MyChat chat="친절하세요 ~ "> </MyChat>
                        <MyChat chat="당신은 나의 별, 나의 태양, 나의 하늘, 나의 바다입니다. "> </MyChat>

                      </div>
                    </CardContent>
                    </Card>
                </div>
                
            </div>
        </main>
    )

}