import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, CreditCard, Smartphone, Check } from 'lucide-react';
import { useCartStore, useAddressStore, useUserStore } from '../store';
import { toast } from 'sonner';
// Address type is imported from store when needed

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addresses, selectedAddressId, selectAddress } = useAddressStore();
  const { user } = useUserStore();
  
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'card'>('alipay');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice >= 299 ? 0 : 15;
  const finalTotal = totalPrice + shippingFee;
  
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  const handleAddressSelect = (addressId: string) => {
    selectAddress(addressId);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    
    if (!selectedAddress) {
      toast.error('请选择收货地址');
      return;
    }
    
    if (items.length === 0) {
      toast.error('购物车为空');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 清空购物车
      clearCart();
      
      toast.success('订单提交成功！');
      navigate('/user/orders');
    } catch {
      toast.error('订单提交失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: 'alipay' as const,
      name: '支付宝',
      icon: Smartphone,
      description: '使用支付宝安全支付'
    },
    {
      id: 'wechat' as const,
      name: '微信支付',
      icon: Smartphone,
      description: '使用微信安全支付'
    },
    {
      id: 'card' as const,
      name: '银行卡',
      icon: CreditCard,
      description: '支持各大银行储蓄卡和信用卡'
    }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">购物车为空</h2>
          <p className="text-gray-600 mb-8">请先添加商品到购物车</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            去购物
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">确认订单</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>收货地址</span>
                </h2>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>新增地址</span>
                </button>
              </div>
              
              {addresses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">还没有收货地址</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    添加地址
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => handleAddressSelect(address.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddressId === address.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{address.name}</span>
                            <span className="text-gray-600">{address.phone}</span>
                            {address.isDefault && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                默认
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {address.province} {address.city} {address.district} {address.detail}
                          </p>
                        </div>
                        {selectedAddressId === address.id && (
                          <Check className="h-5 w-5 text-black" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">商品清单</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>颜色: {item.color}</span>
                        <span>尺码: {item.size}</span>
                        <span>数量: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ¥{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>支付方式</span>
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </div>
                        {paymentMethod === method.id && (
                          <Check className="h-5 w-5 text-black" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">订单摘要</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>商品小计</span>
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
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>总计</span>
                    <span>¥{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !selectedAddress}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? '处理中...' : '提交订单'}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                点击"提交订单"表示您同意我们的服务条款和隐私政策
              </div>
            </div>
          </div>
        </div>

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">新增收货地址</h3>
              <div className="text-center py-8 text-gray-500">
                <p>地址表单功能开发中...</p>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;