import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Share2, Minus, Plus } from 'lucide-react';
import { mockProducts, mockReviews } from '../data/mockData';
import { useCartStore } from '../store';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  
  const product = mockProducts.find(p => p.id === id);
  const reviews = mockReviews; // 在实际应用中应该根据产品ID过滤
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品未找到</h1>
          <Link to="/products" className="text-black hover:text-gray-600 font-medium">
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('请选择尺码');
      return;
    }
    if (!selectedColor) {
      toast.error('请选择颜色');
      return;
    }
    
    addItem(product, selectedSize, selectedColor, quantity);
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">首页</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-700">商品</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
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
              
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} 评价)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ¥{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ¥{product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">颜色</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">尺码</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">数量</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {product.stock > 10 ? '现货充足' : product.stock > 0 ? `仅剩 ${product.stock} 件` : '暂时缺货'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{product.stock === 0 ? '暂时缺货' : '加入购物车'}</span>
              </button>
              
              <div className="flex space-x-3">
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>收藏</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: '商品详情' },
                { id: 'reviews', label: `用户评价 (${reviews.length})` },
                { id: 'shipping', label: '配送信息' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'description' | 'reviews' | 'shipping')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">商品详情</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">材质信息</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 面料：优质棉质混纺</li>
                      <li>• 手感：柔软舒适</li>
                      <li>• 透气性：良好</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">护理说明</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 机洗：30°C以下</li>
                      <li>• 不可漂白</li>
                      <li>• 低温熨烫</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">用户评价</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {review.userName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{review.userName}</span>
                            <div className="flex space-x-0.5">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">{review.createdAt}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{review.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>尺码: {review.size}</span>
                            <span>颜色: {review.color}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">配送信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">配送方式</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• 标准配送：3-5个工作日</li>
                      <li>• 快速配送：1-2个工作日</li>
                      <li>• 次日达：当日下单次日送达</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">退换政策</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• 7天无理由退货</li>
                      <li>• 15天免费换货</li>
                      <li>• 质量问题免费退换</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;