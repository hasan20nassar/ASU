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
  },
};

export default function FacultyPortalPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  const [selectedCourse, setSelectedCourse] = useState<typeof facultyCourses[0] | null>(null);
  const [grades, setGrades] = useState(courseStudents);
  const [showSaved, setShowSaved] = useState(false);

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

  const instructorName = isArabic ? facultyMember.nameAr : facultyMember.nameEn;
  const departmentName = isArabic ? facultyMember.departmentAr : facultyMember.department;
  const titleName = isArabic ? facultyMember.titleAr : facultyMember.title;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">{instructorName}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {titleName} | {departmentName}
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
          {/* Info Cards */}
          <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.office}</p>
                  <p className="font-medium">{facultyMember.office}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.officeHours}</p>
                  <p className="font-medium">{facultyMember.officeHours}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{facultyMember.email}</p>
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
                            <DialogContent className="max-w-[95vw] sm:max-w-4xl">
                              <DialogHeader>
                                <DialogTitle className="text-base sm:text-lg">
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
                                  <Button variant="outline" className="gap-1 bg-transparent flex-1 sm:flex-initial">
                                    <X className="h-4 w-4" />
                                    {t.cancel}
                                  </Button>
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
