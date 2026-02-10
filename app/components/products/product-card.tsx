import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNaira } from '@/app/lib/utils/currency'
import type { Product } from '@/app/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price))

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-4xl">🐟</span>
            </div>
          )}

          {product.featured && (
            <Badge className="absolute top-3 right-3 bg-accent">Featured</Badge>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 text-sm sm:text-base">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-1">
            {product.category}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-bold text-primary text-sm sm:text-base">
              From {formatNaira(minPrice)}
            </p>
            {product.inStock && (
              <Badge variant="outline" className="text-xs">
                In Stock
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
