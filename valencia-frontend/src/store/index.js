// src/store/index.js

import { createStore } from 'redux';
import rootReducer from './reducers';

// Проверяем доступность localStorage
function isLocalStorageAvailable() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Функция для сохранения состояния в localStorage
function saveToLocalStorage(state) {
  if (!isLocalStorageAvailable()) return;
  try {
    const serializedState = JSON.stringify(state.cart.items);
    localStorage.setItem('cartItems', serializedState);
  } catch (e) {
    console.warn('Ошибка сохранения в localStorage:', e);
  }
}

// Функция для загрузки состояния из localStorage
function loadFromLocalStorage() {
  if (!isLocalStorageAvailable()) return undefined;
  try {
    const serializedState = localStorage.getItem('cartItems');
    if (serializedState === null) return undefined;
    return {
      cart: {
        items: JSON.parse(serializedState),
      },
    };
  } catch (e) {
    console.warn('Ошибка загрузки из localStorage:', e);
    return undefined;
  }
}

// Загружаем состояние из localStorage
const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  // Для поддержки Redux DevTools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Подписываемся на изменения состояния и сохраняем в localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
