/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:4000/trpc",
  },
};

export default nextConfig;
