import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Smartphone } from 'lucide-react';
import { useUserStore } from '../store';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wechat' | 'alipay'>('email');

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('请填写完整信息');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟用户数据
      const userData = {
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        phone: '',
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('登录成功！');
      navigate(from, { replace: true });
    } catch {
      toast.error('登录失败，请检查邮箱和密码');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThirdPartyLogin = async (method: 'wechat' | 'alipay') => {
    setIsLoading(true);
    
    try {
      // 模拟第三方登录
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: '1',
        name: method === 'wechat' ? '微信用户' : '支付宝用户',
        email: `${method}@example.com`,
        phone: '',
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('登录成功！');
      navigate(from, { replace: true });
    } catch {
      toast.error(`${method === 'wechat' ? '微信' : '支付宝'}登录失败`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-3xl font-bold text-gray-900">登录</h2>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Login Method Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              邮箱登录
            </button>
            <button
              onClick={() => setLoginMethod('wechat')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'wechat'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              微信登录
            </button>
            <button
              onClick={() => setLoginMethod('alipay')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'alipay'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              支付宝登录
            </button>
          </div>

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请输入邮箱地址"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    记住我
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-black hover:text-gray-700">
                    忘记密码？
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </form>
          )}

          {/* WeChat Login */}
          {loginMethod === 'wechat' && (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-gray-600">使用微信扫码登录</p>
                <div className="text-sm text-gray-500">
                  <p>打开微信扫一扫</p>
                  <p>扫描二维码即可登录</p>
                </div>
              </div>
              
              <button
                onClick={() => handleThirdPartyLogin('wechat')}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '登录中...' : '微信登录'}
              </button>
            </div>
          )}

          {/* Alipay Login */}
          {loginMethod === 'alipay' && (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-gray-600">使用支付宝扫码登录</p>
                <div className="text-sm text-gray-500">
                  <p>打开支付宝扫一扫</p>
                  <p>扫描二维码即可登录</p>
                </div>
              </div>
              
              <button
                onClick={() => handleThirdPartyLogin('alipay')}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '登录中...' : '支付宝登录'}
              </button>
            </div>
          )}

          {/* Register Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">还没有账号？</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;