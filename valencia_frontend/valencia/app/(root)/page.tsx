import React from "react";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { MobileCartButton } from "@/components/shared/mobile-cart-button";
import { Api } from "@/services/api-client";
import { Category, Product } from "@/interfaces/types";

async function getCategories(): Promise<Category[]> {
  try {
    const response = await Api.products.search({ name: "" });
    const categoriesMap: { [key: string]: Category } = {};
    let categoryCounter = 1;

    response.forEach((product: Product) => {
      const catName = product.category;
      if (!catName) return;
      if (!categoriesMap[catName]) {
        categoriesMap[catName] = {
          id: categoryCounter++,
          name: catName,
          image:
            product.image || "https://example.com/default-category-image.jpg",
          products: [],
        };
      }
      categoriesMap[catName].products.push(product);
    });

    return Object.values(categoriesMap);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Container className="mt-4 md:mt-10">
        <Title text="Главная" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories} />
      <Container className="mt-4 md:mt-10 pb-14">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[80px]">
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
      <MobileCartButton />
    </>
  );
}
