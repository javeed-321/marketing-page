import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
}

const isDev = process.argv.includes('dev')
const isBuild = process.argv.includes('build')

export default async function config(): Promise<NextConfig> {
  // Velite runs alongside Next rather than as a build plugin — Turbopack has no
  // webpack plugin hook, so the content layer is compiled here before Next
  // starts. The env guard prevents a second build when Next re-imports this
  // config in a child process.
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1'
    const { build } = await import('velite')
    await build({ watch: isDev, clean: !isDev })
  }
  return nextConfig
}
