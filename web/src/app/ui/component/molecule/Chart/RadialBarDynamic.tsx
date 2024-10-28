import dynamic from 'next/dynamic';

const RadialBarDynamic = dynamic(
  () => import('./nivoChart'),
  { ssr: false }
);
console.log(RadialBarDynamic);
export default RadialBarDynamic;