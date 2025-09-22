"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { MobileMenu } from "./mobile-menu";
import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
import GetCake from "./get-cake";
import { Logo } from "./logo";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasDop?: boolean;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  // hasDop = true,
  className,
}) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex flex-col md:flex-row  items-center justify-between py-8">
        {/* Логотип и название */}
        <div className="flex justify-start gap-4 items-center w-full md:w-auto md:justify-between md">
          <div className="md:hidden">
            <MobileMenu />
          </div>
          <Link href="/">
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Logo />
              </div>
              <div>
                <h1 className="text-2xl uppercase font-black">Валенсия</h1>
                <p className="text-sm text-gray-400 leading-3">
                  Лучшие тортики только для вас!
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-[clamp(1rem,2vw,3rem)]">
          <Link href="/addresses">
            <Button
              variant="outline"
              // className="rounded-2xl outline-none bg-gray-100 border border-transparent hover:border-gray-400 focus:border-primary focus:border-[3px] transition-colors duration-300"
              className="px-3 py-1 border-red-300 border transition-colors duration-300 hover:bg-primary/30"
            >
              Где нас найти ?
            </Button>
          </Link>
          <Link href="/vacansies">
            <Button
              variant="outline"
              // className="rounded-2xl outline-none bg-gray-100 border border-transparent hover:border-gray-400 focus:border-primary focus:border-[3px] transition-colors duration-300"
              className="px-3 py-1 border-red-300 border transition-colors duration-300 hover:bg-primary/30"
            >
              Вакансии
            </Button>
          </Link>
          <GetCake />
        </div>

        {/* Блок поиска */}
        {hasSearch && (
          <div className="w-full md:w-auto mt-10 md:mt-0 ">
            <SearchInput />
          </div>
        )}

        {/* Дополнительное меню на десктопе */}
        {/* {hasDop && (
          <div className="hidden md:flex w-full mt-6 md:mt-0 items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  Важная информация
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/addresses">Где нас найти?</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/vacansies">Вакансии</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <GetCake />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )} */}
      </Container>
    </header>
  );
};
