import type { FC } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'react-hot-toast';
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  type ProductDto,
} from '../services/products/productApi';
// import { ProductForm } from '../components/ProductForm';
import { ProductsGrid } from '../components/ProductsGrid';

export const ProductsPage: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | undefined>();

  const { 
    data: products, 
    isLoading, 
    error, 
    isFetching,
    refetch 
  } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleSubmit = async (product: Omit<ProductDto, 'id'>) => {
    const promise = selectedProduct
      ? updateProduct({ id: selectedProduct.id, product }).unwrap().then(() => {})
      : createProduct(product).unwrap().then(() => {});

    toast.promise(promise, {
      loading: 'Saving product...',
      success: selectedProduct ? 'Product updated successfully!' : 'Product created successfully!',
      error: 'Failed to save product'
    });

    try {
      await promise;
      setIsFormOpen(false);
      setSelectedProduct(undefined);
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleEdit = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    const promise = deleteProduct(id).unwrap();
    
    toast.promise(promise, {
      loading: 'Deleting product...',
      success: 'Product deleted successfully!',
      error: 'Failed to delete product'
    });

    try {
      await promise;
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // show skeletons during initial load; show fetching indicator subtly when refetching
  if (error) {
    console.error('API Error:', error);
    return (
      <div className="text-center p-4">
        <p className="text-red-600 text-lg font-semibold mb-2">Unable to load products</p>
        <p className="text-gray-600 mb-4">There was a problem connecting to the server.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-sm rounded-lg px-6 py-4 mb-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your products inventory
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
                         transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Product
            </motion.button>
          </div>

          {isFetching && !isLoading && (
            <div className="mt-2 flex items-center justify-end">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Refreshing...
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isFormOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-opacity-50 backdrop-blur-md z-40"
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedProduct(undefined);
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-0 top-[5%] mx-auto max-w-2xl z-50"
              >
                <div className="bg-white rounded-xl shadow-2xl m-4">
                  <div className="flex items-start justify-between p-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedProduct ? 'Edit Product' : 'Add New Product'}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {selectedProduct ? 'Update the product information below.' : 'Fill in the information below to create a new product.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsFormOpen(false);
                        setSelectedProduct(undefined);
                      }}
                      className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="p-6">
                    <ProductForm
                      initialValues={selectedProduct}
                      onSubmit={handleSubmit}
                      onCancel={() => {
                        setIsFormOpen(false);
                        setSelectedProduct(undefined);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProductsGrid products={products} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
        </motion.div>
      </div>
    </div>
  );
};