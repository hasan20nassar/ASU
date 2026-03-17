"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alumniProfile, alumniJobs, alumniEvents } from "@/data/portal";
import {
  User,
  LogOut,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Save,
  GraduationCap,
  Users,
  CalendarDays,
} from "lucide-react";

const translations = {
  ar: {
    alumniNetwork: "شبكة الخريجين",
    logout: "تسجيل الخروج",
    exclusiveJobs: "وظائف حصرية للخريجين",
    updateProfile: "تحديث الملف الشخصي",
    events: "الفعاليات",
    jobTitle: "المسمى الوظيفي",
    company: "الشركة",
    location: "الموقع",
    type: "النوع",
    deadline: "آخر موعد",
    apply: "التقديم",
    currentCompany: "الشركة الحالية",
    currentJobTitle: "المسمى الوظيفي الحالي",
    linkedIn: "LinkedIn",
    save: "حفظ التغييرات",
    graduationYear: "سنة التخرج",
    program: "التخصص",
    requirements: "المتطلبات",
    postedOn: "تاريخ النشر",
    eventDate: "التاريخ",
    eventTime: "الوقت",
    eventLocation: "المكان",
    viewDetails: "عرض التفاصيل",
    noEvents: "لا توجد فعاليات قادمة",
    savedSuccessfully: "تم الحفظ بنجاح",
  },
  en: {
    alumniNetwork: "Alumni Network",
    logout: "Logout",
    exclusiveJobs: "Exclusive Jobs for Alumni",
    updateProfile: "Update Profile",
    events: "Events",
    jobTitle: "Job Title",
    company: "Company",
    location: "Location",
    type: "Type",
    deadline: "Deadline",
    apply: "Apply",
    currentCompany: "Current Company",
    currentJobTitle: "Current Job Title",
    linkedIn: "LinkedIn",
    save: "Save Changes",
    graduationYear: "Graduation Year",
    program: "Program",
    requirements: "Requirements",
    postedOn: "Posted on",
    eventDate: "Date",
    eventTime: "Time",
    eventLocation: "Location",
    viewDetails: "View Details",
    noEvents: "No upcoming events",
    savedSuccessfully: "Saved successfully",
  },
};

export default function AlumniPortalPage() {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  const [profile, setProfile] = useState({
    currentCompany: isArabic ? alumniProfile.currentCompanyAr : alumniProfile.currentCompany,
    jobTitle: isArabic ? alumniProfile.jobTitleAr : alumniProfile.jobTitle,
    linkedIn: alumniProfile.linkedIn,
  });
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const alumniName = isArabic ? alumniProfile.nameAr : alumniProfile.nameEn;
  const programName = isArabic ? alumniProfile.programAr : alumniProfile.program;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-start">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">{alumniName}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {programName} | {t.graduationYear}: {alumniProfile.graduationYear}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
                <LogOut className="h-4 w-4" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Tabs defaultValue="jobs" className="space-y-4 sm:space-y-6" dir={dir}>
            <TabsList className="grid w-full grid-cols-3 h-auto p-1">
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{t.exclusiveJobs}</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t.updateProfile}</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">{t.events}</span>
              </TabsTrigger>
            </TabsList>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 text-start">
                {alumniJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg">
                            {isArabic ? job.titleAr : job.titleEn}
                          </CardTitle>
                          <CardDescription className="mt-1 flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {isArabic ? job.companyAr : job.companyEn}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {isArabic ? job.typeAr : job.typeEn}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {isArabic ? job.locationAr : job.locationEn}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {t.deadline}: {new Date(job.deadline).toLocaleDateString(isArabic ? "ar-SY" : "en-US")}
                        </span>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium">{t.requirements}:</p>
                        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {t.apply}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="max-w-2xl mx-auto text-start">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">{t.updateProfile}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {isArabic
                      ? "قم بتحديث معلوماتك المهنية لتظهر في دليل الخريجين"
                      : "Update your professional information to appear in the alumni directory"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.currentCompany}</Label>
                    <div className="relative">
                      <Building2 className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="company"
                        value={profile.currentCompany}
                        onChange={(e) =>
                          setProfile({ ...profile, currentCompany: e.target.value })
                        }
                        className="ps-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">{t.currentJobTitle}</Label>
                    <div className="relative">
                      <Briefcase className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="jobTitle"
                        value={profile.jobTitle}
                        onChange={(e) =>
                          setProfile({ ...profile, jobTitle: e.target.value })
                        }
                        className="ps-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">{t.linkedIn}</Label>
                    <div className="relative">
                      <ExternalLink className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        value={profile.linkedIn}
                        onChange={(e) =>
                          setProfile({ ...profile, linkedIn: e.target.value })
                        }
                        className="ps-10"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <Button onClick={handleSave} className="gap-2 w-full sm:w-auto">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </Button>
                    {showSaved && (
                      <span className="text-sm text-green-600 text-center sm:text-start">{t.savedSuccessfully}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 text-start">
                {alumniEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isArabic ? event.titleAr : event.titleEn}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString(isArabic ? "ar-SY" : "en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {isArabic ? event.locationAr : event.locationEn}
                      </div>
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <Users className="h-4 w-4" />
                        {t.viewDetails}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}