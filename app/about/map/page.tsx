"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { CampusEvolution } from "@/components/about/campus-evolution";
import dynamic from "next/dynamic";

const CampusLeafletMap = dynamic(
  () =>
    import("@/components/about/campus-leaflet-map").then(
      (mod) => mod.CampusLeafletMap,
    ),
  { ssr: false },
);

export default function CampusMapPage() {
  const { language, t, dir } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="section-container py-12" dir={dir}>
          {/* Page Hero Header */}
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 md:p-10 shadow-lg text-start">
            {/* Background decorative glowing circles */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Title without Map Icon */}
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary via-primary/95 to-primary/80 bg-clip-text text-transparent pb-2">
                {t("nav.map")}
              </h1>

              {/* Subtitle / Description */}
              <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed mt-2">
                {language === "ar"
                  ? "استكشف أبنية وتفاصيل الحرم الجامعي لجامعة أنطاكية السورية مباشرة عبر الخريطة التفاعلية، وتعرف على مواقع الكليات ومرافق الجامعة المختلفة."
                  : "Explore the campus buildings and details of Antioch Syrian University directly through the interactive map, and learn the locations of faculties and various university facilities."}
              </p>
            </div>
          </div>

          {/* Section 1: Campus Evolution */}
          <div className="mb-16">
            <div className="mb-6 text-start">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "ar"
                  ? "تطور البنية التحتية للحرم الجامعي"
                  : "Campus Infrastructure Evolution"}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {language === "ar"
                  ? "اسحب الشريط العمودي لليسار واليمين للمقارنة بين البنية التحتية للحرم الجامعي قديماً (2018) والآن."
                  : "Drag the vertical slider left and right to compare the campus infrastructure between the past (2018) and present."}
              </p>
            </div>
            <CampusEvolution />
          </div>

          {/* Section 2: Leaflet Map */}
          <div className="mt-16">
            <div className="mb-6 text-start">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "ar" ? "مخطط الحرم الجامعي" : "Campus Layout"}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {language === "ar"
                  ? "تصفّح المعالم والمباني الجامعية الأساسية."
                  : "Browse key university landmarks and buildings ."}
              </p>
            </div>
            <CampusLeafletMap />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
