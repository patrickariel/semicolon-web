/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@semicolon/api"],
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
