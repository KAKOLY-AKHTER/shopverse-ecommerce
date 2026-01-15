'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Professional mock data with real images
  const mockItems = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      description: 'High-fidelity audio with active noise cancellation, 40-hour battery life, and premium comfort.',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.8,
      reviewCount: 234,
      inStock: true,
      badge: 'Best Seller',
      features: ['Active Noise Cancellation', '40-hour Battery', 'Premium Sound Quality']
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Pro',
      description: 'Advanced health tracking with GPS, heart rate monitor, and 50+ sport modes.',
      price: 349.99,
      originalPrice: 449.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.7,
      reviewCount: 189,
      inStock: true,
      badge: 'New Arrival',
      features: ['GPS Tracking', 'Heart Rate Monitor', '50+ Sport Modes']
    },
    {
      id: 3,
      name: 'Designer Leather Backpack',
      description: 'Premium leather backpack with laptop compartment and water-resistant coating.',
      price: 129.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      category: 'Fashion',
      rating: 4.6,
      reviewCount: 156,
      inStock: true,
      badge: 'Trending',
      features: ['Genuine Leather', 'Laptop Compartment', 'Water Resistant']
    },
    {
      id: 4,
      name: 'Professional Coffee Maker',
      description: 'Barista-quality espresso machine with built-in grinder and milk frother.',
      price: 599.99,
      originalPrice: 799.99,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
      category: 'Home & Kitchen',
      rating: 4.9,
      reviewCount: 312,
      inStock: true,
      badge: 'Premium',
      features: ['Built-in Grinder', 'Milk Frother', 'Programmable']
    },
    {
      id: 5,
      name: 'Ergonomic Office Chair',
      description: 'Premium mesh office chair with lumbar support and adjustable armrests.',
      price: 449.99,
      originalPrice: 599.99,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop',
      category: 'Furniture',
      rating: 4.7,
      reviewCount: 198,
      inStock: true,
      badge: 'Top Rated',
      features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh']
    },
    {
      id: 6,
      name: 'Wireless Gaming Mouse',
      description: 'High-precision gaming mouse with RGB lighting and 20,000 DPI sensor.',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 267,
      inStock: true,
      badge: 'Sale',
      features: ['20,000 DPI', 'RGB Lighting', 'Wireless']
    },
    {
      id: 7,
      name: 'Yoga Mat Premium',
      description: 'Eco-friendly yoga mat with superior grip and cushioning for all yoga styles.',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
      category: 'Sports & Fitness',
      rating: 4.8,
      reviewCount: 423,
      inStock: true,
      badge: 'Eco-Friendly',
      features: ['Non-Slip Surface', 'Extra Cushioning', 'Eco-Friendly']
    },
    {
      id: 8,
      name: 'Stainless Steel Water Bottle',
      description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
      price: 34.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
      category: 'Sports & Fitness',
      rating: 4.6,
      reviewCount: 534,
      inStock: true,
      badge: 'Popular',
      features: ['24hr Cold', '12hr Hot', 'BPA Free']
    },
    {
      id: 9,
      name: 'Mechanical Keyboard RGB',
      description: 'Professional mechanical keyboard with customizable RGB lighting and tactile switches.',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.7,
      reviewCount: 289,
      inStock: true,
      badge: 'Gaming',
      features: ['Mechanical Switches', 'RGB Backlight', 'Programmable Keys']
    },
    {
      id: 10,
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 360° sound and 20-hour battery life.',
      price: 119.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.6,
      reviewCount: 412,
      inStock: true,
      badge: 'Waterproof',
      features: ['360° Sound', 'Waterproof', '20hr Battery']
    },
    {
      id: 11,
      name: 'Running Shoes Pro',
      description: 'Professional running shoes with advanced cushioning and breathable mesh upper.',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Sports & Fitness',
      rating: 4.8,
      reviewCount: 567,
      inStock: true,
      badge: 'Athletic',
      features: ['Advanced Cushioning', 'Breathable', 'Lightweight']
    },
    {
      id: 12,
      name: 'Smart Home Hub',
      description: 'Central control hub for all your smart home devices with voice control.',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1558089687-e1c6e5b1e8f6?w=500&h=500&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 178,
      inStock: true,
      badge: 'Smart Home',
      features: ['Voice Control', 'Multi-Device', 'Easy Setup']
    }
  ];

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Kitchen', 'Furniture', 'Sports & Fitness'];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setItems(mockItems);
      setLoading(false);
    };
    fetchItems();
  }, []);

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Loading amazing products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of premium products at unbeatable prices
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">
              Showing {filteredAndSortedItems.length} of {items.length} products
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {item.badge}
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {item.originalPrice && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`/items/${item.id}`}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-gray-100"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(item.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/items/${item.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Section */}
        {filteredAndSortedItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}