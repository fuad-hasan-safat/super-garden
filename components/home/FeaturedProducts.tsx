import Image from "next/image"
import { Star, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredPlants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 45,
    originalPrice: 55,
    image: "/placeholder.svg?height=300&width=300&text=Monstera+Deliciosa",
    rating: 4.8,
    reviews: 124,
    tag: "Bestseller",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    price: 65,
    image: "/placeholder.svg?height=300&width=300&text=Fiddle+Leaf+Fig",
    rating: 4.6,
    reviews: 89,
    tag: "Popular",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Snake Plant",
    price: 35,
    image: "/placeholder.svg?height=300&width=300&text=Snake+Plant",
    rating: 4.9,
    reviews: 156,
    tag: "Low Light",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Pothos Golden",
    price: 25,
    image: "/placeholder.svg?height=300&width=300&text=Pothos+Golden",
    rating: 4.7,
    reviews: 203,
    tag: "Air Purifier",
    difficulty: "Easy",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-4">Featured Plants</h2>
          <p className="text-forest-600 max-w-2xl mx-auto text-lg">
            Handpicked favorites that bring life and beauty to any space. Perfect for beginners and plant enthusiasts
            alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlants.map((plant) => (
            <div
              key={plant.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-sage-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Tags */}
                <div className="absolute top-3 left-3">
                  <span className="bg-sage-500 text-white px-3 py-1 rounded-full text-xs font-medium">{plant.tag}</span>
                </div>

                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-forest-700 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plant.difficulty === "Easy" ? "bg-mint-100 text-mint-700" : "bg-coral-100 text-coral-700"
                    }`}
                  >
                    {plant.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-forest-800 mb-2 text-lg">{plant.name}</h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(plant.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-forest-600 ml-2">({plant.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-forest-800">${plant.price}</span>
                    {plant.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${plant.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white rounded-full font-medium transition-all duration-300">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-3 rounded-full font-medium bg-transparent"
          >
            View All Plants
          </Button>
        </div>
      </div>
    </section>
  )
}
