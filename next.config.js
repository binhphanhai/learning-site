/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/learning-site" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/learning-site/" : "",
  transpilePackages: ["antd", "@ant-design/icons"],
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "antd/lib": "antd/es",
    };
    return config;
  },
};

module.exports = nextConfig;
