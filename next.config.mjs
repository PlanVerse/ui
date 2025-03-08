/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // TODO: proxy 설정 필요
  // async rewrites() {
  //   return [
  //     {
  //       source: '/redis/:path*',
  //       destination: "http://172.12.0.1:4949/redis/:path*",
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
