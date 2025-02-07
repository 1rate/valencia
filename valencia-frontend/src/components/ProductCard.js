// src/components/ProductCard.js

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// Компонент ProductCard отображает информацию о продукте
function ProductCard({ product, openModal }) {
  const dispatch = useDispatch();

  // Используем useSelector для получения количества товара в корзине
  const quantity = useSelector((state) => {
    const cartItem = state.cart.items.find((item) => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  });

  // Мемоизируем обработчики событий с помощью useCallback
  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: 'ADD_TO_CART', payload: product });
    },
    [dispatch, product]
  );

  const handleIncrease = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: 'ADD_TO_CART', payload: product });
    },
    [dispatch, product]
  );

  const handleDecrease = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: 'DECREASE_QUANTITY', payload: product });
    },
    [dispatch, product]
  );

  const handleOpenModal = useCallback(() => {
    openModal(product);
  }, [openModal, product]);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer flex flex-col"
      whileHover={{ scale: 1.02 }}
      onClick={handleOpenModal}
    >
      {/* Изображение продукта */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        {/* Название продукта и отметка "Новинка" */}
        <h3 className="text-lg font-semibold text-black mb-2">
          {product.name}{' '}
          {product.isNew && (
            <span className="text-sm text-accent">Новинка</span>
          )}
        </h3>
        {/* Описание продукта */}
        <p className="text-gray-600 text-sm flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          {/* Цена продукта */}
          <span className="text-lg font-semibold text-black">
            {product.price} ₽
          </span>
          {/* Контролы количества или кнопка "Выбрать" */}
          {quantity > 0 ? (
            <div className="flex items-center">
              {/* Кнопка уменьшения количества */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded-l"
              >
                -
              </motion.button>
              {/* Отображение количества */}
              <span className="px-2">{quantity}</span>
              {/* Кнопка увеличения количества */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded-r"
              >
                +
              </motion.button>
            </div>
          ) : (
            // Кнопка добавления в корзину
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 ease-in-out"
            >
              Выбрать
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
