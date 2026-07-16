import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Essential for GitHub Pages static export
  output: "export",

  // 2. Disabling Image Optimization is required for static sites
  // as it relies on a Node.js server to process images at runtime
  images: {
    unoptimized: true,
  },

  // 3. (Optional) Only add this if you are using the standard 
  // username.github.io/repo-name URL.
  // If you are using a custom domain (e.g., yourname.com), remove these two lines.
  // basePath: "/your-repo-name",
  // assetPrefix: "/your-repo-name",
};

export default nextConfig;