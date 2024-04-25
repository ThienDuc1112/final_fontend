import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    experimental: {
      esmExternals: false,
    },
    webpack: (config) => {
      config.resolve.alias = {
       ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
       };
      return config;
      },
  };
  
  module.exports = nextConfig;