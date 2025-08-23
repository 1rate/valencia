# shop/serializers.py

from rest_framework import serializers
from django.db import transaction
from .models import Product, Order, OrderItem, PickupPoint
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
    delivery_type = serializers.ChoiceField(choices=['delivery', 'pickup'], write_only=True)
    address = serializers.CharField(write_only=True)
    payment_type = serializers.CharField()

    class Meta:
        model = Order
        fields = [
            'id', 'first_name', 'last_name', 'phone_number', 'created_at',
            'order_items', 'pickup_point', 'delivery_adress',
            'delivery_type', 'address', 'payment_type'
        ]
        read_only_fields = ['pickup_point', 'delivery_adress']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        delivery_type = validated_data.pop('delivery_type')
        address = validated_data.pop('address')

        if delivery_type == 'delivery':
            validated_data['delivery_adress'] = address
            validated_data['pickup_point'] = None
        else:
            pickup_point = PickupPoint.objects.get(address=address)
            validated_data['pickup_point'] = pickup_point
            validated_data['delivery_adress'] = None

        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            for item_data in order_items_data:
                OrderItem.objects.create(order=order, **item_data)

        created_at_local = localtime(order.created_at)
        created_at_formatted = created_at_local.strftime("%d-%m-%Y, %H:%M")
        total_amount = order.get_total_amount()
        order_items_text = "\n".join([
            f"{item.product.name} – {item.quantity} ед." for item in order.order_items.all()
        ])

        if order_items_text == '':
            order_items_text = 'Заказали индвидуальный тортик! Перезвоните для уточнения деталей.'

        message = (
            f"Новый заказ #{order.id}\n"
            f"Клиент: {order.first_name} {order.last_name}\n"
            f"Телефон: {order.phone_number}\n"
            f"Дата: {created_at_formatted}\n"
            f"Вид: {delivery_type}\n"
            # f"Точка выдачи: {pickup_point}\n"
            f"Адресс доставки: {address}\n"
            f"Сумма заказа: {int(total_amount)} рублей\n\n"
            f"Содержание заказа:\n{order_items_text}"
        )

        send_telegram_message(message)
        return order

