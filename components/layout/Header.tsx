"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Search, Menu, X, User, Heart, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-sage-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-sage-500 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-forest-800">GreenHaven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-forest-700 hover:text-sage-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/plants" className="text-forest-700 hover:text-sage-600 transition-colors font-medium">
              Plants
            </Link>
            <Link href="/pots" className="text-forest-700 hover:text-sage-600 transition-colors font-medium">
              Pots & Planters
            </Link>
            <Link href="/care" className="text-forest-700 hover:text-sage-600 transition-colors font-medium">
              Plant Care
            </Link>
            <Link href="/gifts" className="text-forest-700 hover:text-sage-600 transition-colors font-medium">
              Gifts
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for plants..."
                className="pl-10 pr-4 py-2 w-full border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-full bg-sage-50/50"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <Link
              href={"/signin"}
              className="hidden md:flex text-forest-700 hover:text-sage-600 hover:bg-sage-50"
            >
              <User className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-forest-700 hover:text-sage-600 hover:bg-sage-50"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-forest-700 hover:text-sage-600 hover:bg-sage-50"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-forest-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage-100 bg-white">
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for plants..."
                  className="pl-10 pr-4 py-2 w-full border-sage-200 focus:border-sage-400 rounded-full"
                />
              </div>
              <Link href="/" className="text-forest-700 hover:text-sage-600 py-2 font-medium">
                Home
              </Link>
              <Link href="/plants" className="text-forest-700 hover:text-sage-600 py-2 font-medium">
                Plants
              </Link>
              <Link href="/pots" className="text-forest-700 hover:text-sage-600 py-2 font-medium">
                Pots & Planters
              </Link>
              <Link href="/care" className="text-forest-700 hover:text-sage-600 py-2 font-medium">
                Plant Care
              </Link>
              <Link href="/gifts" className="text-forest-700 hover:text-sage-600 py-2 font-medium">
                Gifts
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
