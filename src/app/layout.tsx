import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

/**
 * Root Layout
 * Sets up the app with Inter font and global styles
 * Permanent dark mode - no theme switching
 */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Yonis Diriye | Full-Stack Developer",
  description: "A premium, minimalist portfolio showcasing full-stack development projects and skills.",
  keywords: ["portfolio", "developer", "full-stack", "react", "next.js", "typescript"],
  authors: [{ name: "Yonis Diriye" }],
  openGraph: {
    title: "Yonis Diriye | Full-Stack Developer",
    description: "A premium, minimalist portfolio showcasing full-stack development projects and skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonis Diriye | Full-Stack Developer",
    description: "A premium, minimalist portfolio showcasing full-stack development projects and skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A0A0A] text-foreground antialiased">
        {children}
        {/* Global "Leather" Texture - soft-light prevents corner distortion */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            filter: "contrast(115%) brightness(100%)",
          }}
        />
      </body>
    </html>
  )
}
