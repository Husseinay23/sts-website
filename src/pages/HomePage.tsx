import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Battery, Headphones, Shield, ChevronRight, Star, Zap, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getFeaturedProducts, getProducts } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featured = await getFeaturedProducts();
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    {
      id: 'phones',
      name: t('category.phones'),
      icon: Smartphone,
      color: 'bg-red-500',
      count: '500+',
    },
    {
      id: 'chargers',
      name: t('category.chargers'),
      icon: Battery,
      color: 'bg-green-500',
      count: '200+',
    },
    {
      id: 'earphones',
      name: t('category.earphones'),
      icon: Headphones,
      color: 'bg-purple-500',
      count: '150+',
    },
    {
      id: 'cases',
      name: t('category.cases'),
      icon: Shield,
      color: 'bg-orange-500',
      count: '300+',
    },
  ];

  const brands = [
    { id: 'apple', name: t('brand.apple'), logo: '🍎' },
    { id: 'samsung', name: t('brand.samsung'), logo: '📱' },
    { id: 'podoro', name: t('brand.podoro'), logo: '🎧' },
    { id: 'greenLion', name: t('brand.greenLion'), logo: '🦁' },
    { id: 'huawei', name: t('brand.huawei'), logo: '📲' },
    { id: 'xiaomi', name: t('brand.xiaomi'), logo: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>1000+ Products</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Zap className="w-5 h-5 mr-2" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Award className="w-5 h-5 mr-2" />
              <span>Best Prices</span>
            </div>
          </div>
          <Link
            to="/all-products"
            className="bg-white text-red-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('home.categories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {category.count} products
                  </p>
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-auto mt-2 group-hover:text-red-500 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('home.brands')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="group p-4 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-3xl mb-2">{brand.logo}</div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.featured')}
            </h2>
            <Link
              to="/all-products"
              className="text-red-500 hover:text-red-600 font-medium flex items-center"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow-md animate-pulse">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-2xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to upgrade your tech?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our complete collection of mobile phones and accessories
          </p>
          <Link
            to="/all-products"
            className="bg-white text-red-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;