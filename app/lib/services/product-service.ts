"use server";

import { db } from "../firebase/admin";
import {
  Product,
  CreateProductInput,
  UpdateProductInput,
  ProductVariant,
} from "@/app/types/product";
import { v4 as uuidv4 } from "uuid";

const PRODUCTS_COLLECTION = "products";

export async function getAllProducts(): Promise<Product[]> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    const snapshot = await db
      .collection(PRODUCTS_COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    const snapshot = await db
      .collection(PRODUCTS_COLLECTION)
      .where("isActive", "==", true)
      .get();

    const products: Product[] = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as Product;
      })
      .sort((a, b) => {
        const aTime = new Date(a.createdAt as unknown as string | number | Date).getTime() || 0;
        const bTime = new Date(b.createdAt as unknown as string | number | Date).getTime() || 0;
        return bTime - aTime;
      });

    return products;
  } catch (error) {
    console.error("Error getting active products:", error);
    throw new Error("Failed to fetch active products");
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    const doc = await db.collection(PRODUCTS_COLLECTION).doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
    } as Product;
  } catch (error) {
    console.error("Error getting product:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    const snapshot = await db
      .collection(PRODUCTS_COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
    } as Product;
  } catch (error) {
    console.error("Error getting product by slug:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function createProduct(
  input: CreateProductInput,
  createdBy: string = "admin"
): Promise<Product> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    // Generate unique IDs for variants
    const variants: ProductVariant[] = input.variants.map((variant) => ({
      ...variant,
      id: uuidv4(),
    }));

    // Calculate base price from first variant
    const price = variants.length > 0 ? variants[0].price : 0;

    // Calculate inStock based on total stock
    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
    const inStock = totalStock > 0;

    const now = new Date();
    const productData = {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category,
      image: input.images[0] || "",
      images: input.images,
      variants,
      features: input.features,
      featured: input.featured || false,
      price,
      inStock,
      rating: 0,
      reviews: 0,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      createdBy,
      ...(input.shipping !== undefined ? { shipping: input.shipping } : {}),
    };

    const docRef = await db.collection(PRODUCTS_COLLECTION).add(productData);
    const doc = await docRef.get();
    const data = doc.data()!;

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
    } as Product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    const updateData = Object.fromEntries(
      Object.entries({
        ...input,
        updatedAt: new Date(),
      }).filter(([, value]) => value !== undefined)
    ) as Partial<Product>;

    // If variants updated, recalculate price and stock
    if (input.variants) {
      updateData.price =
        input.variants.length > 0 ? input.variants[0].price : 0;
      const totalStock = input.variants.reduce((sum, v) => sum + v.stock, 0);
      updateData.inStock = totalStock > 0;
    }

    // If images updated, update primary image
    if (input.images && input.images.length > 0) {
      updateData.image = input.images[0];
    }

    await db.collection(PRODUCTS_COLLECTION).doc(id).update(updateData);

    const product = await getProduct(id);
    if (!product) {
      throw new Error("Product not found after update");
    }

    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    if (!db) {
      throw new Error("Firebase Admin not initialized");
    }
    // Soft delete - just set isActive to false
    await db.collection(PRODUCTS_COLLECTION).doc(id).update({
      isActive: false,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

export async function updateProductVariant(
  productId: string,
  variantId: string,
  data: Partial<Omit<ProductVariant, "id">>
): Promise<Product> {
  try {
    const product = await getProduct(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const updatedVariants = product.variants.map((variant) =>
      variant.id === variantId ? { ...variant, ...data } : variant
    );

    return await updateProduct(productId, { variants: updatedVariants });
  } catch (error) {
    console.error("Error updating product variant:", error);
    throw new Error("Failed to update variant");
  }
}
