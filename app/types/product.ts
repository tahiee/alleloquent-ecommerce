import { Timestamp } from 'firebase/firestore'

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  weight?: string
}

export interface ShippingInfo {
  info: string
  estimatedDays: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number // Base price (usually from first variant)
  currency?: "NGN"
  image: string // Primary image
  images: string[]
  category: string
  rating: number
  reviews: number
  variants: ProductVariant[]
  inStock: boolean
  featured?: boolean
  features: string[]
  shipping?: ShippingInfo

  // Firestore fields
  isActive?: boolean
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
  createdBy?: string
}

export interface CreateProductInput {
  name: string
  slug: string
  description: string
  category: string
  images: string[]
  variants: Omit<ProductVariant, 'id'>[]
  features: string[]
  featured?: boolean
  shipping?: ShippingInfo
}

export interface UpdateProductInput {
  name?: string
  slug?: string
  description?: string
  category?: string
  images?: string[]
  variants?: ProductVariant[]
  features?: string[]
  featured?: boolean
  shipping?: ShippingInfo
  isActive?: boolean
}
