'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { addToWishlist, isInWishlist } = useCart();

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Kitchen', 'Furniture', 'Sports & Fitness'];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get custom products from localStorage
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      
      // Combine default products with custom products
      const allProducts = [...products, ...customProducts];
      
      setItems(allProducts);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('name');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'popular': return b.reviewCount - a.reviewCount;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
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
              className="mt-6 text-xl text-gray-700 dark:text-gray-300 font-semibold"
            >
              Loading amazing products...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Animation */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Browse our curated collection of premium products at unbeatable prices
          </p>
        </motion.div>

        {/* Filters Section with Animation */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                />
                <svg className="absolute left-4 top-4.5 h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium bg-white"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-between flex-wrap gap-4"
          >
            <span className="font-bold text-lg text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedItems.length)} of {filteredAndSortedItems.length} products
            </span>
            <div className="flex gap-3">
              {(searchTerm || selectedCategory !== 'all' || sortBy !== 'name') && (
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-lg"
                >
                  Reset All
                </button>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-base hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <svg className="mx-auto h-32 w-32 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-6 text-3xl font-black text-gray-900 dark:text-white">No products found</h3>
            <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="relative">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Badge - Bottom Left on Image */}
                  {item.badge && (
                    <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded shadow-lg text-xs font-bold uppercase tracking-wide">
                      {item.badge}
                    </div>
                  )}
                  
                  {/* Discount Badge - Top Right */}
                  {item.originalPrice && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white px-3 py-1.5 rounded shadow-lg text-xs font-bold">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <Link
                      href={`/items/${item.id}`}
                      className="bg-white text-black px-6 py-3 rounded-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-black hover:text-white text-sm uppercase tracking-wide"
                    >
                      Quick View
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToWishlist(item);
                      }}
                      className={`p-3 rounded-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl text-xl ${
                        isInWishlist(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-black hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {isInWishlist(item.id) ? '❤️' : '♡'}
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-5">
                  {/* Category Badge - Right Aligned */}
                  <div className="mb-3 flex justify-end">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-black dark:group-hover:text-gray-100 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(item.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 font-semibold">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through font-semibold">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/items/${item.id}`}
                    className="block w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white text-center py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl text-sm uppercase tracking-wide"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredAndSortedItems.length > itemsPerPage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center items-center gap-2"
          >
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                currentPage === 1
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === pageNumber
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 text-white shadow-lg scale-110'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Page Info */}
        {filteredAndSortedItems.length > itemsPerPage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Page {currentPage} of {totalPages}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
