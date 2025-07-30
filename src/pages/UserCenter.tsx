import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';
import { useUserStore } from '../store';
import { toast } from 'sonner';

const UserCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'favorites'>('profile');

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
          <Link
            to="/login"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: 'profile' as const,
      name: '个人信息',
      icon: User,
      description: '管理您的个人资料'
    },
    {
      id: 'orders' as const,
      name: '我的订单',
      icon: Package,
      description: '查看订单状态和历史'
    },
    {
      id: 'addresses' as const,
      name: '收货地址',
      icon: MapPin,
      description: '管理您的收货地址'
    },
    {
      id: 'favorites' as const,
      name: '我的收藏',
      icon: Heart,
      description: '查看收藏的商品'
    }
  ];

  const orderStats = [
    { label: '待付款', count: 2, color: 'text-orange-600' },
    { label: '待发货', count: 1, color: 'text-blue-600' },
    { label: '待收货', count: 3, color: 'text-green-600' },
    { label: '已完成', count: 15, color: 'text-gray-600' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">用户名</span>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">邮箱</span>
                  <span className="font-medium text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">手机号</span>
                  <span className="font-medium text-gray-900">{user.phone || '未绑定'}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">注册时间</span>
                  <span className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  编辑资料
                </button>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            {/* Order Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">订单统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {orderStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.count}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">最近订单</h3>
                <Link to="/user/orders" className="text-sm text-blue-600 hover:text-blue-700">
                  查看全部
                </Link>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>暂无订单记录</p>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">收货地址</h3>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  新增地址
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>暂无收货地址</p>
                <p className="text-sm mt-2">添加地址后可以更快完成购买</p>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">我的收藏</h3>
              <div className="text-center py-8 text-gray-500">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>暂无收藏商品</p>
                <p className="text-sm mt-2">收藏喜欢的商品，方便下次购买</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header */}
        <div className="flex items-center space-x-4 mb-8 md:hidden">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">个人中心</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">退出登录</span>
                </button>
              </nav>
            </div>

            {/* Quick Actions - Mobile */}
            <div className="mt-6 md:hidden">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-3">快捷操作</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/user/orders"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">我的订单</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">购物车</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {menuItems.find(item => item.id === activeTab)?.name}
              </h1>
              <p className="text-gray-600">
                {menuItems.find(item => item.id === activeTab)?.description}
              </p>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCenter;