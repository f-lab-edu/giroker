/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    /**
     * @see https://github.com/mswjs/msw/issues/1801#issuecomment-1794145119
     * */
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/browser": false,
      };
    }

    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/node": false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
