"use client"

import { useAppSelector } from "@/store/hooks"
import PlantCard from "./PlantCard"
import { useMemo } from "react"

export default function PlantsGrid() {
  const products = useAppSelector((state) => state?.products?.products || [])
  const filters = useAppSelector(
    (state) =>
      state?.filters || {
        category: "all",
        priceRange: [0, 1000],
        searchQuery: "",
        sortBy: "name",
      },
  )

  let filteredProducts: any = []

  try {
    filteredProducts = useMemo(() => {
      let filtered = products

      // Filter by category
      if (filters.category !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.category?.toLowerCase() === filters.category.toLowerCase() ||
            product.tags?.some((tag) => tag.toLowerCase().includes(filters.category.toLowerCase())),
        )
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )

      // Filter by search query
      if (filters.searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            product.tags?.some((tag) => tag.toLowerCase().includes(filters.searchQuery.toLowerCase())),
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
          filtered.sort((a, b) => a.name?.localeCompare(b.name) || 0)
          break
      }

      return filtered
    }, [products, filters])
  } catch (error) {
    console.error("Error filtering products:", error)
    filteredProducts = []
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-forest-800 mb-2">No plants found</h3>
          <p className="text-forest-600 mb-6">
            We couldn't find any plants matching your current filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-forest-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> plants
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <PlantCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button (for future pagination) */}
      {filteredProducts.length >= 12 && (
        <div className="text-center mt-12">
          <button className="bg-sage-100 hover:bg-sage-200 text-sage-700 px-8 py-3 rounded-full font-medium transition-colors">
            Load More Plants
          </button>
        </div>
      )}
    </div>
  )
}
