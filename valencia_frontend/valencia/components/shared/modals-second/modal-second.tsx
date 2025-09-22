"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { Product } from "@/interfaces/types";
import { ProductForm } from "../product-form";

interface Props {
  product: Product;
  className?: string;
  onClose: () => void;
}

export const ProductModalSecond: React.FC<Props> = ({
  product,
  className,
  onClose,
}) => {
  return (
    <Dialog open={Boolean(product)} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle className="sr-only">Выберите продукт</DialogTitle>
        <DialogDescription className="sr-only">
          Форма выбора продукта. Заполните необходимые поля для добавления
          товара в корзину.
        </DialogDescription>
        <ProductForm product={product} onSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};
