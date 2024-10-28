"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ApexChartProps {
  series: { name: string; data: number[] }[];
  xaxisCategories: string[];
  colors?: string[];
}

export default function ApexChart({ series, xaxisCategories, colors }: ApexChartProps) {
  const options: ApexOptions = {
    chart: {
      height: 300,
      type: "area",
      animations: {
        enabled: true,
        easing: 'linear',  
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
      fontFamily: 'Pretendard',
      toolbar: {
        show: true,
        offsetX: -470,
        offsetY: -10,
        tools: { download: true, zoom: true, pan: true, reset: true },
        autoSelected: 'zoom',
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: { type: undefined, categories: xaxisCategories },
    tooltip: { x: { format: "yyyy년 MM월 dd일  HH시" } },
    colors: colors || ['#03BAE2', '#FF6F6F', '#546E7A'],
  };

  return <ReactApexChart options={options} series={series} type="area" height={250} />;
}
