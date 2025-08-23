"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Calendar, MapPin, Camera, Edit, Mail, Shield, Star, X, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { graphqlClient } from "@/lib/graphqlClient"
import { UPDATE_USER_MUTATION } from "@/graphql/mutations"
import { UpdateUserResponse } from "@/types/userResponse"

export default function ProfilePage({ user: initialUser }: { user: any }) {
    const [user, setUser] = useState(initialUser) 
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [preview, setPreview] = useState<string | null>(
        user.profilePic ? `http://localhost:3000${user.profilePic}` : null
    )
    const [loading, setLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        occupation: user.occupation || "",
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
    })
    const [formLoading, setFormLoading] = useState(false)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)

        setLoading(true)
        try {
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

            const res = await fetch("http://localhost:3000/graphql", {
                method: "POST",
                body: formData,
                credentials: "include",
                headers: { "apollo-require-preflight": "true" },
            })

            const json = await res.json()
            if (json.errors) throw new Error(json.errors[0].message)

            const updated = json.data.updateUserProfilePic
            console.log("Updated user:", updated)

            // 🔥 Update user & preview with new picture
            setUser((prev: any) => ({ ...prev, profilePic: updated.profilePic }))
            setPreview(`http://localhost:3000${updated.profilePic}`)
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
            const { updateUser } = await graphqlClient.request<UpdateUserResponse>(UPDATE_USER_MUTATION, {
                id: formData.id,
                updateUserInput: {
                    id: formData.id,
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    occupation: formData.occupation,
                    birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
                },
            })

            console.log("✅ User updated successfully:", updateUser)

            setUser(updateUser)
            setFormData({
                id: updateUser.id,
                name: updateUser.name || "",
                email: updateUser.email || "",
                address: updateUser.address || "",
                occupation: updateUser.occupation || "",
                birthDate: updateUser.birthDate ? new Date(updateUser.birthDate).toISOString().split("T")[0] : "",
            })

            if (updateUser.profilePic) {
                setPreview(`http://localhost:3000${updateUser.profilePic}`)
            }

            setIsModalOpen(false)
        } catch (err: any) {
            console.error("❌ Failed to update user:", err)
            setFormErrors((prev) => ({
                ...prev,
                general: err.message || "Failed to update user",
            }))
        } finally {
            setFormLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative container mx-auto max-w-4xl px-4 py-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                            <Avatar className="relative h-32 w-32 border-4 border-white/30 shadow-2xl">
                                <AvatarImage src={preview || user.profilePic || ""} alt={user.name} className="object-cover" />
                                <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
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

                        <h1 className="text-4xl font-montserrat font-black text-white mb-2 tracking-tight">{user.name}</h1>
                        <div className="flex items-center gap-2 text-white/90 mb-6">
                            <Mail className="h-4 w-4" />
                            <span className="text-lg">{user.email}</span>
                        </div>

                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 -mt-8 relative z-10">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile Information Card */}
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-montserrat font-bold text-slate-800 flex items-center gap-2">
                                <Star className="h-5 w-5 text-emerald-600" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 transition-colors hover:bg-green-100">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Location</p>
                                    <p className="font-medium text-slate-800">{user.address || "No address provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 transition-colors hover:bg-green-100">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Occupation</p>
                                    <p className="font-medium text-slate-800">{user.occupation || "No occupation added"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 transition-colors hover:bg-green-100">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Birth Date</p>
                                    <p className="font-medium text-slate-800">
                                        {user.birthDate
                                            ? new Date(user.birthDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "No birth date provided"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Details Card */}
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-montserrat font-bold text-slate-800 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-green-600" />
                                Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600">Account Role</p>
                                        <p className="font-bold text-lg text-emerald-600 capitalize">{user.role}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-slate-50">
                                <p className="text-sm text-slate-600 mb-2">Account Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium text-green-600">Active</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-slate-50">
                                <p className="text-sm text-slate-600 mb-2">Member Since</p>
                                <p className="font-medium text-slate-800">
                                    {new Date().toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-montserrat font-bold text-slate-800">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(true)}
                                className="h-auto p-4 flex flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent border-slate-200"
                            >
                                <Edit className="h-6 w-6 text-emerald-600" />
                                <span className="text-sm font-medium">Edit Profile</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto p-4 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200 bg-transparent border-slate-200"
                            >
                                <Shield className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-medium">Security</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto p-4 flex flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent border-slate-200"
                            >
                                <Mail className="h-6 w-6 text-emerald-600" />
                                <span className="text-sm font-medium">Messages</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto p-4 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200 bg-transparent border-slate-200"
                            >
                                <Star className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-medium">Favorites</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
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
                                        className={`transition-all duration-200 focus:ring-2 focus:ring-emerald-500 ${formErrors.name ? "border-red-300 focus:border-red-500" : "border-slate-300"
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
                                        className={`transition-all duration-200 focus:ring-2 focus:ring-emerald-500 ${formErrors.email ? "border-red-300 focus:border-red-500" : "border-slate-300"
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
