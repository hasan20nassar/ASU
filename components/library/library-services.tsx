"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, MonitorPlay, MessageSquare, BookOpenCheck, ExternalLink, Library } from "lucide-react";

export function LibraryServices() {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";

  const databases = [
    {
      name: "IEEE Xplore",
      descAr: "مكتبة رقمية لأبحاث الهندسة والتكنولوجيا والحوسبة",
      descEn: "Digital library for engineering, technology, and computing research",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      name: "PubMed Central",
      descAr: "قاعدة بيانات للعلوم الطبية والصيدلانية وعلوم الحياة",
      descEn: "Database for medical, pharmaceutical, and life sciences",
      color: "bg-teal-500/10 text-teal-600",
    },
    {
      name: "JSTOR",
      descAr: "أرشيف للمجلات الأكاديمية في العلوم الإنسانية والإدارية",
      descEn: "Archive of academic journals in humanities and administrative sciences",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      name: "ScienceDirect",
      descAr: "منصة رائدة للبحوث العلمية المقيمة من قبل النظراء",
      descEn: "Leading platform for peer-reviewed scientific research",
      color: "bg-orange-500/10 text-orange-600",
    }
  ];

  const services = [
    {
      icon: BookOpenCheck,
      titleAr: "استعارة وتجديد الكتب",
      titleEn: "Borrow and Renew Books",
      descAr: "إدارة استعاراتك، تجديد الكتب إلكترونياً، والاطلاع على الغرامات إن وجدت.",
      descEn: "Manage your borrowings, renew books online, and view any accumulated fines.",
    },
    {
      icon: MonitorPlay,
      titleAr: "حجز غرف الدراسة",
      titleEn: "Book Study Rooms",
      descAr: "احجز غرف دراسة هادئة أو قاعات نقاش جماعية مزودة بشاشات تفاعلية.",
      descEn: "Reserve quiet study rooms or group discussion halls equipped with interactive screens.",
    },
    {
      icon: MessageSquare,
      titleAr: "اسأل أمين المكتبة",
      titleEn: "Ask a Librarian",
      descAr: "تواصل مع خبراء المكتبة للحصول على مساعدة في أبحاثك و تحديد المراجع.",
      descEn: "Contact library experts to get help with your research and identifying references.",
    },
    {
      icon: Library,
      titleAr: "المستودع المؤسسي (DSpace)",
      titleEn: "Institutional Repository",
      descAr: "تصفح رسائل الماجستير وأبحاث وتطبيقات طلاب ومدرسي الجامعة.",
      descEn: "Browse master's theses, research, and applications by university students and teachers.",
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Services Grid */}
        <div className="mb-20">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {isArabic ? "خدمات المكتبة الرقمية" : "Digital Library Services"}
            </h2>
            <p className="text-muted-foreground">
              {isArabic 
                ? "نوفر لك مجموعة شاملة من الخدمات المؤتمتة لتسهيل سير عملك الأكاديمي داخل وخارج الحرم الجامعي."
                : "We provide a comprehensive suite of automated services to facilitate your academic workflow on and off campus."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
              <Card key={index} className="border-none shadow-md bg-card/50 hover:bg-card transition-colors">
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{isArabic ? service.titleAr : service.titleEn}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-6">
                    {isArabic ? service.descAr : service.descEn}
                  </CardDescription>
                  <Button variant="link" className="p-0 h-auto font-semibold" dir={dir}>
                    {isArabic ? "التفاصيل" : "View Details"} <ExternalLink className="mx-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>

        {/* Global Databases List */}
        <div className="rounded-3xl bg-muted/30 p-8 sm:p-12 border">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 text-center lg:text-start" dir={dir}>
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                {isArabic ? "قواعد البيانات العالمية المشتركة" : "Subscribed Global Databases"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {isArabic 
                  ? "توفر الجامعة وصولاً مجانياً للطلاب وأعضاء هيئة التدريس لأبرز قواعد البيانات العلمية لنشر الأبحاث والوصول للمجلات العلمية المحكمة."
                  : "The university provides free access for students and faculty members to the most prominent scientific databases to publish research and access peer-reviewed journals."}
              </p>
              <Button size="lg" className="w-full sm:w-auto">
                {isArabic ? "تصفح جميع قواعد البيانات" : "Browse All Databases"}
              </Button>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {databases.map((db, idx) => (
                <div key={idx} className="flex flex-col rounded-2xl border bg-background p-6 shadow-sm hover:border-primary/50 transition-colors">
                  <div className={`mb-4 inline-flex self-start rounded-lg px-3 py-1 text-sm font-bold ${db.color}`}>
                    {db.name}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-4 flex-1">
                    {isArabic ? db.descAr : db.descEn}
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-auto">
                    {isArabic ? "تسجيل الدخول المؤسسي" : "Institutional Login"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
