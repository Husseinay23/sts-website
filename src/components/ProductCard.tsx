import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true, 
  viewMode = 'grid' 
}) => {
  const { addItem } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 flex"
      >
        <div className="relative w-48 h-32">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium text-sm">{t('product.outOfStock')}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {product.brand} • {t(`category.${product.category}`)}
            </p>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600 dark:text-red-400">
              ${product.price}
            </span>
            
            {showAddToCart && product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-colors duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 inline mr-1" />
            Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">{t('product.outOfStock')}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {product.brand} • {t(`category.${product.category}`)}
        </p>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-red-600 dark:text-red-400">
            ${product.price}
          </span>
          
          {showAddToCart && product.inStock && (
            <button
              onClick={handleAddToCart}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-colors duration-200 transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;