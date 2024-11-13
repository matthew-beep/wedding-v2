/** @type {import('next').NextConfig} */
const nextConfig = {  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // Add video and audio formats
      type: 'asset/resource', // Specifies how these files should be treated
    });
    return config;
  },
};

export default nextConfig;
