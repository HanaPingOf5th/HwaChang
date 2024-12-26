"use client";

import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";
import ApexChart from "@/app/ui/component/molecule/Chart/ApexChart";
import RadialBarDynamic from "@/app/ui/component/molecule/Chart/RadialBarDynamic";
import { FormSelectItem } from "@/app/ui/component/molecule/form/form-select-item";
import FormSelect from "@/app/ui/component/molecule/form/form-select-index";
import { useEffect, useState } from "react";
import { MyChat } from "@/app/ui/consulting-room/chat-box";
import { fetchTellerMain } from "@/app/business/teller/teller.service";

interface NpsGraphData {
  x: string;
  y: number;
}

interface NpsData {
  id: string;
  data: Array<NpsGraphData>;
}

interface Log {
  name: string;
  data: Array<number>;
}

interface Series {
  day: Array<Log>;
  week: Array<Log>;
  month: Array<Log>;
}

const colors = {
  day: ["#CFCFCF", "#FFBFBF"],
  week: ["#CFCFCF", "#03BAE2"],
  month: ["#CFCFCF", "#FFEC6F"],
};

export default function Main() {
  const [selectedType, setSelectedType] = useState<"day" | "week" | "month">("day");
  const [categories, setCategories] = useState({
    day: Array.from({ length: 24 }, (_, i) => `${i < 10 ? `0${i}` : i}시`),
    week: ["월", "화", "수", "목", "금", "토", "일"],
    month: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
  });

  // NPS 데이터
  const [npsData, setNpsData] = useState<Array<NpsData>>([]);
  const [npsAvg, setNpsAvg] = useState<number>(0);
  const [npsPromoter, setNpsPromoter] = useState<number>(0);

  // 그래프 데이터
  const [series, setSeries] = useState<Series>({
    day: [],
    week: [],
    month: [],
  });
  // 리뷰 데이터
  const [reviews, setReviews] = useState<Array<string>>([]);

  const handleSelectChange = (value: "day" | "week" | "month") => {
    setSelectedType(value);
  };

  useEffect(() => {
    async function getData() {
      const response = await fetchTellerMain();
      const data = response.data;
      console.log(data);
      setSeries({
        ...series,
        day: [
          {
            name: "어제",
            data: data.result.hwachangLog.dailyLog.yesterday,
          },
          {
            name: "오늘",
            data: data.result.hwachangLog.dailyLog.today,
          },
        ],
        week: [
          {
            name: "저번주",
            data: data.result.hwachangLog.weeklyLog.lastWeek,
          },
          {
            name: "이번주",
            data: data.result.hwachangLog.weeklyLog.thisWeek,
          },
        ],
        month: [
          {
            name: "이번달",
            data: data.result.hwachangLog.monthlyLog.lastMonth,
          },
          {
            name: "저번달",
            data: data.result.hwachangLog.monthlyLog.thisMonth,
          },
        ],
      });
      setCategories({
        ...categories,
        month: Array.from(
          {
            length: Math.max(
              data.result.hwachangLog.monthlyLog.thisMonth.length,
              data.result.hwachangLog.monthlyLog.lastMonth.length,
            ),
          },
          (_, i) => `${i + 1}`,
        ),
      });
      setReviews(data.result.reviews);
      const promoter = {
        id: "추천 고객",
        data: [{ x: "추천 고객", y: data.result.npsData.promoter / data.result.sumCustomer }],
      };
      const neutral = {
        id: "중립 고객",
        data: [{ x: "중립 고객", y: data.result.npsData.neutral / data.result.sumCustomer }],
      };
      const detractor = {
        id: "비추천 고객",
        data: [{ x: "비추천 고객", y: data.result.npsData.detractor / data.result.sumCustomer }],
      };
      setNpsAvg(data.result.avgScore);
      setNpsData([...npsData, detractor, neutral, promoter]);
      setNpsPromoter(data.result.npsData.promoter);
      console.log(data.result);
    }
    getData();
  }, []);

  return (
    <main>
      <div className={`grid gap-12 grid-cols-3 px-10 py-5`}>
        <div className={`grid gap-12 grid-rows-2 col-span-2`}>
          <Card className="border-none row-span-1 shadow-banker-card">
            <CardHeader>
              {" "}
              <p className="text-3xl font-semibold text-hwachang-green1">
                {" "}
                최근 나의 화창 만족도{" "}
              </p>{" "}
            </CardHeader>
            <CardContent>
              <div className="flex justify-items-center">
                <RadialBarDynamic data={npsData} />
                <div className="m-auto ">
                  <Card className="bg-hwachang-hwachangcolor mx-2 shadow-hwachang-hwachangcolor">
                    <CardHeader className="font-semibold text-3xl text-white text-center">
                      <p className="font-bold mb-1">NPS 점수</p>
                    </CardHeader>
                    <CardContent className="font-black text-5xl text-white text-center pb-5">
                      {npsAvg}점
                    </CardContent>
                  </Card>
                  <p className="text-xs text-hwachang-hwachangcolor font-semibold pt-2">NPS란 ?</p>
                  <p className="text-xs text-hwachang-hwachangcolor">
                    Net Promoter Score의 약자로, <br />
                    브랜드에 대한 고객 충성도를 측정하는 지표 <br />
                    NPS = 추천고객비율(%) - 비추천고객비율(%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none row-span-1 shadow-banker-card">
            <CardHeader className={`grid grid-cols-3`}>
              <p className="text-3xl font-semibold text-hwachang-green1"> 나의 화창 일지 </p>
              <div className="col-start-3">
                <FormSelect placeholder={"기간을 설정하세요"}>
                  <FormSelectItem
                    value={"일일 통계"}
                    placeholder={"일일 통계"}
                    onSelect={() => handleSelectChange("day")}
                  ></FormSelectItem>
                  <FormSelectItem
                    value={"이번 주 통계"}
                    placeholder={"이번 주 통계"}
                    onSelect={() => handleSelectChange("week")}
                  ></FormSelectItem>
                  <FormSelectItem
                    value={"이번 달 통계"}
                    placeholder={"이번 달 통계"}
                    onSelect={() => handleSelectChange("month")}
                  ></FormSelectItem>
                </FormSelect>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pt-6">
                <ApexChart
                  series={series[selectedType]}
                  xaxisCategories={categories[selectedType]}
                  colors={colors[selectedType]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="hidden xl:grid gap-12 grid-rows-3">
          {/* 큰 화면에서만 보이게 할 요소 */}
          <Card className="border-none row-span-1 shadow-banker-card">
            <CardHeader className="text-2xl font-semibold text-hwachang-green1">
              내가 상담한 손님 중 ...
            </CardHeader>
            <CardContent className="text-2xl font-semibold text-hwachang-green1 flex justify-center items-end">
              <p className="text-7xl font-bold text-hwachang-hwachangcolor">{npsPromoter}명</p>이
            </CardContent>
            <CardHeader className="text-2xl font-semibold text-hwachang-green1 text-right pt-2">
              나를 또 만나고 싶어해요 !
            </CardHeader>
          </Card>
          <Card className="border-none row-span-2 shadow-banker-card">
            <CardHeader>
              <p className="text-3xl font-semibold text-hwachang-green1">나의 상담 후기</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto p-2 h-[450px]">
                {reviews.map((review, index) => (
                  <MyChat key={index} chat={review} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
