"use client";

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { Product } from '@/interfaces/types';

interface Props {
  title: string;
  items: Product[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    threshold: [0.1, 0.3, 0.5, 0.7, 1.0],
    rootMargin: "-20% 0px -20% 0px",
    
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);

    }
  }, [categoryId, intersection?.isIntersecting, title]);

  
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[50px]', listClassName)}>
      {items.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          imageUrl={product.image}
          price={Number(product.price)}
          ingredients={product.description}
        />
      ))}
    </div>
    </div>
  );
};