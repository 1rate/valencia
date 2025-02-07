// src/App.js

import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CakeList from './pages/CakeList';
import CakeConstructor from './pages/CakeConstructor';
import Checkout from './pages/Checkout';
import CartModal from './components/CartModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const location = useLocation();
  const isCakeListPage = location.pathname === '/cakes';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Передаём проп isFixed в Header */}
      <Header openCart={openCart} isFixed={!isCakeListPage} />
      <main className={`flex-grow ${!isCakeListPage ? 'pt-[56px]' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakeList />} />
          <Route path="/constructor" element={<CakeConstructor />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
      {/* Кнопка корзины для мобильных устройств */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={openCart}
          className="relative focus:outline-none bg-primary text-white p-3 rounded-full shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="21" r="1" />
            <circle cx="17" cy="21" r="1" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
      {/* Модальное окно корзины */}
      <CartModal isOpen={isCartOpen} closeCart={closeCart} />
    </div>
  );
}

export default App;
