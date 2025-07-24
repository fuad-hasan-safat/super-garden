import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
  category: string
  priceRange: [number, number]
  sortBy: "name" | "price-low" | "price-high" | "rating"
  searchQuery: string
}

const initialState: FiltersState = {
  category: "all",
  priceRange: [0, 1000],
  sortBy: "name",
  searchQuery: "",
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action: PayloadAction<"name" | "price-low" | "price-high" | "rating">) => {
      state.sortBy = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetFilters: (state) => {
      state.category = "all"
      state.priceRange = [0, 1000]
      state.sortBy = "name"
      state.searchQuery = ""
    },
  },
})

export const { setCategory, setPriceRange, setSortBy, setSearchQuery, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
