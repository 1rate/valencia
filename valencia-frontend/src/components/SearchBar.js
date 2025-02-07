// src/components/SearchBar.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';
import { transliterate as tr } from 'transliteration';

function SearchBar({ closeSearch, closeMenu }) {
  // Состояния для управления поиском и выбранным продуктом
  const [searchTerm, setSearchTerm] = useState(''); // Текущий поисковый запрос
  const [searchResults, setSearchResults] = useState([]); // Результаты поиска
  const [selectedProduct, setSelectedProduct] = useState(null); // Выбранный продукт для отображения в модалке
  const [allProducts, setAllProducts] = useState([]); // Все продукты

  // Ссылки на DOM-элементы
  const searchResultsRef = useRef(null); // Ссылка на контейнер результатов поиска
  const inputRef = useRef(null); // Ссылка на поле ввода
  const debounceTimeout = useRef(null); // Ссылка на таймаут для дебаунса

  const navigate = useNavigate();

  // Загрузка всех продуктов при монтировании компонента
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении продуктов:', error);
      });
  }, []);

  // Обработчик кликов вне компонента для закрытия результатов поиска
  const handleClickOutside = useCallback(
    (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        if (!selectedProduct) {
          setSearchResults([]);
        }
      }
    },
    [selectedProduct]
  );

  // Добавляем и удаляем обработчик событий клика вне компонента
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Функция для выполнения поиска с задержкой (дебаунс)
  const performSearch = useCallback(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const transliteratedSearchTerm = tr(searchTerm.toLowerCase());
    const searchTermLower = searchTerm.toLowerCase();

    const filteredResults = allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();

      // Транслитерируем название и категорию продукта
      const productNameTransliterated = tr(productName);
      const productCategoryTransliterated = tr(productCategory);

      return (
        productName.includes(searchTermLower) ||
        productCategory.includes(searchTermLower) ||
        productNameTransliterated.includes(transliteratedSearchTerm) ||
        productCategoryTransliterated.includes(transliteratedSearchTerm)
      );
    });

    setSearchResults(filteredResults.slice(0, 5)); // Отображаем только первые 5 результатов
  }, [searchTerm, allProducts]);

  // Эффект для выполнения поиска при изменении поискового запроса с дебаунсом
  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      performSearch();
    }, 300); // Задержка 300 мс

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm, performSearch]);

  // Обработчик изменения ввода поиска
  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Открытие модального окна с информацией о продукте
  const openModal = useCallback(
    (product) => {
      setSelectedProduct(product);
      if (closeSearch) {
        closeSearch();
      }
    },
    [closeSearch]
  );

  // Закрытие модального окна
  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Обработчик отправки формы поиска
  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        navigate('/cakes', { state: { searchTerm } });
        setSearchTerm('');
        setSearchResults([]);
        if (closeSearch) {
          closeSearch();
        }
        if (closeMenu) {
          closeMenu();
        }
      }
    },
    [searchTerm, navigate, closeSearch, closeMenu]
  );

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleInputChange}
          className="border rounded-full px-3 py-1 focus:outline-none focus:ring focus:border-primary w-full"
          ref={inputRef}
        />
        <button
          type="submit"
          className="ml-2 text-gray-500 hover:text-primary focus:outline-none"
        >
          {/* Иконка поиска */}
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
      </form>
      {/* Отображение результатов поиска */}
      {searchResults.length > 0 && (
        <div
          className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50"
          ref={searchResultsRef}
        >
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => openModal(product)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover mr-2 rounded"
              />
              <div>
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-gray-500">{product.price} ₽</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Модальное окно продукта */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
}

export default SearchBar;
