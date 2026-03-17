"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "عن الجامعة",
    "nav.academics": "الكليات",
    "nav.admissions": "القبول والتسجيل",
    "nav.campusLife": "الحياة الجامعية",
    "nav.research": "البحث العلمي",
    "nav.news": "الأخبار",
    "nav.contact": "اتصل بنا",
    "nav.portals": "البوابات",
    "nav.facultyPortal": "بوابة أعضاء هيئة التدريس",
    "nav.alumniPortal": "بوابة الخريجين",
    "nav.studentPortal": "بوابة الطلاب",
    
    // Hero
    "hero.title": "جامعة أنطاكية السورية",
    "hero.subtitle": "تأسست عام 2017",
    "hero.description": "نحو التميز في التعليم العالي والبحث العلمي",
    "hero.cta.admissions": "التقديم الآن",
    "hero.cta.explore": "استكشف الكليات",
    
    // Stats
    "stats.faculties": "كلية",
    "stats.system": "نظام الساعات المعتمدة",
    "stats.campus": "حرم معرة صيدنايا",
    "stats.students": "طالب",
    
    // Faculties
    "faculty.engineering": "كلية الهندسة",
    "faculty.engineering.civil": "الهندسة المدنية",
    "faculty.engineering.architecture": "الهندسة المعمارية",
    "faculty.engineering.computer": "هندسة الحاسوب والاتصالات",
    "faculty.dentistry": "كلية طب الأسنان",
    "faculty.pharmacy": "كلية الصيدلة",
    "faculty.admin": "كلية العلوم الإدارية",
    "faculty.admin.business": "إدارة الأعمال",
    "faculty.admin.marketing": "التسويق",
    "faculty.admin.it": "نظم المعلومات",
    "faculty.law": "كلية الحقوق",
    "faculty.arts": "كلية الآداب",
    "faculty.arts.english": "اللغة الإنجليزية",
    "faculty.arts.translation": "الترجمة",
    "faculty.science": "كلية العلوم الأساسية",
    
    // About
    "about.history": "تاريخنا",
    "about.historyText": "تأسست بموجب المرسوم الرئاسي رقم 233 لعام 2017، وافتتحت في سبتمبر 2018",
    "about.affiliation": "الانتساب",
    "about.affiliationText": "تابعة للبطريركية الأرثوذكسية الأنطاكية وسائر المشرق",
    "about.location": "الموقع",
    "about.locationText": "معرة صيدنايا، ريف دمشق",
    "about.jobs": "الوظائف الشاغرة",
    
    // Admissions
    "admissions.requirements": "شروط القبول",
    "admissions.tuition": "الرسوم الدراسية",
    "admissions.scholarships": "المنح الدراسية",
    "admissions.scholarshipText": "5% منح كاملة لوزارة التعليم العالي وخصومات التفوق الأكاديمي",
    "admissions.syrian": "سوريون",
    "admissions.nonResident": "غير مقيمين",
    "admissions.perHour": "/ساعة",
    
    // Contact
    "contact.title": "تواصل معنا",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.address": "العنوان",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال",
    
    // Footer
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.quickLinks": "روابط سريعة",
    "footer.followUs": "تابعنا",
    
    // Common
    "common.learnMore": "اقرأ المزيد",
    "common.viewAll": "عرض الكل",
    "common.creditHours": "ساعة معتمدة",
    "common.minScore": "الحد الأدنى للدرجات",
    "common.curriculum": "الخطة الدراسية",
    "common.fees": "الرسوم",
    "common.admission": "القبول",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.academics": "Academics",
    "nav.admissions": "Admissions",
    "nav.campusLife": "Campus Life",
    "nav.research": "Research",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.portals": "Portals",
    "nav.facultyPortal": "Faculty Portal",
    "nav.alumniPortal": "Alumni Portal",
    "nav.studentPortal": "Student Portal",
    
    // Hero
    "hero.title": "Antioch Syrian University",
    "hero.subtitle": "Established 2017",
    "hero.description": "Towards Excellence in Higher Education and Scientific Research",
    "hero.cta.admissions": "Apply Now",
    "hero.cta.explore": "Explore Faculties",
    
    // Stats
    "stats.faculties": "Faculties",
    "stats.system": "Credit Hour System",
    "stats.campus": "Maarat Saidnaya Campus",
    "stats.students": "Students",
    
    // Faculties
    "faculty.engineering": "Faculty of Engineering",
    "faculty.engineering.civil": "Civil Engineering",
    "faculty.engineering.architecture": "Architecture",
    "faculty.engineering.computer": "Computer & Communications",
    "faculty.dentistry": "Faculty of Dentistry",
    "faculty.pharmacy": "Faculty of Pharmacy",
    "faculty.admin": "Faculty of Administrative Sciences",
    "faculty.admin.business": "Business Administration",
    "faculty.admin.marketing": "Marketing",
    "faculty.admin.it": "Information Technology",
    "faculty.law": "Faculty of Law",
    "faculty.arts": "Faculty of Arts",
    "faculty.arts.english": "English Language",
    "faculty.arts.translation": "Translation",
    "faculty.science": "Faculty of Basic Sciences",
    
    // About
    "about.history": "Our History",
    "about.historyText": "Founded by Presidential Decree No. 233 (2017), Opened September 2018",
    "about.affiliation": "Affiliation",
    "about.affiliationText": "Affiliated with the Greek Orthodox Patriarchate of Antioch and All the East",
    "about.location": "Location",
    "about.locationText": "Maarat Saidnaya, Damascus Countryside",
    "about.jobs": "Job Opportunities",
    
    // Admissions
    "admissions.requirements": "Admission Requirements",
    "admissions.tuition": "Tuition Fees",
    "admissions.scholarships": "Scholarships",
    "admissions.scholarshipText": "5% Full Scholarships for Ministry of Higher Education and Academic Excellence Discounts",
    "admissions.syrian": "Syrians",
    "admissions.nonResident": "Non-Residents",
    "admissions.perHour": "/hour",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.address": "Address",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Submit",
    
    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.quickLinks": "Quick Links",
    "footer.followUs": "Follow Us",
    
    // Common
    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.creditHours": "Credit Hours",
    "common.minScore": "Minimum Score",
    "common.curriculum": "Curriculum",
    "common.fees": "Fees",
    "common.admission": "Admission",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("asu-language", lang);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("asu-language") as Language;
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    } else if (typeof navigator !== "undefined") {
      // Auto-detect browser language
      const browserLang = navigator.language || navigator.languages?.[0] || "";
      if (browserLang.toLowerCase().startsWith("en")) {
        setLanguageState("en");
      } else {
        setLanguageState("ar"); // Default fallback
      }
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}