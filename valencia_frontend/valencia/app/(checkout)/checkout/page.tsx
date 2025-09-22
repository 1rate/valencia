"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { CheckoutPersonalForm } from "@/components/shared/checkout";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { CheckoutCart } from "@/components/shared/checkout";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout-form-values";
import { useCart } from "@/store/cart";
import React, { useEffect } from "react";
import { useOrderSubmission } from "@/components/hooks/use-order-submission";
import { CheckoutAddressSelector } from "@/components/shared/checkout/checkout-choose-delivery";
import { CheckoutInfo } from "@/components/shared/checkout/checkout-infoblock";
export default function CheckoutPage() {
  const hydrateCart = useCart((state) => state.hydrateCart);

  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      address: "",
      payment_type: "",
      // comment: '',
    },
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    useCart.getState().updateItemQuantity(id, newQuantity);
  };
  const { submitting, submitOrder } = useOrderSubmission();
  const { totalAmount, items, removeCartItem, loading } = useCart();

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitOrder)}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Левая часть (форма и корзина) */}
            <div className="flex flex-col gap-6 flex-1 mb-10">
              <CheckoutInfo />
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddressSelector />
            </div>
            {/* Правая часть (боковая панель) */}
            <div className="w-full lg:w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
