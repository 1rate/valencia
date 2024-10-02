// src/components/ProductCard.js

import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

function ProductCard({ product, openModal }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DECREASE_QUANTITY', payload: product });
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer flex flex-col"
      whileHover={{ scale: 1.02 }}
      onClick={() => openModal(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-black mb-2">
          {product.name}{' '}
          {product.isNew && (
            <span className="text-sm text-accent">Новинка</span>
          )}
        </h3>
        <p className="text-gray-600 text-sm flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-black">
            {product.price} ₽
          </span>
          {quantity > 0 ? (
            <div className="flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded-l"
              >
                -
              </motion.button>
              <span className="px-2">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded-r"
              >
                +
              </motion.button>
            </div>
          ) : (
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
