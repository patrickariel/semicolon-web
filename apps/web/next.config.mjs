/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:4000",
  },
  rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: process.env.API_BASE_URL
            ? `${process.env.API_BASE_URL}/:path*`
            : "http://localhost:4000/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
