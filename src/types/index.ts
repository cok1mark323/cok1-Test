// 商品相关类型定义
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isHot?: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
}

// 购物车商品类型
export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

// 用户类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

// 地址类型
export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

// 订单类型
export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingFee: number;
  address: Address;
  paymentMethod: 'alipay' | 'wechat' | 'card';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// 评价类型
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  size: string;
  color: string;
}

// 筛选条件类型
export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}