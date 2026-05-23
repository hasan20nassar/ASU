"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Newspaper,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserCheck,
  Briefcase,
} from "lucide-react";
import { ASULogo } from "@/components/ui/asu-logo";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { language, dir } = useLanguage();
  const pathname = usePathname();

  const menuGroups = [
    {
      label: language === "ar" ? "الرئيسية" : "Main",
      items: [
        {
          title: language === "ar" ? "لوحة التحكم" : "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: language === "ar" ? "إدارة المستخدمين" : "User Management",
      items: [
        {
          title: language === "ar" ? "المستخدمين" : "Users",
          href: "/dashboard/users",
          icon: UserCheck,
        },
        {
          title: language === "ar" ? "الطلاب" : "Students",
          href: "/dashboard/students",
          icon: GraduationCap,
        },
        {
          title: language === "ar" ? "أعضاء التدريس" : "Faculty Members",
          href: "/dashboard/faculty-members",
          icon: Users,
        },
      ],
    },
    {
      label: language === "ar" ? "الأكاديميات" : "Academics",
      items: [
        {
          title: language === "ar" ? "الكليات" : "Faculties",
          href: "/dashboard/faculties",
          icon: Building2,
        },
        {
          title: language === "ar" ? "البرامج" : "Programs",
          href: "/dashboard/programs",
          icon: BookOpen,
        },
      ],
    },
    {
      label: language === "ar" ? "المحتوى والتواصل" : "Content & Communication",
      items: [
        {
          title: language === "ar" ? "الأخبار والفعاليات" : "News & Events",
          href: "/dashboard/news",
          icon: Newspaper,
        },
        {
          title: language === "ar" ? "الرسائل" : "Messages",
          href: "/dashboard/messages",
          icon: MessageSquare,
        },
        {
          title: language === "ar" ? "فرص العمل" : "Job Postings",
          href: "/dashboard/jobs",
          icon: Briefcase,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" side={language === "ar" ? "right" : "left"} className="border-e">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <ASULogo imageClassName="h-8 w-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 transition-all duration-200",
                          isActive 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {language === "ar" ? "الإعدادات" : "Settings"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                localStorage.removeItem("asu_auth");
                window.location.href = "/";
              }}
              className="flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">
                {language === "ar" ? "تسجيل الخروج" : "Logout"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
