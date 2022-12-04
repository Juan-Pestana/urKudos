//const withTM = require('next-transpile-modules')(['ui'])
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['avataaars.io', 'i.pravatar.cc'],
  },
}

module.exports = nextConfig
