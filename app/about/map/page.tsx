"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { Map } from "lucide-react";
import { CampusEvolution } from "@/components/about/campus-evolution";

export default function CampusMapPage() {
  const { language, t, dir } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="section-container py-12" dir={dir}>
          <div className="mb-12 max-w-2xl text-start">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-primary flex items-center gap-2">
              <Map className="h-8 w-8 shrink-0" />
              {t("nav.map")}
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {language === "ar"
                ? "استكشف أبنية وتفاصيل الحرم الجامعي لجامعة أنطاكية السورية مباشرة عبر الخريطة التفاعلية، وتعرف على مواقع الكليات ومرافق الجامعة المختلفة."
                : "Explore the campus buildings and details of Antioch Syrian University directly through the interactive map, and learn the locations of faculties and various university facilities."}
            </p>
          </div>

          {/* Section 1: Campus Evolution */}
          <div className="mb-16">
            <div className="mb-6 text-start">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "ar" ? "مراحل تطور الحرم الجامعي" : "Campus Development Stages"}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {language === "ar"
                  ? "تتبع بالصور مراحل تشييد وتوسيع أبنية الحرم الجامعي لجامعة أنطاكية السورية من عام 2017 وحتى اليوم."
                  : "Track the construction and expansion stages of Antioch Syrian University's campus buildings from 2017 to today."}
              </p>
            </div>
            <CampusEvolution />
          </div>

          {/* Section 2: Interactive Map */}
          <div>
            <div className="mb-6 text-start">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "ar" ? "الخريطة التفاعلية التفصيلية" : "Detailed Interactive Map"}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {language === "ar"
                  ? "استعن بالخريطة التفاعلية لتحديد مواقع الكليات والمباني الإدارية والخدمية داخل الحرم الجامعي."
                  : "Use the interactive map to locate faculties, administrative, and service buildings within the campus."}
              </p>
            </div>
            <div className="w-full overflow-hidden rounded-xl border bg-card shadow-lg">
              <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
                <div className="text-start">
                  <h3 className="font-semibold text-foreground">
                    {language === "ar" ? "الخريطة التفاعلية للحرم الجامعي" : "Interactive Campus Map"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "ar"
                      ? "استكشف أبنية وتفاصيل الحرم الجامعي مباشرة عبر خرائط Google"
                      : "Explore campus buildings and details directly via Google Maps"}
                  </p>
                </div>
              </div>
              <div className="relative w-full h-[600px] overflow-hidden bg-muted/20">
                <iframe
                  src="https://www.google.com/maps/d/u/0/embed?mid=14SlbGLfen8kpdhAx054Ve9wr0OKs2Uk&ehbc=2E312F&noprof=1"
                  className="absolute left-0 w-full border-0"
                  style={{
                    top: "-55px",
                    height: "calc(100% + 70px)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  title={
                    language === "ar"
                      ? "خريطة جامعة أنطاكية السورية"
                      : "Antioch Syrian University Map"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
