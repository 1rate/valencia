'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ChooseProductForm } from './choose-product-form';
import { useCart } from '@/store/cart';
import { Product } from '@/interfaces/types';

interface Props {
  product: Product;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCart((state) => state.addCartItem);
  const [loading, setLoading] = useState(false);
  // productItemId?: number, ingredients?: number[]
  const onSubmit = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <ChooseProductForm
      imageUrl={product.image}
      name={product.name}
      onSubmit={onSubmit}
      price={Number(product.price)}
      ingredients={product.description}
      loading={loading}
    />
  );
};
