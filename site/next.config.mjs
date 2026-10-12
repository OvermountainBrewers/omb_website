/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Replaces the removed `images.domains`. Leave `search` unset: Sanity image
    // URLs carry ?w=&h=&fit= parameters, and the `new URL(".../**")` shorthand
    // sets search to "" which Next treats as "no query string allowed" (every
    // image then 400s).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
