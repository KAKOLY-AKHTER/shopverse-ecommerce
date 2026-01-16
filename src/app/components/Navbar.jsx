'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { getCartCount, wishlist } = useCart();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Stylish Logo Icon with Gradient */}
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all mr-3 relative overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                  <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </motion.div>
              {/* Logo Text with Gradient */}
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 bg-clip-text text-transparent tracking-tight leading-none">
                  ShopVerse
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                  Premium Shopping
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>
            
            <NavLink href="/" icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }>
              Home
            </NavLink>
            
            <NavLink href="/items" icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }>
              Products
            </NavLink>

            {/* Cart Icon with Badge */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <Link href="/cart" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center space-x-2 uppercase tracking-wide group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Wishlist Icon with Badge */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <Link href="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center space-x-2 uppercase tracking-wide group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </motion.div>

            {isLoggedIn ? (
              <>
                <NavLink href="/add-item" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }>
                  Add Item
                </NavLink>

                <NavLink href="/manage-products" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }>
                  Manage
                </NavLink>
                
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l-2 border-gray-200">
                  {user?.name && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-xl border-2 border-gray-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-black text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {user.name}
                      </span>
                    </motion.div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg hover:shadow-xl transition-all uppercase tracking-wide"
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4"
              >
                <Link 
                  href="/login" 
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-8 py-2.5 rounded-xl text-sm font-black shadow-lg hover:shadow-xl transition-all uppercase tracking-wide flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                <MobileNavLink href="/" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }>
                  Home
                </MobileNavLink>
                
                <MobileNavLink href="/items" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }>
                  Products
                </MobileNavLink>

                {isLoggedIn ? (
                  <>
                    {user?.name && (
                      <div className="px-4 py-3 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-black text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Welcome</p>
                          <p className="text-sm font-black text-gray-800">{user.name}</p>
                        </div>
                      </div>
                    )}
                    
                    <MobileNavLink href="/add-item" icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    }>
                      Add Item
                    </MobileNavLink>

                    <MobileNavLink href="/manage-products" icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }>
                      Manage Products
                    </MobileNavLink>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white w-full text-left px-4 py-3 rounded-xl font-black shadow-lg flex items-center space-x-3 uppercase tracking-wide"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-black shadow-lg flex items-center space-x-3 uppercase tracking-wide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Desktop Nav Link Component
function NavLink({ href, children, icon }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center space-x-2 uppercase tracking-wide group"
      >
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span>{children}</span>
      </motion.div>
    </Link>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, children, icon }) {
  return (
    <Link href={href}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="text-gray-700 hover:text-black px-4 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center space-x-3 uppercase tracking-wide"
      >
        {icon}
        <span>{children}</span>
      </motion.div>
    </Link>
  );
}
