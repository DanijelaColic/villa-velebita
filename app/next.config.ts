import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['bwip-js', 'qrcode'],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
