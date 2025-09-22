'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { CheckoutFormValues } from '@/components/shared/checkout-form-values';
import { CartItem } from '@/store/cart';
import { useCart } from '@/store/cart';

const ORDER_LIMIT_KEY = 'orderHistory';
const ORDER_LIMIT = 10000;
const ORDER_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

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

export const useOrderSubmission = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { totalAmount } = useCart();

  const submitOrder = async (data: CheckoutFormValues): Promise<void> => {
    if (!checkOrderLimit()) {
      toast.error('Превышено количество заказов за последние 24 часа.');
      return;
    }

    if (data.delivery_type === 'delivery' && totalAmount < 1000) {
      toast.error('Минимальная сумма заказа для доставки — 1000 рублей');
      return;  // Блокируем отправку формы
    }

    const cartItemsStr = Cookies.get('cartItems');
    let orderItems: CartItem[];

    try {
      orderItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
    } catch (error) {
      console.error('Ошибка при парсинге корзины', error);
      toast.error('Ошибка при обработке корзины. Попробуйте позже.');
      return;
    }

    if (orderItems.length === 0) {
      toast.error('Корзина пуста, добавьте товары.');
      return;
    }

    const formattedOrderItems = orderItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      ...data,
      delivery_type: data.delivery_type, // явно отправляем delivery_type
      // address: data.adress,
      payment_type: data.payment_type,
      order_items: formattedOrderItems,
    };

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
      console.log(orderData)
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

      const result = await response.json();
      const url: string | undefined = result.url;
      console.log(url);
      Cookies.remove('cartItems');

      toast.success('Заказ успешно оформлен!');
      setTimeout(() => {
        location.href = url || '/success';
      }, 200);

    } catch (error) {
      console.error('Ошибка:', error);
      toast.error(`Ошибка при оформлении заказа: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitOrder };
};
