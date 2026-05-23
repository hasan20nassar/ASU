"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { getArticleBySlug, newsArticles } from "@/data/news";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Newspaper,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { language, t, dir } = useLanguage();
  const BackArrow = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    announcement: { ar: "إعلان", en: "Announcement" },
    event: { ar: "فعالية", en: "Event" },
    achievement: { ar: "إنجاز", en: "Achievement" },
    research: { ar: "بحث علمي", en: "Research" },
  };

  // Get related articles (same category, excluding current)
  const relatedArticles = newsArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/news" className="hover:text-primary">
                {language === "ar" ? "الأخبار" : "News"}
              </Link>
              <span>/</span>
              <span className="text-foreground">
                {language === "ar" ? article.titleAr : article.titleEn}
              </span>
            </nav>

            <div className="flex items-start gap-4">
              <Link href="/news">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <BackArrow className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge>
                    {language === "ar"
                      ? categoryLabels[article.category].ar
                      : categoryLabels[article.category].en}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString(
                      language === "ar" ? "ar-SY" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {language === "ar" ? article.titleAr : article.titleEn}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Featured Image */}
            <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl bg-muted shadow-lg sm:h-[400px]">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={language === "ar" ? article.titleAr : article.titleEn}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-muted-foreground/10 italic">ASU</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Article Text */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="lead text-xl text-muted-foreground">
                {language === "ar" ? article.excerptAr : article.excerptEn}
              </p>

              <p>
                {language === "ar" ? article.contentAr : article.contentEn}
              </p>

              {/* Additional placeholder paragraphs */}
              <p>
                {language === "ar"
                  ? "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>

              <p>
                {language === "ar"
                  ? "إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاء لغوية."
                  : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-12 border-t pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <Share2 className="h-5 w-5" />
                  {language === "ar" ? "شارك هذا الخبر" : "Share this article"}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted/30 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                {language === "ar" ? "أخبار ذات صلة" : "Related News"}
              </h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative h-44 overflow-hidden bg-muted">
                          {related.image ? (
                            <Image
                              src={related.image}
                              alt={language === "ar" ? related.titleAr : related.titleEn}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-3xl font-bold text-muted-foreground/10 italic">
                                ASU
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {language === "ar"
                              ? related.titleAr
                              : related.titleEn}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {language === "ar"
                              ? related.excerptAr
                              : related.excerptEn}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
