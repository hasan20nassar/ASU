"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { facultyMember, facultyCourses, courseStudents } from "@/data/portal";
import {
  User,
  LogOut,
  BookOpen,
  Users,
  ClipboardEdit,
  Clock,
  MapPin,
  Mail,
  Save,
  X,
  UserPen,
} from "lucide-react";

const translations = {
  ar: {
    instructorDashboard: "لوحة تحكم المدرس",
    logout: "تسجيل الخروج",
    myCourses: "موادي",
    courseCode: "رمز المادة",
    courseName: "اسم المادة",
    credits: "الساعات",
    section: "الشعبة",
    students: "الطلاب",
    schedule: "الجدول",
    actions: "الإجراءات",
    gradeEntry: "إدخال الدرجات",
    office: "المكتب",
    officeHours: "ساعات المكتب",
    department: "القسم",
    studentId: "رقم الطالب",
    studentName: "اسم الطالب",
    midterm: "منتصف الفصل",
    final: "النهائي",
    assignments: "الواجبات",
    total: "المجموع",
    save: "حفظ",
    cancel: "إلغاء",
    gradesFor: "درجات مادة",
    savedSuccessfully: "تم الحفظ بنجاح",
    email: "البريد الإلكتروني",
    editProfile: "تعديل الملف الشخصي",
    nameAr: "الاسم (بالعربية)",
    nameEn: "الاسم (بالإنجليزية)",
    titleAr: "اللقب العلمي (بالعربية)",
    titleEn: "اللقب العلمي (بالإنجليزية)",
    saveProfile: "حفظ التغييرات",
    updateImage: "تحديث الصورة",
    deleteImage: "حذف الصورة",
    profilePicture: "الصورة الشخصية",
  },
  en: {
    instructorDashboard: "Instructor Dashboard",
    logout: "Logout",
    myCourses: "My Courses",
    courseCode: "Course Code",
    courseName: "Course Name",
    credits: "Credits",
    section: "Section",
    students: "Students",
    schedule: "Schedule",
    actions: "Actions",
    gradeEntry: "Grade Entry",
    office: "Office",
    officeHours: "Office Hours",
    department: "Department",
    studentId: "Student ID",
    studentName: "Student Name",
    midterm: "Midterm",
    final: "Final",
    assignments: "Assignments",
    total: "Total",
    save: "Save",
    cancel: "Cancel",
    gradesFor: "Grades for",
    savedSuccessfully: "Saved successfully",
    email: "Email",
    editProfile: "Edit Profile",
    nameAr: "Name (Arabic)",
    nameEn: "Name (English)",
    titleAr: "Scientific Title (Arabic)",
    titleEn: "Scientific Title (English)",
    saveProfile: "Save Changes",
    updateImage: "Update Image",
    deleteImage: "Delete Image",
    profilePicture: "Profile Picture",
  },
};

export default function FacultyPortalPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  const [selectedCourse, setSelectedCourse] = useState<typeof facultyCourses[0] | null>(null);
  const [grades, setGrades] = useState(courseStudents);
  const [showSaved, setShowSaved] = useState(false);

  const [profile, setProfile] = useState({
    nameAr: facultyMember.nameAr,
    nameEn: facultyMember.nameEn,
    titleAr: facultyMember.titleAr,
    titleEn: facultyMember.title,
    email: facultyMember.email,
    office: facultyMember.office,
    officeHours: facultyMember.officeHours,
    profileImage: null as string | null,
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
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

  const handleGradeChange = (studentId: number, field: string, value: string) => {
    setGrades((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, [field]: value === "" ? null : Number(value) } : s
      )
    );
  };

  const handleSaveGrades = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditDialogOpen(false);
  };

  const instructorName = isArabic ? profile.nameAr : profile.nameEn;
  const departmentName = isArabic ? facultyMember.departmentAr : facultyMember.department;
  const titleShow = isArabic ? profile.titleAr : profile.titleEn;

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
                        <img src={profile.profileImage} alt={instructorName} className="h-full w-full object-cover" />
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
                          <img src={profile.profileImage} alt={instructorName} className="h-full w-full object-cover" />
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
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">{instructorName}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {titleShow} | {departmentName}
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
                  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                    <DialogHeader>
                      <DialogTitle className="text-start">{t.editProfile}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 text-start">
                      <div className="grid gap-4 sm:grid-cols-2">
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
                          <Label htmlFor="titleAr" className="block text-start">{t.titleAr}</Label>
                          <Input
                            id="titleAr"
                            value={profile.titleAr}
                            onChange={(e) => setProfile({ ...profile, titleAr: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="titleEn" className="block text-start">{t.titleEn}</Label>
                          <Input
                            id="titleEn"
                            value={profile.titleEn}
                            onChange={(e) => setProfile({ ...profile, titleEn: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="block text-start">{t.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="office" className="block text-start">{t.office}</Label>
                          <Input
                            id="office"
                            value={profile.office}
                            onChange={(e) => setProfile({ ...profile, office: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="officeHours" className="block text-start">{t.officeHours}</Label>
                          <Input
                            id="officeHours"
                            value={profile.officeHours}
                            onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start gap-2 pt-2">
                        <Button type="submit" className="w-full sm:w-auto">
                          {t.saveProfile}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Info Cards */}
          <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.office}</p>
                  <p className="font-medium">{profile.office}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.officeHours}</p>
                  <p className="font-medium">{profile.officeHours}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.email}</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Table */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 px-4 sm:px-6">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">{t.myCourses}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.courseCode}</TableHead>
                      <TableHead>{t.courseName}</TableHead>
                      <TableHead>{t.credits}</TableHead>
                      <TableHead>{t.section}</TableHead>
                      <TableHead>{t.students}</TableHead>
                      <TableHead>{t.schedule}</TableHead>
                      <TableHead>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{isArabic ? course.nameAr : course.nameEn}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.section}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {course.studentCount}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {course.schedule}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 bg-transparent"
                                onClick={() => setSelectedCourse(course)}
                              >
                                <ClipboardEdit className="h-4 w-4" />
                                {t.gradeEntry}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-4xl" dir={language === "ar" ? "rtl" : "ltr"}>
                              <DialogHeader>
                                <DialogTitle className="text-start text-base sm:text-lg">
                                  {t.gradesFor}: {course.code} -{" "}
                                  {isArabic ? course.nameAr : course.nameEn}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="max-h-[60vh] overflow-auto">
                                <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>{t.studentId}</TableHead>
                                      <TableHead>{t.studentName}</TableHead>
                                      <TableHead className="w-24">{t.midterm}</TableHead>
                                      <TableHead className="w-24">{t.final}</TableHead>
                                      <TableHead className="w-24">{t.assignments}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {grades.map((student) => (
                                      <TableRow key={student.id}>
                                        <TableCell className="font-medium">
                                          {student.studentId}
                                        </TableCell>
                                        <TableCell>
                                          {isArabic ? student.nameAr : student.nameEn}
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={student.midterm ?? ""}
                                            onChange={(e) =>
                                              handleGradeChange(student.id, "midterm", e.target.value)
                                            }
                                            className="h-8 w-20"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={student.final ?? ""}
                                            onChange={(e) =>
                                              handleGradeChange(student.id, "final", e.target.value)
                                            }
                                            className="h-8 w-20"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={student.assignments ?? ""}
                                            onChange={(e) =>
                                              handleGradeChange(
                                                student.id,
                                                "assignments",
                                                e.target.value
                                              )
                                            }
                                            className="h-8 w-20"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-4">
                                {showSaved && (
                                  <span className="text-sm text-green-600">
                                    {t.savedSuccessfully}
                                  </span>
                                )}
                                <div className="flex gap-2 sm:ms-auto w-full sm:w-auto">
                                  <Button className="gap-1 flex-1 sm:flex-initial" onClick={handleSaveGrades}>
                                    <Save className="h-4 w-4" />
                                    {t.save}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
