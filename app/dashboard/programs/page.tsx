"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { faculties, getAllPrograms } from "@/data/programs";
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
  BookOpen, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Filter,
  GraduationCap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function ProgramsManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const allPrograms = getAllPrograms();

  const filteredPrograms = allPrograms.filter(p => 
    p.nameAr.includes(searchQuery) || 
    p.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة البرامج" : "Programs Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "التحكم في الخطط الدراسية والبرامج الأكاديمية." 
              : "Control academic plans and programs."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إضافة برنامج" : "Add Program"}
        </Button>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === "ar" ? "بحث عن برنامج..." : "Search for a program..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 font-medium">
                <Filter className="h-4 w-4" />
                {language === "ar" ? "تصفية حسب الكلية" : "Filter by Faculty"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="text-start font-bold">{language === "ar" ? "البرنامج" : "Program"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الكلية" : "Faculty"}</TableHead>
                  <TableHead className="text-center font-bold">{language === "ar" ? "الساعات" : "Credits"}</TableHead>
                  <TableHead className="text-center font-bold">{language === "ar" ? "السنوات" : "Years"}</TableHead>
                  <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.map((program) => {
                  const faculty = faculties.find(f => f.id === program.facultySlug);
                  return (
                    <TableRow key={program.id} className="hover:bg-muted/30">
                      <TableCell className="font-bold">
                        {language === "ar" ? program.nameAr : program.nameEn}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("border-none", faculty?.color, "bg-opacity-10", faculty?.color.replace("bg-", "text-"))}>
                          {language === "ar" ? faculty?.nameAr : faculty?.nameEn}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center tabular-nums">{program.creditHours}</TableCell>
                      <TableCell className="text-center tabular-nums">{program.duration}</TableCell>
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
                            <DropdownMenuItem className="gap-2">
                              <GraduationCap className="h-4 w-4" /> {language === "ar" ? "إدارة القبول" : "Admission Info"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> {language === "ar" ? "حذف" : "Delete"}
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
