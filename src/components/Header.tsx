import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore, useUserStore, useAppStore } from '../store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const { searchQuery, setSearchQuery } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">FASHION</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-gray-600 transition-colors">
              首页
            </Link>
            <Link to="/products" className="text-gray-900 hover:text-gray-600 transition-colors">
              商品
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-600 transition-colors">
              关于我们
            </Link>
            <Link to="/contact" className="text-gray-900 hover:text-gray-600 transition-colors">
              联系我们
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden text-gray-900 hover:text-gray-600">
              <Search className="h-6 w-6" />
            </button>

            {/* User Account */}
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="text-gray-900 hover:text-gray-600 transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>

            {/* Shopping Cart */}
            <Link to="/cart" className="relative text-gray-900 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-900 hover:text-gray-600"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索商品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2 px-2">
                <Link
                  to="/"
                  className="text-gray-900 hover:text-gray-600 py-2 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  首页
                </Link>
                <Link
                  to="/products"
                  className="text-gray-900 hover:text-gray-600 py-2 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  商品
                </Link>
                <Link
                  to="/about"
                  className="text-gray-900 hover:text-gray-600 py-2 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  关于我们
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-900 hover:text-gray-600 py-2 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  联系我们
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;