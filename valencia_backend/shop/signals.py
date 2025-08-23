# # shop/signals.py
# import logging
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from shop.models import Order
# from shop.notifications import send_telegram_message

# logger = logging.getLogger(__name__)

# @receiver(post_save, sender=Order)
# def order_created_notification(sender, instance, created, **kwargs):
#     if created:
#         # Форматируем дату как "день-месяц-год, часы:минуты"
#         created_at_formatted = instance.created_at.strftime("%d-%m-%Y, %H:%M")
#         total_amount = instance.get_total_amount()

        
#         order_items = instance.order_items.all()
#         # Формируем текстовое содержание заказа
#         order_items_text = ""
#         if order_items.exists():
#             for item in order_items:
#                 order_items_text += f"{item.product.name} – {item.quantity} штук\n"
#         else:
#             order_items_text = "Заказ не содержит товаров."
#             logger.warning("Для заказа #%s отсутствуют позиции OrderItem.", instance.id)

#         message = (
#             f"Новый заказ #{instance.id}\n"
#             f"Клиент: {instance.first_name} {instance.last_name}\n"
#             f"Телефон: {instance.phone_number}\n"
#             f"Дата: {created_at_formatted}\n"
#             f"Сумма заказа: {total_amount}\n\n"
#             f"Содержание заказа:\n{order_items_text}"
#         )
#         logger.info("Заказ создан, отправка уведомления в Telegram:\n%s", message)
#         send_telegram_message(message)
