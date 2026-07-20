/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/director-GH',
  assetPrefix: '/director-GH/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
