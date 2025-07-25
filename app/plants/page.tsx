import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import PlantsHeader from "@/components/plants/PlantsHeader"
import PlantsFilters from "@/components/plants/PlantsFilters"
import PlantsGrid from "@/components/plants/PlantsGrid"
import { Suspense } from "react"

export default function PlantsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <PlantsHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <PlantsFilters />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
                    <p className="text-forest-600">Loading plants...</p>
                  </div>
                </div>
              }
            >
              <PlantsGrid />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
