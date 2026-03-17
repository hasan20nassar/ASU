import { Metadata } from "next";
import { ProgramFinder } from "@/components/academics/program-finder";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "مستكشف التخصصات والبرامج | Program Finder - Antioch Syrian University",
  description: "ابحث واستكشف البرامج والتخصصات الأكاديمية في جامعة أنطاكية السورية",
};

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-primary">
              مستكشف التخصصات
            </h1>
            <h2 className="text-xl text-muted-foreground mt-2 font-medium">Program Finder</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              استكشف مجموعة واسعة من البرامج الأكاديمية التي تقدمها كليات جامعة أنطاكية السورية. يمكنك البحث والتصفية للعثور على التخصص الذي يناسب طموحاتك وميولك.
            </p>
          </div>
          
          <ProgramFinder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
