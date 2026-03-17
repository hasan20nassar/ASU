"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { getFacultyBySlug } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Clock,
  DollarSign,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FacultyPage({
  params,
}: {
  params: Promise<{ faculty: string }>;
}) {
  const { faculty: facultySlug } = use(params);
  const { language, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const BackArrow = dir === "rtl" ? ChevronRight : ChevronLeft;

  const faculty = getFacultyBySlug(facultySlug);

  if (!faculty) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/academics" className="hover:text-primary">
                {language === "ar" ? "الكليات" : "Faculties"}
              </Link>
              <span>/</span>
              <span className="text-foreground">
                {language === "ar" ? faculty.nameAr : faculty.nameEn}
              </span>
            </nav>

            <div className="flex items-start gap-4">
              <Link href="/academics">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <BackArrow className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {language === "ar" ? faculty.nameAr : faculty.nameEn}
                </h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {language === "ar"
                    ? faculty.descriptionAr
                    : faculty.descriptionEn}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>
                    {faculty.programs.length}{" "}
                    {language === "ar" ? "برامج" : "Programs"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              {language === "ar" ? "البرامج المتاحة" : "Available Programs"}
            </h2>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {faculty.programs.map((program) => (
                <Link
                  key={program.id}
                  href={`/academics/${faculty.slug}/${program.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary">
                        {language === "ar" ? program.nameAr : program.nameEn}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {language === "ar"
                          ? program.descriptionAr
                          : program.descriptionEn}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {program.creditHours}{" "}
                            {language === "ar"
                              ? "ساعة معتمدة"
                              : "Credit Hours"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {program.duration}{" "}
                            {language === "ar" ? "سنوات" : "Years"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {program.tuitionSyrian.toLocaleString()}{" "}
                            {program.tuitionCurrency.syrian}
                            {language === "ar" ? "/ساعة" : "/hr"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {language === "ar" ? "الحد الأدنى:" : "Min Score:"}{" "}
                            {program.minScorePercent}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                        {language === "ar" ? "عرض التفاصيل" : "View Details"}
                        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
