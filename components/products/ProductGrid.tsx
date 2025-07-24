"use client"

import { useAppSelector } from "@/lib/hooks"
import ProductCard from "./ProductCard"
import { useMemo } from "react"

export default function ProductGrid() {
  const products = useAppSelector((state) => state.products.products)
  const filters = useAppSelector((state) => state.filters)

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === filters.category.toLowerCase())
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()),
      )
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [products, filters])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
