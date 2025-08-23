import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import productsReducer from "./features/products/productsSlice"
import filtersReducer from "./features/filters/filtersSlice"
import authReducer from "./features/auth/auth.slice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    filters: filtersReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
