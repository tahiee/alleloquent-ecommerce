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
  price: number
  currency: "NGN"
  images: string[]
  category: string
  variants: ProductVariant[]
  inStock: boolean
  featured: boolean
  shipping: ShippingInfo
  createdAt: Date
  updatedAt: Date
}
