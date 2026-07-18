"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Calendar, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimelineYear {
  year: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
}

const TIMELINE_DATA: TimelineYear[] = [
  {
    year: "2017",
    titleAr: "تأسيس الجامعة وبداية الأعمال",
    titleEn: "University Founding & Initial Works",
    descAr: "صدور المرسوم التأسيسي رقم 233 لجامعة أنطاكية السورية وبدء أعمال التخطيط والتشييد وتجهيز الموقع في بلدة معرة صيدنايا الجبلية.",
    descEn: "Issuance of the founding decree No. 233 for Antioch Syrian University and the start of planning, excavation, and site preparation in the mountainous town of Maarat Saidnaya.",
    image: "/images/map-history/2017.png",
  },
  {
    year: "2018",
    titleAr: "الافتتاح واستقبال الطلاب",
    titleEn: "Grand Opening & First Cohort",
    descAr: "افتتاح الجامعة رسمياً واستقبال الدفعة الأولى من الطلاب. تم إكمال المبنى الرئيسي الذي يضم الإدارة والقاعات الدراسية الأولى لبدء العام الدراسي.",
    descEn: "Official opening of the university and welcoming the first batch of students. The main building housing the administration and initial classrooms was completed.",
    image: "/images/map-history/2018.png",
  },
  {
    year: "2021",
    titleAr: "التوسع الأكاديمي والمختبرات",
    titleEn: "Academic Expansion & Labs",
    descAr: "تجهيز وتشييد المبنى الأكاديمي الثاني وإضافة مختبرات طبية وعلمية متطورة لتواكب البرامج الأكاديمية الجديدة مثل الصيدلة وطب الأسنان.",
    descEn: "Equipping and constructing the second academic building, adding advanced medical and scientific laboratories to support new academic programs like Pharmacy and Dentistry.",
    image: "/images/map-history/2021.png",
  },
  {
    year: "2022",
    titleAr: "تطوير السكن والمرافق الخدمية",
    titleEn: "Housing & Service Facilities",
    descAr: "توسيع البنية التحتية للسكن الجامعي وتجهيزه بالخدمات الأساسية والملاعب الرياضية والمساحات الخضراء لتوفير بيئة حياة متكاملة للطلاب.",
    descEn: "Expanding student housing infrastructure and equipping it with essential utilities, sports fields, and landscaped green areas for a wholesome student life experience.",
    image: "/images/map-history/2022.png",
  },
  {
    year: "2026",
    titleAr: "الحرم الجامعي الحالي واستمرار التطوير",
    titleEn: "The Current Campus & Ongoing Development",
    descAr: "اكتمال المخطط العام للحرم الجامعي الحالي بما يشمل الأبنية الأكاديمية الثلاثة، الملاعب، والسكن المطور. وتستمر الجامعة في أعمال البناء والتحديث المستمرة للمرافق التعليمية والخدمية لمواكبة أحدث المعايير.",
    descEn: "Completion of the master plan for the campus today, including the three academic complexes, sports fields, and upgraded housing. The university continues its ongoing construction and modernization of educational and service facilities to meet the latest standards.",
    image: "/images/map-history/2026.png",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function CampusEvolution() {
  const { language, dir } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(TIMELINE_DATA.length - 1);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (activeIndex < TIMELINE_DATA.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleYearClick = (idx: number) => {
    if (idx > activeIndex) {
      setDirection(1);
    } else if (idx < activeIndex) {
      setDirection(-1);
    }
    setActiveIndex(idx);
  };

  const currentItem = TIMELINE_DATA[activeIndex];

  return (
    <div className="w-full">
      <Card className="overflow-hidden border bg-card/60 backdrop-blur-sm shadow-xl w-full">
        <div className="border-b p-4 sm:p-6 bg-muted/20">
          <div className="relative flex justify-between items-center max-w-3xl mx-auto px-4 sm:px-5 py-4">
            <div className="absolute left-[2rem] right-[2rem] sm:left-[2.5rem] sm:right-[2.5rem] top-1/2 h-[3px] -translate-y-1/2 z-0">
              <div className="w-full h-full bg-border rounded-full" />
              <div 
                className="absolute top-0 h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
                style={{
                  left: dir === "rtl" ? "auto" : 0,
                  right: dir === "rtl" ? 0 : "auto",
                  width: `${(activeIndex / (TIMELINE_DATA.length - 1)) * 100}%`
                }}
              />
            </div>

            {TIMELINE_DATA.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <div key={item.year} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => handleYearClick(idx)}
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                        : isPassed
                        ? "bg-background border-primary text-primary"
                        : "bg-background border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60"
                    }`}
                  >
                    {item.year === "2026" ? (language === "ar" ? "الآن" : "Now") : item.year}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            <div className="w-full md:w-[58%] lg:w-[62%] relative aspect-[85/100] rounded-xl overflow-hidden bg-zinc-950 border border-border/60 group">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentItem.image}
                    alt={`${currentItem.year} Campus`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full md:w-[42%] lg:w-[38%] flex flex-col justify-between p-2 text-start self-stretch">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit">
                  <Calendar className="h-4 w-4" />
                  <span className="text-base tracking-wider">
                    {currentItem.year === "2026" ? (language === "ar" ? "الآن" : "Now") : currentItem.year}
                  </span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-primary shrink-0" />
                      {language === "ar" ? currentItem.titleAr : currentItem.titleEn}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {language === "ar" ? currentItem.descAr : currentItem.descEn}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/60 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="flex items-center gap-1.5"
                >
                  {dir === "rtl" ? (
                    <>
                      {language === "ar" ? "السابق" : "Prev"}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      {language === "ar" ? "السابق" : "Prev"}
                    </>
                  )}
                </Button>

                <div className="flex gap-1.5">
                  {TIMELINE_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleYearClick(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={activeIndex === TIMELINE_DATA.length - 1}
                  className="flex items-center gap-1.5"
                >
                  {dir === "rtl" ? (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      {language === "ar" ? "التالي" : "Next"}
                    </>
                  ) : (
                    <>
                      {language === "ar" ? "التالي" : "Next"}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
