import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
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
