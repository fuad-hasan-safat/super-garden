import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

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
          <Header/>
          {children}
          <Footer/>
      </div>
  )
}
