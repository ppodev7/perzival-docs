import type { NextConfig } from "next"

// MOCKUP_EXPORT=1 gera uma versão estática (pasta out/) para publicar o mockup.
const isExport = process.env.MOCKUP_EXPORT === "1"

const nextConfig: NextConfig = isExport
  ? { output: "export", assetPrefix: "/__pz__", images: { unoptimized: true } }
  : {}

export default nextConfig
