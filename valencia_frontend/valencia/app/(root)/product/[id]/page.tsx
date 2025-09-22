import { Container } from "@/components/shared/container";
import { Api } from "@/services/api-client";
import { ProductForm } from "@/components/shared/product-form";
import { Product } from "@/interfaces/types";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = ["1", "2", "3", "4", "5", "6"];
  return slugs.map((slug) => ({ id: slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }>}) {
  let product: Product | null = null;
  const id = (await params).id
  
  try {
    const response = await Api.products.search({id: String(id)});
    product = response[0]
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }

  // Если продукт не найден, можно вывести сообщение об ошибке или альтернативное содержимое
  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
      {/* <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        imageUrl={product.image}
        price={product.price}
        ingredients={product.description}
      /> */}
    </Container>
  );
}
