"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  UserCircle,
  FileText,
  Calendar,
  Phone,
  BookMarked,
} from "lucide-react";

export function QuickLinks() {
  const { language } = useLanguage();

  const links = [
    {
      href: "/admissions",
      icon: GraduationCap,
      titleAr: "التقديم للقبول",
      titleEn: "Apply for Admission",
      descAr: "ابدأ رحلتك الأكاديمية معنا",
      descEn: "Start your academic journey with us",
      color: "bg-blue-500",
    },
    {
      href: "/portal/student",
      icon: UserCircle,
      titleAr: "بوابة الطالب",
      titleEn: "Student Portal",
      descAr: "الوصول لحسابك الأكاديمي",
      descEn: "Access your academic account",
      color: "bg-green-500",
    },
    {
      href: "/academics",
      icon: BookMarked,
      titleAr: "البرامج الأكاديمية",
      titleEn: "Academic Programs",
      descAr: "استكشف كلياتنا وبرامجنا",
      descEn: "Explore our faculties and programs",
      color: "bg-purple-500",
    },
    {
      href: "/news",
      icon: Calendar,
      titleAr: "الأخبار والفعاليات",
      titleEn: "News & Events",
      descAr: "آخر الأخبار والمستجدات",
      descEn: "Latest news and updates",
      color: "bg-amber-500",
    },
    {
      href: "/admissions#fees",
      icon: FileText,
      titleAr: "الرسوم الدراسية",
      titleEn: "Tuition Fees",
      descAr: "معلومات عن الرسوم والمنح",
      descEn: "Information about fees and scholarships",
      color: "bg-teal-500",
    },
    {
      href: "/contact",
      icon: Phone,
      titleAr: "تواصل معنا",
      titleEn: "Contact Us",
      descAr: "نحن هنا لمساعدتك",
      descEn: "We're here to help",
      color: "bg-rose-500",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {language === "ar" ? "روابط سريعة" : "Quick Links"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {language === "ar"
              ? "وصول سريع للخدمات الأكثر طلباً"
              : "Quick access to the most requested services"}
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {links.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Link href={link.href} className="group block h-full">
                <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-lg bg-card/60 backdrop-blur-sm">
                  <CardContent className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.color} transition-transform group-hover:scale-110`}
                    >
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === "ar" ? link.titleAr : link.titleEn}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {language === "ar" ? link.descAr : link.descEn}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
