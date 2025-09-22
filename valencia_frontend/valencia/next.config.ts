import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  trailingSlash: true,
  images: {
    domains: ["127.0.0.1", "localhost"],
    // или используйте remotePatterns для более гибкой настройки:
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/mediafiles/**",
      },
    ],
  },
};

export default nextConfig;
