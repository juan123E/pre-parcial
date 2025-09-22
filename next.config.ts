

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static1.mujerhoy.com',
        port: '',
        pathname: '**', 
      },
      {
        protocol: 'https',
        hostname: '*.*amazon.com',
        port: '',
        pathname: '/images/**', 
      },
       {
        protocol: 'https',
        hostname: '*.casadellibro.com',
        port: '',
        pathname: '/img/**', 
      },
    ],
  },
};

export default nextConfig;