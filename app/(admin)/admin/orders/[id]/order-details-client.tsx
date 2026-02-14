'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/app/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { updateOrderStatus, updatePaymentStatus } from '@/app/lib/services/order-service';
import { toast } from 'sonner';
import { Package, MapPin, Phone, Mail, CreditCard, Clock } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export function OrderDetailsClient({ order: initialOrder }: { order: Order }) {
  const router = useRouter();
  const [order] = useState(initialOrder);
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status);
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string | Timestamp | undefined) => {
    if (!date) return 'N/A';

    let d: Date;
    if (date instanceof Timestamp) {
      d = date.toDate();
    } else if (typeof date === 'string') {
      d = new Date(date);
    } else {
      d = date;
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  const handleUpdateStatus = async () => {
    if (newStatus === order.status) {
      toast.error('Please select a different status');
      return;
    }

    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus, statusNote || undefined);
      toast.success('Order status updated successfully');
      router.refresh();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePaymentStatus = async (paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded') => {
    if (paymentStatus === order.paymentStatus) {
      return;
    }

    try {
      await updatePaymentStatus(order.id, paymentStatus);
      toast.success('Payment status updated');
      router.refresh();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status];
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.variantName}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(order.subtotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Shipping
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(order.shipping)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold text-lg">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    {formatCurrency(order.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-gray-600">Full Name</Label>
                <p className="font-medium">{order.customer.name}</p>
              </div>
              {order.customer.email && (
                <div>
                  <Label className="text-gray-600 flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <p className="font-medium">{order.customer.email}</p>
                </div>
              )}
              <div>
                <Label className="text-gray-600 flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Phone
                </Label>
                <p className="font-medium">{order.customer.phone}</p>
              </div>
            </div>
            <div>
              <Label className="text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Delivery Address
              </Label>
              <p className="font-medium">{order.customer.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Status History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Status History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.statusHistory.map((history, index) => (
                <div key={index} className="flex gap-4 items-start pb-4 border-b last:border-0">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      history.status
                    )}`}
                  >
                    {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{history.note}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(history.timestamp)} • by {history.updatedBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Update Status */}
        <Card>
          <CardHeader>
            <CardTitle>Update Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as OrderStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Note (Optional)</Label>
              <Textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add a note about this status update..."
                rows={3}
              />
            </div>
            <Button onClick={handleUpdateStatus} disabled={updating} className="w-full">
              {updating ? 'Updating...' : 'Update Status'}
            </Button>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-600">Payment Method</Label>
              <p className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
            <div className="space-y-2">
              <Label>Payment Status</Label>
              <Select value={order.paymentStatus} onValueChange={handleUpdatePaymentStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Order Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <Label className="text-gray-600">Order Number</Label>
              <p className="font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <Label className="text-gray-600">Created</Label>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <Label className="text-gray-600">Last Updated</Label>
              <p className="font-medium">{formatDate(order.updatedAt)}</p>
            </div>
            {order.deliveryDate && (
              <div>
                <Label className="text-gray-600">Requested Delivery</Label>
                <p className="font-medium">{formatDate(order.deliveryDate)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
