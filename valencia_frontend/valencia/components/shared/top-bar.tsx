import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { Category } from '@/interfaces/types';
import { CartButton } from './cart-button';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container>
        <div className="flex items-center justify-between">
          {/* Обёртка для категорий с горизонтальной прокруткой */}
          <div className="flex-1 overflow-x-auto">
            <Categories items={categories} />
          </div>
          {/* Сортировка остаётся фиксированной */}
          <div className="flex-shrink-0 ml-4 hidden md:block">
            {/* <SortPopup /> */}
            <CartButton />
          </div>
        </div>
                {/* <div className="flex items-center gap-3">
                  
                </div> */}
      </Container>
    </div>
  );
};
