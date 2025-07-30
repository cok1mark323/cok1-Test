import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import WelcomeModal from '../components/WelcomeModal';
import { mockProducts, bannerData } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // 获取新品和热销商品
  const newProducts = mockProducts.filter(product => product.isNew);
  const hotProducts = mockProducts.filter(product => product.isHot);
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Hero Carousel */}
      <section className="mb-12">
        <Carousel items={bannerData} />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Products Section */}
        {newProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  新品推荐
                </h2>
                <p className="text-gray-600">发现最新时尚单品</p>
              </div>
              <Link
                to="/products?filter=new"
                className="flex items-center space-x-1 text-black hover:text-gray-600 transition-colors group"
              >
                <span className="font-medium">查看全部</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Hot Products Section */}
        {hotProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  热销商品
                </h2>
                <p className="text-gray-600">人气爆款，不容错过</p>
              </div>
              <Link
                to="/products?filter=hot"
                className="flex items-center space-x-1 text-black hover:text-gray-600 transition-colors group"
              >
                <span className="font-medium">查看全部</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-900 text-white text-sm font-medium px-3 py-1 rounded">
                        HOT
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ¥{product.price}
                    </p>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                精选商品
              </h2>
              <p className="text-gray-600">为你精心挑选的时尚单品</p>
            </div>
            <Link
              to="/products"
              className="flex items-center space-x-1 text-black hover:text-gray-600 transition-colors group"
            >
              <span className="font-medium">查看全部</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              开启你的时尚之旅
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              注册成为会员，享受专属优惠和个性化推荐，让购物变得更加简单愉快。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                立即注册
              </Link>
              <Link
                to="/products"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                浏览商品
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;