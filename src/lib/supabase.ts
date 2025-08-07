import { createClient } from '@supabase/supabase-js';

// These would be replaced with actual environment variables
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// For demo purposes, we'll use mock data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1299,
    description: 'The most advanced iPhone with titanium design, A17 Pro chip, and revolutionary camera system.',
    category: 'phones',
    brand: 'apple',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    description: 'Premium Samsung flagship with S Pen, powerful cameras, and large display.',
    category: 'phones',
    brand: 'samsung',
    image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg',
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Podoro Fast Wireless Charger',
    price: 45,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    category: 'chargers',
    brand: 'podoro',
    image: 'https://images.pexels.com/photos/4555484/pexels-photo-4555484.jpeg',
    colors: ['Black', 'White'],
    inStock: true,
  },
  {
    id: '4',
    name: 'AirPods Pro (2nd Generation)',
    price: 249,
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
    category: 'earphones',
    brand: 'apple',
    image: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg',
    colors: ['White'],
    featured: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'Green Lion Leather Phone Case',
    price: 35,
    description: 'Premium leather case with perfect fit and protection for your device.',
    category: 'cases',
    brand: 'greenLion',
    image: 'https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg',
    colors: ['Black', 'Brown', 'Blue', 'Red'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Tempered Glass Screen Protector',
    price: 15,
    description: 'Crystal clear tempered glass protection with 9H hardness rating.',
    category: 'screenProtectors',
    brand: 'greenLion',
    image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg',
    colors: ['Clear'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Xiaomi Redmi Note 13 Pro',
    price: 299,
    description: 'Powerful mid-range smartphone with excellent camera and long battery life.',
    category: 'phones',
    brand: 'xiaomi',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    colors: ['Midnight Black', 'Ocean Blue', 'Sunset Orange'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Huawei P60 Pro',
    price: 899,
    description: 'Professional photography smartphone with Leica camera system.',
    category: 'phones',
    brand: 'huawei',
    image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg',
    colors: ['Pearl White', 'Emerald Green', 'Rococo Pearl'],
    inStock: true,
  },
  {
    id: '9',
    name: 'Samsung 25W Super Fast Charger',
    price: 29,
    description: 'Official Samsung fast charger with USB-C cable included.',
    category: 'chargers',
    brand: 'samsung',
    image: 'https://images.pexels.com/photos/4555484/pexels-photo-4555484.jpeg',
    colors: ['White', 'Black'],
    inStock: true,
  },
  {
    id: '10',
    name: 'Podoro Gaming Earbuds',
    price: 79,
    description: 'Low-latency gaming earbuds with RGB lighting and superior sound quality.',
    category: 'earphones',
    brand: 'podoro',
    image: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg',
    colors: ['Black', 'White', 'Red'],
    inStock: true,
  },
];

import { Product } from '../types';

// Mock functions for development
export const getProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return mockProducts.find(p => p.id === id) || null;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return mockProducts.filter(p => p.category === category);
};

export const getProductsByBrand = async (brand: string): Promise<Product[]> => {
  return mockProducts.filter(p => p.brand === brand);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return mockProducts.filter(p => p.featured);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery) ||
    p.brand.toLowerCase().includes(lowercaseQuery)
  );
};