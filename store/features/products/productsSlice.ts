import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  tags: string[]
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [
    {
      id: "1",
      name: "Monstera Deliciosa",
      price: 45,
      originalPrice: 55,
      image: "/placeholder.svg?height=400&width=400&text=Monstera+Deliciosa",
      images: ["/placeholder.svg?height=400&width=400&text=Monstera+Deliciosa"],
      description:
        "The iconic Swiss Cheese Plant with stunning split leaves. Perfect for adding tropical vibes to any room.",
      category: "Indoor Plants",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      tags: ["indoor", "tropical", "easy", "air-purifying", "medium-light"],
    },
    {
      id: "2",
      name: "Snake Plant (Sansevieria)",
      price: 35,
      image: "/placeholder.svg?height=400&width=400&text=Snake+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Snake+Plant"],
      description: "Nearly indestructible plant that thrives in low light and purifies air while you sleep.",
      category: "Indoor Plants",
      rating: 4.9,
      reviews: 189,
      inStock: true,
      tags: ["indoor", "low-light", "easy", "air-purifying", "pet-safe"],
    },
    {
      id: "3",
      name: "Fiddle Leaf Fig",
      price: 65,
      image: "/placeholder.svg?height=400&width=400&text=Fiddle+Leaf+Fig",
      images: ["/placeholder.svg?height=400&width=400&text=Fiddle+Leaf+Fig"],
      description: "Statement plant with large, glossy leaves that adds elegance to any modern interior.",
      category: "Indoor Plants",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      tags: ["indoor", "bright-light", "moderate", "statement"],
    },
    {
      id: "4",
      name: "Pothos Golden",
      price: 25,
      image: "/placeholder.svg?height=400&width=400&text=Golden+Pothos",
      images: ["/placeholder.svg?height=400&width=400&text=Golden+Pothos"],
      description: "Trailing vine with heart-shaped leaves. Perfect for hanging baskets or climbing up moss poles.",
      category: "Indoor Plants",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      tags: ["indoor", "trailing", "easy", "air-purifying", "low-light"],
    },
    {
      id: "5",
      name: "Rubber Plant",
      price: 40,
      image: "/placeholder.svg?height=400&width=400&text=Rubber+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Rubber+Plant"],
      description: "Glossy, dark green leaves make this plant a stunning focal point for any room.",
      category: "Indoor Plants",
      rating: 4.5,
      reviews: 156,
      inStock: true,
      tags: ["indoor", "bright-light", "easy", "air-purifying"],
    },
    {
      id: "6",
      name: "ZZ Plant",
      price: 38,
      image: "/placeholder.svg?height=400&width=400&text=ZZ+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=ZZ+Plant"],
      description: "Drought-tolerant plant with waxy, dark green leaves. Perfect for beginners and low-light spaces.",
      category: "Indoor Plants",
      rating: 4.8,
      reviews: 167,
      inStock: true,
      tags: ["indoor", "low-light", "easy", "drought-tolerant"],
    },
    {
      id: "7",
      name: "Echeveria Succulent",
      price: 18,
      image: "/placeholder.svg?height=400&width=400&text=Echeveria+Succulent",
      images: ["/placeholder.svg?height=400&width=400&text=Echeveria+Succulent"],
      description: "Beautiful rosette-shaped succulent with blue-green leaves and pink edges.",
      category: "Succulents",
      rating: 4.6,
      reviews: 92,
      inStock: true,
      tags: ["succulent", "bright-light", "easy", "drought-tolerant", "small"],
    },
    {
      id: "8",
      name: "Jade Plant",
      price: 28,
      image: "/placeholder.svg?height=400&width=400&text=Jade+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Jade+Plant"],
      description: "Lucky plant with thick, glossy leaves. Known to bring good fortune and prosperity.",
      category: "Succulents",
      rating: 4.7,
      reviews: 134,
      inStock: true,
      tags: ["succulent", "bright-light", "easy", "good-luck"],
    },
    {
      id: "9",
      name: "Aloe Vera",
      price: 22,
      image: "/placeholder.svg?height=400&width=400&text=Aloe+Vera",
      images: ["/placeholder.svg?height=400&width=400&text=Aloe+Vera"],
      description: "Medicinal plant with healing properties. Great for treating minor cuts and burns.",
      category: "Succulents",
      rating: 4.8,
      reviews: 178,
      inStock: true,
      tags: ["succulent", "bright-light", "easy", "medicinal", "pet-safe"],
    },
    {
      id: "10",
      name: "String of Pearls",
      price: 32,
      image: "/placeholder.svg?height=400&width=400&text=String+of+Pearls",
      images: ["/placeholder.svg?height=400&width=400&text=String+of+Pearls"],
      description: "Unique trailing succulent with bead-like leaves. Perfect for hanging planters.",
      category: "Succulents",
      rating: 4.4,
      reviews: 87,
      inStock: true,
      tags: ["succulent", "trailing", "bright-light", "moderate", "unique"],
    },
    {
      id: "11",
      name: "Basil Plant",
      price: 15,
      image: "/placeholder.svg?height=400&width=400&text=Basil+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Basil+Plant"],
      description: "Fresh basil for your kitchen garden. Perfect for cooking and natural pest control.",
      category: "Herbs",
      rating: 4.5,
      reviews: 145,
      inStock: true,
      tags: ["herb", "edible", "bright-light", "easy", "aromatic"],
    },
    {
      id: "12",
      name: "Lavender Plant",
      price: 24,
      image: "/placeholder.svg?height=400&width=400&text=Lavender+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Lavender+Plant"],
      description: "Fragrant herb known for its calming properties and beautiful purple flowers.",
      category: "Herbs",
      rating: 4.6,
      reviews: 112,
      inStock: true,
      tags: ["herb", "flowering", "bright-light", "aromatic", "calming"],
    },
    {
      id: "13",
      name: "Peace Lily",
      price: 42,
      image: "/placeholder.svg?height=400&width=400&text=Peace+Lily",
      images: ["/placeholder.svg?height=400&width=400&text=Peace+Lily"],
      description: "Elegant flowering plant that blooms white flowers and purifies air effectively.",
      category: "Flowering Plants",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      tags: ["flowering", "indoor", "air-purifying", "low-light", "moderate"],
    },
    {
      id: "14",
      name: "Bird of Paradise",
      price: 85,
      originalPrice: 95,
      image: "/placeholder.svg?height=400&width=400&text=Bird+of+Paradise",
      images: ["/placeholder.svg?height=400&width=400&text=Bird+of+Paradise"],
      description: "Dramatic tropical plant with large paddle-shaped leaves and exotic orange flowers.",
      category: "Indoor Plants",
      rating: 4.5,
      reviews: 78,
      inStock: true,
      tags: ["tropical", "flowering", "bright-light", "advanced", "statement"],
    },
    {
      id: "15",
      name: "Spider Plant",
      price: 20,
      image: "/placeholder.svg?height=400&width=400&text=Spider+Plant",
      images: ["/placeholder.svg?height=400&width=400&text=Spider+Plant"],
      description: "Easy-care plant that produces baby plantlets. Great for beginners and pet owners.",
      category: "Indoor Plants",
      rating: 4.8,
      reviews: 234,
      inStock: true,
      tags: ["indoor", "easy", "pet-safe", "air-purifying", "propagating"],
    },
    {
      id: "16",
      name: "Philodendron Heartleaf",
      price: 28,
      image: "/placeholder.svg?height=400&width=400&text=Heartleaf+Philodendron",
      images: ["/placeholder.svg?height=400&width=400&text=Heartleaf+Philodendron"],
      description: "Fast-growing trailing plant with heart-shaped leaves. Perfect for shelves and hanging baskets.",
      category: "Indoor Plants",
      rating: 4.6,
      reviews: 189,
      inStock: true,
      tags: ["indoor", "trailing", "easy", "fast-growing", "low-light"],
    },
  ],
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setProducts, setLoading, setError } = productsSlice.actions
export default productsSlice.reducer
