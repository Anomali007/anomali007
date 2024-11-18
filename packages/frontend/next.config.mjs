import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withPayload(nextConfig);
