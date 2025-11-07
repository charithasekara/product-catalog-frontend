import React from 'react';
import type { ProductDto } from '../services/products/productApi';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

interface ProductsGridProps {
  products?: ProductDto[];
  isLoading?: boolean;
  onEdit: (p: ProductDto) => void;
  onDelete: (id: number) => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    // show a responsive skeleton grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">No products yet. Click "Add New Product" to create one.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
