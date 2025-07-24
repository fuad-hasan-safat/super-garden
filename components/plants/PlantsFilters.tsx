"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCategory, setPriceRange, resetFilters } from "@/lib/features/filters/filtersSlice"

const categories = [
  { id: "all", name: "All Plants", count: 156 },
  { id: "indoor", name: "Indoor Plants", count: 89 },
  { id: "outdoor", name: "Outdoor Plants", count: 34 },
  { id: "succulents", name: "Succulents", count: 45 },
  { id: "herbs", name: "Herbs", count: 23 },
  { id: "flowering", name: "Flowering Plants", count: 28 },
  { id: "trees", name: "Trees & Shrubs", count: 15 },
]

const lightRequirements = [
  { id: "low", name: "Low Light", count: 42 },
  { id: "medium", name: "Medium Light", count: 67 },
  { id: "bright", name: "Bright Light", count: 38 },
  { id: "direct", name: "Direct Sun", count: 29 },
]

const sizes = [
  { id: "small", name: 'Small (0-12")', count: 78 },
  { id: "medium", name: 'Medium (12-24")', count: 52 },
  { id: "large", name: 'Large (24-48")', count: 26 },
  { id: "xlarge", name: 'Extra Large (48"+)', count: 12 },
]

const careLevel = [
  { id: "easy", name: "Easy Care", count: 89 },
  { id: "moderate", name: "Moderate Care", count: 45 },
  { id: "advanced", name: "Advanced Care", count: 22 },
]

const specialFeatures = [
  { id: "air-purifying", name: "Air Purifying", count: 34 },
  { id: "pet-safe", name: "Pet Safe", count: 28 },
  { id: "low-maintenance", name: "Low Maintenance", count: 56 },
  { id: "fast-growing", name: "Fast Growing", count: 31 },
  { id: "flowering", name: "Flowering", count: 28 },
]

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-sage-200 pb-6 mb-6">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left mb-4">
        <h3 className="text-lg font-semibold text-forest-800">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 text-sage-600" /> : <ChevronDown className="h-5 w-5 text-sage-600" />}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  )
}

export default function PlantsFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(
    (state) =>
      state?.filters || {
        category: "all",
        priceRange: [0, 1000],
      },
  )

  const [selectedLightRequirements, setSelectedLightRequirements] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCareLevel, setSelectedCareLevel] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const handleCategoryChange = (categoryId: string) => {
    try {
      dispatch(setCategory(categoryId))
    } catch (error) {
      console.error("Failed to dispatch category change:", error)
    }
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    try {
      dispatch(setPriceRange([min, max]))
    } catch (error) {
      console.error("Failed to dispatch price range change:", error)
    }
  }

  const toggleArrayFilter = (value: string, currentArray: string[], setArray: (arr: string[]) => void) => {
    if (currentArray.includes(value)) {
      setArray(currentArray.filter((item) => item !== value))
    } else {
      setArray([...currentArray, value])
    }
  }

  const clearAllFilters = () => {
    try {
      dispatch(resetFilters())
    } catch (error) {
      console.error("Failed to reset filters:", error)
    }
    setSelectedLightRequirements([])
    setSelectedSizes([])
    setSelectedCareLevel([])
    setSelectedFeatures([])
  }

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    selectedLightRequirements.length > 0 ||
    selectedSizes.length > 0 ||
    selectedCareLevel.length > 0 ||
    selectedFeatures.length > 0

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-forest-800">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sage-600 hover:text-sage-800 hover:bg-sage-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-sage-600 border-sage-300 focus:ring-sage-500 focus:ring-2"
                />
                <span className="ml-3 text-forest-700 group-hover:text-sage-600 transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-sage-500">({category.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-forest-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number.parseInt(e.target.value))}
              className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-sage-600 mb-1">Min</label>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(Number.parseInt(e.target.value) || 0, filters.priceRange[1])}
                className="w-full px-3 py-2 border border-sage-300 rounded-lg text-sm focus:border-sage-400 focus:ring-sage-400"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-xs text-sage-600 mb-1">Max</label>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number.parseInt(e.target.value) || 1000)}
                className="w-full px-3 py-2 border border-sage-300 rounded-lg text-sm focus:border-sage-400 focus:ring-sage-400"
                placeholder="$1000"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Light Requirements */}
      <FilterSection title="Light Requirements">
        <div className="space-y-2">
          {lightRequirements.map((light) => (
            <label key={light.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedLightRequirements.includes(light.id)}
                  onChange={() => toggleArrayFilter(light.id, selectedLightRequirements, setSelectedLightRequirements)}
                  className="w-4 h-4 text-sage-600 border-sage-300 rounded focus:ring-sage-500 focus:ring-2"
                />
                <span className="ml-3 text-forest-700 group-hover:text-sage-600 transition-colors">{light.name}</span>
              </div>
              <span className="text-sm text-sage-500">({light.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Plant Size">
        <div className="space-y-2">
          {sizes.map((size) => (
            <label key={size.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size.id)}
                  onChange={() => toggleArrayFilter(size.id, selectedSizes, setSelectedSizes)}
                  className="w-4 h-4 text-sage-600 border-sage-300 rounded focus:ring-sage-500 focus:ring-2"
                />
                <span className="ml-3 text-forest-700 group-hover:text-sage-600 transition-colors">{size.name}</span>
              </div>
              <span className="text-sm text-sage-500">({size.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Care Level */}
      <FilterSection title="Care Level">
        <div className="space-y-2">
          {careLevel.map((care) => (
            <label key={care.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCareLevel.includes(care.id)}
                  onChange={() => toggleArrayFilter(care.id, selectedCareLevel, setSelectedCareLevel)}
                  className="w-4 h-4 text-sage-600 border-sage-300 rounded focus:ring-sage-500 focus:ring-2"
                />
                <span className="ml-3 text-forest-700 group-hover:text-sage-600 transition-colors">{care.name}</span>
              </div>
              <span className="text-sm text-sage-500">({care.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Special Features */}
      <FilterSection title="Special Features" defaultOpen={false}>
        <div className="space-y-2">
          {specialFeatures.map((feature) => (
            <label key={feature.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => toggleArrayFilter(feature.id, selectedFeatures, setSelectedFeatures)}
                  className="w-4 h-4 text-sage-600 border-sage-300 rounded focus:ring-sage-500 focus:ring-2"
                />
                <span className="ml-3 text-forest-700 group-hover:text-sage-600 transition-colors">{feature.name}</span>
              </div>
              <span className="text-sm text-sage-500">({feature.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}
