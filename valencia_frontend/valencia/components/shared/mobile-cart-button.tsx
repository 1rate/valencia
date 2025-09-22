'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart';
import { cn } from '@/lib/utils';
import { CartDrawer } from './cart-drawer';

export const MobileCartButton: React.FC = () => {
  const { items } = useCart();
  // Считаем общее количество товаров
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden">
      {/* Оборачиваем кнопку в CartDrawer для открытия панели корзины */}
      <CartDrawer>
        <div className="fixed bottom-10 right-6 z-50">
          <Button
            variant="outline"
            className={cn(
              "rounded-full w-14 h-14 flex items-center justify-center",
              "bg-white text-primary"
            )}
          >
            <ShoppingCart size={24} strokeWidth={3} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2b bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </CartDrawer>
    </div>
  );
};
