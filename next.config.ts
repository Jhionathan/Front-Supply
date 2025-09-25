/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/produtos/:path*",
        destination: "http://r3suprimentos188810.winthor.cloudtotvs.com.br/:path*", 
      },
    ];
  },
};

module.exports = nextConfig;