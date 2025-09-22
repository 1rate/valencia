"use client";

import React from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";
import { Product } from "@/interfaces/types";
import { useScrollSpy } from "../hooks/use-scroll-spy";

interface Props {
  title: string;
  items: Product[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = React.memo(
  ({ title, items, listClassName, categoryId, className }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const sectionRef = React.useRef<HTMLDivElement>(null);

    useScrollSpy({
      targetRef: sectionRef,
      categoryId,
      onActive: setActiveCategoryId,
      offset: 50,
    });

    return (
      <div className={className} id={title} ref={sectionRef}>
        <Title text={title} size="lg" className="font-extrabold mb-5" />
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[50px]",
            listClassName
          )}
        >
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
  }
);
