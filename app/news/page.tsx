"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { newsArticles, getUpcomingEvents } from "@/data/news";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Newspaper,
  CalendarDays,
} from "lucide-react";

export default function NewsPage() {
  const { language, t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const upcomingEvents = getUpcomingEvents();

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    all: { ar: "الكل", en: "All" },
    announcement: { ar: "إعلانات", en: "Announcements" },
    event: { ar: "فعاليات", en: "Events" },
    achievement: { ar: "إنجازات", en: "Achievements" },
    research: { ar: "بحث علمي", en: "Research" },
  };

  const eventTypeLabels: Record<string, { ar: string; en: string }> = {
    academic: { ar: "أكاديمي", en: "Academic" },
    cultural: { ar: "ثقافي", en: "Cultural" },
    sports: { ar: "رياضي", en: "Sports" },
    career: { ar: "مهني", en: "Career" },
  };

  const filteredNews =
    selectedCategory === "all"
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                {t("nav.news")}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {language === "ar" ? "الأخبار والفعاليات" : "News & Events"}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {language === "ar"
                  ? "تابع آخر أخبار ومستجدات جامعة أنطاكية السورية"
                  : "Stay updated with the latest news from Antioch Syrian University"}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="news" className="w-full" dir={dir}>
              <TabsList className="mb-8 grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
                <TabsTrigger value="news" className="gap-2">
                  <Newspaper className="h-4 w-4" />
                  {language === "ar" ? "الأخبار" : "News"}
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {language === "ar" ? "الفعاليات" : "Events"}
                </TabsTrigger>
              </TabsList>

              {/* News Tab */}
              <TabsContent value="news">
                {/* Category Filter */}
                <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 justify-start">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={selectedCategory === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(key)}
                    >
                      {language === "ar" ? label.ar : label.en}
                    </Button>
                  ))}
                </div>

                {/* News Grid */}
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 text-start">
                  {filteredNews.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                        <CardContent className="p-0">
                          {/* Image Placeholder */}
                          <div className="relative h-48 bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-4xl text-muted-foreground/20">
                                ASU
                              </div>
                            </div>
                            <Badge
                              className="absolute start-4 top-4"
                              variant="secondary"
                            >
                              {language === "ar"
                                ? categoryLabels[article.category].ar
                                : categoryLabels[article.category].en}
                            </Badge>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <time>
                                {new Date(article.date).toLocaleDateString(
                                  language === "ar" ? "ar-SY" : "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </time>
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                              {language === "ar"
                                ? article.titleAr
                                : article.titleEn}
                            </h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {language === "ar"
                                ? article.excerptAr
                                : article.excerptEn}
                            </p>
                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                              {t("common.learnMore")}
                              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 text-start">
                  {/* Upcoming Events */}
                  <div>
                    <h2 className="mb-6 text-xl font-semibold text-foreground">
                      {language === "ar"
                        ? "الفعاليات القادمة"
                        : "Upcoming Events"}
                    </h2>
                    <div className="space-y-4">
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                          <Card key={event.id}>
                            <CardContent className="p-6">
                              <div className="flex gap-4">
                                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                                  <span className="text-2xl font-bold text-primary">
                                    {new Date(event.date).getDate()}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(event.date).toLocaleDateString(
                                      language === "ar" ? "ar-SY" : "en-US",
                                      { month: "short" }
                                    )}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <Badge variant="outline" className="mb-2">
                                    {language === "ar"
                                      ? eventTypeLabels[event.type].ar
                                      : eventTypeLabels[event.type].en}
                                  </Badge>
                                  <h3 className="font-semibold text-foreground">
                                    {language === "ar"
                                      ? event.titleAr
                                      : event.titleEn}
                                  </h3>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {language === "ar"
                                      ? event.descriptionAr
                                      : event.descriptionEn}
                                  </p>
                                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {language === "ar"
                                        ? event.location.ar
                                        : event.location.en}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card>
                          <CardContent className="p-6 text-center text-muted-foreground">
                            {language === "ar"
                              ? "لا توجد فعاليات قادمة حالياً"
                              : "No upcoming events at the moment"}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>

                  {/* Calendar View Placeholder */}
                  <div>
                    <h2 className="mb-6 text-xl font-semibold text-foreground">
                      {language === "ar" ? "التقويم الأكاديمي" : "Academic Calendar"}
                    </h2>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {[
                            {
                              dateAr: "سبتمبر 2024",
                              dateEn: "September 2024",
                              eventAr: "بداية الفصل الدراسي الأول",
                              eventEn: "First Semester Begins",
                            },
                            {
                              dateAr: "ديسمبر 2024",
                              dateEn: "December 2024",
                              eventAr: "امتحانات منتصف الفصل",
                              eventEn: "Midterm Examinations",
                            },
                            {
                              dateAr: "يناير 2025",
                              dateEn: "January 2025",
                              eventAr: "امتحانات نهاية الفصل الأول",
                              eventEn: "First Semester Final Exams",
                            },
                            {
                              dateAr: "فبراير 2025",
                              dateEn: "February 2025",
                              eventAr: "بداية الفصل الدراسي الثاني",
                              eventEn: "Second Semester Begins",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
                            >
                              <div className="h-3 w-3 shrink-0 rounded-full bg-primary" />
                              <div>
                                <p className="font-medium text-foreground">
                                  {language === "ar" ? item.eventAr : item.eventEn}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {language === "ar" ? item.dateAr : item.dateEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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