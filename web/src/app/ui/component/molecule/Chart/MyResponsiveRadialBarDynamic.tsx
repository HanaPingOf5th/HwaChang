import dynamic from 'next/dynamic';

// Dynamically import MyResponsiveRadialBar to avoid SSR issues
const MyResponsiveRadialBarDynamic = dynamic(
  () => import('./nivoChart'),
  { ssr: false } // Ensure it renders only on the client side
);

export default MyResponsiveRadialBarDynamic;