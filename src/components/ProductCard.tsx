import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 默认选择第一个尺码和颜色
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    
    addItem(product, defaultSize, defaultColor, 1);
    toast.success('商品已添加到购物车');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.isNew && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.isHot && (
              <span className="bg-blue-900 text-white text-xs font-medium px-2 py-1 rounded">
                HOT
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
            title="快速添加到购物车"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex space-x-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ¥{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ¥{product.originalPrice}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-gray-500">颜色:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="text-xs text-gray-600">
                  {color}{index < Math.min(product.colors.length - 1, 2) && ','}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;