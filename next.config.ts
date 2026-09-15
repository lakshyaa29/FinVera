import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure serverless packages like pg or bcryptjs are bundled appropriately
  serverExternalPackages: ['pg', 'bcryptjs'],
};

export default nextConfig;
