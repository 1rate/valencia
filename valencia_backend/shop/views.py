# shop/views.py

from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    Представление для продуктов.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    Представление для заказов.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
