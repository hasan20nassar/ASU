"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FlaskConical,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  ArrowLeft,
  FileText,
  Microscope,
  Lightbulb,
  Target,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function ResearchPage() {
  const { language, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const researchCenters = [
    {
      icon: Microscope,
      titleAr: "مركز أبحاث العلوم الطبية",
      titleEn: "Medical Sciences Research Center",
      descAr: "أبحاث متقدمة في طب الأسنان والصيدلة والعلوم الطبية الحيوية",
      descEn: "Advanced research in dentistry, pharmacy, and biomedical sciences",
    },
    {
      icon: FlaskConical,
      titleAr: "مركز أبحاث الهندسة",
      titleEn: "Engineering Research Center",
      descAr: "بحوث تطبيقية في الهندسة المدنية والمعمارية وتقنية المعلومات",
      descEn: "Applied research in civil, architectural engineering and IT",
    },
    {
      icon: BookOpen,
      titleAr: "مركز الدراسات الإنسانية",
      titleEn: "Humanities Studies Center",
      descAr: "أبحاث في اللغات والترجمة والدراسات القانونية",
      descEn: "Research in languages, translation, and legal studies",
    },
    {
      icon: Lightbulb,
      titleAr: "مركز الابتكار وريادة الأعمال",
      titleEn: "Innovation & Entrepreneurship Center",
      descAr: "دعم المشاريع الناشئة وتحويل الأبحاث إلى منتجات",
      descEn: "Supporting startups and transforming research into products",
    },
  ];

  const achievements = [
    {
      valueAr: "50+",
      valueEn: "50+",
      labelAr: "بحث منشور",
      labelEn: "Published Papers",
    },
    {
      valueAr: "10+",
      valueEn: "10+",
      labelAr: "مشروع بحثي",
      labelEn: "Research Projects",
    },
    {
      valueAr: "5",
      valueEn: "5",
      labelAr: "شراكات دولية",
      labelEn: "International Partnerships",
    },
    {
      valueAr: "3",
      valueEn: "3",
      labelAr: "مؤتمرات سنوية",
      labelEn: "Annual Conferences",
    },
  ];

  const recentPublications = [
    {
      titleAr: "تطوير مواد بناء مستدامة من النفايات الصناعية",
      titleEn: "Development of Sustainable Building Materials from Industrial Waste",
      authorAr: "د. أحمد محمد",
      authorEn: "Dr. Ahmad Mohammad",
      journalAr: "مجلة الهندسة المدنية",
      journalEn: "Civil Engineering Journal",
      year: "2024",
    },
    {
      titleAr: "تأثير الأدوية الجديدة على علاج الأمراض المزمنة",
      titleEn: "Impact of New Medications on Chronic Disease Treatment",
      authorAr: "د. سارة علي",
      authorEn: "Dr. Sarah Ali",
      journalAr: "المجلة الصيدلانية العربية",
      journalEn: "Arab Pharmaceutical Journal",
      year: "2024",
    },
    {
      titleAr: "الذكاء الاصطناعي في التشخيص الطبي",
      titleEn: "Artificial Intelligence in Medical Diagnosis",
      authorAr: "د. محمد خالد",
      authorEn: "Dr. Mohammad Khaled",
      journalAr: "مجلة التقنية الطبية",
      journalEn: "Medical Technology Journal",
      year: "2023",
    },
  ];

  const researchAreas = [
    { ar: "الطاقة المتجددة", en: "Renewable Energy" },
    { ar: "العلوم الصيدلانية", en: "Pharmaceutical Sciences" },
    { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence" },
    { ar: "التنمية المستدامة", en: "Sustainable Development" },
    { ar: "العلوم القانونية", en: "Legal Sciences" },
    { ar: "الترجمة واللسانيات", en: "Translation & Linguistics" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/images/pages/research.png"
            alt="Research and Innovation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-start">
                <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground border-none">
                  {language === "ar" ? "البحث العلمي" : "Research"}
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl max-w-2xl">
                  {language === "ar"
                    ? "البحث العلمي والابتكار"
                    : "Research & Innovation"}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/90">
                  {language === "ar"
                    ? "نسعى لتعزيز البحث العلمي وتحويل المعرفة إلى حلول عملية تخدم المجتمع"
                    : "We strive to enhance scientific research and transform knowledge into practical solutions that serve society"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary">
                      {language === "ar" ? stat.valueAr : stat.valueEn}
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      {language === "ar" ? stat.labelAr : stat.labelEn}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Centers */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              {language === "ar" ? "مراكز البحث العلمي" : "Research Centers"}
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {researchCenters.map((center, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <center.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {language === "ar" ? center.titleAr : center.titleEn}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {language === "ar" ? center.descAr : center.descEn}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                  {language === "ar"
                    ? "مجالات البحث الرئيسية"
                    : "Key Research Areas"}
                </h2>
                <p className="mb-6 text-muted-foreground">
                  {language === "ar"
                    ? "تركز أبحاثنا على مجالات متنوعة تلبي احتياجات المجتمع وتواكب التطورات العالمية"
                    : "Our research focuses on diverse areas that meet community needs and keep pace with global developments"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {researchAreas.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {language === "ar" ? area.ar : area.en}
                    </Badge>
                  ))}
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {language === "ar" ? "أهدافنا البحثية" : "Research Goals"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      {
                        ar: "تعزيز البحث العلمي التطبيقي",
                        en: "Enhance applied scientific research",
                      },
                      {
                        ar: "بناء شراكات مع المؤسسات الدولية",
                        en: "Build partnerships with international institutions",
                      },
                      {
                        ar: "نشر الأبحاث في مجلات محكمة",
                        en: "Publish research in peer-reviewed journals",
                      },
                      {
                        ar: "تحويل الأبحاث إلى حلول عملية",
                        en: "Transform research into practical solutions",
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Arrow className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{language === "ar" ? item.ar : item.en}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              {language === "ar" ? "أحدث المنشورات" : "Recent Publications"}
            </h2>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPublications.map((pub, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <Badge variant="outline">{pub.year}</Badge>
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {language === "ar" ? pub.titleAr : pub.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? pub.authorAr : pub.authorEn}
                    </p>
                    <p className="mt-1 text-sm text-primary">
                      {language === "ar" ? pub.journalAr : pub.journalEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2 bg-transparent">
                {language === "ar"
                  ? "عرض جميع المنشورات"
                  : "View All Publications"}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary/5">
              <CardContent className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 text-center md:flex-row md:text-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {language === "ar"
                      ? "هل أنت باحث؟"
                      : "Are You a Researcher?"}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {language === "ar"
                      ? "انضم إلى فريقنا البحثي وساهم في تطوير المعرفة العلمية"
                      : "Join our research team and contribute to advancing scientific knowledge"}
                  </p>
                </div>
                <Link href="/contact" className="w-full md:w-auto">
                  <Button size="lg" className="gap-2 w-full md:w-auto">
                    {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    <Arrow className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
