import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { Category } from "@/interfaces/types";
import { CartButton } from "./cart-button";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = React.memo(
  ({ categories, className }) => {
    return (
      <div
        className={cn(
          "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
          className
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex-1 overflow-x-auto">
              <Categories items={categories} />
            </div>
            <div className="flex-shrink-0 ml-4 hidden md:block">
              <CartButton />
            </div>
          </div>
        </Container>
      </div>
    );
  }
);
