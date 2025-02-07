// src/pages/CakeList.js

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ScrollToTopButton from '../components/ScrollToTopButton';
import NavigationBar from '../components/NavigationBar';

function CakeList() {
  // Состояния для данных и управления компонентом
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);

  // Мемоизированный список категорий
  const categories = useMemo(
    () => [
      'Торты',
      'Печенье',
      'Выпечка',
      'Шоколад',
      'Макароны',
      'Тарты',
      'Подарочные наборы',
      'Комбо',
      'Завтраки',
      'Кофе',
      'Напитки',
      'Десерты',
      'Детские блюда',
      'Акции',
    ],
    []
  );

  const location = useLocation();
  const categoryRefs = useRef({});

  // Обработчик прокрутки для обновления текущей категории
  useEffect(() => {
    const handleScroll = () => {
      // Определение текущей категории на основе позиции прокрутки
      const scrollPosition = window.scrollY + 200;
      let currentCat = null;

      categories.forEach((category) => {
        const ref = categoryRefs.current[category];
        if (ref && ref.offsetTop <= scrollPosition) {
          currentCat = category;
        }
      });

      setCurrentCategory(currentCat);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  // Получение продуктов при монтировании компонента
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  // Установка поискового запроса из состояния роутинга
  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    } else {
      setSearchTerm('');
    }
  }, [location.state]);

  // Функция для прокрутки к определенной категории
  const scrollToCategory = useCallback((category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: 'smooth' });
      setCurrentCategory(category);
    }
  }, []);

  // Функции для открытия и закрытия модального окна продукта
  const openModal = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Мемоизированный список отфильтрованных продуктов
  const filteredProducts = useMemo(() => {
    return searchTerm
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;
  }, [products, searchTerm]);

  return (
    <div className="">
      {/* Навигационная панель */}
      <NavigationBar
        categories={categories}
        currentCategory={currentCategory}
        scrollToCategory={scrollToCategory}
      />

      {/* Контент */}
      <div className="container mx-auto px-4 pt-8">
        {categories.map((category) => {
          // Фильтруем продукты по категории
          const categoryProducts = filteredProducts.filter(
            (product) => product.category === category
          );

          if (categoryProducts.length === 0) return null;

          return (
            <div
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              className="mb-8"
            >
              {/* Заголовок категории */}
              <h2 className="text-3xl font-bold text-black mb-4">{category}</h2>
              {/* Карточки продуктов */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    openModal={openModal}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Модальное окно продукта */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}

      {/* Кнопка прокрутки вверх */}
      <ScrollToTopButton />
    </div>
  );
}

export default CakeList;
