import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { AddressesBlock } from "@/components/shared/about/AddressesBlock";

export default async function About() {
  return (
    <Container className="mt-4 mb-24 md:mt-10 space-y-10">
      <Title text="О нас" size="lg" className="font-extrabold" />
      <AddressesBlock />
    </Container>
  );
}
