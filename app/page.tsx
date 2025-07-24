import Header from "@/components/layout/Header"
import HeroSection from "@/components/home/HeroSection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import PlantCategories from "@/components/home/PlantCategories"
import BenefitsSection from "@/components/home/BenefitsSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import NewsletterSection from "@/components/home/NewsletterSection"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <PlantCategories />
        <BenefitsSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
