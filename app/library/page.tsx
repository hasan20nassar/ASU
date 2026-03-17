import { Metadata } from "next";
import { LibraryHero } from "@/components/library/library-hero";
import { LibraryServices } from "@/components/library/library-services";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "المكتبة المركزية | University Library - Antioch Syrian University",
  description: "اكتشف مصادر المعرفة والأبحاث وقواعد البيانات العالمية في مكتبة جامعة أنطاكية السورية",
};

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <LibraryHero />
        <LibraryServices />
      </main>
      <Footer />
    </div>
  );
}
