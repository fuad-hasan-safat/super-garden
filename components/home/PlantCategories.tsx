import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Indoor Plants",
    description: "Perfect for brightening up your living space",
    image: "/placeholder.svg?height=400&width=600&text=Indoor+Plants",
    count: "120+ plants",
  },
  {
    name: "Succulents",
    description: "Low-maintenance beauties for busy lifestyles",
    image: "/placeholder.svg?height=400&width=600&text=Succulents",
    count: "80+ varieties",
  },
  {
    name: "Air Purifiers",
    description: "Plants that clean and freshen your air naturally",
    image: "/placeholder.svg?height=400&width=600&text=Air+Purifying+Plants",
    count: "45+ plants",
  },
]

export default function PlantCategories() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-sage-50 to-mint-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-4">Shop by Category</h2>
          <p className="text-forest-600 max-w-2xl mx-auto text-lg">
            Find the perfect plants for your space and lifestyle. From low-maintenance succulents to air-purifying
            champions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-2">
                    <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>

                  <div className="flex items-center text-white group-hover:text-sage-200 transition-colors">
                    <span className="font-medium">Explore Collection</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
