import { TopBar } from "@/components/landing/TopBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { MotorSection } from "@/components/landing/MotorSection";
import { DiferenciaisSection } from "@/components/landing/DiferenciaisSection";
import { ProductDemoSection } from "@/components/landing/ProductDemoSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ConviteSection } from "@/components/landing/ConviteSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main>
        {/* 01 · Home */}
        <HeroSection />

        {/* 02 · O Problema Real */}
        <ProblemSection />

        {/* 03 · Antes × Depois */}
        <BeforeAfterSection />

        {/* 04 · Infraestrutura (landing-page) */}
        <MotorSection />

        {/* 05 · Diferenciais */}
        <DiferenciaisSection />

        {/* 06 · Produto em Ação */}
        <ProductDemoSection />

        {/* 06 · Doutoras na Kairós */}
        <TestimonialsSection />

        {/* 07 · Convite */}
        <ConviteSection />

        {/* 09 · Card de Preço */}
        <PricingSection />

        {/* 10 · Dúvidas (landing-page) */}
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
