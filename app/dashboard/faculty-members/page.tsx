"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { facultyMembers } from "@/data/faculty";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  MoreVertical, 
  UserPlus, 
  Trash2, 
  Mail,
  Edit,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FacultyMembersManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = facultyMembers.filter(m => 
    m.nameAr.includes(searchQuery) || 
    m.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "أعضاء هيئة التدريس" : "Faculty Members"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "إدارة الدكاترة والأساتذة الأكاديميين في الجامعة." 
              : "Manage PhDs and academic professors in the university."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <UserPlus className="h-4 w-4" />
          {language === "ar" ? "إضافة عضو جديد" : "Add New Faculty"}
        </Button>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === "ar" ? "بحث عن طريق الاسم أو الإيميل..." : "Search by name or email..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 font-medium">
                <Filter className="h-4 w-4" />
                {language === "ar" ? "تصفية حسب القسم" : "Filter by Dept"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="text-start font-bold">{language === "ar" ? "الاسم" : "Name"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الرتبة العلمية" : "Academic Title"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "القسم" : "Department"}</TableHead>
                  <TableHead className="text-center font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border shadow-sm">
                          <AvatarImage src={member.image} alt={member.nameEn} />
                          <AvatarFallback>{member.nameEn[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{language === "ar" ? member.nameAr : member.nameEn}</span>
                          <span className="text-xs text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {language === "ar" ? member.titleAr : member.titleEn}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal text-xs">
                        {language === "ar" ? member.departmentAr : member.departmentEn}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" /> {language === "ar" ? "تعديل الملف" : "Edit Profile"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> {language === "ar" ? "إزاحة من الكادر" : "Remove"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
