'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { ProductVariant } from '@/app/types/product';

interface VariantManagerProps {
  variants: Omit<ProductVariant, 'id'>[];
  onChange: (variants: Omit<ProductVariant, 'id'>[]) => void;
}

export function VariantManager({ variants, onChange }: VariantManagerProps) {
  const addVariant = () => {
    onChange([
      ...variants,
      {
        name: '',
        price: 0,
        stock: 0,
        weight: '',
      },
    ]);
  };

  const updateVariant = (index: number, field: keyof Omit<ProductVariant, 'id'>, value: string | number) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Product Variants</Label>
        <Button type="button" onClick={addVariant} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Variant
        </Button>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No variants yet. Click &quot;Add Variant&quot; to create one.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price (₦)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={variant.name}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      placeholder="e.g., Small Bunch"
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                      placeholder="0"
                      min="0"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))}
                      placeholder="0"
                      min="0"
                      className="min-w-[80px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.weight || ''}
                      onChange={(e) => updateVariant(index, 'weight', e.target.value)}
                      placeholder="e.g., 2kg"
                      className="min-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
