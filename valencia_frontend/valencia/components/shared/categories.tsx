'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@/interfaces/types';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: number]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    if (categoryActiveId && itemRefs.current[categoryActiveId]) {
      itemRefs.current[categoryActiveId]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [categoryActiveId]);

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(categoryName);
    if (targetElement) {
      const offset = 150;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto', className)}
    >
      {items.map(({ name, id }) => (
        <a
          key={id}
          ref={(el) => {
            itemRefs.current[id] = el;
          }}
          href={`/#${name}`}
          onClick={(e) => handleCategoryClick(e, name)}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 whitespace-nowrap transition-colors duration-300 md:hover:text-primary',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
