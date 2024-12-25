/** @type {import('next').NextConfig} */

// 몇몇 api 요청에서 유효하지 않다는 에러발생
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://localhost:8080/:path*",
//       },
//     ];
//   },
// };

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
