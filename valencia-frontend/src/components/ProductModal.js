import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

function ProductModal({ product, closeModal }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Блокировка прокрутки и обработка клавиши Esc
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleIncrease = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: product });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={closeModal}
      ></div>
      <motion.div
        className="bg-white rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2 h-5/6 max-h-screen relative z-10 flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 h-64 md:h-full flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2 overflow-y-auto flex flex-col">
            <h2 className="text-2xl font-bold text-black mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              {product.description}
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Пищевая ценность на 100г:
              </h3>
              <ul className="text-text">
                <li>Калории: {product.calories} ккал</li>
                <li>Белки: {product.proteins} г</li>
                <li>Жиры: {product.fats} г</li>
                <li>Углеводы: {product.carbohydrates} г</li>
              </ul>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-semibold text-black">
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
                  className="bg-primary text-white px-6 py-3 rounded-full hover:bg-accent transition duration-300 ease-in-out"
                >
                  Выбрать
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;
