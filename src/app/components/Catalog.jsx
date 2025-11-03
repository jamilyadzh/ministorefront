'use client';
import { useEffect, useState, useRef } from 'react';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ProductList from './ProductList';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  // --- State management ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [cart, setCart] = useState({});

  const intervalRef = useRef(null);

  // --- Fetch products on mount ---
  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchProducts();

    // --- Simulate stock updates every 5 seconds ---
    intervalRef.current = setInterval(() => {
      setProducts(prev =>
        prev.map(p => {
          const change = Math.random() < 0.3 ? -1 : 0; // randomly reduce stock
          return { ...p, stock: Math.max(0, p.stock + change) };
        })
      );
    }, 5000);

    return () => {
      ignore = true;
      clearInterval(intervalRef.current);
    };
  }, []);

  // --- Filter logic ---
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (priceFilter === 'Under50' && p.price >= 50) return false;
    if (priceFilter === 'Under200' && p.price >= 200) return false;
    if (priceFilter === 'Under500' && p.price >= 500) return false;
    return true;
  });

  // --- Cart actions ---
  function addToCart(productId) {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCart(prev => {
      const product = products.find(p => p.id === productId);
      if (!product) return prev;
      const existing = prev[productId];
      const qty = existing ? existing.qty + 1 : 1;
      return {
        ...prev,
        [productId]: { product: { ...product }, qty },
      };
    });
  }

  function decrementFromCart(productId) {
    setCart(prev => {
      const existing = prev[productId];
      if (!existing) return prev;

      const newQty = existing.qty - 1;
      const newCart = { ...prev };

      if (newQty <= 0) delete newCart[productId];
      else newCart[productId] = { ...existing, qty: newQty };

      return newCart;
    });

    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      )
    );
  }

  function resetCart() {
    setProducts(prev =>
      prev.map(p => {
        const entry = cart[p.id];
        if (!entry) return p;
        return { ...p, stock: p.stock + entry.qty };
      })
    );
    setCart({});
  }

  // --- Render ---
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="col-span-3 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold mb-3">Filters</h2>

        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />

        <PriceFilter
          value={priceFilter}
          onChange={setPriceFilter}
        />

        <div className="mt-6">
          <CartSummary
            cart={cart}
            onDecrement={decrementFromCart}
            onReset={resetCart}
          />
        </div>
      </aside>

      {/* Product list */}
      <section className="col-span-9">
        <StatusMessage loading={loading} error={error} items={filtered} />
        {!loading && !error && filtered.length > 0 && (
          <ProductList products={filtered} onAdd={addToCart} />
        )}
      </section>
    </div>
  );
}
