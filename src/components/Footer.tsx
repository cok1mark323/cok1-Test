import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">FASHION</h2>
            <p className="text-gray-300 mb-4 max-w-md">
              专注于为中国女性提供时尚、优质的服装，打造简约现代的购物体验。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                微信
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                微博
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                小红书
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  商品列表
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">客户服务</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  配送信息
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  退换货政策
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">contact@fashion.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">400-888-8888</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">上海市浦东新区</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 FASHION. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;