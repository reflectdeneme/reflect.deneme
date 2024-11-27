/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
