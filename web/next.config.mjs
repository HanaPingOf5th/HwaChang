/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// import fs from 'fs';

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   reactStrictMode: false,
//   // Custom server 설정을 위한 방법
//   server: {
//     https: {
//       key: fs.readFileSync('/Users/yun-yeongheon/server.key'),
//       cert: fs.readFileSync('/Users/yun-yeongheon/server.crt'),
//     },
//   },
// };

// export default nextConfig;

