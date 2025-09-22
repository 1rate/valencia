import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { Vacansies } from "@/components/shared/about/VacansiesBlock";

export default function VacansiesPage() {
  return (
    <Container className="mb-24 mt-4 md:mt-10 space-y-10">
      <Title text="О нас" size="lg" className="font-extrabold" />
      <Vacansies />
    </Container>
  );
}
