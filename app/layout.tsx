import { ReactNode } from "react"
import { onestSans } from "@/common/styles/fonts"
import RootLayoutContent from "./RootLayoutContent"
import type { Metadata } from "next"
import { METADATA } from "@/common/constants/metadata"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.DOMAIN || ""
  ),
  description: METADATA.description,
  keywords: METADATA.keywords,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url
  },
  openGraph: {
    images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website"
  }
}

export default function RootLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={onestSans.className} suppressHydrationWarning>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  )
}