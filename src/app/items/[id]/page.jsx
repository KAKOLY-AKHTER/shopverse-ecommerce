'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ItemDetailsPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get custom products from localStorage
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      
      // Combine default products with custom products
      const allProducts = [...products, ...customProducts];
      
      // Find the product by ID
      const foundItem = allProducts.find(item => item.id === parseInt(params.id));
      
      if (foundItem) {
        // Ensure the product has all required fields
        const completeItem = {
          ...foundItem,
          images: foundItem.images || [foundItem.image, foundItem.image, foundItem.image],
          fullDescription: foundItem.fullDescription || foundItem.description,
          features: foundItem.features || ['High quality product', 'Fast shipping', 'Great value'],
          specifications: foundItem.specifications || {
            'Brand': 'ShopVerse',
            'Model': foundItem.name,
            'Category': foundItem.category,
            'Price': `$${foundItem.price}`,
            'Availability': foundItem.inStock ? 'In Stock' : 'Out of Stock'
          },
          stockCount: foundItem.stockCount || 50,
          inStock: foundItem.inStock !== undefined ? foundItem.inStock : true
        };
        setItem(completeItem);
      }
      setLoading(false);
    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Loading product details...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-16"
          >
            <svg className="mx-auto h-32 w-32 text-purple-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-5xl font-black text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-2xl text-gray-600 mb-10">The product you're looking for doesn't exist.</p>
            <Link href="/items" className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-black hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-2xl uppercase tracking-wide">
              Back to Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-700 font-semibold">
            <li><Link href="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/items" className="hover:text-purple-600 transition-colors">Products</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-purple-600 font-black">{item.name}</li>
          </ol>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative group">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.images[selectedImage]}
                    alt={`${item.name} - Image ${selectedImage + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
                {item.badge && (
                  <motion.div 
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    className="absolute top-6 left-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-2xl uppercase tracking-wide"
                  >
                    {item.badge}
                  </motion.div>
                )}
                {item.originalPrice && (
                  <motion.div 
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-full text-base font-black shadow-2xl"
                  >
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </motion.div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {item.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden border-3 transition-all ${
                    selectedImage === index 
                      ? 'border-purple-600 shadow-2xl scale-105' 
                      : 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${item.name} thumbnail ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-2 border-purple-100"
          >
            <div className="mb-5">
              <span className="inline-block bg-purple-100 text-purple-800 text-sm font-black px-5 py-2 rounded-full uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            
            <h1 className="text-5xl font-black text-gray-900 mb-5 leading-tight">{item.name}</h1>
            
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                {renderStars(item.rating)}
              </div>
              <span className="ml-3 text-base text-gray-700 font-bold">
                {item.rating} ({item.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-8 pb-8 border-b-2 border-purple-100">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <>
                    <span className="text-3xl text-gray-400 line-through font-bold">${item.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 text-base font-black px-4 py-2 rounded-full">
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 mb-10 leading-relaxed text-lg">{item.fullDescription}</p>

            {/* Stock Status */}
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
              {item.inStock ? (
                <div className="flex items-center text-green-600 font-black text-lg">
                  <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>In Stock - {item.stockCount} units available</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 font-black text-lg">
                  <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {item.inStock && (
              <div className="mb-10">
                <div className="flex items-center space-x-4 mb-8">
                  <label className="text-base font-black text-gray-800 uppercase tracking-wide">Quantity:</label>
                  <div className="flex items-center border-3 border-purple-300 rounded-2xl overflow-hidden bg-white">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 py-3 text-gray-700 hover:bg-purple-100 transition-colors font-black text-xl"
                    >
                      -
                    </motion.button>
                    <span className="px-8 py-3 border-x-3 border-purple-300 font-black text-xl">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(item.stockCount, quantity + 1))}
                      className="px-6 py-3 text-gray-700 hover:bg-purple-100 transition-colors font-black text-xl"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(item, quantity)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-6 rounded-2xl font-black hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl text-lg uppercase tracking-wide"
                  >
                    🛒 Add to Cart
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToWishlist(item)}
                    className={`px-8 py-5 border-3 rounded-2xl font-black transition-all text-2xl ${
                      isInWishlist(item.id)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {isInWishlist(item.id) ? '❤️' : '♡'}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-black mb-6 text-gray-900 uppercase tracking-wide">Key Features</h3>
              <ul className="space-y-4">
                {item.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <svg className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 leading-relaxed font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-10 uppercase tracking-wide">Technical Specifications</h2>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {Object.entries(item.specifications).map(([key, value], index) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`p-6 border-b-2 border-purple-100 ${index % 2 === 0 ? 'bg-purple-50/50' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-gray-900 text-base">{key}</span>
                    <span className="text-gray-700 font-semibold">{value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-10 uppercase tracking-wide">You May Also Like</h2>
          <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-100">
            <svg className="mx-auto h-24 w-24 text-purple-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-700 text-xl mb-8 font-semibold">Discover more amazing products</p>
            <Link href="/items" className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-black hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-2xl uppercase tracking-wide">
              Browse All Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
