"use client";

import React from "react";
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
  BookOpen,
  FileText,
  Users,
} from "lucide-react";

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

  // Sample curriculum data
  const sampleCourses = [
    {
      year: 1,
      courses: [
        { code: "MATH101", nameAr: "رياضيات 1", nameEn: "Mathematics I", hours: 3 },
        { code: "PHYS101", nameAr: "فيزياء 1", nameEn: "Physics I", hours: 3 },
        { code: "CHEM101", nameAr: "كيمياء عامة", nameEn: "General Chemistry", hours: 3 },
        { code: "ARAB101", nameAr: "لغة عربية", nameEn: "Arabic Language", hours: 2 },
        { code: "ENGL101", nameAr: "لغة إنجليزية 1", nameEn: "English I", hours: 3 },
      ],
    },
    {
      year: 2,
      courses: [
        { code: "PROG201", nameAr: "برمجة متقدمة", nameEn: "Advanced Programming", hours: 3 },
        { code: "MATH201", nameAr: "رياضيات 2", nameEn: "Mathematics II", hours: 3 },
        { code: "STAT201", nameAr: "إحصاء", nameEn: "Statistics", hours: 3 },
      ],
    },
  ];

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

                    {sampleCourses.map((yearData) => (
                      <div key={yearData.year} className="mb-6 sm:mb-8">
                        <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                          {language === "ar"
                            ? `السنة ${yearData.year}`
                            : `Year ${yearData.year}`}
                        </h3>
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {dir === "rtl" ? (
                                  <>
                                    <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                      {language === "ar" ? "الساعات" : "Hours"}
                                    </TableHead>
                                    <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                      {language === "ar" ? "المقرر" : "Course"}
                                    </TableHead>
                                    <TableHead className={dir === "rtl" ? "text-right" : "text-left"}>
                                      {language === "ar" ? "الرمز" : "Code"}
                                    </TableHead>
                                  </>
                                ) : (
                                  <>
                                    <TableHead>
                                      {language === "ar" ? "الرمز" : "Code"}
                                    </TableHead>
                                    <TableHead>
                                      {language === "ar" ? "المقرر" : "Course"}
                                    </TableHead>
                                    <TableHead className="text-center">
                                      {language === "ar" ? "الساعات" : "Hours"}
                                    </TableHead>
                                  </>
                                )}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {yearData.courses.map((course) => (
                                <TableRow key={course.code}>
                                  {dir === "rtl" ? (
                                    <>
                                      <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                        {course.hours}
                                      </TableCell>
                                      <TableCell className={dir === "rtl" ? "text-right" : "text-left"}>
                                        {language === "ar"
                                          ? course.nameAr
                                          : course.nameEn}
                                      </TableCell>
                                      <TableCell className={`font-mono ${dir === "rtl" ? "text-right" : "text-left"}`}>
                                        {course.code}
                                      </TableCell>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell className="font-mono">
                                        {course.code}
                                      </TableCell>
                                      <TableCell>
                                        {language === "ar"
                                          ? course.nameAr
                                          : course.nameEn}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {course.hours}
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          </div>
                        </div>
                      </div>
                    ))}
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
