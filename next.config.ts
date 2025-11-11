import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Para imágenes de Google
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Para imágenes de GitHub
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // Para el logo de Google en login
      },
    ],
  },
};

export default nextConfig;
