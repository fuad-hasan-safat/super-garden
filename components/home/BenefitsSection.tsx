import { Leaf, Heart, Home, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Leaf,
    title: "Air Purification",
    description: "Our plants naturally filter toxins and improve indoor air quality for healthier living.",
  },
  {
    icon: Heart,
    title: "Mental Wellness",
    description: "Studies show that plants reduce stress, boost mood, and increase productivity.",
  },
  {
    icon: Home,
    title: "Beautiful Spaces",
    description: "Transform any room into a vibrant, living space that reflects your personal style.",
  },
  {
    icon: Sparkles,
    title: "Easy Care",
    description: "We provide detailed care guides and ongoing support to help your plants thrive.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-4">Why Choose Plants?</h2>
          <p className="text-forest-600 max-w-2xl mx-auto text-lg">
            Beyond their natural beauty, plants offer incredible benefits for your health, home, and happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-mint-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-sage-600" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-sage-200/20 to-mint-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-bold text-forest-800 mb-3">{benefit.title}</h3>
              <p className="text-forest-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
