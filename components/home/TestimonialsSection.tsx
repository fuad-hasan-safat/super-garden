import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Plant Enthusiast",
    image: "/placeholder.svg?height=80&width=80&text=Sarah",
    rating: 5,
    text: "GreenHaven transformed my apartment into a jungle paradise! The plants arrived healthy and the care instructions were perfect.",
  },
  {
    name: "Mike Chen",
    role: "First-time Plant Parent",
    image: "/placeholder.svg?height=80&width=80&text=Mike",
    rating: 5,
    text: "I was nervous about keeping plants alive, but their beginner-friendly selection and support made it so easy. My snake plant is thriving!",
  },
  {
    name: "Emma Davis",
    role: "Interior Designer",
    image: "/placeholder.svg?height=80&width=80&text=Emma",
    rating: 5,
    text: "The quality and variety are outstanding. I regularly recommend GreenHaven to my clients for their plant needs.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-mint-50 to-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-4">What Plant Parents Say</h2>
          <p className="text-forest-600 max-w-2xl mx-auto text-lg">
            Join thousands of happy customers who've created their perfect green spaces with our help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-sage-200" />

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-forest-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-forest-800">{testimonial.name}</div>
                  <div className="text-sm text-forest-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
