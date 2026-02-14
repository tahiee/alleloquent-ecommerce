"use client";

import {
  CheckCircle,
  Package,
  MapPin,
  CreditCard,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatNaira } from "@/app/lib/utils/currency";
import type { Order } from "@/app/types/order";
import { Timestamp } from "firebase/firestore";

interface OrderConfirmationClientProps {
  order: Order;
}

export function OrderConfirmationClient({
  order,
}: OrderConfirmationClientProps) {
  const createdDate = order.createdAt instanceof Timestamp
    ? order.createdAt.toDate()
    : order.createdAt instanceof Date
    ? order.createdAt
    : new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for your order. We&apos;ll send you a confirmation email
              shortly.
            </p>
          </div>

          {/* Order Number Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-orange-100 text-sm mb-1">Order Number</p>
                <p className="text-3xl font-bold">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100 text-sm mb-1">Order Date</p>
                <p className="text-xl font-semibold">
                  {createdDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Delivery Address
                </h2>
              </div>
              <div className="space-y-2 text-slate-700">
                <p className="font-semibold text-slate-900">
                  {order.customer.name}
                </p>
                <p>{order.customer.address}</p>
                {order.customer.city && order.customer.state && (
                  <p>
                    {order.customer.city}, {order.customer.state}
                  </p>
                )}
                <p className="pt-2 border-t border-slate-200">
                  {order.customer.phone}
                </p>
                <p>{order.customer.email}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Payment Details
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold capitalize">
                    {order.paymentMethod.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span
                    className={`font-semibold capitalize ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                {order.deliveryDate && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">
                      Expected:{" "}
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-slate-900">Order Items</h2>
            </div>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-slate-600">{item.variantName}</p>
                    <p className="text-sm text-slate-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {formatNaira(item.subtotal)}
                    </p>
                    <p className="text-sm text-slate-600">
                      {formatNaira(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-6 border-t-2 border-slate-300 space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  {formatNaira(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {formatNaira(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total:</span>
                <span className="text-orange-600">
                  {formatNaira(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/30 transition-all"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-block text-center border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all"
            >
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
