import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['iajivazuvnrdlqlqazfc.supabase.co'],
  },
};

export default nextConfig;
