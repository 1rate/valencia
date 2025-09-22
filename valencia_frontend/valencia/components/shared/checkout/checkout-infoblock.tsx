import React from 'react';
import { WhiteBlock } from '../white-block';

interface CheckoutInfoProps {
  className?: string;
}

export const CheckoutInfo: React.FC<CheckoutInfoProps> = ({ className }) => {
  return (
    <WhiteBlock title="0. Информация для покупателей" className={className}>
      <div className="space-y-4 text-base text-gray-700">
        <p className="font-semibold text-lg">Уважаемые покупатели!</p>
        <p>
          Заказ считается принятым только после обратного звонка оператора на указанный вами номер и подтверждения наличия выбранных товаров.
        </p>
        <p>
          Заказная продукция принимается минимум за двое суток с момента подтверждения заказа.
        </p>
        <p>
          Рабочие часы оператора: <span className="font-semibold">с 8:00 до 17:00</span> в будние дни.
        </p>
        <p>
          Минимальная стоимость доставки составляет <span className="font-semibold">1000 рублей</span>.
        </p>
      </div>
    </WhiteBlock>
  );
};
