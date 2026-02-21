import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Register from './pages/Register';

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/account' element={<Account />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
