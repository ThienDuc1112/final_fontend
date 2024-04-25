

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
  };
  
  module.exports = nextConfig;