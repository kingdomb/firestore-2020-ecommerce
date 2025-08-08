// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/account' element={<Account />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
