/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['peerlesselectronics.com'],
  },
}

module.exports = nextConfig
