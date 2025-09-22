import React, { useEffect } from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const { register, setValue, formState: { errors } } = useFormContext();
  const totalPrice = totalAmount;
  useEffect(() => {
    register('payment_type', { required: 'Выберите способ оплаты' });
  }, [register]);

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `Рассчитает менеджер`}
      />

      <div className="mt-8">
        <span className="text-lg font-bold">Способ оплаты</span>
        <Select onValueChange={(val) => setValue('payment_type', val, { shouldValidate: true })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Выберите способ оплаты" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Картой</SelectItem>
            <SelectItem value="cash">Наличными</SelectItem>
          </SelectContent>
        </Select>
        {errors.payment_type && (
          <p className="text-red-500 mt-1 text-sm">{errors.payment_type.message?.toString()}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        disabled={loading} // здесь loading уже содержит loading || submitting
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
