
'use client';
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/interfaces/types";
import { useRouter } from 'next/navigation';
import { Title } from "./title";
interface Props {
  product: Product;
  className?: string;
  onSubmit?: VoidFunction;
  loading?: boolean;
}

export const ChooseMobileProductDrawer: React.FC<Props> = ({ product, className, onSubmit }) => {
    const router = useRouter();
    
    return (
      <Drawer open={Boolean(product)} onOpenChange={() => router.back()} >
      <DrawerContent className={cn("w-full md:h-[70%] bg-white p-4 flex flex-col ", className)}>
      <div className="absolute top-4 right-4 z-20">
          <Button variant="ghost" onClick={() => router.back()}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
            <img
              src={product.image}
              className="relative top-2 transition-all z-10 duration-300 w-[350px] h-[350px] rounded-sm"
             />
            </DrawerTitle>
            <div className="mt-10 text-left">
            <Title text={product.name} size="sm" className="font-extrabold" />
            <DrawerDescription>{product.description}</DrawerDescription>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
                <Button
                  onClick={() => onSubmit?.()}>
                  Добавить в корзину за {Number(product.price)} ₽
                </Button>
              </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
    );
  };
