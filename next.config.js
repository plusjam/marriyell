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
  staticPageGenerationTimeout: 200,
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/report",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/contact/brochure",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/contact/reservation",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/first",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/for-brides",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/for-gueat",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/faq",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
