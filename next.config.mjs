/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // TODO 하드코딩 수정 필요
        destination: `http://localhost:50030/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
