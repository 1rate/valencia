import django_filters
from django.db.models import Q
from .models import Product
from django.db.models.functions import Lower

def convert_keyboard_layout(text: str) -> str:
    mapping = {
        'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
        'i': 'ш', 'o': 'щ', 'p': 'з', 'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а',
        'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', 'z': 'я', 'x': 'ч',
        'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь'
    }
    return ''.join(mapping.get(char, char) for char in text.lower())

class ProductFilter(django_filters.FilterSet):
    # Фильтрация по цене
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte', label='Цена от')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte', label='Цена до')
    
    # Фильтрация по популярности и новизне
    is_popular = django_filters.BooleanFilter(field_name='is_popular', label='Популярные')
    is_new = django_filters.BooleanFilter(field_name='is_new', label='Новинки')
        
        # Фильтрация по БЖУ (калории, белки, жиры, углеводы)
    calories_min = django_filters.NumberFilter(field_name='calories', lookup_expr='gte', label='Калории от')
    calories_max = django_filters.NumberFilter(field_name='calories', lookup_expr='lte', label='Калории до')
    
    proteins_min = django_filters.NumberFilter(field_name='proteins', lookup_expr='gte', label='Белки от')
    proteins_max = django_filters.NumberFilter(field_name='proteins', lookup_expr='lte', label='Белки до')
    
    fats_min = django_filters.NumberFilter(field_name='fats', lookup_expr='gte', label='Жиры от')
    fats_max = django_filters.NumberFilter(field_name='fats', lookup_expr='lte', label='Жиры до')
    
    carbohydrates_min = django_filters.NumberFilter(field_name='carbohydrates', lookup_expr='gte', label='Углеводы от')
    carbohydrates_max = django_filters.NumberFilter(field_name='carbohydrates', lookup_expr='lte', label='Углеводы до')
    
    # Фильтрация по категориям (точное совпадение, т.к. поле category — строка из choices)
    category = django_filters.CharFilter(field_name='category', lookup_expr='exact', label='Категория')
    
    # Фильтрация по названию с поддержкой поиска в неправильной раскладке
    name = django_filters.CharFilter(method='filter_name', label='Название')

    id = django_filters.NumberFilter(field_name='id', lookup_expr='exact', label='Id')

    def filter_name(self, queryset, name, value):
        fixed_value = convert_keyboard_layout(value)
        # Используем регулярное выражение, где (?i) включает регистронезависимый режим.
        return queryset.filter(
            Q(name__iregex=f'(?i){value}') | Q(name__iregex=f'(?i){fixed_value}')
        )
        
    class Meta:
        model = Product
        fields = []
