import { Metadata } from "next";
import { LibraryHero } from "@/components/library/library-hero";
import { LibraryServices } from "@/components/library/library-services";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { KnowledgeAnimation } from "@/components/library/knowledge-animation";

export const metadata: Metadata = {
  title: "المكتبة المركزية | University Library - Antioch Syrian University",
  description: "اكتشف مصادر المعرفة والأبحاث والمراجع العلمية في مكتبة جامعة أنطاكية السورية",
};

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background relative overflow-hidden">
        {/* Full-page background animation */}
        <KnowledgeAnimation />
        <div className="absolute inset-0 z-0 bg-background/50 backdrop-blur-[1px]" />
        
        <div className="relative z-10">
          <LibraryHero />
          <LibraryServices />
        </div>
      </main>
      <Footer />
    </div>
  );
}
