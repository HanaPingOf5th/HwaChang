'use client'; 

import { ResponsiveRadialBar } from '@nivo/radial-bar';

interface RadialBarData {
  id: string;
  data: { x: string; y: number }[];
}

interface MyResponsiveRadialBarProps {
  data: RadialBarData[];
}

const MyResponsiveRadialBar: React.FC<MyResponsiveRadialBarProps> = ({ data }) => (
  <div style={{ height: 300, width: 400}} >
    <ResponsiveRadialBar
        data={data}
        valueFormat=" >-.2%"
        maxValue={1}
        endAngle={-360}
        innerRadius={0.25}
        padding={0.3}
        cornerRadius={45}
        margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
        colors={['#FF5555', '#FFD95B', '#5B8FFF']}
        borderColor={{ theme: 'background' }}
        
        tracksColor="#e8e8e8"
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        circularAxisOuter={null}
        motionConfig="slow"
        transitionMode="innerRadius"

        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]

            }
        ]}
    />
  </div>
);

export default MyResponsiveRadialBar;