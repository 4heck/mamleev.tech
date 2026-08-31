import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `next build` writes a plain `out/` directory for nginx.
  output: "export",
};

export default nextConfig;
