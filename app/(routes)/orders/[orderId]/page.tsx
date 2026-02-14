import { getOrder } from "@/app/lib/services/order-service"
import { OrderConfirmationClient } from "./order-confirmation-client"
import { notFound } from "next/navigation"

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  const order = await getOrder(orderId)

  if (!order) {
    notFound()
  }

  return <OrderConfirmationClient order={order} />
}
