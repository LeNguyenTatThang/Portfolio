import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domain:["btdqgxlgwcoybeflunno.supabase.co"],
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      } as const,
    ]
  }
}

export default withNextIntl(nextConfig)
