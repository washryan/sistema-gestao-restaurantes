/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://gestao-restaurante-backend.onrender.com'}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig

