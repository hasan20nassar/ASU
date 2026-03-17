import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GravityHero } from "@/components/home/gravity-hero";
import { FacultiesGrid } from "@/components/home/faculties-grid";
import { QuickLinks } from "@/components/home/quick-links";
import { NewsPreview } from "@/components/home/news-preview";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <GravityHero />
        <FacultiesGrid />
        <QuickLinks />
        <NewsPreview />
      </main>
      <Footer />
    </div>
  );
}
