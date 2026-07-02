"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getAlumniStoriesByFaculty } from "@/data/alumni-stories";
import { GraduationCap, Briefcase, Building2, Quote, Sparkles } from "lucide-react";

interface SuccessStoriesProps {
  facultySlug: string;
}

export function SuccessStories({ facultySlug }: SuccessStoriesProps) {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";
  const stories = getAlumniStoriesByFaculty(facultySlug);

  if (stories.length === 0) return null;

  return (
    <section className="py-16 bg-muted/10 relative overflow-hidden border-t border-border dark:border-white/5">
      {/* Background visual decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-primary/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Title */}
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-primary/10 text-primary mb-2">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {isArabic ? "قصص نجاح خريجينا" : "Alumni Success Stories"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isArabic
              ? "نفخر بخريجي جامعة أنطاكية السورية الذين يقودون التطور والتميز في مختلف قطاعات سوق العمل والبحث العلمي."
              : "We take pride in ASU graduates who are leading innovation and excellence in various sectors of the job market and research."}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group relative flex flex-col justify-between bg-card dark:bg-slate-950/40 hover:bg-card dark:hover:bg-slate-950/70 border border-border dark:border-white/5 hover:border-primary/20 rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Spine/Side accent indicator */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-500 rtl:right-0 rtl:left-auto" />
              
              <div className="space-y-6">
                {/* Header: Photo and details */}
                <div className="flex items-center gap-4 text-start">
                  <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md group-hover:border-primary/40 transition-all duration-300">
                    <Image
                      src={story.image}
                      alt={isArabic ? story.nameAr : story.nameEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80px, 100px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                      {isArabic ? story.nameAr : story.nameEn}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        {isArabic ? story.programAr : story.programEn} ({story.graduationYear})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Quote */}
                <div className="relative bg-muted/30 dark:bg-slate-900/20 p-5 rounded-2xl border border-border/50 dark:border-white/5">
                  <Quote className="absolute -top-3 right-4 rtl:left-4 rtl:right-auto h-8 w-8 text-primary/10 transform rotate-12" />
                  <p className="text-sm text-foreground/90 leading-relaxed text-start italic">
                    &ldquo;{isArabic ? story.storyAr : story.storyEn}&rdquo;
                  </p>
                </div>
              </div>

              {/* Footer: Career placement info */}
              <div className="mt-6 pt-4 border-t border-border dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-start">
                <div className="flex items-center gap-2 text-xs">
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-bold text-foreground/80">
                    {isArabic ? story.currentRoleAr : story.currentRoleEn}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
                  <span className="truncate max-w-[180px]">
                    {isArabic ? story.companyAr : story.companyEn}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
