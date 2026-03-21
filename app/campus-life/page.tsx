"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Users,
  Dumbbell,
  Camera,
  ArrowRight,
  ArrowLeft,
  Bed,
  Utensils,
  Wifi,
  Bus,
  Music,
  Palette,
  BookOpen,
  Globe,
  Trophy,
  Heart,
} from "lucide-react";
import Image from "next/image";

export default function CampusLifePage() {
  const { language, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const housingFeatures = [
    {
      icon: Bed,
      titleAr: "غرف مريحة",
      titleEn: "Comfortable Rooms",
      descAr: "غرف مفردة ومزدوجة مجهزة بالكامل",
      descEn: "Fully equipped single and double rooms",
    },
    {
      icon: Utensils,
      titleAr: "وجبات يومية",
      titleEn: "Daily Meals",
      descAr: "مطعم جامعي يقدم وجبات متنوعة",
      descEn: "University cafeteria serving diverse meals",
    },
    {
      icon: Wifi,
      titleAr: "إنترنت مجاني",
      titleEn: "Free WiFi",
      descAr: "إنترنت عالي السرعة في جميع المرافق",
      descEn: "High-speed internet in all facilities",
    },
    {
      icon: Bus,
      titleAr: "مواصلات",
      titleEn: "Transportation",
      descAr: "خدمة نقل منتظمة من وإلى الحرم",
      descEn: "Regular shuttle service to and from campus",
    },
  ];

  const clubs = [
    {
      icon: Music,
      titleAr: "نادي الموسيقى",
      titleEn: "Music Club",
      descAr: "للطلاب المهتمين بالموسيقى والغناء",
      descEn: "For students interested in music and singing",
    },
    {
      icon: Palette,
      titleAr: "نادي الفنون",
      titleEn: "Arts Club",
      descAr: "رسم وتصوير وفنون تشكيلية",
      descEn: "Painting, photography, and visual arts",
    },
    {
      icon: BookOpen,
      titleAr: "نادي القراءة",
      titleEn: "Reading Club",
      descAr: "مناقشات أدبية وثقافية",
      descEn: "Literary and cultural discussions",
    },
    {
      icon: Globe,
      titleAr: "نادي اللغات",
      titleEn: "Language Club",
      descAr: "تعلم لغات جديدة وتبادل ثقافي",
      descEn: "Learn new languages and cultural exchange",
    },
    {
      icon: Trophy,
      titleAr: "نادي ريادة الأعمال",
      titleEn: "Entrepreneurship Club",
      descAr: "دعم المشاريع الناشئة والأفكار الإبداعية",
      descEn: "Supporting startups and creative ideas",
    },
    {
      icon: Heart,
      titleAr: "نادي العمل التطوعي",
      titleEn: "Volunteer Club",
      descAr: "مبادرات خدمة المجتمع",
      descEn: "Community service initiatives",
    },
  ];

  const sports = [
    { nameAr: "كرة القدم", nameEn: "Football" },
    { nameAr: "كرة السلة", nameEn: "Basketball" },
    { nameAr: "كرة الطائرة", nameEn: "Volleyball" },
    { nameAr: "تنس الطاولة", nameEn: "Table Tennis" },
    { nameAr: "الشطرنج", nameEn: "Chess" },
    { nameAr: "السباحة", nameEn: "Swimming" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[350px] w-full overflow-hidden">
          <Image
            src="/images/pages/campus-life.png"
            alt="Campus Life"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-start">
              <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground border-none">
                {language === "ar" ? "الحياة الجامعية" : "Campus Life"}
              </Badge>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {language === "ar"
                  ? "حياة جامعة نابضة بالحيوية"
                  : "A Vibrant Campus Life"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                {language === "ar"
                  ? "اكتشف تجربة جامعية متكاملة تجمع بين التعليم والأنشطة الثقافية والرياضية"
                  : "Discover a complete university experience combining education with cultural and sports activities"}
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="housing" className="w-full" dir={dir}>
              <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-flex">
                <TabsTrigger value="housing" className="gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "السكن" : "Housing"}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="clubs" className="gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "النوادي" : "Clubs"}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="sports" className="gap-2">
                  <Dumbbell className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "الرياضة" : "Sports"}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="tour" className="gap-2">
                  <Camera className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === "ar" ? "جولة افتراضية" : "Virtual Tour"}
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Housing Tab */}
              <TabsContent value="housing">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="text-start">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {language === "ar" ? "السكن الجامعي" : "Student Housing"}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                      {language === "ar"
                        ? "توفر جامعة أنطاكية السورية سكناً جامعياً مريحاً وآمناً للطلاب من خارج دمشق، مع توفير جميع الخدمات الأساسية."
                        : "Antioch Syrian University provides comfortable and safe housing for students from outside Damascus, with all essential services."}
                    </p>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      {housingFeatures.map((feature, index) => (
                        <Card key={index}>
                          <CardContent className="flex items-start gap-3 p-4 text-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <feature.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {language === "ar"
                                  ? feature.titleAr
                                  : feature.titleEn}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {language === "ar"
                                  ? feature.descAr
                                  : feature.descEn}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Card className="h-fit">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src="/images/pages/campus-life.png"
                          alt="Student Housing"
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                      <div className="p-6 text-start">
                        <h3 className="mb-2 font-semibold text-foreground">
                          {language === "ar"
                            ? "للتقديم على السكن"
                            : "Apply for Housing"}
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {language === "ar"
                            ? "تواصل مع قسم شؤون الطلاب للحصول على مزيد من المعلومات"
                            : "Contact the Student Affairs department for more information"}
                        </p>
                        <Link href="/contact" className="w-full sm:w-auto">
                          <Button className="gap-2 w-full sm:w-auto">
                            {language === "ar" ? "تواصل معنا" : "Contact Us"}
                            <Arrow className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Clubs Tab */}
              <TabsContent value="clubs">
                <h2 className="mb-6 text-2xl font-bold text-foreground text-start">
                  {language === "ar" ? "النوادي الطلابية" : "Student Clubs"}
                </h2>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 text-start">
                  {clubs.map((club, index) => (
                    <Card key={index} className="transition-all hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                          <club.icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {language === "ar" ? club.titleAr : club.titleEn}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === "ar" ? club.descAr : club.descEn}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sports Tab */}
              <TabsContent value="sports">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="text-start">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {language === "ar"
                        ? "الأنشطة الرياضية"
                        : "Sports Activities"}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                      {language === "ar"
                        ? "تولي الجامعة اهتماماً كبيراً بالجانب الرياضي وتوفر مرافق رياضية متنوعة للطلاب."
                        : "The university pays great attention to sports and provides various sports facilities for students."}
                    </p>
                    <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                      {sports.map((sport, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg border bg-card p-4"
                        >
                          <Dumbbell className="h-5 w-5 text-primary" />
                          <span className="font-medium">
                            {language === "ar" ? sport.nameAr : sport.nameEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-0 text-start">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src="/images/pages/campus-life.png"
                          alt="Sports Facilities"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 font-semibold text-foreground">
                          {language === "ar"
                            ? "البطولات السنوية"
                            : "Annual Championships"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === "ar"
                            ? "تنظم الجامعة بطولات رياضية سنوية بين الكليات في مختلف الألعاب"
                            : "The university organizes annual sports championships between faculties in various games"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Virtual Tour Tab */}
              <TabsContent value="tour">
                <div className="text-center">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    {language === "ar" ? "جولة افتراضية" : "Virtual Tour"}
                  </h2>
                  <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                    {language === "ar"
                      ? "استكشف حرم جامعة أنطاكية السورية في معرة صيدنايا من خلال جولتنا الافتراضية"
                      : "Explore Antioch Syrian University campus in Maarat Saidnaya through our virtual tour"}
                  </p>
                  <Card className="mx-auto max-w-4xl">
                    <CardContent className="p-0">
                      <div className="relative h-96 bg-muted">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Camera className="mb-4 h-16 w-16 text-muted-foreground/20" />
                          <div className="text-2xl text-muted-foreground/40">
                            {language === "ar"
                              ? "الجولة الافتراضية قادمة قريباً"
                              : "Virtual Tour Coming Soon"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}