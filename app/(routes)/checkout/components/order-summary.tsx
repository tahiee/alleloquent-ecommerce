"use client"

import Image from "next/image"
import { formatNaira } from "@/app/lib/utils/currency"
import type { CartItem } from "@/app/types/cart"

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border-2 border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">
                {item.productName}
              </h3>
              <p className="text-sm text-slate-600">{item.variantName}</p>
              <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900">
                {formatNaira(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-slate-200 pt-4 space-y-3">
        <div className="flex justify-between text-slate-700">
          <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold">{formatNaira(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-700">
          <span>Shipping</span>
          <span className="font-semibold">{formatNaira(shipping)}</span>
        </div>

        <div className="border-t-2 border-slate-300 pt-3 flex justify-between text-lg font-bold text-slate-900">
          <span>Total</span>
          <span className="text-orange-600">{formatNaira(total)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <p className="text-sm text-orange-800">
          <span className="font-semibold">📦 Delivery:</span> Your order will be delivered within 1-2 business days
        </p>
      </div>
    </div>
  )
}
