/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
        },
      ],
    }
  },
}

export default nextConfig
