'use client';

import { ProductForm } from '@/app/components/admin/product-form';
import { createProduct } from '@/app/lib/services/product-service';
import { CreateProductInput } from '@/app/types/product';

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  variants: Array<{ name: string; price: number; stock: number; weight?: string }>;
  features: string[];
  featured: boolean;
  isActive: boolean;
}

export default function NewProductPage() {
  const handleSubmit = async (data: ProductFormData) => {
    const input: CreateProductInput = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      category: data.category,
      images: data.images,
      variants: data.variants,
      features: data.features,
      featured: data.featured,
    };

    await createProduct(input);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product for your store</p>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
    </div>
  );
}
