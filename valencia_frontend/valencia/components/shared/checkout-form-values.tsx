import { z } from 'zod';

export const checkoutFormSchema = z.object({
  first_name: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  last_name: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone_number: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  delivery_type: z.enum(['delivery', 'pickup']),
  address: z.string().min(1, { message: 'Выберите адрес доставки или самовывоза' }),
  // pickup_point: z.string().optional(),
  payment_type: z.string().min(1, { message: 'Выберите тип оплаты' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;