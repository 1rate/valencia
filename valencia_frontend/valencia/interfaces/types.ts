export interface Product {
    id: number;
    name: string;
    description: string;
    image: string; // Соответствует полю "image" от бэкэнда
    price: string; // Цена теперь строка, так как в данных она тоже строка
    category: string;
    // is_new: boolean;
    // is_popular: boolean;
    // calories: number;
    // proteins: number;
    // fats: number;
    // carbohydrates: number;
  }

export interface Category {
    id: number;
    name: string;
    products: Product[];
    image: string;
}