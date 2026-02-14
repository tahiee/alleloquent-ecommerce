'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/app/components/admin/product-form';
import { updateProduct, deleteProduct } from '@/app/lib/services/product-service';
import { Product, UpdateProductInput, ProductVariant } from '@/app/types/product';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  variants: Omit<ProductVariant, 'id'>[];
  features: string[];
  featured: boolean;
  isActive: boolean;
}

export function EditProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    const input: UpdateProductInput = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      category: data.category,
      images: data.images,
      variants: data.variants.map((v, index) => ({
        id: product.variants[index]?.id || `variant-${Date.now()}-${index}`,
        ...v,
      })),
      features: data.features,
      featured: data.featured,
      isActive: data.isActive,
    };

    await updateProduct(product.id, input);
  };

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete "${product.name}"? This will hide it from the store.`
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      await deleteProduct(product.id);
      toast.success('Product deleted successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {deleting ? 'Deleting...' : 'Delete Product'}
        </Button>
      </div>

      <ProductForm product={product} onSubmit={handleSubmit} submitLabel="Update Product" />
    </div>
  );
}
