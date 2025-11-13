/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Compress responses
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
