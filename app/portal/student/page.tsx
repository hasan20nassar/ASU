"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  studentData,
  studentSchedule,
  studentGrades,
  studentFinancials,
} from "@/data/portal";
import {
  Calendar,
  GraduationCap,
  CreditCard,
  FileText,
  BookOpen,
  LogOut,
  User,
  UserPen,
  TrendingUp,
  Clock,
  Mail,
} from "lucide-react";

const translations = {
  ar: {
    welcome: "مرحباً",
    logout: "تسجيل الخروج",
    mySchedule: "جدولي الدراسي",
    gradesSummary: "ملخص الدرجات",
    currentGPA: "المعدل التراكمي",
    credits: "الساعات المكتملة",
    financialStatus: "الحالة المالية",
    balance: "الرصيد المتبقي",
    paid: "المدفوع",
    quickActions: "إجراءات سريعة",
    registerCourses: "تسجيل المواد",
    requestTranscript: "طلب كشف درجات",
    viewGrades: "عرض الدرجات",
    payFees: "دفع الرسوم",
    courseCode: "رمز المادة",
    courseName: "اسم المادة",
    day: "اليوم",
    time: "الوقت",
    room: "القاعة",
    instructor: "المدرس",
    grade: "الدرجة",
    recentGrades: "آخر الدرجات",
    noBalance: "لا يوجد رصيد مستحق",
    outstanding: "مستحق",
    days: {
      sunday: "الأحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
    },
    editProfile: "تعديل الملف الشخصي",
    nameAr: "الاسم (بالعربية)",
    nameEn: "الاسم (بالإنجليزية)",
    email: "البريد الإلكتروني",
    save: "حفظ التغييرات",
    updateImage: "تحديث الصورة",
    deleteImage: "حذف الصورة",
    profilePicture: "الصورة الشخصية",
  },
  en: {
    welcome: "Welcome",
    logout: "Logout",
    mySchedule: "My Schedule",
    gradesSummary: "Grades Summary",
    currentGPA: "Current GPA",
    credits: "Completed Credits",
    financialStatus: "Financial Status",
    balance: "Balance",
    paid: "Paid",
    quickActions: "Quick Actions",
    registerCourses: "Register Courses",
    requestTranscript: "Request Transcript",
    viewGrades: "View Grades",
    payFees: "Pay Fees",
    courseCode: "Course Code",
    courseName: "Course Name",
    day: "Day",
    time: "Time",
    room: "Room",
    instructor: "Instructor",
    grade: "Grade",
    recentGrades: "Recent Grades",
    noBalance: "No Outstanding Balance",
    outstanding: "Outstanding",
    days: {
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
    },
    editProfile: "Edit Profile",
    nameAr: "Name (Arabic)",
    nameEn: "Name (English)",
    email: "Email",
    save: "Save Changes",
    updateImage: "Update Image",
    deleteImage: "Delete Image",
    profilePicture: "Profile Picture",
  },
};

export default function StudentPortalPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  const [profile, setProfile] = React.useState({
    nameAr: studentData.nameAr,
    nameEn: studentData.nameEn,
    email: studentData.email,
    profileImage: null as string | null,
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfile({ ...profile, profileImage: null });
  };

  const studentName = isArabic ? profile.nameAr : profile.nameEn;
  const hasBalance = studentFinancials.balance > 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="group relative flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden transition-transform hover:scale-105 active:scale-95 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary">
                      {profile.profileImage ? (
                        <img src={profile.profileImage} alt={studentName} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 sm:h-8 sm:w-8" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <UserPen className="h-5 w-5 text-white" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md" dir={language === "ar" ? "rtl" : "ltr"}>
                    <DialogHeader>
                      <DialogTitle className="text-start">{t.profilePicture}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-6 py-4">
                      <div className="h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center border-4 border-muted shadow-xl">
                        {profile.profileImage ? (
                          <img src={profile.profileImage} alt={studentName} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-20 w-20 sm:h-32 sm:w-32 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center w-full">
                        <Button variant="outline" className="gap-2 bg-transparent" onClick={() => fileInputRef.current?.click()}>
                          <UserPen className="h-4 w-4" />
                          {t.updateImage}
                        </Button>
                        {profile.profileImage && (
                          <Button variant="destructive" className="gap-2" onClick={handleDeleteImage}>
                            <LogOut className="h-4 w-4 rotate-180" />
                            {t.deleteImage}
                          </Button>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                    {t.welcome}, {studentName}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {studentData.id} | {profile.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent flex-1 sm:flex-initial">
                      <UserPen className="h-4 w-4" />
                      {t.editProfile}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md" dir={language === "ar" ? "rtl" : "ltr"}>
                    <DialogHeader>
                      <DialogTitle className="text-start">{t.editProfile}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 text-start">
                      <div className="space-y-2">
                        <Label htmlFor="nameAr" className="block text-start">{t.nameAr}</Label>
                        <Input
                          id="nameAr"
                          value={profile.nameAr}
                          onChange={(e) => setProfile({ ...profile, nameAr: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameEn" className="block text-start">{t.nameEn}</Label>
                        <Input
                          id="nameEn"
                          value={profile.nameEn}
                          onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="block text-start">{t.email}</Label>
                        <div className="relative">
                          <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="ps-10"
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start gap-2 pt-2">
                        <Button type="submit" className="w-full sm:w-auto">
                          {t.save}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="gap-2 bg-transparent flex-1 sm:flex-initial">
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* GPA Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t.currentGPA}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  {studentData.gpa.toFixed(2)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.credits}: {studentData.completedCredits}/{studentData.totalCredits}
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(studentData.completedCredits / studentData.totalCredits) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t.financialStatus}
                </CardTitle>
                <CreditCard className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${hasBalance ? "text-destructive" : "text-green-600"}`}
                >
                  {hasBalance
                    ? `${studentFinancials.balance.toLocaleString()} ${studentFinancials.currency}`
                    : t.noBalance}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.paid}: {studentFinancials.paid.toLocaleString()} {studentFinancials.currency}
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t.quickActions}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">{t.registerCourses}</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">{t.requestTranscript}</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-xs">{t.viewGrades}</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">{t.payFees}</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Table */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader className="flex flex-row items-center gap-2 px-4 sm:px-6">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">{t.mySchedule}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.courseCode}</TableHead>
                      <TableHead>{t.courseName}</TableHead>
                      <TableHead>{t.day}</TableHead>
                      <TableHead>{t.time}</TableHead>
                      <TableHead>{t.room}</TableHead>
                      <TableHead>{t.instructor}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentSchedule.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.courseCode}</TableCell>
                        <TableCell>
                          {isArabic ? course.courseNameAr : course.courseNameEn}
                        </TableCell>
                        <TableCell>{isArabic ? course.dayAr : course.dayEn}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {course.time}
                          </div>
                        </TableCell>
                        <TableCell>{course.room}</TableCell>
                        <TableCell>
                          {isArabic ? course.instructor : course.instructorEn}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader className="flex flex-row items-center gap-2 px-4 sm:px-6">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">{t.recentGrades}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.courseCode}</TableHead>
                      <TableHead>{t.courseName}</TableHead>
                      <TableHead>{t.grade}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentGrades.map((course) => (
                      <TableRow key={course.courseCode}>
                        <TableCell className="font-medium">{course.courseCode}</TableCell>
                        <TableCell>
                          {isArabic ? course.courseNameAr : course.courseNameEn}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                            {course.grade}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
