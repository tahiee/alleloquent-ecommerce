// Firestore collection names
export const COLLECTIONS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  USERS: 'users',
  CATEGORIES: 'categories',
  SETTINGS: 'settings',
  MIGRATIONS: '_migrations',
} as const

// Helper function to get collection path
export function getCollectionPath(collection: keyof typeof COLLECTIONS): string {
  return COLLECTIONS[collection]
}

// Firestore document paths
export const getProductPath = (productId: string) => `${COLLECTIONS.PRODUCTS}/${productId}`
export const getOrderPath = (orderId: string) => `${COLLECTIONS.ORDERS}/${orderId}`
export const getUserPath = (userId: string) => `${COLLECTIONS.USERS}/${userId}`
