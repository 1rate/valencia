'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckoutFormValues } from '@/components/shared/checkout-form-values';

const ORDER_LIMIT_KEY = 'orderHistory';
const ORDER_LIMIT = 10000; // Максимум 1
const ORDER_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

function checkOrderLimit(): boolean {
  const now = Date.now();
  const ordersRaw = localStorage.getItem(ORDER_LIMIT_KEY);
  let orders: number[] = ordersRaw ? JSON.parse(ordersRaw) : [];

  orders = orders.filter((ts) => now - ts < ORDER_LIMIT_WINDOW);

  if (orders.length >= ORDER_LIMIT) {
    return false;
  }

  orders.push(now);
  localStorage.setItem(ORDER_LIMIT_KEY, JSON.stringify(orders));
  return true;
}

// function getCookie(name: string): string | undefined {
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith(name + '=')) {
//         return decodeURIComponent(cookie.substring(name.length + 1));
//       }
//     }
//   }
//   return undefined;
// }

const ORDER_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/`;

export function usePrivateCakeSubmission() {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitPrivateCakeOrder = async (data: CheckoutFormValues): Promise<void> => {
    if (!checkOrderLimit()) {
      toast.error('Превышено количество заказов за последние 24 часа.');
      return;
    }

    // const csrftoken = getCookie('csrftoken');

    // if (!csrftoken) {
    //   toast.error('Отсутствует CSRF токен. Перезагрузите страницу.');
    //   return;
    // }

    try {
      setSubmitting(true);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrftoken,
      };

      const orderData = {
        ...data,
        order_items: [],
      };
      
      console.log(data)
      const response = await fetch(ORDER_URL, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка сервера при оформлении заказа');
      }

      toast.success('Заказ частного тортика успешно оформлен!');
      setTimeout(() => {
        location.href = '/success';
      }, 100);

    } catch (error) {
      console.error('Ошибка сети:', error);
      toast.error('Ошибка при оформлении заказа: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitPrivateCakeOrder };
}








// 'use client';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { CheckoutFormValues } from '@/components/shared/checkout-form-values';

// const ORDER_LIMIT_KEY = 'orderHistory';
// const ORDER_LIMIT = 100; // Максимум 1
// const ORDER_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

// /**
//  * Проверяет, можно ли оформить новый заказ, учитывая лимит заказов за 24 часа.
//  * @returns {boolean} Если лимит не превышен, возвращает true, иначе false.
//  */
// function checkOrderLimit(): boolean {
//   const now = Date.now();
//   const ordersRaw = localStorage.getItem(ORDER_LIMIT_KEY);
//   let orders: number[] = ordersRaw ? JSON.parse(ordersRaw) : [];

//   // Фильтруем заказы, оставляем только за последние 24 часа
//   orders = orders.filter((ts) => now - ts < ORDER_LIMIT_WINDOW);

//   if (orders.length >= ORDER_LIMIT) {
//     return false;
//   }

//   // Добавляем текущую отметку времени и сохраняем обратно
//   orders.push(now);
//   localStorage.setItem(ORDER_LIMIT_KEY, JSON.stringify(orders));
//   return true;
// }

// /**
//  * Хук для оформления заказа для частного тортика.
//  * При таком заказе корзина всегда отправляется пустой.
//  */
// export function usePrivateCakeSubmission() {
//   const [submitting, setSubmitting] = useState<boolean>(false);

//   const submitPrivateCakeOrder = async (data: CheckoutFormValues): Promise<void> => {
//     // Клиентская проверка лимита заказов
//     if (!checkOrderLimit()) {
//       toast.error('Превышено количество заказов за последние 24 часа.');
//       return;
//     }

//     try {
//       setSubmitting(true);

//       // Формируем данные заказа с пустой корзиной
//       const orderData = {
//         ...data,
//         order_items: [], // всегда отправляем пустую корзину
//       };

//       // Отправляем запрос на API
//       const response = await fetch('http://127.0.0.1:8000/api/orders/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         toast.success('Заказ частного тортика успешно оформлен!');
//         setTimeout(() => {
//             location.href = '/';
//             }, 100);
//       } else {
//         const errorData = await response.json();
//         console.error('Ошибка сервера:', errorData);
//         toast.error('Ошибка при оформлении заказа: ' + JSON.stringify(errorData));
//       }
//     } catch (error) {
//       console.error('Ошибка сети:', error);
//       toast.error('Ошибка сети при оформлении заказа.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return { submitting, submitPrivateCakeOrder };
// }
