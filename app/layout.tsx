import { ReactNode } from "react"
import { onestSans } from "@/common/styles/fonts"
import RootLayoutContent from "./RootLayoutContent"
import "./globals.css"

export default function RootLayout({ children, params }: { children: ReactNode; params: any }) {
  const locale = params?.locale || "en"

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={onestSans.className} suppressHydrationWarning>
        <RootLayoutContent params={params}>{children}</RootLayoutContent>
      </body>
    </html>
  )
}
