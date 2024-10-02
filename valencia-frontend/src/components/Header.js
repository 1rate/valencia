import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../assets/logo.webp';
import SearchBar from './SearchBar';

function Header({ openCart }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Левая часть: Логотип и навигационные ссылки */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-gray-800">Валенсия</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cakes" className="text-gray-700 hover:text-primary">
              Товары
            </Link>
            <Link to="/constructor" className="text-gray-700 hover:text-primary">
              Конструктор
            </Link>
          </div>
        </div>

        {/* Правая часть: Поиск, корзина и меню */}
        <div className="flex items-center space-x-2">
          {/* Иконка поиска для мобильных устройств */}
          <div className="md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Поиск для десктопа */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
          {/* Иконка корзины */}
          <div className="relative">
            <button onClick={openCart} className="relative focus:outline-none">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary"
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
                <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-primary rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
          {/* Иконка меню для мобильных устройств */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Расширенное поле поиска на мобильных устройствах */}
      {isSearchOpen && (
        <div className="md:hidden bg-white shadow px-4 py-2">
          <SearchBar closeSearch={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow">
          <div className="px-4 pt-4 pb-2 space-y-2">
            <Link
              to="/cakes"
              className="block text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Товары
            </Link>
            <Link
              to="/constructor"
              className="block text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Конструктор
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
