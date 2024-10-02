# shop/urls.py

from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)  # Маршруты для продуктов
router.register(r'orders', OrderViewSet)      # Маршруты для заказов

urlpatterns = [
    path('', include(router.urls)),
]
