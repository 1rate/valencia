import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

function SearchBar({ closeSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchResultsRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  // Закрытие результатов поиска при клике вне компонента
  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target) &&
      !inputRef.current.contains(event.target)
    ) {
      if (!selectedProduct) {
        setSearchResults([]);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // Убираем обработчик touchstart, чтобы избежать конфликтов
    // document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [selectedProduct]);

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        axios
          .get('http://127.0.0.1:8000/api/products/')
          .then((response) => {
            const filteredResults = response.data.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5)); // Отображаем только первые 5 результатов
          })
          .catch((error) => {
            console.error('Ошибка при получении продуктов:', error);
          });
      }, 300); // Задержка 300 мс
    } else {
      setSearchResults([]);
    }

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm]);

  const openModal = (product) => {
    setSelectedProduct(product);
    if (closeSearch) {
      closeSearch();
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Добавляем обработчик отправки формы
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate('/cakes', { state: { searchTerm } });
      setSearchTerm('');
      setSearchResults([]);
      if (closeSearch) {
        closeSearch();
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-full px-3 py-1 focus:outline-none focus:ring focus:border-primary w-full"
          ref={inputRef}
        />
        <button
          type="submit"
          className="ml-2 text-gray-500 hover:text-primary focus:outline-none"
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
      </form>
      {searchResults.length > 0 && (
        <div
          className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50"
          ref={searchResultsRef}
        >
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={(e) => {
                e.stopPropagation();
                openModal(product);
              }}
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
