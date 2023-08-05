/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'directus-production-c48f.up.railway.app',
        // hostname: 'directus-production-1246.up.railway.app',
        protocol: 'https'
      }
    ]
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
