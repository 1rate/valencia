import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function CakeConstructor() {
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [decorations, setDecorations] = useState([]);
  const dispatch = useDispatch();

  const handleDecorationChange = e => {
    const { value, checked } = e.target;
    setDecorations(prev =>
      checked ? [...prev, value] : prev.filter(dec => dec !== value)
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const customCake = {
      id: Date.now(),
      name: 'Индивидуальный торт',
      description: `Размер: ${size}, Вкус: ${flavor}, Украшения: ${decorations.join(', ')}`,
      price: 2000, // Цена может рассчитываться динамически
    };
    dispatch({ type: 'ADD_TO_CART', payload: customCake });
    // Очистка формы
    setSize('');
    setFlavor('');
    setDecorations([]);
    // Перенаправление или сообщение об успешном добавлении
    alert('Торт добавлен в корзину!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center font-serif">
        Соберите свой торт
      </h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 font-sans">Размер:</label>
          <select
            value={size}
            onChange={e => setSize(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Выберите размер</option>
            <option value="Маленький">Маленький</option>
            <option value="Средний">Средний</option>
            <option value="Большой">Большой</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 font-sans">Вкус:</label>
          <select
            value={flavor}
            onChange={e => setFlavor(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Выберите вкус</option>
            <option value="Шоколадный">Шоколадный</option>
            <option value="Ванильный">Ванильный</option>
            <option value="Клубничный">Клубничный</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 font-sans">Украшения:</label>
          <div className="flex flex-wrap">
            <label className="mr-4 mb-2">
              <input
                type="checkbox"
                value="Ягоды"
                checked={decorations.includes('Ягоды')}
                onChange={handleDecorationChange}
                className="mr-2"
              />
              Ягоды
            </label>
            <label className="mr-4 mb-2">
              <input
                type="checkbox"
                value="Шоколад"
                checked={decorations.includes('Шоколад')}
                onChange={handleDecorationChange}
                className="mr-2"
              />
              Шоколад
            </label>
            <label className="mr-4 mb-2">
              <input
                type="checkbox"
                value="Орехи"
                checked={decorations.includes('Орехи')}
                onChange={handleDecorationChange}
                className="mr-2"
              />
              Орехи
            </label>
            {/* Добавьте дополнительные опции при необходимости */}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-secondary py-2 px-4 rounded hover:bg-red-700 font-bold text-lg transition duration-300 ease-in-out"
        >
          Добавить в корзину
        </button>
      </form>
    </div>
  );
}

export default CakeConstructor;
