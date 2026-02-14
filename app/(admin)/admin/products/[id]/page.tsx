import { getProduct } from '@/app/lib/services/product-service';
import { EditProductClient } from './edit-product-client';
import { notFound } from 'next/navigation';

// Force dynamic rendering - do not statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-gray-600 mt-2">Update product information</p>
      </div>

      <EditProductClient product={product} />
    </div>
  );
}
