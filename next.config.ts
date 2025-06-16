import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com"], // 이미지 허용 도메인 추가
  },
  async rewrites() {
    return [
      {
        source: "/api/forest-fire/:path*",
        destination: "https://apis.data.go.kr/1400000/forestStusService/:path*",
      },
    ];
  },
};

export default nextConfig;
