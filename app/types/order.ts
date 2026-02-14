import { Timestamp } from "firebase/firestore";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod =
  | "card"
  | "bank_transfer"
  | "cash_on_delivery"
  | "paystack";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  subtotal: number; // price * quantity
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  additionalInfo?: string;
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: Timestamp | Date;
  updatedBy: string; // User ID or 'system'
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // Display format: "ORD-20240212-0001"

  // Customer Information
  customer: CustomerInfo;
  userId?: string; // Optional - for authenticated users

  // Order Items
  items: OrderItem[];

  // Pricing
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;

  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paidAt?: Timestamp | Date;

  // Order Status
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];

  // Delivery
  deliveryDate?: Date;
  trackingNumber?: string;

  // Admin Notes
  adminNotes?: string;
  tags?: string[];

  // Timestamps
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  completedAt?: Timestamp | Date;
}

// Type for creating a new order (without auto-generated fields)
export interface CreateOrderInput {
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryDate?: Date;
  userId?: string;
}

// Type for updating order status
export interface UpdateOrderStatusInput {
  orderId: string;
  newStatus: OrderStatus;
  adminNote?: string;
  updatedBy: string;
}
