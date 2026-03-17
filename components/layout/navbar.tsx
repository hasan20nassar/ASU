"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { faculties } from "@/data/programs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  Phone,
  Newspaper,
  FlaskConical,
  TreePine,
} from "lucide-react";
import { CommandMenu } from "@/components/layout/command-menu";

export function Navbar() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Building2 },
    { href: "/about", label: t("nav.about"), icon: Users },
    { href: "/about/directory", label: language === "ar" ? "هيئة التدريس" : "Faculty Directory", icon: Users },
    { href: "/admissions", label: t("nav.admissions"), icon: GraduationCap },
    { href: "/library", label: language === "ar" ? "المكتبة المركزية" : "University Library", icon: BookOpen },
    { href: "/campus-life", label: t("nav.campusLife"), icon: TreePine },
    { href: "/research", label: t("nav.research"), icon: FlaskConical },
    { href: "/news", label: t("nav.news"), icon: Newspaper },
    { href: "/contact", label: t("nav.contact"), icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden lg:flex">
            <span className="font-bold whitespace-nowrap text-foreground tracking-tight">
              {language === "ar" ? "جامعة أنطاكية السورية" : "Antioch Syrian University"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <Link href="/">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.home")}
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.about")}
            </Button>
          </Link>

          {/* Academics Mega Menu */}
          <DropdownMenu open={isAcademicsOpen} onOpenChange={setIsAcademicsOpen} dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 px-2 text-[13px] font-medium tracking-tight">
                {t("nav.academics")}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    isAcademicsOpen && "rotate-180"
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={15}
              className="w-[700px] max-w-[calc(100vw-2rem)] p-6"
            >
              <div className="mb-4 border-b pb-3 text-start">
                <h3 className="text-lg font-bold text-foreground">
                  {language === "ar" ? "الكليات السبع" : "Our 7 Faculties"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "استكشف البرامج الأكاديمية المتنوعة التي تقدمها الجامعة"
                    : "Explore the diverse academic programs offered by the university"}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {faculties.map((faculty) => (
                  <Link
                    key={faculty.id}
                    href={`/academics/${faculty.slug}`}
                    onClick={() => setIsAcademicsOpen(false)}
                  >
                    <div className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-primary/20 hover:bg-primary/5 text-start">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                          faculty.color
                        )}
                      >
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground truncate">
                          {language === "ar" ? faculty.nameAr : faculty.nameEn}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {faculty.programs.length}{" "}
                          {language === "ar" ? "برامج أكاديمية" : "academic programs"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="mt-4 border-t pt-4 text-center">
              <Link
                href="/academics/programs"
                onClick={() => setIsAcademicsOpen(false)}
                className="w-full"
              >
                <Button variant="outline" className="w-full bg-transparent font-bold">
                  {language === "ar" ? "مستكشف التخصصات (بحث متقدم)" : "Program Finder (Advanced Search)"}
                </Button>
              </Link>
            </div>
          </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/admissions">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.admissions")}
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {language === "ar" ? "المكتبة" : "Library"}
            </Button>
          </Link>
          <Link href="/campus-life">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.campusLife")}
            </Button>
          </Link>
          <Link href="/research">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.research")}
            </Button>
          </Link>
          <Link href="/news">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.news")}
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm" className="px-2 text-[13px] font-medium tracking-tight">
              {t("nav.contact")}
            </Button>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Global Search */}
          <CommandMenu compact />

          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="h-9 w-9"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Portals Dropdown */}
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="hidden sm:flex gap-1 font-bold">
                {t("nav.portals")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10}>
              <DropdownMenuItem asChild className="text-start font-medium">
                <Link href="/login">{language === "ar" ? "تسجيل الدخول" : "Login"}</Link>
              </DropdownMenuItem>
              <div className="my-1 border-t" />
              <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                <Link href="/portal/student">{t("nav.studentPortal")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                <Link href="/portal/faculty">{t("nav.facultyPortal")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                <Link href="/portal/alumni">{t("nav.alumniPortal")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} dir={dir}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-80">
              <SheetHeader className="text-start border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold">
                    {language === "ar" ? "جامعة أنطاكية السورية" : "Antioch Syrian University"}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 px-2">
                <CommandMenu />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 font-medium"
                    >
                      <link.icon className="h-5 w-5 text-primary" />
                      {link.label}
                    </Button>
                  </Link>
                ))}

                {/* Mobile Academics Collapsible */}
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between gap-3 font-medium"
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        {t("nav.academics")}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ps-10 space-y-1 py-1">
                    {faculties.map((faculty) => (
                      <Link
                        key={faculty.id}
                        href={`/academics/${faculty.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-muted-foreground font-normal"
                        >
                          {language === "ar" ? faculty.nameAr : faculty.nameEn}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {navLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 font-medium"
                    >
                      <link.icon className="h-5 w-5 text-primary" />
                      {link.label}
                    </Button>
                  </Link>
                ))}

                <div className="my-4 border-t" />

                {/* Mobile Portals */}
                <p className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-start">
                  {t("nav.portals")}
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start font-bold text-primary">
                      {language === "ar" ? "تسجيل الدخول" : "Login"}
                    </Button>
                  </Link>
                  <Link
                    href="/portal/student"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                      {t("nav.studentPortal")}
                    </Button>
                  </Link>
                  <Link
                    href="/portal/faculty"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                      {t("nav.facultyPortal")}
                    </Button>
                  </Link>
                  <Link
                    href="/portal/alumni"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                      {t("nav.alumniPortal")}
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}