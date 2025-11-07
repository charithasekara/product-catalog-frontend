import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { ProductDto } from '../services/products/productApi';

interface ProductFormProps {
  initialValues?: ProductDto;
  onSubmit: (product: Omit<ProductDto, 'id'>) => void;
  onCancel: () => void;
}

export const ProductForm: FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1.5"
        >
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initialValues?.name}
            required
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 
                      focus:ring-indigo-200 transition-all duration-200 text-gray-900 text-base placeholder:text-gray-400
                      shadow-sm hover:border-gray-300"
            placeholder="Enter product name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1.5"
        >
          <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={initialValues?.description}
            required
            rows={4}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 
                      focus:ring-indigo-200 transition-all duration-200 text-gray-900 text-base placeholder:text-gray-400
                      shadow-sm hover:border-gray-300 resize-none"
            placeholder="Provide a detailed description of your product"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include important details about features, specifications, or usage.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-1.5"
          >
            <label htmlFor="price" className="block text-sm font-semibold text-gray-900">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-gray-500 sm:text-base">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={initialValues?.price}
                required
                min="0"
                step="0.01"
                className="block w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2
                          focus:ring-indigo-200 transition-all duration-200 text-gray-900 text-base placeholder:text-gray-400
                          shadow-sm hover:border-gray-300"
                placeholder="0.00"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-1.5"
          >
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              id="category"
              defaultValue={initialValues?.category}
              required
              className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2
                        focus:ring-indigo-200 transition-all duration-200 text-gray-900 text-base placeholder:text-gray-400
                        shadow-sm hover:border-gray-300"
              placeholder="e.g., Electronics"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border-2 border-gray-200 text-gray-600 font-medium text-sm
                   hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200
                   transition-all duration-200"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   transition-all duration-200 shadow-sm"
        >
          {initialValues ? 'Update' : 'Create'} Product
        </motion.button>
      </div>
    </form>
  );
};