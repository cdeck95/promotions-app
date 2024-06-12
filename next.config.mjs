/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.draftkings.com",
      },
      {
        protocol: "https",
        hostname: "**.fanduel.com",
      },
      {
        protocol: "https",
        hostname: "**.betmgm.com",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "**.io",
      },
      {
        protocol: "https",
        hostname: "**.ag",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
