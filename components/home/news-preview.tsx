"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { getFeaturedNews } from "@/data/news";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";

export function NewsPreview() {
  const { language, t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const featuredNews = getFeaturedNews();

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    announcement: { ar: "إعلان", en: "Announcement" },
    event: { ar: "فعالية", en: "Event" },
    achievement: { ar: "إنجاز", en: "Achievement" },
    research: { ar: "بحث علمي", en: "Research" },
  };

  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {language === "ar" ? "آخر الأخبار" : "Latest News"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {language === "ar"
                ? "تابع آخر المستجدات والإعلانات"
                : "Stay updated with the latest announcements"}
            </p>
          </div>
          <Link href="/news" className="hidden sm:block">
            <Button variant="outline" className="gap-2 bg-transparent">
              {t("common.viewAll")}
              <Arrow className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredNews.map((article, index) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group"
            >
              <Card
                className={`h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div
                    className={`flex flex-col ${
                      index === 0 ? "md:flex-row" : ""
                    }`}
                  >
                    {/* Image Placeholder */}
                    <div
                      className={`relative bg-muted ${
                        index === 0
                          ? "h-48 md:h-auto md:w-1/2"
                          : "h-40"
                      }`}
                    >
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
                    <div
                      className={`p-6 ${
                        index === 0 ? "md:w-1/2 md:p-8" : ""
                      }`}
                    >
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
                      <h3
                        className={`font-semibold text-foreground transition-colors group-hover:text-primary ${
                          index === 0 ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {language === "ar" ? article.titleAr : article.titleEn}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-muted-foreground">
                        {language === "ar"
                          ? article.excerptAr
                          : article.excerptEn}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                        {t("common.learnMore")}
                        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/news">
            <Button variant="outline" className="gap-2 bg-transparent">
              {t("common.viewAll")}
              <Arrow className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
