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
  Filter
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
import { cn } from "@/lib/utils";

export default function StudentsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = topStudents.filter(s => 
    s.nameAr.includes(searchQuery) || 
    s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة الطلاب" : "Students Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "استعراض بيانات الطلاب المسجلين وحالتهم الأكاديمية." 
              : "Review registered students' data and their academic status."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold flex gap-2">
            <Download className="h-4 w-4" />
            {language === "ar" ? "تصدير البيانات" : "Export Data"}
          </Button>
          <Button className="font-bold flex gap-2">
            <UserPlus className="h-4 w-4" />
            {language === "ar" ? "إضافة طالب" : "Add Student"}
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === "ar" ? "بحث عن طريق الاسم أو الرقم الجامعي..." : "Search by name or ID..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 font-medium">
                <Filter className="h-4 w-4" />
                {language === "ar" ? "تصفية" : "Filter"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="text-start font-bold">{language === "ar" ? "الطالب" : "Student"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الرقم الجامعي" : "Student ID"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الكلية" : "Faculty"}</TableHead>
                  <TableHead className="text-center font-bold">{language === "ar" ? "المعدل" : "GPA"}</TableHead>
                  <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
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
                            <span className="font-bold text-sm">{language === "ar" ? student.nameAr : student.nameEn}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums text-muted-foreground">{student.studentId}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {language === "ar" ? faculty?.nameAr : faculty?.nameEn}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold tabular-nums">
                        <span className={student.gpa >= 3.5 ? "text-emerald-600" : "text-amber-600"}>
                          {student.gpa}
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
                            <DropdownMenuItem className="gap-2">
                              <FileText className="h-4 w-4" /> {language === "ar" ? "كشف علامات" : "Transcript"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" /> {language === "ar" ? "تعديل البيانات" : "Edit Profile"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> {language === "ar" ? "فصل الطالب" : "Suspend"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
