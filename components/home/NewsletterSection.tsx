import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-sage-600 to-forest-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-mint-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-coral-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            <span>Get 15% off your first order</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Plant Community</h2>
          <p className="text-sage-100 mb-8 max-w-2xl mx-auto text-lg">
            Get expert plant care tips, exclusive deals, and be the first to know about new arrivals. Plus, enjoy 15%
            off your first purchase!
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-300 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-sage-200 rounded-full focus:border-white/40 focus:ring-white/20"
                />
              </div>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-sage-200">No spam, unsubscribe at any time. We respect your privacy.</p>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-12 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-sage-200">Newsletter Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-sage-200">Plant Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-sage-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
