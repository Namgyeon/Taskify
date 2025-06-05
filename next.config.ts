import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // 기존에 svg를 file-loader/url-loader 로 처리하던 부분을 찾아 제거하거나, 새 규칙을 밑에 추가하세요.
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/], // .js/.jsx/.ts/.tsx 파일에서 import된 경우에만 SVGR로 처리
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // 필요하다면 titleProp, svgo 플러그인 등 추가 옵션 지정 가능
            // 예: svgoConfig: { plugins: [{ removeViewBox: false }] }
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
