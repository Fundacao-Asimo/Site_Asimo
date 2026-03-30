import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['suackouhcjpkjkmigxkc.supabase.co'],
  },
};

export default nextConfig;
