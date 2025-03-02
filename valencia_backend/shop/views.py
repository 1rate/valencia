# shop/views.py
from rest_framework import generics
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Order
from .filters import ProductFilter
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    Представление для продуктов.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

class OrderViewSet(viewsets.ModelViewSet):
    """
    Представление для заказов.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
