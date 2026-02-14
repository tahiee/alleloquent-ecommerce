"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/lib/hooks/use-cart"
import { CustomerInfoForm } from "./components/customer-info-form"
import { OrderSummary } from "./components/order-summary"
import { createOrder } from "@/app/lib/services/order-service"
import type { CustomerInfo, OrderItem, PaymentMethod } from "@/app/types/order"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("cash_on_delivery")

  // Redirect if cart is empty
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-slate-600 mb-8">
              Add some products to your cart before checking out.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/30 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = async (customerInfo: CustomerInfo) => {
    setIsProcessing(true)
    setError(null)

    try {
      // Prepare order items
      const orderItems: OrderItem[] = cart.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.image,
        variantId: item.variantId,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }))

      // Create order
      const result = await createOrder({
        customer: customerInfo,
        items: orderItems,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        total: cart.total,
        paymentMethod: selectedPaymentMethod,
      })

      if (result.success && result.orderId) {
        // Clear cart
        clearCart()

        // Redirect to order confirmation
        router.push(`/orders/${result.orderId}`)
      } else {
        setError(result.error || "Failed to create order. Please try again.")
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Cart</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-slate-200 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Delivery Information</h2>
              <CustomerInfoForm onSubmit={handleCheckout} />

              {/* Payment Method Selection */}
              <div className="mt-8 pt-6 border-t-2 border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={selectedPaymentMethod === "cash_on_delivery"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-4 h-4 text-orange-600"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">Cash on Delivery</p>
                      <p className="text-sm text-slate-600">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={selectedPaymentMethod === "bank_transfer"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-4 h-4 text-orange-600"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">Bank Transfer</p>
                      <p className="text-sm text-slate-600">Transfer to our bank account</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors opacity-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="w-4 h-4 text-orange-600"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">Card Payment</p>
                      <p className="text-sm text-slate-600">Coming soon</p>
                    </div>
                  </label>
                </div>
              </div>

              {isProcessing && (
                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-semibold text-center">
                    Processing your order...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                items={cart.items}
                subtotal={cart.subtotal}
                shipping={cart.shipping}
                total={cart.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
