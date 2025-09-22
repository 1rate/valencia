"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Product } from "@/interfaces/types";
import { ProductModalSecond } from "./modals-second/modal-second"; // десктоп модалка
import { MobileProductModalSecond } from "./modals-second/mobile-modal-second"; // мобильный drawer

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        console.log(searchQuery);
        const response = await Api.products.search({ name: searchQuery });
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClickItem = (product: Product) => {
    // Открываем модалку, устанавливая выбранный продукт
    setSelectedProduct(product);
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30 overflow-hidden" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11 border border-transparent hover:border-gray-400 focus:border-primary focus:border-[3px] transition-colors duration-300"
          type="text"
          placeholder="Найти тортик..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
                onClick={() => onClickItem(product)}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.image}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Рендерим модалку в зависимости от типа устройства */}
      {selectedProduct && !isMobile && (
        <ProductModalSecond
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {selectedProduct && isMobile && (
        <MobileProductModalSecond
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
