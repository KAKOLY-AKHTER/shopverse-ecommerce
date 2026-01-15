'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from './data/products';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: '/images/products/bg1.jpg' ,
      title: 'Welcome to ShopVerse',
      subtitle: 'Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.'
    },
    {
      image: '/images/products/bg2.jpg',
      title: 'Premium Quality Products',
      subtitle: 'Experience excellence with our carefully curated collection of top-rated items.'
    },
    {
     
      image: '/images/products/bg3.jpg',
      title: 'Exclusive Deals & Offers',
      subtitle: 'Save big with our special discounts and limited-time offers on trending products.'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Slider */}
      <section className="relative text-white py-32 overflow-hidden min-h-screen flex items-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/50 to-black/60"></div>
        
        {/* Animated Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed font-semibold"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/items" className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl uppercase tracking-wide">
                  Shop Now →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="inline-block border-4 border-white text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-black transition-all shadow-2xl uppercase tracking-wide">
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose ShopVerse?
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-semibold">
              We provide the best shopping experience with quality products and excellent service.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Fast Delivery",
                description: "Get your orders delivered quickly with our express shipping options.",
                gradient: "from-indigo-600 via-purple-600 to-purple-500"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Quality Guaranteed",
                description: "All products are carefully selected and quality tested before shipping.",
                gradient: "from-purple-600 via-indigo-600 to-purple-500"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                ),
                title: "Best Prices",
                description: "Competitive pricing with regular discounts and special offers.",
                gradient: "from-indigo-500 via-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all border-2 border-purple-100 dark:border-purple-900"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-wide text-gray-900 dark:text-gray-800">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-900 leading-relaxed text-lg font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-semibold">
              Check out our most popular items loved by customers worldwide.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {products.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all border-2 border-purple-100 dark:border-purple-900"
              >
                <div className="relative h-80 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
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
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-3 text-gray-900 dark:text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase tracking-wide">{item.name}</h3>
                  <p className="text-gray-700 dark:text-purple-500 mb-6 text-lg font-medium">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-black text-gray-900 dark:text-purple-500">
                      ${item.price}
                    </span>
                    <Link href="/items" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg uppercase tracking-wide text-sm">
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/items" className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-14 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl hover:shadow-3xl uppercase tracking-wide">
                View All Products →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About ShopVerse
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                ShopVerse is your trusted online marketplace, built with cutting-edge technology to provide 
                the best shopping experience. We connect customers with quality products from verified sellers 
                around the world.
              </p>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
                Our platform is built with Next.js 16, ensuring fast loading times, excellent SEO, 
                and a smooth user experience across all devices.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/items" className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-2xl hover:shadow-3xl uppercase tracking-wide text-lg">
                  Start Shopping →
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-900"
            >
              <h3 className="text-4xl font-black mb-10 text-gray-900 dark:text-white uppercase tracking-wide">Our Stats</h3>
              <div className="space-y-8">
                {[
                  { label: "Happy Customers", value: "10,000+" },
                  { label: "Products Available", value: "5,000+" },
                  { label: "Countries Served", value: "50+" },
                  { label: "Years of Experience", value: "5+" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center pb-6 border-b-2 border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-gray-800 dark:text-gray-300 font-bold text-xl">{stat.label}</span>
                    <span className="font-black text-3xl text-gray-900 dark:text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-semibold">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { name: "Sarah Johnson", rating: 5, text: "Amazing products and fast delivery! I've been shopping here for months and never disappointed." },
              { name: "Mike Chen", rating: 5, text: "Great customer service and quality products. The website is easy to use and very reliable." },
              { name: "Emily Davis", rating: 5, text: "Best online shopping experience I've had. Highly recommend ShopVerse to everyone!" }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 dark:text-gray-300 mb-8 leading-relaxed text-xl font-medium">"{testimonial.text}"</p>
                <p className="font-black text-gray-900 dark:text-white text-xl uppercase tracking-wide">- {testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-28 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-semibold">
              Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
            </p>
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-white/20 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-white/50 dark:focus:ring-indigo-500/50 text-xl font-semibold placeholder-gray-500 dark:placeholder-gray-400"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl uppercase tracking-wide"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Start Shopping?
            </h2>
            <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-semibold">
              Join thousands of satisfied customers and discover amazing products at ShopVerse today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/items" className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl uppercase tracking-wide">
                  Browse Products →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="inline-block border-4 border-white text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-black transition-all shadow-2xl uppercase tracking-wide">
                  Create Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
