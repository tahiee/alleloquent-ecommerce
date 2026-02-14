import { Timestamp } from 'firebase/firestore'

export type UserRole = 'customer' | 'admin'

export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  role: UserRole

  // Profile Information
  address?: string
  city?: string
  state?: string

  // Account Status
  isActive: boolean
  emailVerified: boolean

  // Timestamps
  createdAt: Timestamp
  lastLoginAt?: Timestamp
  updatedAt: Timestamp
}

// Type for creating a new user document
export interface CreateUserInput {
  uid: string
  email: string
  displayName: string
  role?: UserRole // Defaults to 'customer'
}

// Type for updating user profile
export interface UpdateUserInput {
  displayName?: string
  phoneNumber?: string
  address?: string
  city?: string
  state?: string
}

// Type for auth context
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
}
