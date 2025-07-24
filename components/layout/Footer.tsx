import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-sage-500 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">GreenHaven</span>
            </div>
            <p className="text-sage-200 leading-relaxed">
              Your trusted partner in creating beautiful, healthy living spaces with premium plants and expert care
              guidance.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/30 rounded-full hover:bg-sage-600/50"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/30 rounded-full hover:bg-sage-600/50"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/30 rounded-full hover:bg-sage-600/50"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/30 rounded-full hover:bg-sage-600/50"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-sage-100">Shop</h4>
            <div className="space-y-3">
              <Link href="/plants" className="block text-sage-300 hover:text-white transition-colors">
                All Plants
              </Link>
              <Link href="/indoor-plants" className="block text-sage-300 hover:text-white transition-colors">
                Indoor Plants
              </Link>
              <Link href="/succulents" className="block text-sage-300 hover:text-white transition-colors">
                Succulents
              </Link>
              <Link href="/pots" className="block text-sage-300 hover:text-white transition-colors">
                Pots & Planters
              </Link>
              <Link href="/plant-care" className="block text-sage-300 hover:text-white transition-colors">
                Plant Care
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-sage-100">Support</h4>
            <div className="space-y-3">
              <Link href="/care-guide" className="block text-sage-300 hover:text-white transition-colors">
                Plant Care Guide
              </Link>
              <Link href="/shipping" className="block text-sage-300 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-sage-300 hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="block text-sage-300 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="block text-sage-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-sage-100">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sage-400" />
                <span className="text-sage-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sage-400" />
                <span className="text-sage-300">hello@greenhaven.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sage-400 mt-1" />
                <span className="text-sage-300">
                  123 Garden Street
                  <br />
                  Green Valley, CA 90210
                </span>
              </div>
            </div>

            <div className="bg-sage-700/30 p-4 rounded-xl">
              <div className="text-sage-100 font-medium mb-1">Store Hours</div>
              <div className="text-sm text-sage-300">
                Mon-Fri: 9AM-7PM
                <br />
                Sat-Sun: 10AM-6PM
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sage-300 text-sm">&copy; {new Date().getFullYear()} GreenHaven. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-sage-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sage-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sage-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
