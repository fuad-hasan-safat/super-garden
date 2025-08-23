"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  Calendar,
  MapPin,
  Camera,
  Edit,
  Mail,
  Shield,
  Star,
  X,
  Save,
  User,
  ShoppingBag,
  Package,
  CreditCard,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage({ user }: { user: any }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(`http://localhost:3000${user.profilePic}`)
  const [loading, setLoading] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    address: user.address || "",
    occupation: user.occupation || "",
    birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
    bio: user.bio || "",
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Show preview instantly
    const url = URL.createObjectURL(file)
    setPreview(url)

    setLoading(true)
    try {
      // Prepare multipart form for GraphQL upload
      const formData = new FormData()

      formData.append(
        "operations",
        JSON.stringify({
          query: `
            mutation UpdateUserProfilePic($id: String!, $file: Upload!) {
              updateUserProfilePic(id: $id, file: $file) {
                id
                profilePic
              }
            }
          `,
          variables: { id: user.id, file: null },
        }),
      )

      formData.append("map", JSON.stringify({ "0": ["variables.file"] }))
      formData.append("0", file, file.name)

      // Send directly to GraphQL endpoint
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "apollo-require-preflight": "true", // This fixes CSRF error
        },
      })

      const json = await res.json()
      if (json.errors) {
        throw new Error(json.errors[0].message)
      }

      console.log("Updated user:", json.data.updateUserProfilePic)
    } catch (err) {
      console.error("Upload failed", err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveProfile = async () => {
    if (!validateForm()) return

    setFormLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      // Update user data and close modal
      setIsModalOpen(false)
      // You might want to refresh the page or update the user state here
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile:", error)
      setFormErrors({ general: "Failed to update profile. Please try again." })
    } finally {
      setFormLoading(false)
    }
  }

  const mockPurchases = [
    {
      id: 1,
      productName: "Premium Subscription",
      amount: "$29.99",
      date: "2024-01-15",
      status: "Completed",
      image: "/premium-subscription-benefits.png",
    },
    {
      id: 2,
      productName: "Digital Course Bundle",
      amount: "$149.99",
      date: "2024-01-10",
      status: "Completed",
      image: "/digital-course-concept.png",
    },
    {
      id: 3,
      productName: "Monthly Plan",
      amount: "$19.99",
      date: "2024-01-01",
      status: "Active",
      image: "/monthly-plan.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 h-48 relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-80 flex-shrink-0">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-6">
              <CardContent className="p-6">
                {/* Profile Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                      <AvatarImage src={preview || user.profilePic || ""} alt={user.name} className="object-cover" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-600 text-2xl font-bold">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      disabled={loading}
                      className="absolute -bottom-2 -right-2 rounded-full bg-white shadow-lg hover:bg-white/90 transition-all duration-200 hover:scale-110"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleProfilePicChange}
                    />
                  </div>

                  <h1 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h1>
                  <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Profile Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-600">Location</p>
                      <p className="font-medium text-slate-800 text-sm truncate">
                        {user.address || "No address provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <Briefcase className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-600">Occupation</p>
                      <p className="font-medium text-slate-800 text-sm truncate">
                        {user.occupation || "No occupation added"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-600">Birth Date</p>
                      <p className="font-medium text-slate-800 text-sm">
                        {user.birthDate
                          ? new Date(user.birthDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-600">Account Role</p>
                      <p className="font-bold text-emerald-600 capitalize">{user.role}</p>
                    </div>
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col gap-1 h-auto p-3 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-xs">Security</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col gap-1 h-auto p-3 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    <Star className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs">Favorites</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 space-y-6">
            {/* Purchase Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">12</p>
                      <p className="text-sm text-slate-600">Total Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">$1,249</p>
                      <p className="text-sm text-slate-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">3</p>
                      <p className="text-sm text-slate-600">Active Plans</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Purchases */}
            {/* <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-green-50 transition-colors"
                  >
                    <img
                      src={purchase.image || "/placeholder.svg"}
                      alt={purchase.productName}
                      className="w-16 h-16 rounded-lg object-cover bg-emerald-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 truncate">{purchase.productName}</h3>
                      <p className="text-sm text-slate-600">
                        {new Date(purchase.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{purchase.amount}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          purchase.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Activity Feed */}
            {/* <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Star className="h-5 w-5 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800">Profile updated successfully</p>
                    <p className="text-xs text-slate-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800">New purchase: Premium Subscription</p>
                    <p className="text-xs text-slate-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800">Account security updated</p>
                    <p className="text-xs text-slate-600">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {formErrors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{formErrors.general}</p>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`transition-all duration-200 focus:ring-2 focus:ring-emerald-500 ${
                      formErrors.name ? "border-red-300 focus:border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`transition-all duration-200 focus:ring-2 focus:ring-emerald-500 ${
                      formErrors.email ? "border-red-300 focus:border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 border-slate-300"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Occupation Field */}
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm font-medium text-slate-700">
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 border-slate-300"
                    placeholder="Enter your occupation"
                  />
                </div>

                {/* Birth Date Field */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700">
                    Birth Date
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 border-slate-300"
                  />
                </div>

                {/* Bio Field */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-slate-700">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 border-slate-300 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border-slate-300 hover:bg-slate-50"
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  disabled={formLoading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {formLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
