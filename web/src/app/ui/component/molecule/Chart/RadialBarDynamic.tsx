import dynamic from 'next/dynamic';

const RadialBarDynamic = dynamic(
  () => import('./nivoChart'),
  { ssr: false }
);

export default RadialBarDynamic;