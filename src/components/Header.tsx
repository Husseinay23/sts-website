import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Sun, Moon, Globe, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const { state, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'phones', name: t('category.phones') },
    { id: 'chargers', name: t('category.chargers') },
    { id: 'accessories', name: t('category.accessories') },
    { id: 'earphones', name: t('category.earphones') },
    { id: 'cases', name: t('category.cases') },
    { id: 'screenProtectors', name: t('category.screenProtectors') },
  ];

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-black shadow-lg z-50 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Cart Icon (Left) */}
          <button
            onClick={toggleCart}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Logo (Center) */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-red-500 text-white p-2 rounded-xl shadow-lg">
              <span className="font-bold text-lg">STS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Smart Technology Shop
              </h1>
            </div>
          </Link>

          {/* Controls (Right) */}
          <div className="flex items-center space-x-2">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4 mr-4">
              <Link
                to="/all-products"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {t('nav.seeAll')}
              </Link>
              <Link
                to="/brand/apple"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {t('nav.shopByBrand')}
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/all-products"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                {t('nav.seeAll')}
              </Link>
              <Link
                to="/brand/apple"
                onClick={() => setShowMobileMenu(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                {t('nav.shopByBrand')}
              </Link>
            </div>
          </div>
        )}

        {/* Categories Navigation */}
        <nav className="border-t border-gray-200 dark:border-gray-800 py-3">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;