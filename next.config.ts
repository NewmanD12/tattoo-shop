import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',   // covers all regions
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',                 // for your test images
      },
    ],
  },
};

export default nextConfig;
