"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { faculties } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { Magnetic } from "@/components/ui/magnetic";
import Image from "next/image";
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

export function FacultiesGrid() {
  const { language, t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {language === "ar" ? "الكليات السبع" : "Our 7 Faculties"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {language === "ar"
              ? "برامج أكاديمية متنوعة تلبي تطلعاتك المهنية"
              : "Diverse academic programs to meet your career aspirations"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {faculties.map((faculty, index) => {
            const Icon = iconMap[faculty.icon] || BookOpen;
            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/academics/${faculty.slug}`}
                  className="group block h-full"
                >
                  <TiltCard tiltAmount={8} scale={1.03} className="h-full">
                    <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                      {faculty.image && (
                        <div className="relative h-32 w-full overflow-hidden">
                          <Image
                            src={faculty.image}
                            alt={language === "ar" ? faculty.nameAr : faculty.nameEn}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        </div>
                      )}
                      <div className="p-4 sm:p-6">
                        <div
                          className={cn(
                            "mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                            faculty.color,
                            faculty.image && "relative -mt-12 border-2 border-card"
                          )}
                        >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground">
                        {language === "ar" ? faculty.nameAr : faculty.nameEn}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                        {language === "ar"
                          ? faculty.descriptionAr
                          : faculty.descriptionEn}
                      </p>
                      <div className="mt-3 sm:mt-4 flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {faculty.programs.length}{" "}
                          {language === "ar" ? "برامج" : "programs"}
                        </span>
                        <Arrow className="h-3 w-3 sm:h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Magnetic strength={0.3} radius={100}>
            <Link href="/academics">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                {t("common.viewAll")}
                <Arrow className="h-4 w-4" />
              </Button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
