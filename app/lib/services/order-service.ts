"use server";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import { COLLECTIONS } from "@/app/lib/firebase/collections";
import type {
  Order,
  CreateOrderInput,
  OrderItem,
  OrderStatus,
} from "@/app/types/order";

// Generate unique order number: ORD-YYYYMMDD-XXXX
export async function generateOrderNumber(): Promise<string> {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");

  // Get today's order count to increment
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  try {
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const q = query(
      ordersRef,
      where("createdAt", ">=", Timestamp.fromDate(todayStart)),
      where("createdAt", "<", Timestamp.fromDate(todayEnd)),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);
    const count = snapshot.size + 1;
    const sequence = count.toString().padStart(4, "0");

    return `ORD-${dateStr}-${sequence}`;
  } catch (error) {
    console.error("Error generating order number:", error);
    // Fallback to timestamp-based
    const timestamp = Date.now().toString().slice(-4);
    return `ORD-${dateStr}-${timestamp}`;
  }
}

// Create a new order
export async function createOrder(input: CreateOrderInput): Promise<{
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
}> {
  try {
    // Validate input
    if (
      !input.customer.name ||
      !input.customer.phone ||
      !input.customer.address
    ) {
      return { success: false, error: "Customer information is incomplete" };
    }

    if (!input.items || input.items.length === 0) {
      return { success: false, error: "Order must contain at least one item" };
    }

    // Generate order number
    const orderNumber = await generateOrderNumber();

    // Calculate subtotals for each item
    const itemsWithSubtotal: OrderItem[] = input.items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    // Prepare order data
    const orderData: Omit<Order, "id"> = {
      orderNumber,
      customer: input.customer,
      userId: input.userId,
      items: itemsWithSubtotal,
      subtotal: input.subtotal,
      shipping: input.shipping,
      tax: 0,
      discount: 0,
      total: input.total,
      paymentMethod: input.paymentMethod,
      paymentStatus:
        input.paymentMethod === "cash_on_delivery" ? "pending" : "pending",
      status: "pending",
      statusHistory: [
        {
          status: "pending" as OrderStatus,
          timestamp: Timestamp.now(),
          updatedBy: "system",
          note: "Order created",
        },
      ],
      deliveryDate: input.deliveryDate,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Add order to Firestore
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const docRef = await addDoc(ordersRef, orderData);

    console.log(`Order created successfully: ${orderNumber} (${docRef.id})`);

    return {
      success: true,
      orderId: docRef.id,
      orderNumber,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

// Get order by ID
export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return null;
    }

    return {
      id: orderSnap.id,
      ...orderSnap.data(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

// Get order by order number
export async function getOrderByNumber(
  orderNumber: string
): Promise<Order | null> {
  try {
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const q = query(
      ordersRef,
      where("orderNumber", "==", orderNumber),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order by number:", error);
    return null;
  }
}

// Get orders by user ID
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

// ===== ADMIN FUNCTIONS =====

// Get all orders (Admin only)
export async function getAllOrders(): Promise<Order[]> {
  try {
    const { db: adminDb } = await import("../firebase/admin");

    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }
    const snapshot = await adminDb
      .collection(COLLECTIONS.ORDERS)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        deliveryDate: data.deliveryDate?.toDate?.() || data.deliveryDate,
        statusHistory:
          data.statusHistory?.map(
            (
              h: { timestamp?: { toDate?: () => Date } } & Record<
                string,
                unknown
              >
            ) => ({
              ...h,
              timestamp: h.timestamp?.toDate?.() || h.timestamp,
            })
          ) || [],
      } as Order;
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Get orders by status (Admin only)
export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  try {
    const { db: adminDb } = await import("../firebase/admin");
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }

    const snapshot = await adminDb
      .collection(COLLECTIONS.ORDERS)
      .where("status", "==", status)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        deliveryDate: data.deliveryDate?.toDate?.() || data.deliveryDate,
        statusHistory:
          data.statusHistory?.map(
            (
              h: { timestamp?: { toDate?: () => Date } } & Record<
                string,
                unknown
              >
            ) => ({
              ...h,
              timestamp: h.timestamp?.toDate?.() || h.timestamp,
            })
          ) || [],
      } as Order;
    });
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Update order status (Admin only)
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  note?: string,
  updatedBy: string = "admin"
): Promise<void> {
  try {
    const { db: adminDb } = await import("../firebase/admin");

    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }

    const orderRef = adminDb.collection(COLLECTIONS.ORDERS).doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      throw new Error("Order not found");
    }

    const currentData = orderDoc.data() as Order;
    const statusHistory = currentData.statusHistory || [];

    // Add new status to history
    statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      updatedBy,
      note: note || `Status updated to ${newStatus}`,
    });

    await orderRef.update({
      status: newStatus,
      statusHistory,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}

// Update payment status (Admin only)
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
): Promise<void> {
  try {
    const { db: adminDb } = await import("../firebase/admin");

    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }

    await adminDb.collection(COLLECTIONS.ORDERS).doc(orderId).update({
      paymentStatus,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Failed to update payment status");
  }
}

// Get order by ID (Admin version with proper date conversion)
export async function getOrderAdmin(orderId: string): Promise<Order | null> {
  try {
    const { db: adminDb } = await import("../firebase/admin");

    if (!adminDb) {
      throw new Error("Firebase Admin not initialized");
    }

    const orderDoc = await adminDb
      .collection(COLLECTIONS.ORDERS)
      .doc(orderId)
      .get();

    if (!orderDoc.exists) {
      return null;
    }

    const data = orderDoc.data()!;
    return {
      id: orderDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      deliveryDate: data.deliveryDate?.toDate?.() || data.deliveryDate,
      statusHistory:
        data.statusHistory?.map(
          (
            h: { timestamp?: { toDate?: () => Date } } & Record<string, unknown>
          ) => ({
            ...h,
            timestamp: h.timestamp?.toDate?.() || h.timestamp,
          })
        ) || [],
    } as Order;
  } catch (error) {
    console.error("Error fetching order (admin):", error);
    return null;
  }
}
