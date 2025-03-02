from django.contrib import admin
from .models import Product, Order, OrderItem

@admin.register(Product)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'calories', 'proteins', 'fats', 'carbohydrates', 'is_new', 'is_popular')
    list_filter = ('category', 'is_new', 'is_popular')
    search_fields = ('name', 'description')
    ordering = ('name',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'get_total_price')
    fields = ('product', 'quantity', 'get_total_price')
    can_delete = False

    def get_total_price(self, obj):
        return obj.get_total_price()
    get_total_price.short_description = 'Цена'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'phone_number', 'created_at', 'get_total_amount')
    inlines = [OrderItemInline]
    search_fields = ('first_name', 'last_name', 'phone_number')
    readonly_fields = ('created_at', 'get_total_amount')
    ordering = ('-created_at',)

    def get_total_amount(self, obj):
        return obj.get_total_amount()
    get_total_amount.short_description = 'Сумма заказа'
