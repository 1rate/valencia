import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-row md:grid-cols-2 gap-5">
        <FormInput name="first_name" className="text-base" placeholder="Имя" />
        <FormInput name="last_name" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone_number" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
