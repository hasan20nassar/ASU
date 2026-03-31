"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Globe,
  Sun,
  Moon,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  const { language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ms-1" />
        <div className="hidden md:flex relative max-w-96">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={language === "ar" ? "البحث السريع..." : "Quick search..."}
            className="h-9 w-64 lg:w-96 ps-9 bg-muted/50 border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">

        <div className="flex items-center gap-1 border-s ps-1 ms-1">
          {/* Notifications */}
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>
                {language === "ar" ? "التنبيهات" : "Notifications"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                  <p className="text-sm font-bold">رسالة جديدة من &quot;أحمد&quot;</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">استفسار حول القبول للسنة القادمة</p>
                  <p className="text-[10px] text-muted-foreground">قبل 10 دقائق</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                  <p className="text-sm font-bold text-emerald-500">تم نشر النتائج</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">تم رفع علامات كلية الصيدلة بنجاح</p>
                  <p className="text-[10px] text-muted-foreground">قبل ساعة</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center font-bold text-primary cursor-pointer hover:bg-transparent">
                {language === "ar" ? "عرض الكل" : "View All"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          >
            <Globe className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu dir={dir}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ms-1">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="/images/faculty/prof_male_1.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none">مدير الموقع</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@asu.edu.sy
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>{language === "ar" ? "الملف الشخصي" : "Profile"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>{language === "ar" ? "الإعدادات" : "Settings"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={() => {
                localStorage.removeItem("asu_auth");
                window.location.href = "/";
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{language === "ar" ? "تسجيل الخروج" : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
