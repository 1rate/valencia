// src/pages/Cart.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleDecrease = (item) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item });
  };

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center font-serif">Корзина</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">Ваша корзина пуста.</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 p-4 bg-white shadow rounded"
            >
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">{item.name}</h3>
                <p className="text-gray-700 font-sans">{item.description}</p>
                <div className="flex items-center mt-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 bg-gray-200"
                  >
                    -
                  </motion.button>
                  <span className="px-4">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-gray-200"
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold">{item.price * item.quantity} ₽</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(item)}
                  className="text-red-500 mt-2"
                >
                  Удалить
                </motion.button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <span className="text-2xl font-bold">Итого:</span>
            <span className="text-2xl font-bold">{totalPrice} ₽</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            className="w-full bg-primary text-secondary py-3 mt-6 rounded hover:bg-accent font-bold text-lg transition duration-300 ease-in-out"
          >
            Оформить заказ
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            className="w-full bg-gray-500 text-white py-3 mt-2 rounded hover:bg-gray-700 font-bold text-lg transition duration-300 ease-in-out"
          >
            Очистить корзину
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Cart;
