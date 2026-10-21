import type { NextConfig } from "next";

/**
 * Baseline security headers for every response.
 * A full Content-Security-Policy is planned for the backend phase
 * (see docs/decisions/0005-security-headers.md).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Linting is not configured yet; see docs/development.md.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    // Renamed programme slugs: keep old shared links working.
    const renamed = [["creative-teacher", "successful-teacher"]];
    return renamed.flatMap(([from, to]) => [
      { source: `/programs/${from}`, destination: `/programs/${to}`, permanent: true },
      { source: `/ar/programs/${from}`, destination: `/programs/${to}`, permanent: true },
      { source: `/en/programs/${from}`, destination: `/en/programs/${to}`, permanent: true },
    ]);
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
