import Link from 'next/link';
import { getAllProducts } from '@/app/lib/services/product-service';
import { ProductList } from '@/app/components/admin/product-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Force dynamic rendering - do not statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}
