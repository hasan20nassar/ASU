"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { mockUsers } from "@/data/dashboard";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  UserPlus, 
  Edit, 
  Trash2, 
  ShieldCheck,
  Filter
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function UsersManagement() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-red-500 hover:bg-red-600 border-none">{language === "ar" ? "مدير نظام" : "Super Admin"}</Badge>;
      case "admin":
        return <Badge className="bg-blue-500 hover:bg-blue-600 border-none">{language === "ar" ? "مشرف" : "Admin"}</Badge>;
      case "faculty":
        return <Badge className="bg-purple-500 hover:bg-purple-600 border-none">{language === "ar" ? "عضو تدريس" : "Faculty"}</Badge>;
      case "student":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">{language === "ar" ? "طالب" : "Student"}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة المستخدمين" : "Users Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "التحكم في حسابات المستخدمين وصلاحياتهم في النظام." 
              : "Control user accounts and their permissions in the system."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <UserPlus className="h-4 w-4" />
          {language === "ar" ? "إضافة مستخدم جديد" : "Add New User"}
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
                {language === "ar" ? "تصفية" : "Filter"}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 font-medium">
                <ShieldCheck className="h-4 w-4" />
                {language === "ar" ? "الأدوار" : "Roles"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="w-[300px] text-start font-bold">{language === "ar" ? "المستخدم" : "User"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الدور" : "Role"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "الحالة" : "Status"}</TableHead>
                  <TableHead className="text-start font-bold">{language === "ar" ? "آخر دخول" : "Last Login"}</TableHead>
                  <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border shadow-sm">
                            <AvatarImage src={`/images/faculty/prof_${user.id.toLowerCase()}.png`} alt={user.name} />
                            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">{language === "ar" ? user.name : user.nameEn}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={user.status === "active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none" : ""}
                        >
                          {user.status === "active" ? (language === "ar" ? "نشط" : "Active") : (language === "ar" ? "غير نشط" : "Inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-end px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>{language === "ar" ? "خيارات" : "Options"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer gap-2">
                              <Edit className="h-4 w-4" />
                              <span>{language === "ar" ? "تعديل" : "Edit"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer gap-2">
                              <ShieldCheck className="h-4 w-4" />
                              <span>{language === "ar" ? "تغيير الدور" : "Change Role"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span>{language === "ar" ? "حذف" : "Delete"}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {language === "ar" ? "لا توجد نتائج بحث مطابقة." : "No matching results found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
