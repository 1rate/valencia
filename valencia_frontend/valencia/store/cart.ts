// store/cart.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  loading: boolean;
  addCartItem: (item: CartItem) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  updateItemQuantity: (id: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  hydrateCart: () => Promise<void>;
}

const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const useCart = create<CartState>((set, get) => ({
  // Начальное состояние — пустая корзина, totalAmount 0, loading false
  items: [],
  totalAmount: 0,
  loading: false,

  addCartItem: async (item: CartItem) => {
    set({ loading: true });
    const currentItems = get().items;
    const index = currentItems.findIndex((i) => i.id === item.id);
    let newItems;
    if (index !== -1) {
      newItems = currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      newItems = [...currentItems, item];
    }
    Cookies.set('cartItems', JSON.stringify(newItems));
    set({
      items: newItems,
      totalAmount: calculateTotalAmount(newItems),
      loading: false,
    });
  },

  removeCartItem: async (id: number) => {
    set({ loading: true });
    const newItems = get().items.filter((item) => item.id !== id);
    Cookies.set('cartItems', JSON.stringify(newItems));
    set({
      items: newItems,
      totalAmount: calculateTotalAmount(newItems),
      loading: false,
    });
  },

  updateItemQuantity: async (id: number, newQuantity: number) => {
    set({ loading: true });
    const newItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item
    );
    Cookies.set('cartItems', JSON.stringify(newItems));
    set({
      items: newItems,
      totalAmount: calculateTotalAmount(newItems),
      loading: false,
    });
  },

  clearCart: async () => {
    set({ loading: true });
    Cookies.remove('cartItems');
    set({ items: [], totalAmount: 0, loading: false });
  },

  hydrateCart: async () => {
    if (typeof window !== 'undefined') {
      set({ loading: true });
      const cookieItems = Cookies.get('cartItems');
      let loadedItems: CartItem[] = [];
      if (cookieItems) {
        try {
          loadedItems = JSON.parse(cookieItems) as CartItem[];
        } catch (error: unknown) {
          console.error('Ошибка при парсинге корзины из cookies', error);
        }
      }
      set({
        items: loadedItems,
        totalAmount: calculateTotalAmount(loadedItems),
        loading: false,
      });
    }
  },
}));
