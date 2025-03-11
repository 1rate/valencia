# shop/serializers.py

from rest_framework import serializers
from django.db import transaction
from .models import Product, Order, OrderItem
from shop.notifications import send_telegram_message  # Функция отправки уведомлений
from django.utils.timezone import localtime


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'created_at', 'order_items', 'pickup_point']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        # Создаём заказ и все связанные позиции в рамках атомарной транзакции
        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            for item_data in order_items_data:
                OrderItem.objects.create(order=order, **item_data)
        # Форматируем дату как "день-месяц-год, часы:минуты"
        created_at_local = localtime(order.created_at)
        created_at_formatted = created_at_local.strftime("%d-%m-%Y, %H:%M")
        total_amount = order.get_total_amount()
        order_items = order.order_items.all()
        order_items_text = ""
        if order_items.exists():
            for item in order_items:
                order_items_text += f"{item.product.name} – {item.quantity} ед.\n"
        else:
            order_items_text = "Заказали индивидуальный торт. Перезвоните для уточнения деталей."
        
        # Формируем сообщение для уведомления
        message = (
            f"Новый заказ #{order.id}\n"
            f"Клиент: {order.first_name} {order.last_name}\n"
            f"Телефон: {order.phone_number}\n"
            f"Дата: {created_at_formatted}\n"
            f"Сумма заказа: {int(total_amount)} рублей\n\n"
            f"Содержание заказа:\n{order_items_text}"
        )
        # Отправляем уведомление в Telegram
        send_telegram_message(message)
        return order
