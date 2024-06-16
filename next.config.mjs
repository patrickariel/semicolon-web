/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@semicolon/api"],
  env: {
    API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:4000/trpc",
  },
};

export default nextConfig;
