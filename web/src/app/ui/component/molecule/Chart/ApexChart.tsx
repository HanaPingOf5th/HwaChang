"use client";

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts'; // ApexOptions 타입 import

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {
  series: number[];
  labels: string[];
  totalLabel?: string;
  totalValue?: number;
}

const ApexChart: React.FC<ApexChartProps> = ({
  series,
  labels,
  totalLabel = 'Total',
  totalValue = series.reduce((a, b) => a + b, 0),
}) => {
  // 객체에 ApexOptions 타입을 명시적으로 부여합니다.
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar', // 여기에서 정확한 리터럴 타입을 사용합니다.
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: totalLabel,
            formatter: () => totalValue,
          },
        },
      },
    },
    labels,
  };

  return (
    <div>
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default ApexChart;
