"use client";

import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { useCart, CartItem } from "@/store/cart";
// import { Product } from '@/interfaces/types';
import { ProductModalSecond } from "./modals-second/modal-second";
// import { MobileProductModalSecond } from './modals-second/mobile-modal-second';
import { ChooseMobileProductForm } from "./modals/choose-mobile-product-form";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = React.memo(
  ({ id, name, price, imageUrl, ingredients, className }) => {
    const { addCartItem, updateItemQuantity, removeCartItem, items } =
      useCart();
    const cartItem = items.find((item) => item.id === id);

    // Локальное состояние для открытия модального окна
    const [modalOpen, setModalOpen] = useState(false);
    // Определяем, мобильная ли версия (например, threshold 768px)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // На клиенте определяем ширину окна
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setModalOpen(true);
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const item: CartItem = {
        id,
        name,
        imageUrl,
        price,
        quantity: 1,
        description: ingredients,
      };
      addCartItem(item);
    };

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (cartItem) {
        updateItemQuantity(id, cartItem.quantity + 1);
      }
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (cartItem) {
        if (cartItem.quantity === 1) {
          removeCartItem(id);
        } else {
          updateItemQuantity(id, cartItem.quantity - 1);
        }
      }
    };

    const DESCRIPTION_THRESHOLD = 20;
    const isLongDescription = ingredients.length > DESCRIPTION_THRESHOLD;
    const displayedDescription = isLongDescription
      ? ingredients.substring(0, DESCRIPTION_THRESHOLD) + "…"
      : ingredients;

    return (
      <>
        <div
          className={className}
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
        >
          {/* Область с информацией о товаре */}
          <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
            <img
              className="w-[292px] h-[215px] transition-transform duration-300 hover:translate-y-1 rounded-sm"
              src={imageUrl}
              alt={name}
            />
          </div>
          <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
          <p className="text-sm text-gray-400">
            {displayedDescription}{" "}
            {isLongDescription && (
              <span className="text-primary ml-1 underline">Подробнее...</span>
            )}
          </p>

          {/* Область с ценой и кнопками добавления/изменения количества */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px] font-bold">
              <b>{Number(price)} ₽</b>
            </span>
            {cartItem ? (
              <div className="flex items-center">
                <Button
                  onClick={handleDecrement}
                  variant="secondary"
                  className="px-3 py-1 text-primary transition-colors duration-300 hover:bg-primary/30"
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-2 font-bold">{cartItem.quantity}</span>
                <Button
                  onClick={handleIncrement}
                  variant="secondary"
                  className="px-3 py-1 text-primary transition-colors duration-300 hover:bg-primary/30"
                >
                  <Plus size={16} />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                variant="secondary"
                className="text-primary font-bold transition-colors duration-300 hover:bg-primary/30"
              >
                <Plus size={20} className="mr-1" />
                Добавить
              </Button>
            )}
          </div>
        </div>

        {/* Рендерим модальное окно, если modalOpen=true */}
        {modalOpen && !isMobile && (
          <ProductModalSecond
            product={{
              id,
              name,
              price: price.toString(),
              image: imageUrl,
              description: ingredients,
              category: "",
            }}
            onClose={() => setModalOpen(false)}
          />
        )}
        {modalOpen && isMobile && (
          <ChooseMobileProductForm
            product={{
              id,
              name,
              price: price.toString(),
              image: imageUrl,
              description: ingredients,
              category: "",
            }}
            onClose={() => setModalOpen(false)}
          />
        )}
      </>
    );
  }
);
