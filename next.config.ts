import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出（输出到 out/），适配 Cloudflare Pages 等静态托管
  output: "export",
  // 静态导出不支持 Next 图片优化；本项目用原生 <img>，关闭即可
  images: { unoptimized: true },
  // 生成目录式路径（/portfolio/work-1/index.html），静态托管刷新更稳
  trailingSlash: true,
};

export default nextConfig;
