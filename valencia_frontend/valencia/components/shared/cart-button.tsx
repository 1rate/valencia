'use client';

import { cn } from '@/lib/utils';
import React, { useState } from "react";
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCart } from '@/store/cart';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const { totalAmount, items } = useCart();
  // Вычисляем общее количество товаров, суммируя quantity каждого элемента
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);
  const handleClick = () => setIsActive((prev) => !prev);

  return (
    <CartDrawer>
      <Button
        className={cn('relative group', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div
          className={`flex items-center gap-1 transition duration-300 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        >
          <ShoppingCart className="w-4 h-4" strokeWidth={2} />
          <b>{itemCount}</b>
        </div>
        <ArrowRight
          className={`absolute right-5 transition duration-300 ${
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2"
          }`}
        />
      </Button>
    </CartDrawer>
  );
};
