/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rayportbucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
