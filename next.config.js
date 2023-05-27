/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.CMS_HOSTNAME,
        port: "",
        pathname: "/attaches/**",
      },
    ],
  },
};

module.exports = nextConfig;
