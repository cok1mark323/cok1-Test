import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingFee = totalPrice >= 299 ? 0 : 15; // 满299免运费
  const finalTotal = totalPrice + shippingFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.success('商品已从购物车移除');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('购物车已清空');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('购物车为空');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="mb-6">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">购物车是空的</h2>
            <p className="text-gray-600 mb-8">还没有添加任何商品，去看看有什么好东西吧！</p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              <span>去购物</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">购物车</h1>
            <p className="text-gray-600">{totalItems} 件商品</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">商品清单</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                  >
                    清空购物车
                  </button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                      {/* Product Image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors block mb-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>颜色: {item.color}</span>
                          <span>尺码: {item.size}</span>
                        </div>
                        
                        {/* Mobile Price */}
                        <div className="block sm:hidden">
                          <span className="text-lg font-semibold text-gray-900">
                            ¥{item.product.price}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="hidden sm:block text-lg font-semibold text-gray-900">
                        ¥{item.product.price}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="移除商品"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">订单摘要</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>商品小计 ({totalItems} 件)</span>
                  <span>¥{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>运费</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600">免费</span>
                    ) : (
                      `¥${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {totalPrice < 299 && (
                  <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
                    再购买 ¥{(299 - totalPrice).toFixed(2)} 即可享受免运费
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>总计</span>
                    <span>¥{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
              >
                去结算
              </button>
              
              <Link
                to="/products"
                className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                继续购物
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">你可能还喜欢</h2>
          <div className="text-center py-8 text-gray-500">
            <p>推荐商品功能开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;