'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function AddItemPage() {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    features: [''],
    inStock: true
  });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  }, [isLoggedIn, router]);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Sports & Fitness',
    'Books',
    'Beauty & Personal Care',
    'Toys & Games',
    'Automotive',
    'Health & Wellness',
    'Furniture'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (parseFloat(formData.price) <= 0) {
        toast.error('Price must be greater than 0');
        setIsLoading(false);
        return;
      }

      // Filter out empty features
      const validFeatures = formData.features.filter(feature => feature.trim() !== '');

      // Create new product
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image ? URL.createObjectURL(formData.image) : '/images/products/placeholder.jpg',
        rating: 4.5,
        reviewCount: 0,
        badge: 'NEW',
        inStock: formData.inStock,
        features: validFeatures,
        createdAt: new Date().toISOString()
      };

      // Get existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      
      // Add new product
      existingProducts.push(newProduct);
      
      // Save to localStorage
      localStorage.setItem('customProducts', JSON.stringify(existingProducts));

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        features: [''],
        inStock: true
      });

      // Redirect to items page after a delay
      setTimeout(() => {
        router.push('/items');
      }, 1500);

    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
          </motion.div>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-700 font-semibold"
          >
            Checking authentication...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-100"
        >
          <div className="mb-10">
            <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add New Product
            </h2>
            <p className="text-xl text-gray-300 font-semibold">Fill in the details below to add a new product to the store.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Name */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className="block text-sm font-black text-gray-800 mb-3 uppercase tracking-wide">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all font-medium text-lg"
                placeholder="Enter product name"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="description" className="block text-sm font-black text-gray-800 mb-3 uppercase tracking-wide">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all resize-none font-medium text-lg"
                placeholder="Enter detailed product description"
              />
            </motion.div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="price" className="block text-sm font-black text-gray-800 mb-3 uppercase tracking-wide">
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-4.5 text-purple-600 font-black text-xl">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all font-medium text-lg"
                    placeholder="0.00"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="category" className="block text-sm font-black text-gray-800 mb-3 uppercase tracking-wide">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all font-medium text-lg bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Product Image */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="image" className="block text-sm font-black text-gray-800 mb-3 uppercase tracking-wide">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-3 border-purple-300 border-dashed rounded-2xl hover:border-purple-500 transition-colors bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="space-y-3 text-center">
                  <svg className="mx-auto h-20 w-20 text-purple-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-base text-gray-700 justify-center font-semibold">
                    <label htmlFor="image" className="relative cursor-pointer bg-white rounded-xl font-black text-purple-600 hover:text-purple-700 px-4 py-2 hover:bg-purple-50 transition-colors">
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-2">or drag and drop</p>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">PNG, JPG, GIF up to 10MB</p>
                  {formData.image && (
                    <p className="text-base text-green-600 font-black mt-3">✓ Selected: {formData.image.name}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-black text-gray-800 mb-4 uppercase tracking-wide">
                Product Features
              </label>
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all font-medium text-lg"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-4 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-2xl transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={addFeature}
                  className="text-purple-600 hover:text-purple-800 text-base font-black flex items-center space-x-2 hover:bg-purple-50 px-4 py-3 rounded-2xl transition-colors uppercase tracking-wide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Feature</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stock Status */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
            >
              <div className="flex items-center">
                <input
                  id="inStock"
                  name="inStock"
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="h-6 w-6 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                />
                <label htmlFor="inStock" className="ml-4 block text-base font-black text-gray-900 uppercase tracking-wide">
                  Product is in stock
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end space-x-4 pt-8 border-t-2 border-purple-200"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => router.push('/items')}
                className="px-10 py-4 border-3 border-purple-300 rounded-2xl text-gray-800 font-black hover:bg-purple-50 transition-all text-lg uppercase tracking-wide"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 text-white rounded-2xl font-black hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 focus:ring-4 focus:ring-purple-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl text-lg uppercase tracking-wide"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : (
                  '✓ Add Product'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}