"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { GetCake } from "./get-cake";
import { Title } from "./title";
import { Logo } from "./logo";

export const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Триггер открытия sheet: иконка Menu */}
      <SheetTrigger asChild>
        <button className="p-2 md:hidden">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#F4F1EE]">
        <SheetHeader className="flex items-start justify-between">
          <SheetTitle>
            <Link href="/" className="flex flex-row gap-4 items-center">
              {/* <Logo /> */}
              <SheetDescription>
                {/* <span className="text-2xl font-extrabold uppercase text-black">
                  Valencia
                </span> */}
                <Logo />
              </SheetDescription>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <hr className="my-4" />
        <nav className="flex flex-col space-y-4">
          <Title text="Меню" size="md" className="font-extrabold" />
          <SheetClose asChild>
            <Link href="/vacansies" className="text-lg">
              Вакансии
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/addresses" className="text-lg">
              Где нас найти ?
            </Link>
          </SheetClose>
        </nav>
        <hr className="my-8" />
        <div className="flex flex-col mt-36">
          <GetCake />
        </div>
      </SheetContent>
    </Sheet>
  );
};
