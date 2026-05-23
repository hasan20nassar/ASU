"use client";

import { ProgramFinder } from "@/components/academics/program-finder";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";

export default function ProgramsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-primary">
              {t("programs.title")}
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {t("programs.description")}
            </p>
          </div>
          
          <ProgramFinder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
