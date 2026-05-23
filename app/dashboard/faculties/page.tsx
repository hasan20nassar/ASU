"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import { faculties } from "@/data/programs";
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
import { 
  Building2, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
  Users
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

export default function FacultiesManagement() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة الكليات" : "Faculties Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "إدارة الكليات الأكاديمية وهياكلها التنظيمية." 
              : "Manage academic faculties and their organizational structures."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <Plus className="h-4 w-4" />
          {language === "ar" ? "إضافة كلية" : "Add Faculty"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faculties.map((faculty) => (
          <Card key={faculty.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group">
            <div className={cn("h-2 w-full", faculty.color)} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg">
                  {language === "ar" ? faculty.nameAr : faculty.nameEn}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {language === "ar" ? faculty.descriptionAr : faculty.descriptionEn}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Edit className="h-4 w-4" /> {language === "ar" ? "تعديل" : "Edit"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <ExternalLink className="h-4 w-4" /> {language === "ar" ? "عرض الصفحة" : "View Page"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4" /> {language === "ar" ? "حذف" : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{language === "ar" ? "البرامج" : "Programs"}</span>
                    <span className="text-xl font-bold">{faculty.programs.length}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{language === "ar" ? "الطلاب" : "Students"}</span>
                    <span className="text-xl font-bold">~400</span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", faculty.color, "bg-opacity-10")}>
                  <Building2 className={cn("h-6 w-6", faculty.color.replace("bg-", "text-"))} />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 gap-2 font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="h-4 w-4" />
                {language === "ar" ? "إدارة الأقسام" : "Manage Departments"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
