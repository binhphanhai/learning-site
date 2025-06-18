/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['antd', '@ant-design/icons'],
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'antd/lib': 'antd/es',
    };
    return config;
  }
}

module.exports = nextConfig 