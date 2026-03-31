"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Plus, 
  MapPin, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mockJobs = [
  {
    id: 1,
    title: "مدرس لغة إنكليزية",
    titleEn: "English Language Instructor",
    dept: "كلية الآداب",
    type: "Full-time",
    status: "active",
    postedAt: "2024-03-25",
  },
  {
    id: 2,
    title: "مهندس شبكات",
    titleEn: "Network Engineer",
    dept: "مركز الحاسب",
    type: "Full-time",
    status: "active",
    postedAt: "2024-03-20",
  },
  {
    id: 3,
    title: "موظف موارد بشرية",
    titleEn: "HR Officer",
    dept: "الشؤون الإدارية",
    type: "Part-time",
    status: "expired",
    postedAt: "2024-02-15",
  },
];

export default function JobsManagement() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة الوظائف" : "Jobs Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "إضافة وإدارة فرص العمل الشاغرة في الجامعة." 
              : "Add and manage job vacancies in the university."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إعلان وظيفي جديد" : "New Job Posting"}
        </Button>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead className="text-start font-bold">{language === "ar" ? "المسمى الوظيفي" : "Job Title"}</TableHead>
                <TableHead className="text-start font-bold">{language === "ar" ? "القسم" : "Department"}</TableHead>
                <TableHead className="text-start font-bold">{language === "ar" ? "نوع الدوام" : "Type"}</TableHead>
                <TableHead className="text-start font-bold">{language === "ar" ? "الحالة" : "Status"}</TableHead>
                <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/30">
                  <TableCell className="font-bold">
                    {language === "ar" ? job.title : job.titleEn}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground text-start">
                    {job.dept}
                  </TableCell>
                  <TableCell className="text-sm">{job.type}</TableCell>
                  <TableCell>
                    <Badge variant={job.status === "active" ? "default" : "secondary"}>
                      {job.status === "active" ? (language === "ar" ? "نشط" : "Active") : (language === "ar" ? "منتهي" : "Expired")}
                    </Badge>
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
                          <Edit className="h-4 w-4" /> {language === "ar" ? "تعديل" : "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" /> {language === "ar" ? "حذف" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
