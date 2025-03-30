import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    authInterrupts: true,
  },
};

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withSerwist(nextConfig));
