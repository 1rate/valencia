'use client';

import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { CheckoutFormValues } from "./checkout-form-values";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "./checkout-form-values";
import { FormInput } from "./form";

import { usePrivateCakeSubmission } from "../hooks/use-cake-sumbission";

export const GetCake: React.FC = () => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      address: 'Уточнить',
      payment_type: 'Уточнить',
      delivery_type: 'delivery', // добавляем значение по умолчанию
    },
  });


  const { submitting, submitPrivateCakeOrder } = usePrivateCakeSubmission();
  
  return (
    <FormProvider {...form}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            // className="rounded-2xl outline-none bg-gray-100 border border-transparent hover:border-gray-400 focus:border-primary focus:border-[3px] transition-colors duration-300"
            className="px-3 py-1 border-red-300 border transition-colors duration-300 hover:bg-primary/30"
          >
            Заказать тортик
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 overflow-y-auto">
          <form onSubmit={form.handleSubmit(submitPrivateCakeOrder)}>
            <div className="grid gap-7">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Тортик сделанный для вас!</h4>
              </div>
              <div className="grid gap-5">
                <div className="grid grid-row gap-5">
                  <FormInput name="first_name" className="text-base" placeholder="Имя" />
                  <FormInput name="last_name" className="text-base" placeholder="Фамилия" />
                  <FormInput name="email" className="text-base" placeholder="E-Mail" />
                  <FormInput name="phone_number" className="text-base" placeholder="Телефон" />
                </div>
                
                <Button type="submit" variant="outline" disabled={submitting}>
                  Отправить
                </Button>
              </div>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </FormProvider>
  );
};

export default GetCake;
