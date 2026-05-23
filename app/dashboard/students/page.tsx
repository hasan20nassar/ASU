"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { topStudents } from "@/data/top-students";
import { faculties } from "@/data/programs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Search, 
  MoreVertical, 
  UserPlus, 
  FileText, 
  Trash2, 
  Edit,
  Download,
  Filter,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function StudentsManagement() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  // State management
  const [students, setStudents] = useState(topStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);
  const [editingStudent, setEditingStudent] = useState<typeof topStudents[0] | null>(null);

  // Form states
  const [formNameAr, setFormNameAr] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formStudentId, setFormStudentId] = useState("");
  const [formFacultySlug, setFormFacultySlug] = useState("engineering");
  const [formGpa, setFormGpa] = useState("");

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormNameAr("");
    setFormNameEn("");
    setFormStudentId(`STU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormFacultySlug("engineering");
    setFormGpa("");
    setIsOpenAddEdit(true);
  };

  const handleOpenEdit = (student: typeof topStudents[0]) => {
    setEditingStudent(student);
    setFormNameAr(student.nameAr);
    setFormNameEn(student.nameEn);
    setFormStudentId(student.studentId);
    setFormFacultySlug(student.facultySlug);
    setFormGpa(student.gpa.toString());
    setIsOpenAddEdit(true);
  };

  const handleDelete = (id: string, name: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success(
      isArabic 
        ? `تم تعليق حساب الطالب ${name} بنجاح` 
        : `Student ${name} suspended successfully`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameAr || !formNameEn || !formStudentId || !formGpa) {
      toast.error(isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }

    const gpaVal = parseFloat(formGpa);
    if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 4) {
      toast.error(isArabic ? "المعدل يجب أن يكون بين 0.00 و 4.00" : "GPA must be between 0.00 and 4.00");
      return;
    }

    if (editingStudent) {
      // Edit
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s,
        nameAr: formNameAr,
        nameEn: formNameEn,
        studentId: formStudentId,
        facultySlug: formFacultySlug,
        gpa: gpaVal,
      } : s));
      toast.success(isArabic ? "تم تحديث بيانات الطالب بنجاح" : "Student profile updated successfully");
    } else {
      // Add
      const newStudent = {
        id: `stu-${Date.now()}`,
        nameAr: formNameAr,
        nameEn: formNameEn,
        studentId: formStudentId,
        facultySlug: formFacultySlug,
        gpa: gpaVal,
        rank: 3 as const,
        image: `/images/students/student_male_${Math.floor(1 + Math.random() * 3)}.png`,
      };
      setStudents([newStudent, ...students]);
      toast.success(isArabic ? "تم إضافة الطالب الجديد بنجاح" : "New student added successfully");
    }

    setIsOpenAddEdit(false);
  };

  const filteredStudents = students.filter(s => 
    s.nameAr.includes(searchQuery) || 
    s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-start" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isArabic ? "إدارة الطلاب" : "Students Management"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic 
              ? "استعراض بيانات الطلاب المسجلين وحالتهم الأكاديمية." 
              : "Review registered students' data and their academic status."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold flex gap-2" onClick={() => toast.success(isArabic ? "تم تصدير البيانات بنجاح كـ CSV!" : "Data exported successfully as CSV!")}>
            <Download className="h-4 w-4" />
            {isArabic ? "تصدير البيانات" : "Export Data"}
          </Button>
          <Button className="font-bold flex gap-2" onClick={handleOpenAdd}>
            <UserPlus className="h-4 w-4" />
            {isArabic ? "إضافة طالب" : "Add Student"}
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={isArabic ? "بحث عن طريق الاسم أو الرقم الجامعي..." : "Search by name or ID..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 font-medium">
                <Filter className="h-4 w-4" />
                {isArabic ? "تصفية" : "Filter"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="text-start font-bold">{isArabic ? "الطالب" : "Student"}</TableHead>
                  <TableHead className="text-start font-bold">{isArabic ? "الرقم الجامعي" : "Student ID"}</TableHead>
                  <TableHead className="text-start font-bold">{isArabic ? "الكلية" : "Faculty"}</TableHead>
                  <TableHead className="text-center font-bold">{isArabic ? "المعدل" : "GPA"}</TableHead>
                  <TableHead className="text-end font-bold px-6">{isArabic ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-bold">
                      {isArabic ? "لا توجد نتائج مطابقة لبحثك" : "No results match your search"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => {
                    const faculty = faculties.find(f => f.id === student.facultySlug);
                    return (
                      <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border shadow-sm">
                              <AvatarImage src={student.image} alt={student.nameEn} />
                              <AvatarFallback>{student.nameEn[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm">{isArabic ? student.nameAr : student.nameEn}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm tabular-nums text-muted-foreground">{student.studentId}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {isArabic ? faculty?.nameAr : faculty?.nameEn}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-bold tabular-nums">
                          <span className={student.gpa >= 3.5 ? "text-emerald-600" : "text-amber-600"}>
                            {student.gpa.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-end px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2" onClick={() => toast.info(isArabic ? `عرض كشف علامات الطالب: ${isArabic ? student.nameAr : student.nameEn}` : `Viewing transcript for student: ${student.nameEn}`)}>
                                <FileText className="h-4 w-4" /> {isArabic ? "كشف علامات" : "Transcript"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => handleOpenEdit(student)}>
                                <Edit className="h-4 w-4" /> {isArabic ? "تعديل البيانات" : "Edit Profile"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-destructive font-bold" onClick={() => handleDelete(student.id, isArabic ? student.nameAr : student.nameEn)}>
                                <Trash2 className="h-4 w-4" /> {isArabic ? "فصل الطالب" : "Suspend"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Student Dialog */}
      <Dialog open={isOpenAddEdit} onOpenChange={setIsOpenAddEdit}>
        <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="text-start">
              {editingStudent 
                ? (isArabic ? "تعديل بيانات الطالب" : "Edit Student Profile") 
                : (isArabic ? "إضافة طالب جديد" : "Add New Student")}
            </DialogTitle>
            <DialogDescription className="text-start">
              {isArabic 
                ? "أدخل بيانات الطالب باللغتين العربية والإنجليزية وحدد كليته ومعدله الدراسي."
                : "Enter student details in both Arabic and English, select their faculty, and input their GPA."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-start">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">{isArabic ? "الاسم (بالعربية)" : "Name (Arabic)"}</Label>
                <Input
                  id="nameAr"
                  required
                  value={formNameAr}
                  onChange={(e) => setFormNameAr(e.target.value)}
                  placeholder="أحمد علي"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">{isArabic ? "الاسم (بالإنجليزية)" : "Name (English)"}</Label>
                <Input
                  id="nameEn"
                  required
                  value={formNameEn}
                  onChange={(e) => setFormNameEn(e.target.value)}
                  placeholder="Ahmad Ali"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">{isArabic ? "الرقم الجامعي" : "Student ID"}</Label>
                <Input
                  id="studentId"
                  required
                  value={formStudentId}
                  onChange={(e) => setFormStudentId(e.target.value)}
                  placeholder="ENG-2024-0001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">{isArabic ? "المعدل التراكمي (GPA)" : "GPA"}</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  required
                  value={formGpa}
                  onChange={(e) => setFormGpa(e.target.value)}
                  placeholder="3.85"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">{isArabic ? "الكلية" : "Faculty"}</Label>
              <select
                id="faculty"
                value={formFacultySlug}
                onChange={(e) => setFormFacultySlug(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {isArabic ? f.nameAr : f.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <DialogFooter className="pt-4 gap-2 sm:justify-start">
              <Button type="button" variant="outline" onClick={() => setIsOpenAddEdit(false)} className="bg-transparent w-full sm:w-auto">
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit" className="w-full sm:w-auto font-bold">
                {isArabic ? "حفظ البيانات" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
