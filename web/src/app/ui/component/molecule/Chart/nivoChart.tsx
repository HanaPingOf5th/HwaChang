'use client'; // Ensure this runs only on the client side

import { ResponsiveRadialBar } from '@nivo/radial-bar';

interface RadialBarData {
  id: string;
  data: { x: string; y: number }[];
}

interface MyResponsiveRadialBarProps {
  data: RadialBarData[];
}

const MyResponsiveRadialBar: React.FC<MyResponsiveRadialBarProps> = ({ data }) => (
  <div className='w-3/5'>
    <ResponsiveRadialBar
      data={data}
      valueFormat=">-.2%"
      maxValue={1}
      endAngle={-360}
      innerRadius={0.25}
      padding={0.3}
      cornerRadius={45}
      margin={{ top: 20, right: 130, bottom: 40, left: 40 }}
      colors={{ scheme: 'yellow_green' }}
      borderWidth={1}
      borderColor={{ theme: 'background' }}
      tracksColor="#f2f2f2"
      enableRadialGrid={false}
      radialAxisStart={null}
      circularAxisOuter={null}
      motionConfig="gentle"
      label="category"
      transitionMode="startAngle"
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          translateX: 120,
          itemsSpacing: 6,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#000',
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default MyResponsiveRadialBar;
