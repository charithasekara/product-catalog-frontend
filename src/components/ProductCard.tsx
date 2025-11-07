import type { FC } from 'react';
import { motion } from 'framer-motion';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { ProductDto } from '../services/products/productApi';

interface ProductCardProps {
  product: ProductDto;
  onEdit: (product: ProductDto) => void;
  onDelete: (id: number) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group"
    >
      <div className=" bg-gradient-to-br to-indigo-400 flex items-end p-6 relative">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
        <div className="relative z-10">
          <motion.h3 
            className="text-xl font-semibold truncate max-w-xs"
            layoutId={`product-name-${product.id}`}
          >
            {product.name}
          </motion.h3>
          <motion.p 
            className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-black/10 backdrop-blur-sm"
            layoutId={`product-category-${product.id}`}
          >
            {product.category}
          </motion.p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 line-clamp-3 mb-4">{product.description}</p>

        <div className="mt-auto">
          <motion.div 
            layoutId={`product-price-${product.id}`}
            className="flex items-baseline gap-1 mb-4"
          >
            <span className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">/unit</span>
          </motion.div>

          <div className="flex items-center justify-between gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEdit(product)}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-indigo-600 
                       text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              <PencilSquareIcon className="h-4 w-4 mr-2" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const shouldDelete = window.confirm(
                  `Are you sure you want to delete '${product.name}'?\nThis action cannot be undone.`
                );
                if (shouldDelete) onDelete(product.id);
              }}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-500 
                       text-red-500 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};