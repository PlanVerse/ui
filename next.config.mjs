/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       // TODO 하드코딩 수정 필요
  //       destination: "http://localhost:50030/api/v1/:path*",
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: '/team',
        destination: '/team/list',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

};

export default nextConfig;
