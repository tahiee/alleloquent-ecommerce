"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { CustomerInfo } from "@/app/types/order"

interface CustomerInfoFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void
  initialData?: Partial<CustomerInfo>
}

export function CustomerInfoForm({ onSubmit, initialData }: CustomerInfoFormProps) {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    additionalInfo: initialData?.additionalInfo || "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-semibold text-slate-900">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            className={`mt-1.5 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-slate-900">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className={`mt-1.5 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-semibold text-slate-900">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+234 800 000 0000"
              className={`mt-1.5 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-sm font-semibold text-slate-900">
            Delivery Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="123 Main Street"
            className={`mt-1.5 ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-sm font-semibold text-slate-900">
              City
            </Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Lagos"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="state" className="text-sm font-semibold text-slate-900">
              State
            </Label>
            <Input
              id="state"
              type="text"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Lagos"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="additionalInfo" className="text-sm font-semibold text-slate-900">
            Additional Info (Landmarks, instructions)
          </Label>
          <Input
            id="additionalInfo"
            type="text"
            value={formData.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            placeholder="Near the blue building"
            className="mt-1.5"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-orange-500/30 transition-all"
      >
        Continue to Payment
      </button>
    </form>
  )
}
