"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getFacultyDetails } from "@/data/faculty-details";
import { DepartmentStaff } from "./department-staff";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Layers, 
  ClipboardList, 
  FlaskConical, 
  Calendar, 
  User, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FacultyTabsProps {
  facultySlug: string;
}

export function FacultyTabs({ facultySlug }: FacultyTabsProps) {
  const { language, dir } = useLanguage();
  const details = getFacultyDetails(facultySlug);

  if (!details) return null;

  const tabs = [
    { id: "activities", labelAr: "نشاطات الكلية", labelEn: "Activities", icon: Activity },
    { id: "structure", labelAr: "الهيكل التنظيمي", labelEn: "Organizational Structure", icon: Users },
    { id: "departments", labelAr: "التخصصات والأقسام", labelEn: "Departments", icon: Layers },
    { id: "study-plan", labelAr: "الخطة الدرسية", labelEn: "Study Plan", icon: ClipboardList },
    { id: "research", labelAr: "الأبحاث العلمية", labelEn: "Scientific Research", icon: FlaskConical },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="activities" className="w-full" dir={dir}>
          <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 mb-8 items-stretch justify-start overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-fit"
              >
                <tab.icon className="h-4 w-4" />
                <span>{language === "ar" ? tab.labelAr : tab.labelEn}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {details.activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden group hover:shadow-xl transition-shadow border-none bg-muted/30">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={language === "ar" ? activity.titleAr : activity.titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge className="bg-primary/90 backdrop-blur-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {activity.date}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {language === "ar" ? activity.titleAr : activity.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === "ar" ? activity.descriptionAr : activity.descriptionEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Structure Tab */}
          <TabsContent value="structure" className="mt-0 space-y-12">
            {/* Dean's Word */}
            <div className="bg-primary/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <Quote className="absolute top-8 right-8 h-24 w-24 text-primary/10 -rotate-12" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-background shadow-xl">
                    <Image
                      src={details.board[0]?.image || "/images/faculty/placeholder.png"}
                      alt="Dean"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-start">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === "ar" ? "كلمة عميد الكلية" : "Dean's Message"}
                  </h3>
                  <p className="text-lg text-muted-foreground italic mb-6">
                    &quot;{language === "ar" ? details.deanWordAr : details.deanWordEn}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-primary">
                      {language === "ar" ? details.board[0]?.nameAr : details.board[0]?.nameEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? details.board[0]?.roleAr : details.board[0]?.roleEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faculty Board */}
            <div>
              <h3 className="text-2xl font-bold mb-6 px-2 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                {language === "ar" ? "مجلس الكلية" : "College Board"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {details.board.map((member) => (
                  <Card key={member.id} className="text-center hover:border-primary/50 transition-colors bg-muted/20 border-muted">
                    <CardHeader className="items-center pb-2">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                        <Image src={member.image} alt={member.nameEn} fill className="object-cover" />
                      </div>
                      <CardTitle className="text-base">
                        {language === "ar" ? member.nameAr : member.nameEn}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {language === "ar" ? member.roleAr : member.roleEn}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Staff - Embed existing component */}
            <div className="pt-8 border-t">
              <DepartmentStaff facultySlug={facultySlug} />
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {details.departments.map((dept) => (
                <Card key={dept.id} className="h-full border-muted-foreground/20 hover:border-primary transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{language === "ar" ? dept.nameAr : dept.nameEn}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2 text-primary">
                      <User className="h-3 w-3" />
                      {language === "ar" ? `رئيس القسم: ${dept.headAr}` : `Head: ${dept.headEn}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "ar" ? dept.descriptionAr : dept.descriptionEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Plan Tab */}
          <TabsContent value="study-plan" className="mt-0 space-y-8">
            {details.studyPlan.map((year, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 border-b-2 border-primary/20 pb-2 w-fit">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  {language === "ar" ? year.yearAr : year.yearEn}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {year.courses.map((course) => (
                    <div key={course.code} className="p-4 rounded-xl border border-muted bg-muted/30 hover:bg-muted/50 transition-colors flex justify-between items-start group">
                      <div>
                        <p className="text-xs font-mono text-primary mb-1">{course.code}</p>
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {language === "ar" ? course.nameAr : course.nameEn}
                        </h4>
                      </div>
                      <Badge variant="outline" className="shrink-0 ml-2">
                        {course.credits} {language === "ar" ? "ساعات" : "Hrs"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="mt-0">
            <div className="space-y-6">
              {details.research.map((paper) => (
                <Card key={paper.id} className="relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all" />
                  <CardHeader className="flex-row items-center gap-4 py-4">
                    <div className="hidden sm:flex h-12 w-12 rounded-full bg-muted items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {language === "ar" ? paper.titleAr : paper.titleEn}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {language === "ar" ? paper.authorsAr : paper.authorsEn}
                        </span>
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {language === "ar" ? paper.journalAr : paper.journalEn}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {paper.year}
                        </span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
