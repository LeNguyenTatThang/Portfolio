'use client'

import NextTopLoader from "nextjs-toploader"
import Script from "next/script"
import { getServerSession } from "next-auth"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import Layouts from "@/common/components/layouts"
import ThemeProviderContext from "@/common/stores/theme"
import NextAuthProvider from "@/SessionProvider"
import { ReactNode } from "react"

export default async function RootLayoutContent({ children }: { children: ReactNode }) {
  const messages = await getMessages()
  const session = await getServerSession()

  return (
    <>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="a3520e48-6847-4a6e-961a-78e6a0af8ab4"
      />
      <NextTopLoader
        color="#fff200ff"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #deee60ff,0 0 5px #ffc800ff"
      />
      <NextIntlClientProvider messages={messages}>
        <NextAuthProvider session={session}>
          <ThemeProviderContext>
            <Layouts>{children}</Layouts>
          </ThemeProviderContext>
        </NextAuthProvider>
      </NextIntlClientProvider>
      <Analytics />
    </>
  )
}