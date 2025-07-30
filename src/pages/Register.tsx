import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, Smartphone } from 'lucide-react';
import { useUserStore } from '../store';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<'email' | 'wechat' | 'alipay'>('email');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('请输入用户名');
      return false;
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('请输入有效的邮箱地址');
      return false;
    }
    
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast.error('请输入有效的手机号码');
      return false;
    }
    
    if (!formData.password || formData.password.length < 6) {
      toast.error('密码至少需要6位字符');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('两次输入的密码不一致');
      return false;
    }
    
    if (!agreedToTerms) {
      toast.error('请同意服务条款和隐私政策');
      return false;
    }
    
    return true;
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 模拟注册请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟用户数据
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('注册成功！欢迎加入我们！');
      navigate('/');
    } catch {
      toast.error('注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThirdPartyRegister = async (method: 'wechat' | 'alipay') => {
    if (!agreedToTerms) {
      toast.error('请同意服务条款和隐私政策');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 模拟第三方注册
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now().toString(),
        name: method === 'wechat' ? '微信用户' : '支付宝用户',
        email: `${method}@example.com`,
        phone: '',
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('注册成功！欢迎加入我们！');
      navigate('/');
    } catch {
      toast.error(`${method === 'wechat' ? '微信' : '支付宝'}注册失败`);
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
          <h2 className="text-3xl font-bold text-gray-900">注册</h2>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Register Method Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setRegisterMethod('email')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                registerMethod === 'email'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              邮箱注册
            </button>
            <button
              onClick={() => setRegisterMethod('wechat')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                registerMethod === 'wechat'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              微信注册
            </button>
            <button
              onClick={() => setRegisterMethod('alipay')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                registerMethod === 'alipay'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              支付宝注册
            </button>
          </div>

          {/* Email Register Form */}
          {registerMethod === 'email' && (
            <form onSubmit={handleEmailRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  用户名 *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请输入用户名"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址 *
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  手机号码 (可选)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请输入手机号码"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码 *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请输入密码（至少6位）"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码 *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="请再次输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '注册中...' : '注册'}
              </button>
            </form>
          )}

          {/* WeChat Register */}
          {registerMethod === 'wechat' && (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-gray-600">使用微信扫码注册</p>
                <div className="text-sm text-gray-500">
                  <p>打开微信扫一扫</p>
                  <p>扫描二维码即可快速注册</p>
                </div>
              </div>
              
              <button
                onClick={() => handleThirdPartyRegister('wechat')}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '注册中...' : '微信注册'}
              </button>
            </div>
          )}

          {/* Alipay Register */}
          {registerMethod === 'alipay' && (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-gray-600">使用支付宝扫码注册</p>
                <div className="text-sm text-gray-500">
                  <p>打开支付宝扫一扫</p>
                  <p>扫描二维码即可快速注册</p>
                </div>
              </div>
              
              <button
                onClick={() => handleThirdPartyRegister('alipay')}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '注册中...' : '支付宝注册'}
              </button>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="mt-6">
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  我已阅读并同意{' '}
                  <a href="#" className="text-black hover:text-gray-700 underline">
                    服务条款
                  </a>
                  {' '}和{' '}
                  <a href="#" className="text-black hover:text-gray-700 underline">
                    隐私政策
                  </a>
                </label>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">已有账号？</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                立即登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;