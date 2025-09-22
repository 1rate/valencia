'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-[30vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Спасибо за заказ!</h1>
        <p className="mt-4 text-lg">
          С вами свяжется менеджер в течение 10 минут.
        </p>
        <p className="mt-2 italic text-gray-600">
          Если заказ был сделан не в рабочие часы, то он будет обработан на следующий день.
        </p>
      </div>
      <Link href="/" className="mt-8">
        <Button variant='default'>
          Перейти на главную
          </Button>
      </Link>
    </div>
  );
}
