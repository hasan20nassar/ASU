"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { faculties } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Building2,
  Stethoscope,
  Pill,
  Briefcase,
  Scale,
  BookOpen,
  Atom,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Clock,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Stethoscope,
  Pill,
  Briefcase,
  Scale,
  BookOpen,
  Atom,
};

export default function AcademicsPage() {
  const { language, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                {language === "ar" ? "البرامج الأكاديمية" : "Academic Programs"}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {language === "ar" ? "الكليات والبرامج" : "Faculties & Programs"}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {language === "ar"
                  ? "تضم جامعة أنطاكية السورية سبع كليات تقدم برامج أكاديمية متنوعة بنظام الساعات المعتمدة"
                  : "Antioch Syrian University comprises seven faculties offering diverse academic programs under the credit hour system"}
              </p>
            </div>
          </div>
        </section>

        {/* Faculties Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {faculties.map((faculty) => {
                const Icon = iconMap[faculty.icon] || BookOpen;
                return (
                  <Card
                    key={faculty.id}
                    className="overflow-hidden transition-all hover:shadow-lg"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                            faculty.color
                          )}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl sm:text-2xl">
                            {language === "ar" ? faculty.nameAr : faculty.nameEn}
                          </CardTitle>
                          <p className="mt-1 text-muted-foreground">
                            {language === "ar"
                              ? faculty.descriptionAr
                              : faculty.descriptionEn}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {faculty.programs.map((program) => (
                          <Link
                            key={program.id}
                            href={`/academics/${faculty.slug}/${program.slug}`}
                            className="group"
                          >
                            <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/50 hover:bg-muted/50">
                              <h3 className="font-semibold text-foreground group-hover:text-primary">
                                {language === "ar"
                                  ? program.nameAr
                                  : program.nameEn}
                              </h3>
                              <div className="mt-3 flex flex-wrap gap-2">
                                <Badge variant="outline" className="gap-1">
                                  <GraduationCap className="h-3 w-3" />
                                  {program.creditHours}{" "}
                                  {language === "ar" ? "ساعة" : "hrs"}
                                </Badge>
                                <Badge variant="outline" className="gap-1">
                                  <Clock className="h-3 w-3" />
                                  {program.duration}{" "}
                                  {language === "ar" ? "سنوات" : "years"}
                                </Badge>
                              </div>
                              <div className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                {language === "ar" ? "التفاصيل" : "Details"}
                                <Arrow className="h-4 w-4" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 border-t pt-4">
                        <Link href={`/academics/${faculty.slug}`}>
                          <Button variant="outline" className="gap-2 bg-transparent">
                            {language === "ar"
                              ? `استكشف ${faculty.nameAr}`
                              : `Explore ${faculty.nameEn}`}
                            <Arrow className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
