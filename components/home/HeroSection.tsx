import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sage-50 via-mint-50 to-cream-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sage-300 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-mint-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-forest-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container  py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>New Collection Available</span>
            </div>

            <h1 className=" leading-tight lg:leading-[1.2] text-4xl lg:text-6xl font-bold  text-forest-800">
              Bring Nature <span className="block text-sage-600">Into Your Home</span>
            </h1>

            <p className="text-xl text-forest-600 max-w-2xl leading-relaxed text-justify">
              Welcome to our little green corner online, where every plant finds a loving home. 🌱✨
              We carefully curate healthy, vibrant plants — from tiny succulents to lush indoor trees — and deliver them right to your doorstep.
              Whether you’re a seasoned plant parent or just starting your journey, we’re here to help you grow your own urban jungle.
              Because we believe bringing nature indoors should feel personal, joyful, and beautifully simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/plants">
                <Button
                  size="lg"
                  className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Shop Plants
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/care-guide">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 bg-transparent"
                >
                  Plant Care Guide
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-800">500+</div>
                <div className="text-sm text-forest-600">Happy Plants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-800">1000+</div>
                <div className="text-sm text-forest-600">Plant Parents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-800">4.9★</div>
                <div className="text-sm text-forest-600">Customer Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/plants/Indoor-Plants-Guide-01-0505180010.jpg?height=500&width=700&text=Beautiful+Plants+Collection"
                alt="Beautiful Plants Collection"
                width={700}
                height={500}
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover  object-center"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-coral-100 p-4 rounded-2xl shadow-lg z-20">
              <div className="text-coral-600 font-semibold">Free Delivery</div>
              <div className="text-sm text-coral-500">On orders over BDT3000+</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-mint-100 p-4 rounded-2xl shadow-lg z-20">
              <div className="text-mint-700 font-semibold">Plant Care</div>
              <div className="text-sm text-mint-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
