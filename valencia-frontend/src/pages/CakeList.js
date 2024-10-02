import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ScrollToTopButton from '../components/ScrollToTopButton';
import NavigationBar from '../components/NavigationBar';

function CakeList() {
  const [products, setProducts] = useState([]);
  const categories = [
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
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const location = useLocation();
  const categoryRefs = useRef({});

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

  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    } else {
      setSearchTerm('');
    }
  }, [location.state]);

  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: 'smooth' });
      setCurrentCategory(category);
    }
  };

  const handleScroll = () => {
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="">
      <NavigationBar
        categories={categories}
        currentCategory={currentCategory}
        scrollToCategory={scrollToCategory}
      />

      <div className="container mx-auto px-4">
        {categories.map((category) => {
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
              <h2 className="text-3xl font-bold text-black mb-4">{category}</h2>
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

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} closeModal={closeModal} />
        )}
      </AnimatePresence>

      <ScrollToTopButton />
    </div>
  );
}

export default CakeList;
