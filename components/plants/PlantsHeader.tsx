"use client"

import { useState } from "react"
import { Search, Filter, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setSearchQuery, setSortBy } from "@/lib/features/filters/filtersSlice"

export default function PlantsHeader() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state?.filters || { searchQuery: "", sortBy: "name" })
  const productsState = useAppSelector((state) => state?.products || { products: [] })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const searchQuery = filters.searchQuery
  const sortBy = filters.sortBy
  const products = productsState.products

  const handleSearchChange = (value: string) => {
    try {
      dispatch(setSearchQuery(value))
    } catch (error) {
      console.error("Failed to dispatch search query:", error)
    }
  }

  const handleSortChange = (value: string) => {
    try {
      dispatch(setSortBy(value as any))
    } catch (error) {
      console.error("Failed to dispatch sort change:", error)
    }
  }

  return (
    <div className="bg-white border-b border-sage-100 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-2">Our Plant Collection</h1>
          <p className="text-forest-600 text-lg">Discover {products.length} beautiful plants to transform your space</p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search plants by name or type..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-3 border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-full bg-sage-50/50"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex-1 border-sage-300 text-sage-700 hover:bg-sage-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-sage-300 rounded-full bg-white text-forest-700 focus:border-sage-400 focus:ring-sage-400 focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden lg:flex border border-sage-300 rounded-full p-1 bg-white">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-full ${viewMode === "grid" ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-50"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-full ${viewMode === "list" ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-50"}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden mt-4 p-4 bg-sage-50 rounded-2xl border border-sage-200">
            <div className="text-sm text-forest-600 mb-2">Quick Filters:</div>
            <div className="flex flex-wrap gap-2">
              {["Indoor Plants", "Succulents", "Low Light", "Pet Safe", "Air Purifying"].map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-sage-300 text-sage-700 hover:bg-sage-100 bg-transparent"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
