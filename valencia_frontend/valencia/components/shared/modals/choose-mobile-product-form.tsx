'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/store/cart';
import { Product } from '@/interfaces/types';
// import { ChooseMobileProductDrawer } from '../choose-mobile-product-modal';
import { MobileProductModalSecond } from '../modals-second/mobile-modal-second';
interface Props {
  product: Product;
  onSubmit?: VoidFunction;
  onClose: () => void;
}

export const ChooseMobileProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit, onClose }) => {
  const addCartItem = useCart((state) => state.addCartItem);
  // const [loading, setLoading] = useState(false);
  // productItemId?: number, ingredients?: number[]
  const onSubmit = async () => {
    // setLoading(true);
    try {

      const cartItem = {
        id: product.id,
        name: product.name,
        imageUrl: product.image,
        price: Number(product.price), 
        quantity: 1,
        description: product.description,
      };

      addCartItem(cartItem);

      toast.success(`${product.name} добавлена в корзину`);

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <MobileProductModalSecond product={product} onSubmit={onSubmit} onClose={onClose}/>
  );
};
