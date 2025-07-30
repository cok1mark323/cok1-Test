import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserCenter from './pages/UserCenter';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/user" element={<UserCenter />} />
            <Route path="/user/orders" element={<UserCenter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Coming Soon Pages */}
            <Route path="/about" element={<ComingSoon title="关于我们" />} />
            <Route path="/contact" element={<ComingSoon title="联系我们" />} />
            <Route path="/help" element={<ComingSoon title="帮助中心" />} />
            <Route path="/size-guide" element={<ComingSoon title="尺码指南" />} />
            <Route path="/shipping" element={<ComingSoon title="配送信息" />} />
            <Route path="/returns" element={<ComingSoon title="退换货" />} />
            <Route path="/privacy" element={<ComingSoon title="隐私政策" />} />
            <Route path="/terms" element={<ComingSoon title="服务条款" />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

// Coming Soon Component
const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">Coming Soon</p>
        <p className="text-gray-500">该功能正在开发中，敬请期待...</p>
      </div>
    </div>
  );
};

export default App;
