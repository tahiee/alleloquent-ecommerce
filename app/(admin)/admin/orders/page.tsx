import { getAllOrders } from '@/app/lib/services/order-service';
import { OrderList } from '@/app/components/admin/order-list';

// Force dynamic rendering - do not statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-600 mt-2">View and manage customer orders</p>
      </div>

      <OrderList orders={orders} />
    </div>
  );
}
