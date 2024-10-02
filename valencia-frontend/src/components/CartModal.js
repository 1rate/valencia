import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function CartModal({ isOpen, closeCart }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
    closeCart();
    navigate('/checkout');
  };

  // Блокировка прокрутки заднего фона при открытой корзине
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Обработчик клавиши Escape
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  // Обработчики свайпа
  const handlers = useSwipeable({
    onSwipedRight: () => closeCart(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          {...handlers}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeCart}
          ></div>

          {/* Cart Slider */}
          <motion.div
            className="w-full sm:w-96 bg-white h-full shadow-xl flex flex-col relative z-50 ml-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Корзина</h2>
              <button
                onClick={closeCart}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
              >
                &times;
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-gray-700">Ваша корзина пуста.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="px-2 py-1 bg-gray-200 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="px-2 py-1 bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-semibold">
                        {item.price * item.quantity} ₽
                      </span>
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-red-500 text-sm mt-2"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-lg font-bold">{totalPrice} ₽</span>
                </div>
                <button
                  onClick={handleClearCart}
                  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700 mb-2"
                >
                  Очистить корзину
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-accent"
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartModal;
