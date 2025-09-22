"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "./logo";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  // Если требуется динамическая логика, зависящая от window,
  // вычисляем её только на клиенте.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className={cn("bg-red-200 w-full", className)}>
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between py-8">
        {/* Левая колонка: контактная информация (без телефона) */}
        <div className="flex flex-col gap-2 mb-10 md:mb-0">
          <p className="text-sm text-gray-800">
            ИП Симонова Татьяна Юрьевна (ИНН 590301561875)
          </p>
          <p className="text-sm text-gray-800">
            Адрес компании: Валенсия, 614031 г. Пермь, ул. Докучаева, 50б
          </p>
          <p className="text-sm text-gray-800">
            Email:{" "}
            <Link
              href="mailto:valensia_sweet@mail.ru"
              className="text-blue-600 hover:underline"
            >
              valensia_sweet@mail.ru
            </Link>
          </p>
          <p className="text-sm text-gray-800">
            Время работы: понедельник-пятница, с 8:00 до 21:00
          </p>
        </div>

        {/* Центральная колонка: навигационные ссылки */}
        <div className="flex flex-col gap-2 mb-10 md:mb-0 text-start">
          <Link href="/vacansies" className="font-bold text-lg">
            Вакансии
          </Link>
          <Link href="/addresses" className="font-bold text-lg">
            Адреса магазинов
          </Link>
          <a
            href="/assets/docs/public_offer.doc"
            download
            className="font-bold text-lg"
          >
            Публичная оферта
          </a>
          <a href="https://vk.com/valencia_sweet" className="font-bold text-lg">
            Группа ВКонтакте
          </a>
          <a href="https://t.me/valensia159" className="font-bold text-lg">
            Телеграм канал
          </a>
        </div>
        {/* Правая колонка: логотип, название и телефон */}
        <div className="flex flex-col items-end">
          <Link href="/">
            <div className="flex items-center gap-4">
              <Logo /> 
              <h1 className="text-2xl uppercase font-black">Valencia</h1>
            </div>
          </Link>
          <div className="mt-2 text-2xl font-bold">+7 (950) 443-30-24</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
