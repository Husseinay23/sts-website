
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AllProductsPage from './pages/AllProductsPage';
import BrandPage from './pages/BrandPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { Toaster } from './components/ui/Toast';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="/all-products" element={<AllProductsPage />} />
                    <Route path="/brand/:brandId" element={<BrandPage />} />
                    <Route path="/order-summary" element={<OrderSummaryPage />} />
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  </Routes>
                </Layout>
                <Footer />
                <Toaster />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;