import { getOrderAdmin } from '@/app/lib/services/order-service';
import { OrderDetailsClient } from './order-details-client';
import { notFound } from 'next/navigation';

// Force dynamic rendering - do not statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderAdmin(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600 mt-2">Order #{order.orderNumber}</p>
      </div>

      <OrderDetailsClient order={order} />
    </div>
  );
}
