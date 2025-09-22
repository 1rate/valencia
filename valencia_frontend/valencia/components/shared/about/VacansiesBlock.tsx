"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Vacancy {
  title: string;
  schedule: string;
  conditions?: string;
  responsibilities?: string;
}

interface Props {
  className?: string;
}

export const Vacansies: React.FC<Props> = () => {
  const vacancies: Vacancy[] = [
    {
      title: "Комплектовщик (в ночь)",
      schedule: "График работы: 2/2 по с 8.00 до 20.00",
      conditions: "Условия: от 40 000",
    },
    {
      title: "Пекарь",
      schedule: "График работы: 2/2 по с 7.00 до 19.00",
      conditions:
        "Условия: Работа в стабильной компании. Полный соц. пакет согласно ТК РФ (оплата отпусков, больничных и т.д.). Предоставляем обучение на рабочем месте опытным наставником. Льготное горячее питание 2 раза в день. Дружный коллектив, корпоративные мероприятия и отдых. Скидки на продукцию компании и продукты со склада.",
      responsibilities:
        "Обязанности: Изготовление бисквитов на торты. Выпечка мелкоштучной продукции (корзиночки, эклеры, трубочки сочники, куличи и др.)",
    },
    {
      title: "Автомойщик",
      schedule: "График работы: 5/2 с 9:00 до 18:00.",
      conditions: "Условия: от 35 000",
      responsibilities:
        "Обязанности: Мойка автомобилей (мойкой высокого давления karcher) до 6 машин в день. Помощь автослесарю ремонте автомобилей.",
    },
    {
      title: "Водитель-экспедитор",
      schedule: "График работы: 5/2 (ранние погрузки с 4:00)",
      responsibilities:
        "Обязанности: Доставка товара (сегмент: торты, пирожные и другие кондитерские изделия) по торговым точкам на автомобиле компании. Обеспечение сохранности принятого груза. Выполнение погрузочно-разгрузочных работ.",
    },
    {
      title: "Упаковщик (ца)",
      schedule: "График работы: 2/2 по с 7.00 до 19.00",
      responsibilities:
        "Обязанности: Упаковка готовой продукции. Маркировка упаковки путем наклеивания этикеток на упаковку, вручную. Завязывать ленты.",
    },
    {
      title: "Грузчик-разнорабочий",
      schedule: "График работы: 2/2 по с 7.00 до 19.00",
      conditions: "Условия: от 36 000",
      responsibilities:
        "Обязанности: Погрузка и разгрузка пищевой продукции. Вывоз готовой продукции со склада. Доставка сырья от склада на производство. Сборка коробок.",
    },
    {
      title: "Уборщица производственных помещений",
      schedule: "График работы: 2/2 по с 8.00 до 20.00",
      conditions: "Условия: от 30 000",
      responsibilities:
        "Обязанности: Уборка производственных помещений (мытье полов, сбор мусора)",
    },
    {
      title: "Мойщица инвентаря",
      schedule: "График работы: 2/2 по с 8.00 до 20.00",
      conditions: "Условия: от 30 000",
      responsibilities:
        "Обязанности: Мытье кондитерского инвентаря. Поддержание чистоты и порядка на рабочем месте",
    },
    {
      title: "Оператор на выпечку полуфабрикатов \"орешки\" (обучение)",
      schedule: "График работы: 2/2 по с 7.00 до 19.00",
      conditions: "Условия: от 45 000",
      responsibilities:
        "Обязанности: Работа на производственной автоматической линии. Замес теста для машины. Контроль выпекания \"скорлупок\".",
    },
    {
      title: "Кондитер",
      schedule: "График работы: 2/2 по с 7.00 до 19.00",
      conditions: "Условия: от 45 000",
      responsibilities:
        "Обязанности: Сборка тортов и мелкоштучных кондитерских изделий (пирожные, рулеты и др.). Оформление (украшение) кондитерских изделий.",
    },
    {
      title: "Продавец-кассир",
      schedule: "График работы: 2/2 с 9:00 до 21:00",
      responsibilities:
        "Обязанности: Активные продажи. Консультирование и обслуживание покупателей по ассортименту продукции. Работа с кассой. Поддержание чистоты и порядка в торговой точке. Участие в инвентаризации. Составление отчетности.",
    },
  ];

  return (
    <section className="mb-10 ml-6">
      <h2 className="text-2xl font-bold mb-4">Вакансии</h2>
      <ScrollArea className="h-96 rounded-md border">
        <div className="flex flex-col space-y-4 p-4">
          {vacancies.map((vacancy, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {vacancy.title}
              </h3>
              <p className="mt-1 text-gray-700">{vacancy.schedule}</p>
              {vacancy.conditions && (
                <p className="mt-1 text-gray-700">{vacancy.conditions}</p>
              )}
              {vacancy.responsibilities && (
                <p className="mt-1 text-gray-700">{vacancy.responsibilities}</p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-14 items-start">
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSfMJ5srcqw92I9QFFNBSHvdFKLKGK2CHKqH9TfPNXmTBvK0fw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="font-bold text-lg text-primary">
            Присоединяйтесь к нам!
          </Button>
        </Link>
      </div>
    </section>
  );
};
