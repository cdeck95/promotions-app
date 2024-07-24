import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  // register: true, // Register the PWA service worker
  // skipWaiting: true, // Skip waiting for service worker activation
});

const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "sequelize-typescript"],
    serverActions: true,
  },
  // swcMinify: true, // Enable SWC minification for improved performance
  // compiler: {
  //   removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  // },
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
        hostname: "**.thescore.bet",
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
});

export default nextConfig;
