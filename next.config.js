//const withTM = require('next-transpile-modules')(['ui'])
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['avataaars.io', 'i.pravatar.cc', '127.0.0.1'],
  },
}

module.exports = nextConfig
