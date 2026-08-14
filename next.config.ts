import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    reactCompiler: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
