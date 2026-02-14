'use server';

import { db } from '../firebase/admin';
import { Order } from '@/app/types/order';
import { Product } from '@/app/types/product';

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    pending: number;
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  recentOrders: Order[];
  lowStockProducts: Array<{
    productId: string;
    productName: string;
    variantName: string;
    stock: number;
  }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    if (!db) {
      throw new Error('Firebase Admin not initialized');
    }
    // Get all products
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.isActive !== false).length;

    // Get all orders
    const ordersSnapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
    const orders = ordersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      };
    }) as Order[];

    const totalOrders = orders.length;

    // Calculate total revenue from completed orders
    const totalRevenue = orders
      .filter((order) => order.status === 'delivered')
      .reduce((sum, order) => sum + (order.total || 0), 0);

    // Count orders by status
    const ordersByStatus = {
      pending: orders.filter((o) => o.status === 'pending').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };

    // Get recent orders (last 10)
    const recentOrders = orders.slice(0, 10);

    // Find low stock products
    const lowStockProducts: DashboardStats['lowStockProducts'] = [];
    products.forEach((product) => {
      product.variants?.forEach((variant) => {
        if (variant.stock < 10) {
          lowStockProducts.push({
            productId: product.id,
            productName: product.name,
            variantName: variant.name,
            stock: variant.stock,
          });
        }
      });
    });

    return {
      totalProducts,
      activeProducts,
      totalOrders,
      totalRevenue,
      ordersByStatus,
      recentOrders,
      lowStockProducts,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw new Error('Failed to fetch dashboard statistics');
  }
}
