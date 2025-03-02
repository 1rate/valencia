from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Торты', 'Торты'),
        ('Печенье', 'Печенье'),
        ('Выпечка', 'Выпечка'),
        ('Шоколад', 'Шоколад'),
        ('Макароны', 'Макароны'),
        ('Тарты', 'Тарты'),
        ('Подарочные наборы', 'Подарочные наборы'),
        ('Комбо', 'Комбо'),
        ('Завтраки', 'Завтраки'),
        ('Кофе', 'Кофе'),
        ('Напитки', 'Напитки'),
        ('Десерты', 'Десерты'),
        ('Детские блюда', 'Детские блюда'),
        ('Акции', 'Акции'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')  # Требуется настройка медиа-файлов
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    is_new = models.BooleanField(default=False)
    is_popular = models.BooleanField(default=False)
    calories = models.IntegerField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()

    def __str__(self):
        return self.name

class Order(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Заказ #{self.id} от {self.first_name} {self.last_name}"

    def get_total_amount(self):
        return sum(item.get_total_price() for item in self.order_items.all())
    get_total_amount.short_description = 'Сумма заказа'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def get_total_price(self):
        return self.product.price * self.quantity
