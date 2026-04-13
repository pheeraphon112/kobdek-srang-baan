import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/layout/navbar"
import "./globals.css"

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
})

export const metadata: Metadata = {
  title: "JobMatching | หางาน Hospitality ไทย",
  description:
    "แพลตฟอร์มจับคู่งาน Hospitality อันดับ 1 ของไทย สำหรับร้านอาหาร โรงแรม คาเฟ่ และบริการ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${kanit.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
