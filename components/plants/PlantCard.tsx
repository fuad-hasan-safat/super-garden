"use client"

import Image from "next/image"
import { Star, Heart, ShoppingBag, Info, Droplets, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Product } from "@/store/features/products/productsSlice"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/features/cart/cartSlice"

interface PlantCardProps {
  product: Product
}

export default function PlantCard({ product }: PlantCardProps) {
  const dispatch = useAppDispatch()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = () => {
    try {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      )
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  // Mock plant-specific data
  const plantData = {
    lightRequirement: product.tags?.includes("low-light")
      ? "Low Light"
      : product.tags?.includes("bright")
        ? "Bright Light"
        : "Medium Light",
    waterFrequency: "Weekly",
    careLevel: product.tags?.includes("easy") ? "Easy" : product.tags?.includes("advanced") ? "Advanced" : "Moderate",
    size: "Medium",
    petSafe: product.tags?.includes("pet-safe"),
    airPurifying: product.tags?.includes("air-purifying"),
  }

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-sage-100 relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-sage-50">
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300&text=Beautiful+Plant"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className={`bg-white/90 hover:bg-white shadow-lg rounded-full ${
                isWishlisted ? "text-red-500" : "text-forest-700"
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQuickView(true)}
              className="bg-white/90 hover:bg-white text-forest-700 shadow-lg rounded-full"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <span className="bg-coral-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Sale</span>
          )}
          {plantData.petSafe && (
            <span className="bg-mint-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Pet Safe</span>
          )}
          {plantData.airPurifying && (
            <span className="bg-sage-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Air Purifying</span>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white rounded-full font-medium shadow-lg"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Plant Name */}
        <h3 className="font-bold text-forest-800 mb-2 text-lg line-clamp-2 group-hover:text-sage-700 transition-colors">
          {product.name}
        </h3>

        {/* Plant Care Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-forest-600">
          <div className="flex items-center gap-1">
            <Sun className="h-3 w-3 text-yellow-500" />
            <span>{plantData.lightRequirement}</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="h-3 w-3 text-blue-500" />
            <span>{plantData.waterFrequency}</span>
          </div>
        </div>

        {/* Care Level */}
        <div className="mb-3">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              plantData.careLevel === "Easy"
                ? "bg-mint-100 text-mint-700"
                : plantData.careLevel === "Advanced"
                  ? "bg-coral-100 text-coral-700"
                  : "bg-sage-100 text-sage-700"
            }`}
          >
            {plantData.careLevel} Care
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-forest-600 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-forest-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-sm font-medium text-coral-600">Save ${product.originalPrice - product.price}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-forest-700 hover:bg-forest-800 text-white rounded-full font-medium transition-all duration-300 group-hover:bg-sage-600 group-hover:hover:bg-sage-700"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Stock Status */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
          <div className="text-center">
            <p className="text-forest-800 font-semibold mb-2">Out of Stock</p>
            <Button variant="outline" size="sm" className="border-sage-300 text-sage-700 bg-transparent">
              Notify When Available
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
