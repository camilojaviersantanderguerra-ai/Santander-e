import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { PremiumSection } from "@/components/PremiumSection";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Home: el orden de las secciones sigue el guion de "deseo antes que producto"
// (Hero de marca -> confianza -> productos -> categorías -> Privé -> prueba
// social -> newsletter), tal como lo define la estrategia de la marca.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Categories />
      <PremiumSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
