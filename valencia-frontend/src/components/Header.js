// src/components/Header.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.webp';
import SearchBar from './SearchBar';

function Header({ openCart, isFixed = true }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const touchStartY = useRef(0);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchCurrentY = e.touches[0].clientY;
    if (touchStartY.current - touchCurrentY > 50) {
      closeMenu();
    }
  };

  // Храним предыдущий путь
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (isMenuOpen && prevPathname.current !== location.pathname) {
      closeMenu();
    }
    prevPathname.current = location.pathname;
  }, [location.pathname, isMenuOpen, closeMenu]);

  const headerClasses = isFixed
    ? 'fixed top-0 w-full bg-white shadow z-50'
    : 'bg-white shadow';

  return (
    <header className={`${headerClasses} mb-0`}>
      {/* Контент хедера */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Левая часть: Логотип и название компании */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-gray-800">Валенсия</span>
          </Link>
          {/* Навигационные ссылки для десктопа */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <Link to="/cakes" className="text-gray-700 hover:text-primary">
              Товары
            </Link>
            <Link to="/constructor" className="text-gray-700 hover:text-primary">
              Конструктор
            </Link>
          </div>
        </div>

        {/* Правая часть: Поиск и меню */}
        <div className="flex items-center space-x-2">
          {/* Поисковая строка для десктопа */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Иконка корзины для десктопа */}
          <div className="relative hidden md:block">
            <button
              onClick={openCart}
              className="relative focus:outline-none text-gray-700 hover:text-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* SVG корзины */}
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
                <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-primary rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Иконка меню для мобильных устройств */}
          <div className="md:hidden">
            <button
              onClick={openMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Иконка меню */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Полноэкранное мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Иконка закрытия */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Содержимое меню */}
            <div className="flex flex-col items-center space-y-6">
              {/* Название компании */}
              <span className="text-2xl font-bold text-gray-800">Валенсия</span>

              {/* Поисковая строка */}
              <div className="w-3/4">
                <SearchBar closeMenu={closeMenu} />
              </div>

              {/* Ссылки меню */}
              <Link
                to="/cakes"
                className="text-gray-700 hover:text-primary text-xl"
                onClick={closeMenu}
              >
                Товары
              </Link>
              <Link
                to="/constructor"
                className="text-gray-700 hover:text-primary text-xl"
                onClick={closeMenu}
              >
                Конструктор
              </Link>
              {/* Ссылка на корзину */}
              <Link
                to="/checkout"
                className="text-gray-700 hover:text-primary text-xl"
                onClick={closeMenu}
              >
                Корзина
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
