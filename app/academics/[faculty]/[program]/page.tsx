"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { getFacultyBySlug, getProgramBySlug } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GraduationCap,
  Clock,
  DollarSign,
  Target,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  Users,
} from "lucide-react";

interface Course {
  code: string;
  nameAr: string;
  nameEn: string;
  hours: number;
  descriptionAr: string;
  descriptionEn: string;
  prerequisitesAr: string;
  prerequisitesEn: string;
  objectivesAr: string;
  objectivesEn: string;
  topicsAr: string[];
  topicsEn: string[];
}

interface SemesterData {
  semester: number;
  courses: Course[];
}

interface YearData {
  year: number;
  semesters: SemesterData[];
}

const programCoursesMap: Record<string, { ar: string; en: string; prefix: string }[]> = {
  civil: [
    { ar: "رياضيات هندسية", en: "Engineering Mathematics", prefix: "MATH" },
    { ar: "فيزياء هندسية", en: "Engineering Physics", prefix: "PHYS" },
    { ar: "كيمياء هندسية", en: "Engineering Chemistry", prefix: "CHEM" },
    { ar: "الرسم الهندسي", en: "Engineering Drawing", prefix: "CE" },
    { ar: "الميكانيك الهندسي", en: "Engineering Mechanics", prefix: "CE" },
    { ar: "مقاومة المواد", en: "Strength of Materials", prefix: "CE" },
    { ar: "المساحة 1", en: "Surveying I", prefix: "CE" },
    { ar: "المساحة 2", en: "Surveying II", prefix: "CE" },
    { ar: "ميكانيك السوائل", en: "Fluid Mechanics", prefix: "CE" },
    { ar: "تكنولوجيا الخرسانة", en: "Concrete Technology", prefix: "CE" },
    { ar: "نظرية الإنشاءات 1", en: "Theory of Structures I", prefix: "CE" },
    { ar: "نظرية الإنشاءات 2", en: "Theory of Structures II", prefix: "CE" },
    { ar: "هندسة الطرق والنقل", en: "Transportation Engineering", prefix: "CE" },
    { ar: "الهيدروليك", en: "Hydraulics", prefix: "CE" },
    { ar: "ميكانيك التربة", en: "Soil Mechanics", prefix: "CE" },
    { ar: "تصميم المنشآت المعدنية 1", en: "Steel Design I", prefix: "CE" },
    { ar: "تصميم المنشآت المعدنية 2", en: "Steel Design II", prefix: "CE" },
    { ar: "الخرسانة المسلحة 1", en: "Reinforced Concrete I", prefix: "CE" },
    { ar: "الخرسانة المسلحة 2", en: "Reinforced Concrete II", prefix: "CE" },
    { ar: "تصميم الطرق", en: "Highway Design", prefix: "CE" },
    { ar: "هندسة الأساسات", en: "Foundation Engineering", prefix: "CE" },
    { ar: "الهندسة البيئية", en: "Environmental Engineering", prefix: "CE" },
    { ar: "الهيدرولوجيا", en: "Hydrology", prefix: "CE" },
    { ar: "إدارة تشييد", en: "Construction Management", prefix: "CE" },
    { ar: "هندسة الجسور", en: "Bridge Engineering", prefix: "CE" },
    { ar: "الهندسة الجيوتقنية", en: "Geotechnical Engineering", prefix: "CE" },
    { ar: "حساب الكميات والمواصفات", en: "Quantity Surveying & Specifications", prefix: "CE" },
    { ar: "هندسة الري والصرف", en: "Irrigation & Drainage Engineering", prefix: "CE" },
    { ar: "الهندسة الزلزالية", en: "Earthquake Engineering", prefix: "CE" },
    { ar: "الخرسانة مسبقة الإجهاد", en: "Prestressed Concrete", prefix: "CE" },
    { ar: "مشروع التخرج 1", en: "Graduation Project I", prefix: "CE" },
    { ar: "مشروع التخرج 2", en: "Graduation Project II", prefix: "CE" },
  ],
  computer: [
    { ar: "مقدمة في البرمجة", en: "Introduction to Programming", prefix: "COMP" },
    { ar: "البرمجة الشيئية", en: "Object-Oriented Programming", prefix: "COMP" },
    { ar: "بنى المعطيات والخوارزميات", en: "Data Structures & Algorithms", prefix: "COMP" },
    { ar: "الدارات المنطقية", en: "Digital Logic Circuits", prefix: "CCE" },
    { ar: "تنظيم الحاسوب", en: "Computer Organization", prefix: "CCE" },
    { ar: "بنية الحاسوب", en: "Computer Architecture", prefix: "CCE" },
    { ar: "نظم التشغيل", en: "Operating Systems", prefix: "COMP" },
    { ar: "قواعد البيانات", en: "Database Systems", prefix: "COMP" },
    { ar: "هندسة البرمجيات", en: "Software Engineering", prefix: "COMP" },
    { ar: "شبكات الحاسوب 1", en: "Computer Networks I", prefix: "CCE" },
    { ar: "شبكات الحاسوب 2", en: "Computer Networks II", prefix: "CCE" },
    { ar: "نظم الاتصالات 1", en: "Communication Systems I", prefix: "CCE" },
    { ar: "نظم الاتصالات 2", en: "Communication Systems II", prefix: "CCE" },
    { ar: "المعالجات المصغرة والمتحكمات", en: "Microprocessors & Microcontrollers", prefix: "CCE" },
    { ar: "معالجة الإشارة الرقمية", en: "Digital Signal Processing", prefix: "CCE" },
    { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence", prefix: "COMP" },
    { ar: "تفاعل الحاسوب والإنسان", en: "Human-Computer Interaction", prefix: "COMP" },
    { ar: "أمن الشبكات والمعلومات", en: "Network & Information Security", prefix: "CCE" },
    { ar: "الحوسبة السحابية", en: "Cloud Computing", prefix: "COMP" },
    { ar: "النظم المدمجة", en: "Embedded Systems", prefix: "CCE" },
    { ar: "برمجة الويب", en: "Web Programming", prefix: "COMP" },
    { ar: "برمجة تطبيقات الهاتف المحمول", en: "Mobile Application Development", prefix: "COMP" },
    { ar: "تشفير البيانات", en: "Cryptography", prefix: "COMP" },
    { ar: "تحليل وتصميم النظم", en: "Systems Analysis & Design", prefix: "COMP" },
    { ar: "مشروع التخرج 1", en: "Graduation Project I", prefix: "CCE" },
    { ar: "مشروع التخرج 2", en: "Graduation Project II", prefix: "CCE" },
  ],
  architecture: [
    { ar: "المرسم المعماري 1", en: "Architectural Design Studio I", prefix: "ARCH" },
    { ar: "المرسم المعماري 2", en: "Architectural Design Studio II", prefix: "ARCH" },
    { ar: "تاريخ العمارة 1", en: "History of Architecture I", prefix: "ARCH" },
    { ar: "تاريخ العمارة 2", en: "History of Architecture II", prefix: "ARCH" },
    { ar: "نظريات العمارة 1", en: "Architectural Theories I", prefix: "ARCH" },
    { ar: "نظريات العمارة 2", en: "Architectural Theories II", prefix: "ARCH" },
    { ar: "الإنشاء المعماري 1", en: "Building Construction I", prefix: "ARCH" },
    { ar: "الإنشاء المعماري 2", en: "Building Construction II", prefix: "ARCH" },
    { ar: "الرسم الحر 1", en: "Freehand Drawing I", prefix: "ARCH" },
    { ar: "الرسم الحر 2", en: "Freehand Drawing II", prefix: "ARCH" },
    { ar: "الظل والمنظور", en: "Shadow & Perspective", prefix: "ARCH" },
    { ar: "التصميم الرقمي بالحاسب", en: "Computer-Aided Architectural Design", prefix: "ARCH" },
    { ar: "التخطيط العمراني", en: "Urban Planning", prefix: "ARCH" },
    { ar: "العمارة المستدامة والبيئة", en: "Sustainable Architecture", prefix: "ARCH" },
    { ar: "العمارة المحلية السورية", en: "Local Syrian Architecture", prefix: "ARCH" },
    { ar: "تنسيق المواقع (لاندسكيب)", en: "Landscape Design", prefix: "ARCH" },
    { ar: "الترميم المعماري", en: "Architectural Restoration", prefix: "ARCH" },
    { ar: "مشروع التخرج 1", en: "Graduation Project I", prefix: "ARCH" },
    { ar: "مشروع التخرج 2", en: "Graduation Project II", prefix: "ARCH" },
  ],
  dentistry: [
    { ar: "تشريح رأس وعنق", en: "Head & Neck Anatomy", prefix: "DENT" },
    { ar: "التشريح السني", en: "Dental Anatomy", prefix: "DENT" },
    { ar: "علم الأنسجة العام والخاص", en: "General & Oral Histology", prefix: "DENT" },
    { ar: "المداواة الترميمية 1", en: "Restorative Dentistry I", prefix: "DENT" },
    { ar: "المداواة الترميمية 2", en: "Restorative Dentistry II", prefix: "DENT" },
    { ar: "علم وظائف الأعضاء", en: "Human Physiology", prefix: "DENT" },
    { ar: "علم الكيمياء الحيوية", en: "Biochemistry", prefix: "DENT" },
    { ar: "علم الأدوية السني", en: "Dental Pharmacology", prefix: "DENT" },
    { ar: "المداواة اللبية 1", en: "Endodontics I", prefix: "DENT" },
    { ar: "المداواة اللبية 2", en: "Endodontics II", prefix: "DENT" },
    { ar: "أمراض اللثة والأنسجة الداعمة", en: "Periodontics", prefix: "DENT" },
    { ar: "جراحة الفم والأسنان 1", en: "Oral Surgery I", prefix: "DENT" },
    { ar: "جراحة الفم والأسنان 2", en: "Oral Surgery II", prefix: "DENT" },
    { ar: "تعويضات الأسنان الثابتة 1", en: "Fixed Prosthodontics I", prefix: "DENT" },
    { ar: "تعويضات الأسنان الثابتة 2", en: "Fixed Prosthodontics II", prefix: "DENT" },
    { ar: "تعويضات الأسنان المتحركة 1", en: "Removable Prosthodontics I", prefix: "DENT" },
    { ar: "تعويضات الأسنان المتحركة 2", en: "Removable Prosthodontics II", prefix: "DENT" },
    { ar: "طب أسنان الأطفال", en: "Pediatric Dentistry", prefix: "DENT" },
    { ar: "تقويم الأسنان والفكين", en: "Orthodontics", prefix: "DENT" },
    { ar: "أمراض الفم والتشخيص", en: "Oral Medicine & Diagnosis", prefix: "DENT" },
    { ar: "زرع الأسنان", en: "Dental Implantology", prefix: "DENT" },
    { ar: "أخلاقيات مهنة طب الأسنان", en: "Dental Ethics & Practice", prefix: "DENT" },
    { ar: "التدريب السريري المتكامل", en: "Integrated Clinical Training", prefix: "DENT" },
  ],
  pharmacy: [
    { ar: "كيمياء عامة وعضوية", en: "General & Organic Chemistry", prefix: "PHAR" },
    { ar: "علم الأحياء الخلوي", en: "Cell Biology", prefix: "PHAR" },
    { ar: "كيمياء تحليلية صيدلانية", en: "Pharmaceutical Analytical Chemistry", prefix: "PHAR" },
    { ar: "العقاقير وكيمياء العقاقير 1", en: "Pharmacognosy I", prefix: "PHAR" },
    { ar: "العقاقير وكيمياء العقاقير 2", en: "Pharmacognosy II", prefix: "PHAR" },
    { ar: "الكيمياء الحيوية الصيدلانية", en: "Pharmaceutical Biochemistry", prefix: "PHAR" },
    { ar: "الصيدلانيات 1", en: "Pharmaceutics I", prefix: "PHAR" },
    { ar: "الصيدلانيات 2", en: "Pharmaceutics II", prefix: "PHAR" },
    { ar: "علم الأدوية 1", en: "Pharmacology I", prefix: "PHAR" },
    { ar: "علم الأدوية 2", en: "Pharmacology II", prefix: "PHAR" },
    { ar: "الكيمياء الصيدلية 1", en: "Medicinal Chemistry I", prefix: "PHAR" },
    { ar: "الكيمياء الصيدلية 2", en: "Medicinal Chemistry II", prefix: "PHAR" },
    { ar: "الصيدلة الحيوية وحركية الدواء", en: "Biopharmaceutics & Pharmacokinetics", prefix: "PHAR" },
    { ar: "الصيدلة السريرية والسموم", en: "Clinical Pharmacy & Toxicology", prefix: "PHAR" },
    { ar: "رقابة جودة الأدوية", en: "Pharmaceutical Quality Control", prefix: "PHAR" },
    { ar: "تقانة حيوية صيدلانية", en: "Pharmaceutical Biotechnology", prefix: "PHAR" },
    { ar: "تسويق وتشريعات صيدلانية", en: "Pharmaceutical Marketing & Legislation", prefix: "PHAR" },
  ],
  business: [
    { ar: "مبادئ إدارة الأعمال 1", en: "Principles of Management I", prefix: "BUS" },
    { ar: "مبادئ إدارة الأعمال 2", en: "Principles of Management II", prefix: "BUS" },
    { ar: "مبادئ المحاسبة 1", en: "Principles of Accounting I", prefix: "ACCT" },
    { ar: "مبادئ المحاسبة 2", en: "Principles of Accounting II", prefix: "ACCT" },
    { ar: "الاقتصاد الجزئي", en: "Microeconomics", prefix: "ECON" },
    { ar: "الاقتصاد الكلي", en: "Macroeconomics", prefix: "ECON" },
    { ar: "مبادئ التسويق", en: "Principles of Marketing", prefix: "MKTG" },
    { ar: "الإدارة المالية 1", en: "Financial Management I", prefix: "FIN" },
    { ar: "الإدارة المالية 2", en: "Financial Management II", prefix: "FIN" },
    { ar: "إدارة الموارد البشرية", en: "Human Resources Management", prefix: "BUS" },
    { ar: "السلوك التنظيمي", en: "Organizational Behavior", prefix: "BUS" },
    { ar: "إدارة العمليات والإنتاج", en: "Operations & Production Management", prefix: "BUS" },
    { ar: "نظم المعلومات الإدارية", en: "Management Information Systems", prefix: "MIS" },
    { ar: "مناهج البحث العلمي في الإدارة", en: "Research Methodology in Management", prefix: "BUS" },
    { ar: "الإدارة الاستراتيجية", en: "Strategic Management", prefix: "BUS" },
    { ar: "ريادة الأعمال وإدارة المشاريع الصغيرة", en: "Entrepreneurship & Small Business", prefix: "BUS" },
  ],
};

function generateCurriculumForProgram(programSlug: string, durationYears: number): YearData[] {
  const customList = programCoursesMap[programSlug] || [
    { ar: "مقرر تخصصي 1", en: "Specialized Course I", prefix: "SPEC" },
    { ar: "مقرر تخصصي 2", en: "Specialized Course II", prefix: "SPEC" },
    { ar: "مقرر تخصصي 3", en: "Specialized Course III", prefix: "SPEC" },
    { ar: "مقرر تخصصي 4", en: "Specialized Course IV", prefix: "SPEC" },
    { ar: "مقرر تخصصي 5", en: "Specialized Course V", prefix: "SPEC" },
  ];

  const years: YearData[] = [];
  let courseCounter = 0;

  for (let year = 1; year <= durationYears; year++) {
    const semesters: SemesterData[] = [];
    for (let sem = 1; sem <= 2; sem++) {
      const courses: Course[] = [];
      for (let c = 1; c <= 5; c++) {
        const courseInfo = customList[courseCounter % customList.length];
        
        let courseNameAr = courseInfo.ar;
        let courseNameEn = courseInfo.en;
        const courseCode = `${courseInfo.prefix}${year}${sem}${c}`;
        
        if (courseCounter >= customList.length) {
          const suffix = Math.floor(courseCounter / customList.length) + 1;
          courseNameAr += ` (${suffix})`;
          courseNameEn += ` ${suffix}`;
        }
        
        const credits = courseCode.includes("MATH") || courseCode.includes("PHYS") || courseCode.includes("CE") || courseCode.includes("DENT") ? 3 : 2;
        
        courses.push({
          code: courseCode,
          nameAr: courseNameAr,
          nameEn: courseNameEn,
          hours: credits,
          descriptionAr: `يهدف هذا المقرر إلى تزويد الطالب بالمعارف الأساسية والمتقدمة المتعلقة بـ ${courseNameAr}، مع التركيز على التطبيقات العملية والمنهجيات العلمية الحديثة في هذا المجال.`,
          descriptionEn: `This course aims to provide students with the foundational and advanced knowledge related to ${courseNameEn}, focusing on practical applications and modern scientific methodologies in the field.`,
          prerequisitesAr: courseCounter > 5 
            ? `ناجح في مقرر ${customList[(courseCounter - 5) % customList.length].ar}`
            : "لا يوجد متطلبات سابقة",
          prerequisitesEn: courseCounter > 5
            ? `Pass in ${customList[(courseCounter - 5) % customList.length].en}`
            : "No prerequisites",
          objectivesAr: `عند الانتهاء من دراسة هذا المقرر، سيكون الطالب قادراً على:\n1. فهم المبادئ الأساسية لـ ${courseNameAr}.\n2. تطبيق المهارات العملية في سياقات مختلفة.\n3. تحليل المشكلات واقتراح الحلول المناسبة.`,
          objectivesEn: `Upon completion of this course, students will be able to:\n1. Understand the fundamental principles of ${courseNameEn}.\n2. Apply practical skills in various contexts.\n3. Analyze problems and propose appropriate solutions.`,
          topicsAr: [
            "مقدمة وتعريف عام بالمفاهيم الأساسية",
            "الأطر النظرية والمنهجية للدراسة",
            "التطبيقات العملية ودراسات الحالة",
            "التطورات الحديثة والتوجهات المستقبلية",
          ],
          topicsEn: [
            "Introduction and general definition of core concepts",
            "Theoretical and methodological frameworks of study",
            "Practical applications and case studies",
            "Recent developments and future trends",
          ],
        });
        courseCounter++;
      }
      semesters.push({ semester: sem, courses });
    }
    years.push({ year, semesters });
  }

  return years;
}

export default function ProgramPage({
  params,
}: {
  params: Promise<{ faculty: string; program: string }>;
}) {
  const { faculty: facultySlug, program: programSlug } = use(params);
  const { language, t, dir } = useLanguage();
  const BackArrow = dir === "rtl" ? ChevronRight : ChevronLeft;

  const faculty = getFacultyBySlug(facultySlug);
  const program = getProgramBySlug(facultySlug, programSlug);

  if (!faculty || !program) {
    notFound();
  }

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const curriculum = React.useMemo(() => {
    return generateCurriculumForProgram(program.slug, program.duration);
  }, [program.slug, program.duration]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/academics" className="hover:text-primary">
                {language === "ar" ? "الكليات" : "Faculties"}
              </Link>
              <span>/</span>
              <Link
                href={`/academics/${faculty.slug}`}
                className="hover:text-primary"
              >
                {language === "ar" ? faculty.nameAr : faculty.nameEn}
              </Link>
              <span>/</span>
              <span className="text-foreground">
                {language === "ar" ? program.nameAr : program.nameEn}
              </span>
            </nav>

            <div className="flex items-start gap-4">
              <Link href={`/academics/${faculty.slug}`}>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <BackArrow className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <Badge variant="secondary" className="mb-2">
                  {language === "ar" ? faculty.nameAr : faculty.nameEn}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {language === "ar" ? program.nameAr : program.nameEn}
                </h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {language === "ar"
                    ? program.descriptionAr
                    : program.descriptionEn}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{program.creditHours}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("common.creditHours")}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {program.duration}{" "}
                      {language === "ar" ? "سنوات" : "Years"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "مدة الدراسة" : "Duration"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Target className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {program.minScorePercent}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("common.minScore")}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {(program.tuitionSyrian / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {program.tuitionCurrency.syrian}
                      {language === "ar" ? "/ساعة" : "/hour"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tabs Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="curriculum" className="w-full" dir={dir}>
              <TabsList className="mb-6 sm:mb-8 grid w-full grid-cols-3 h-auto p-1">
                <TabsTrigger value="curriculum" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("common.curriculum")}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="fees" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("common.fees")}</span>
                </TabsTrigger>
                <TabsTrigger value="admission" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("common.admission")}
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum">
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      {language === "ar"
                        ? "الخطة الدراسية"
                        : "Study Plan"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground">
                      {language === "ar"
                        ? `يتكون البرنامج من ${program.creditHours} ساعة معتمدة موزعة على ${program.duration} سنوات دراسية`
                        : `The program consists of ${program.creditHours} credit hours distributed over ${program.duration} academic years`}
                    </p>

                    <Tabs defaultValue="year-1" className="w-full">
                      <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-1 mb-6">
                        {curriculum.map((yearData) => (
                          <TabsTrigger
                            key={yearData.year}
                            value={`year-${yearData.year}`}
                            className="flex-1 py-2 text-sm sm:text-base font-semibold"
                            onClick={() => setExpandedCourse(null)}
                          >
                            {language === "ar"
                              ? `السنة ${yearData.year}`
                              : `Year ${yearData.year}`}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {curriculum.map((yearData) => (
                        <TabsContent key={yearData.year} value={`year-${yearData.year}`} className="space-y-6">
                          <Tabs defaultValue="sem-1" className="w-full">
                            <TabsList className="grid grid-cols-2 h-auto gap-2 bg-muted/30 p-1 mb-4 max-w-md mx-auto">
                              {yearData.semesters.map((semData) => (
                                <TabsTrigger
                                  key={semData.semester}
                                  value={`sem-${semData.semester}`}
                                  className="py-1.5 text-xs sm:text-sm font-medium"
                                  onClick={() => setExpandedCourse(null)}
                                >
                                  {language === "ar"
                                    ? `الفصل ${semData.semester === 1 ? "الأول" : "الثاني"}`
                                    : `Semester ${semData.semester === 1 ? "I" : "II"}`}
                                </TabsTrigger>
                              ))}
                            </TabsList>

                            {yearData.semesters.map((semData) => (
                              <TabsContent key={semData.semester} value={`sem-${semData.semester}`}>
                                <div className="overflow-x-auto -mx-4 sm:mx-0 border rounded-lg bg-card shadow-sm">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-muted/40">
                                        <TableHead className="w-[120px] font-semibold">
                                          {language === "ar" ? "الرمز" : "Code"}
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                          {language === "ar" ? "اسم المقرر" : "Course Name"}
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center font-semibold">
                                          {language === "ar" ? "الساعات" : "Credits"}
                                        </TableHead>
                                        <TableHead className="w-[150px] font-semibold">
                                          {language === "ar" ? "المتطلب السابق" : "Prerequisite"}
                                        </TableHead>
                                        <TableHead className="w-[50px]" />
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {semData.courses.map((course) => {
                                        const isExpanded = expandedCourse === course.code;
                                        return (
                                          <React.Fragment key={course.code}>
                                            <TableRow
                                              className="cursor-pointer hover:bg-muted/30 transition-colors group"
                                              onClick={() =>
                                                setExpandedCourse(isExpanded ? null : course.code)
                                              }
                                            >
                                              <TableCell className="font-mono font-medium text-primary">
                                                {course.code}
                                              </TableCell>
                                              <TableCell className="font-medium text-foreground">
                                                {language === "ar" ? course.nameAr : course.nameEn}
                                              </TableCell>
                                              <TableCell className="text-center font-semibold text-muted-foreground">
                                                {course.hours}
                                              </TableCell>
                                              <TableCell>
                                                <Badge
                                                  variant={
                                                    course.prerequisitesEn === "No prerequisites" ||
                                                    course.prerequisitesAr === "لا يوجد متطلبات سابقة"
                                                      ? "secondary"
                                                      : "outline"
                                                  }
                                                  className="text-xs"
                                                >
                                                  {language === "ar"
                                                    ? course.prerequisitesAr
                                                    : course.prerequisitesEn}
                                                </Badge>
                                              </TableCell>
                                              <TableCell className="text-right">
                                                {isExpanded ? (
                                                  <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                                ) : (
                                                  <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                                )}
                                              </TableCell>
                                            </TableRow>
                                            
                                            {isExpanded && (
                                              <TableRow className="bg-muted/20 hover:bg-muted/20">
                                                <TableCell colSpan={5} className="p-0 border-t-0">
                                                  <div className="p-6 space-y-4 animate-slideDown">
                                                    <div className="grid gap-6 md:grid-cols-3">
                                                      <div className="md:col-span-2 space-y-2">
                                                        <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                                                          <BookOpen className="h-4 w-4" />
                                                          {language === "ar" ? "وصف المقرر" : "Course Description"}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                          {language === "ar" ? course.descriptionAr : course.descriptionEn}
                                                        </p>
                                                      </div>

                                                      <div className="space-y-2 border-l pl-6 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
                                                        <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                                                          <Target className="h-4 w-4" />
                                                          {language === "ar" ? "أهداف المقرر" : "Course Objectives"}
                                                        </h4>
                                                        <div className="text-xs text-muted-foreground space-y-1 whitespace-pre-line leading-relaxed">
                                                          {language === "ar" ? course.objectivesAr : course.objectivesEn}
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <hr className="border-muted" />

                                                    <div className="space-y-2">
                                                      <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                                                        <FileText className="h-4 w-4" />
                                                        {language === "ar" ? "المحتوى العلمي (المواضيع الرئيسية)" : "Syllabus (Core Topics)"}
                                                      </h4>
                                                      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                                                        {(language === "ar" ? course.topicsAr : course.topicsEn).map((topic, idx) => (
                                                          <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-card border text-xs text-muted-foreground">
                                                            <Badge className="shrink-0 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]" variant="outline">
                                                              {idx + 1}
                                                            </Badge>
                                                            <span>{topic}</span>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              </TableRow>
                                            )}
                                          </React.Fragment>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Fees Tab */}
              <TabsContent value="fees">
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      {language === "ar" ? "الرسوم الدراسية" : "Tuition Fees"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {dir === "rtl" ? (
                              <>
                                <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                  {language === "ar"
                                    ? "إجمالي التكلفة التقديرية"
                                    : "Estimated Total"}
                                </TableHead>
                                <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                  {language === "ar"
                                    ? "الرسوم لكل ساعة"
                                    : "Fee per Hour"}
                                </TableHead>
                                <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                  {language === "ar" ? "الفئة" : "Category"}
                                </TableHead>
                              </>
                            ) : (
                              <>
                                <TableHead>
                                  {language === "ar" ? "الفئة" : "Category"}
                                </TableHead>
                                <TableHead>
                                  {language === "ar"
                                    ? "الرسوم لكل ساعة"
                                    : "Fee per Hour"}
                                </TableHead>
                                <TableHead>
                                  {language === "ar"
                                    ? "إجمالي التكلفة التقديرية"
                                    : "Estimated Total"}
                                </TableHead>
                              </>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            {dir === "rtl" ? (
                              <>
                                <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                  {(
                                    program.tuitionSyrian * program.creditHours
                                  ).toLocaleString()}{" "}
                                  {program.tuitionCurrency.syrian}
                                </TableCell>
                                <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                  {program.tuitionSyrian.toLocaleString()}{" "}
                                  {program.tuitionCurrency.syrian}
                                </TableCell>
                                <TableCell className={`font-medium ${dir === "rtl" ? "text-right" : "text-left"}`}>
                                  {language === "ar" ? "الطلاب السوريون" : "Syrian Students"}
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="font-medium">
                                  {language === "ar" ? "الطلاب السوريون" : "Syrian Students"}
                                </TableCell>
                                <TableCell>
                                  {program.tuitionSyrian.toLocaleString()}{" "}
                                  {program.tuitionCurrency.syrian}
                                </TableCell>
                                <TableCell>
                                  {(
                                    program.tuitionSyrian * program.creditHours
                                  ).toLocaleString()}{" "}
                                  {program.tuitionCurrency.syrian}
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                          <TableRow>
                            {dir === "rtl" ? (
                              <>
                                <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                  $
                                  {(
                                    program.tuitionNonResident * program.creditHours
                                  ).toLocaleString()}{" "}
                                  {program.tuitionCurrency.nonResident}
                                </TableCell>
                                <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                  ${program.tuitionNonResident}{" "}
                                  {program.tuitionCurrency.nonResident}
                                </TableCell>
                                <TableCell className={`font-medium ${dir === "rtl" ? "text-right" : "text-left"}`}>
                                  {language === "ar"
                                    ? "غير المقيمين"
                                    : "Non-Residents"}
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="font-medium">
                                  {language === "ar"
                                    ? "غير المقيمين"
                                    : "Non-Residents"}
                                </TableCell>
                                <TableCell>
                                  ${program.tuitionNonResident}{" "}
                                  {program.tuitionCurrency.nonResident}
                                </TableCell>
                                <TableCell>
                                  $
                                  {(
                                    program.tuitionNonResident * program.creditHours
                                  ).toLocaleString()}{" "}
                                  {program.tuitionCurrency.nonResident}
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        </TableBody>
                      </Table>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 rounded-lg bg-muted/50 p-3 sm:p-4">
                      <h4 className="mb-2 text-sm sm:text-base font-semibold">
                        {language === "ar" ? "المنح والخصومات" : "Scholarships & Discounts"}
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <li>
                          {language === "ar"
                            ? "5% منح كاملة لوزارة التعليم العالي"
                            : "5% Full Scholarships for Ministry of Higher Education"}
                        </li>
                        <li>
                          {language === "ar"
                            ? "خصومات التفوق الأكاديمي"
                            : "Academic Excellence Discounts"}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Admission Tab */}
              <TabsContent value="admission">
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      {language === "ar" ? "شروط القبول" : "Admission Requirements"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="mb-2 text-sm sm:text-base font-semibold">
                          {language === "ar" ? "المؤهل المطلوب" : "Required Qualification"}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {language === "ar"
                            ? `الشهادة الثانوية السورية (الفرع ${
                                program.branch === "scientific"
                                  ? "العلمي"
                                  : program.branch === "literary"
                                  ? "الأدبي"
                                  : "العلمي أو الأدبي"
                              })`
                            : `Syrian Baccalaureate (${
                                program.branch === "scientific"
                                  ? "Scientific Branch"
                                  : program.branch === "literary"
                                  ? "Literary Branch"
                                  : "Scientific or Literary Branch"
                              })`}
                        </p>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm sm:text-base font-semibold">
                          {language === "ar" ? "الحد الأدنى للقبول" : "Minimum Score"}
                        </h4>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                          <Badge variant="outline" className="text-sm sm:text-base">
                            {program.minScorePercent}%
                          </Badge>
                          <Badge variant="outline" className="text-sm sm:text-base">
                            {program.minScorePoints}{" "}
                            {language === "ar" ? "درجة" : "points"}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm sm:text-base font-semibold">
                          {language === "ar" ? "المستندات المطلوبة" : "Required Documents"}
                        </h4>
                        <ul className="list-inside list-disc space-y-1 text-xs sm:text-sm text-muted-foreground">
                          <li>
                            {language === "ar"
                              ? "صورة عن الشهادة الثانوية مصدقة"
                              : "Certified copy of Secondary Certificate"}
                          </li>
                          <li>
                            {language === "ar"
                              ? "صورة عن الهوية الشخصية"
                              : "Copy of Personal ID"}
                          </li>
                          <li>
                            {language === "ar"
                              ? "صور شخصية حديثة"
                              : "Recent passport photos"}
                          </li>
                          <li>
                            {language === "ar"
                              ? "وصل دفع رسوم التسجيل"
                              : "Registration fee receipt"}
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Link href="/admissions">
                          <Button size="lg" className="w-full sm:w-auto">
                            {language === "ar" ? "تقديم طلب القبول" : "Apply Now"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
