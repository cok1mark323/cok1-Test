import React from 'react';
import { X, Gift, Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

const WelcomeModal: React.FC = () => {
  const { showWelcomeModal, setShowWelcomeModal } = useAppStore();

  // 检查是否已经显示过
  React.useEffect(() => {
    const hasShown = localStorage.getItem('welcomeModalShown');
    if (hasShown) {
      setShowWelcomeModal(false);
    }
  }, [setShowWelcomeModal]);

  const handleClose = () => {
    setShowWelcomeModal(false);
    // 设置本地存储，避免重复显示
    localStorage.setItem('welcomeModalShown', 'true');
  };

  if (!showWelcomeModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <Gift className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">欢迎来到 FASHION</h2>
          <p className="text-gray-200">发现属于你的时尚风格</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 rounded-full p-2">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">精选商品</h3>
                <p className="text-sm text-gray-600">每一件都经过精心挑选</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">便捷购物</h3>
                <p className="text-sm text-gray-600">简单几步完成购买</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <Gift className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">新用户专享</h3>
                <p className="text-sm text-gray-600">注册即享专属优惠</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/register"
              onClick={handleClose}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 text-center block"
            >
              立即注册
            </Link>
            
            <Link
              to="/products"
              onClick={handleClose}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 text-center block"
            >
              先逛逛商品
            </Link>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">已有账户？</span>
            <Link
              to="/login"
              onClick={handleClose}
              className="text-sm text-black font-medium hover:underline ml-1"
            >
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;