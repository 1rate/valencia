"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/types";
// import { useCartStore } from '@/shared/store';
import { ProductForm } from "../product-form";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  console.log(product);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle className="sr-only">Выберите продукт</DialogTitle>
        <DialogDescription className="sr-only">
          Форма выбора продукта. Заполните необходимые поля для добавления
          товара в корзину.
        </DialogDescription>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
