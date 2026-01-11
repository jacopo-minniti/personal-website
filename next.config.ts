import type { NextConfig } from "next";

// Polyfill localStorage for SSR to prevent crashes (due to dependency issue)
if (typeof global !== 'undefined' && (!global.localStorage || typeof global.localStorage.getItem !== 'function')) {
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 0,
    key: () => null,
  };
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
