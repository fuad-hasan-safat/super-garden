import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import productsReducer from "./features/products/productsSlice"
import filtersReducer from "./features/filters/filtersSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
