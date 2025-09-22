// components/cart-drawer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartDrawerItem } from './cart-drawer-item';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/cart';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, hydrateCart } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  React.useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
        {totalAmount > 0 ? (
              <SheetHeader>
                <SheetTitle>
                  В корзине <span className="font-bold">{items.length} {items.length === 1 ? 'товар' : 'товара'}</span>
                </SheetTitle>
              </SheetHeader>
            ) : (
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle>Корзина пуста</SheetTitle>
                </SheetHeader>
              </VisuallyHidden>
            )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center md:w-72 mx-auto">
              <Image src="/assets/images/box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы один товар, чтобы совершить заказ
              </p>
              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={Number(item.price)}
                      quantity={item.quantity}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                      onClickRemove={() => removeCartItem(item.id)}
                      details={item.description}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>
                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      disabled={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      К оформлению заказа
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
