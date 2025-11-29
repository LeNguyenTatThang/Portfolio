import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:["btdqgxlgwcoybeflunno.supabase.co"],
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
