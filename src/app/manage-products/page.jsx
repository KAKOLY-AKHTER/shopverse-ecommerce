'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products as defaultProducts } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ManageProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    loadProducts();
  }, [isLoggedIn, router]);

  const loadProducts = () => {
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    const combined = [...defaultProducts, ...customProducts];
    setAllProducts(combined);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Check if it's a custom product
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      const isCustom = customProducts.some(p => p.id === productId);

      if (isCustom) {
        // Remove from custom products
        const updated = customProducts.filter(p => p.id !== productId);
        localStorage.setItem('customProducts', JSON.stringify(updated));
        toast.success('Product deleted successfully!');
        loadProducts();
      } else {
        toast.error('Cannot delete default products!');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    const index = customProducts.findIndex(p => p.id === editingProduct.id);

    if (index !== -1) {
      customProducts[index] = editingProduct;
      localStorage.setItem('customProducts', JSON.stringify(customProducts));
      toast.success('Product updated successfully!');
      setShowEditModal(false);
      loadProducts();
    } else {
      toast.error('Cannot edit default products!');
    }
  };

  const isCustomProduct = (productId) => {
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    return customProducts.some(p => p.id === productId);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Manage Products
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Edit or delete your custom products
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase mb-2">Total Products</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white">{allProducts.length}</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase mb-2">Custom Products</h3>
            <p className="text-4xl font-black text-green-600">{JSON.parse(localStorage.getItem('customProducts') || '[]').length}</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase mb-2">Default Products</h3>
            <p className="text-4xl font-black text-blue-600">{defaultProducts.length}</p>
          </motion.div>
        </div>

        {/* Products Table */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allProducts.map((product, index) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{product.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-black text-gray-900 dark:text-white">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      {isCustomProduct(product.id) ? (
                        <span className="px-3 py-1 text-xs font-bold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                          Custom
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                          Default
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/items/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-sm"
                        >
                          View
                        </Link>
                        {isCustomProduct(product.id) && (
                          <>
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-bold text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold text-sm"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add Product Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/add-item" className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-12 py-5 rounded-2xl font-black transition-all shadow-lg hover:shadow-2xl uppercase tracking-wide">
            + Add New Product
          </Link>
        </motion.div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Edit Product</h2>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                  className="w-5 h-5 text-purple-600 rounded"
                />
                <label className="ml-3 text-sm font-bold text-gray-700 dark:text-gray-300">In Stock</label>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 text-white rounded-lg font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 transition-all shadow-lg"
                >
                  Update Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
