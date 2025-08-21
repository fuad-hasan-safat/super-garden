import Link from "next/link"
import { Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-4">
      {/* Animated Icon */}
      <div className="mb-6 flex items-center justify-center bg-green-100 h-24 w-24 rounded-full shadow-inner animate-bounce">
        <Leaf className="h-12 w-12 text-green-600" />
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-green-800 tracking-tight">
        404
      </h1>
      <h2 className="mt-2 text-2xl font-semibold text-green-700">
        Oops! Page not found
      </h2>

      {/* Subtext */}
      <p className="mt-3 text-center text-green-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
        But don’t worry — let’s get you back on track.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="mt-8 inline-block bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition"
      >
        Return Home
      </Link>

      {/* Footer text */}
      <p className="mt-10 text-sm text-green-500">
        © {new Date().getFullYear()} GreenHaven 🌱 Growing with you.
      </p>
    </div>
  )
}
