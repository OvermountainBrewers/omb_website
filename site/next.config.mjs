/** @type {import('next').NextConfig} */
const nextConfig = {
  target: "serverless", // Vercel setup
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
