import { cn } from '@/lib/utils';
import React from 'react';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './cart-item-details';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-white p-4 md:p-5 gap-4 md:gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}
    >
      {/* Контейнер для изображения */}
      <div className="w-24 md:w-24">
        <CartItem.Image
          src={imageUrl}
          className="h-24 w-full object-cover rounded-sm"
        />
      </div>

      <div className="flex-1 ">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex flex-row md:flex-row items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
