'use client';

import { useState, useEffect } from 'react';
import { WhiteBlock } from '../white-block';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/store/cart';
import { CheckoutAddress } from '../checkout-adress';
import { useFormContext } from 'react-hook-form';
import { CheckoutAddressPickup } from '../checkout-self';

export const CheckoutAddressSelector = () => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const { totalAmount } = useCart();
  const { setValue, setError, clearErrors } = useFormContext();

  useEffect(() => {
    if (deliveryType === 'delivery' && totalAmount < 1000) {
      setError('address', { message: 'Минимальная сумма заказа для доставки - 1000 рублей' });
    } else {
      clearErrors('address');
    }
  }, [deliveryType, totalAmount, setError, clearErrors]);

  useEffect(() => {
    setValue('delivery_type', deliveryType);
    setValue('pickup_point', deliveryType === 'pickup' ? '' : null);
    setValue('delivery_adress', deliveryType === 'delivery' ? '' : null);
  }, [deliveryType, setValue]);

  return (
    <WhiteBlock title="3. Способ получения заказа">
      <RadioGroup
        defaultValue="delivery"
        className="mb-4"
        onValueChange={(value: 'delivery' | 'pickup') => setDeliveryType(value)}
      >
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="delivery" /> Доставка
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="pickup" /> Самовывоз
          </label>
        </div>
      </RadioGroup>

      {deliveryType === 'delivery' ? <CheckoutAddress /> : <CheckoutAddressPickup />}
    </WhiteBlock>
  );
};