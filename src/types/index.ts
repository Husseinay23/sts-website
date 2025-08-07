export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  colors: string[];
  featured?: boolean;
  inStock?: boolean;
  createdAt?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    selectedColor?: string;
  }>;
  total: number;
  paymentMethod: 'cash' | 'whishMoney';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  count?: number;
}

export interface SearchResult {
  item: Product;
  score: number;
}