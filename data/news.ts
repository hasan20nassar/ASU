export interface NewsArticle {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  image: string;
  category: "announcement" | "event" | "achievement" | "research";
  date: string;
  featured: boolean;
}

export interface Event {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  date: string;
  time: string;
  location: {
    ar: string;
    en: string;
  };
  type: "academic" | "cultural" | "sports" | "career";
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "fall-2024-registration-open",
    titleAr: "بدء التسجيل للفصل الدراسي خريف 2024",
    titleEn: "Fall 2024 Registration Now Open",
    excerptAr: "أعلنت جامعة أنطاكية السورية عن فتح باب التسجيل للفصل الدراسي القادم",
    excerptEn: "Antioch Syrian University announces the opening of registration for the upcoming semester",
    contentAr: "أعلنت جامعة أنطاكية السورية عن فتح باب التسجيل للفصل الدراسي خريف 2024. يمكن للطلاب الجدد والحاليين التقديم عبر البوابة الإلكترونية.",
    contentEn: "Antioch Syrian University announces the opening of registration for Fall 2024 semester. New and current students can apply through the online portal.",
    image: "/images/news/registration.jpg",
    category: "announcement",
    date: "2024-08-15",
    featured: true,
  },
  {
    id: "2",
    slug: "pharmacy-accreditation",
    titleAr: "كلية الصيدلة تحصل على الاعتماد الأكاديمي",
    titleEn: "Faculty of Pharmacy Receives Academic Accreditation",
    excerptAr: "حصلت كلية الصيدلة على الاعتماد الأكاديمي من وزارة التعليم العالي",
    excerptEn: "The Faculty of Pharmacy has received academic accreditation from the Ministry of Higher Education",
    contentAr: "في إنجاز مهم، حصلت كلية الصيدلة في جامعة أنطاكية السورية على الاعتماد الأكاديمي الكامل من وزارة التعليم العالي.",
    contentEn: "In a significant achievement, the Faculty of Pharmacy at Antioch Syrian University has received full academic accreditation from the Ministry of Higher Education.",
    image: "/images/news/accreditation.jpg",
    category: "achievement",
    date: "2024-07-20",
    featured: true,
  },
  {
    id: "3",
    slug: "research-conference-2024",
    titleAr: "المؤتمر العلمي السنوي الثالث",
    titleEn: "Third Annual Scientific Conference",
    excerptAr: "تنظم الجامعة مؤتمرها العلمي السنوي الثالث بمشاركة باحثين من عدة دول",
    excerptEn: "The university organizes its third annual scientific conference with researchers from several countries",
    contentAr: "تستعد جامعة أنطاكية السورية لتنظيم مؤتمرها العلمي السنوي الثالث، والذي سيشهد مشاركة باحثين وأكاديميين من عدة دول عربية وأجنبية.",
    contentEn: "Antioch Syrian University is preparing to organize its third annual scientific conference, which will feature researchers and academics from several Arab and foreign countries.",
    image: "/images/news/conference.jpg",
    category: "event",
    date: "2024-06-10",
    featured: false,
  },
  {
    id: "4",
    slug: "engineering-lab-opening",
    titleAr: "افتتاح مختبرات الهندسة الجديدة",
    titleEn: "Opening of New Engineering Labs",
    excerptAr: "افتتحت الجامعة مختبرات جديدة مجهزة بأحدث التقنيات لكلية الهندسة",
    excerptEn: "The university opened new state-of-the-art laboratories for the Faculty of Engineering",
    contentAr: "في إطار التطوير المستمر، افتتحت جامعة أنطاكية السورية مختبرات جديدة مجهزة بأحدث التقنيات لخدمة طلاب كلية الهندسة.",
    contentEn: "As part of continuous development, Antioch Syrian University has opened new laboratories equipped with the latest technology to serve Engineering students.",
    image: "/images/news/labs.jpg",
    category: "announcement",
    date: "2024-05-25",
    featured: false,
  },
];

export const events: Event[] = [
  {
    id: "1",
    titleAr: "يوم التوظيف السنوي",
    titleEn: "Annual Career Fair",
    descriptionAr: "فرصة للطلاب والخريجين للتواصل مع أصحاب العمل",
    descriptionEn: "Opportunity for students and graduates to connect with employers",
    date: "2024-10-15",
    time: "09:00",
    location: {
      ar: "قاعة المؤتمرات الرئيسية",
      en: "Main Conference Hall",
    },
    type: "career",
  },
  {
    id: "2",
    titleAr: "ورشة عمل: مهارات البحث العلمي",
    titleEn: "Workshop: Scientific Research Skills",
    descriptionAr: "ورشة تدريبية للطلاب حول منهجية البحث العلمي",
    descriptionEn: "Training workshop for students on scientific research methodology",
    date: "2024-10-20",
    time: "14:00",
    location: {
      ar: "كلية العلوم الأساسية",
      en: "Faculty of Basic Sciences",
    },
    type: "academic",
  },
  {
    id: "3",
    titleAr: "البطولة الرياضية بين الكليات",
    titleEn: "Inter-Faculty Sports Championship",
    descriptionAr: "منافسات رياضية متنوعة بين كليات الجامعة",
    descriptionEn: "Various sports competitions between university faculties",
    date: "2024-11-01",
    time: "10:00",
    location: {
      ar: "الملاعب الرياضية",
      en: "Sports Fields",
    },
    type: "sports",
  },
];

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter((article) => article.featured);
}

export function getNewsByCategory(category: NewsArticle["category"]): NewsArticle[] {
  return newsArticles.filter((article) => article.category === category);
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
