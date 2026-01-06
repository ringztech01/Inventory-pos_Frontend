/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost.localdomain',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true, // <-- bypass optimizer for local images
  },
};

export default nextConfig;


