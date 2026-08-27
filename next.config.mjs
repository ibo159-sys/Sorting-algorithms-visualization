/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = 'Sorting-algorithms-visualization';

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
} else if (process.env.NEXT_PUBLIC_BASE_PATH) {
  basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH;
}

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
