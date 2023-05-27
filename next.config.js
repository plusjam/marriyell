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
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/report",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/contact/brochure",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/contact/reservation",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/first",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/for-brides",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/for-gueat",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/404",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
