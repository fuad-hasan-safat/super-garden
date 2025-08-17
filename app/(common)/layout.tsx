import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/layout/Footer"
import HeaderWrapper from "@/components/layout/HeaderWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GreenHaven - Premium Plants & Plant Care",
  description:
    "Transform your space with our curated collection of premium houseplants, stylish planters, and expert plant care guidance.",
  keywords: "plants, houseplants, indoor plants, succulents, plant care, planters, green living",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <HeaderWrapper />
      {children}
      <Footer />
    </div>
  )
}
