
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "ucarecdn.com",

      },
      

    ],
    domains: ["demos.creative-tim.com"],
  }
};

export default nextConfig;