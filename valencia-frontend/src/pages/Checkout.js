// src/pages/Checkout.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Checkout() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      first_name,
      last_name,
      phone_number,
      order_items: items.map(item => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Заказ успешно оформлен!');
        dispatch({ type: 'CLEAR_CART' });
        setLastName('');
        setFirstName('');
        setPhoneNumber('');
      } else {
        const errorData = await response.json();
        console.error('Ошибка сервера:', errorData);
        alert('Ошибка при оформлении заказа: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Ошибка сети при оформлении заказа.');
    }
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center font-serif">Оформление заказа</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">Ваша корзина пуста.</p>
      ) : (
        <>
          <div className="max-w-3xl mx-auto mb-6">
            <h3 className="text-2xl font-bold mb-4">Ваш заказ:</h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 p-4 bg-white shadow rounded"
              >
                <div>
                  <h4 className="text-xl font-bold text-primary font-serif">{item.name}</h4>
                  <p className="text-gray-700 font-sans">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="px-4">Количество: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold">{item.price * item.quantity} ₽</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold">Итого:</span>
              <span className="text-2xl font-bold">{totalPrice} ₽</span>
            </div>
          </div>

          <form onSubmit={handleOrderSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block mb-1">Фамилия</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Имя</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Номер телефона</label>
              <input
                type="tel"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-secondary py-3 mt-6 rounded hover:bg-accent font-bold text-lg transition duration-300 ease-in-out"
            >
              Подтвердить заказ
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;
