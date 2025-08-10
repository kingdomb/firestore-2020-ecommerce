// firestore:src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CART_KEY = 'cart:v1';
export const TAX_RATE = 0.175;
const SHIPPING_FLAT = 10; // flat rate

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  // actions
  const addItem = (product, qty = 1) => {
    const { id, title, price, src } = product;
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + qty) } : p
        );
      }
      return [...prev, { id, title, price, src, qty: Math.max(1, qty) }];
    });
  };

  const updateQty = (id, qty) => {
    const n = Math.max(1, Number(qty) || 1);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: n } : p)));
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  // totals/selectors
  const { subtotal, tax, shipping, total, count } = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const shipping = items.length ? SHIPPING_FLAT : 0;
    const total = +(subtotal + tax + shipping).toFixed(2);
    const count = items.reduce((s, it) => s + it.qty, 0);
    return {
      subtotal: +subtotal.toFixed(2),
      tax,
      shipping,
      total,
      count,
    };
  }, [items]);

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    clear,
    subtotal,
    tax,
    shipping,
    total,
    count,
    TAX_RATE,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
