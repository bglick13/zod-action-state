// import MillionLint from '@million/lint';
// Importing env files here to validate on build

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // ppr: true,
    reactCompiler: true
  },
};

export default config