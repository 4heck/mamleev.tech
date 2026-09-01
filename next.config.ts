import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `next build` writes a plain `out/` directory for nginx.
  output: "export",
  // Emit out/ru/index.html rather than out/ru.html, so the served URLs match
  // the canonical, hreflang and sitemap entries, which all carry a slash.
  trailingSlash: true,
};

export default nextConfig;
