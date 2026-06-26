"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { faculties } from "@/data/programs";
import { cn } from "@/lib/utils";
import { ASULogo } from "@/components/ui/asu-logo";
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
  const [isCampusLifeOpen, setIsCampusLifeOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const academicsOpenTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const academicsCloseTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const campusLifeOpenTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const campusLifeCloseTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const academicsContainerRef = React.useRef<HTMLDivElement>(null);
  const campusLifeContainerRef = React.useRef<HTMLDivElement>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (academicsOpenTimeout.current) clearTimeout(academicsOpenTimeout.current);
      if (academicsCloseTimeout.current) clearTimeout(academicsCloseTimeout.current);
      if (campusLifeOpenTimeout.current) clearTimeout(campusLifeOpenTimeout.current);
      if (campusLifeCloseTimeout.current) clearTimeout(campusLifeCloseTimeout.current);
    };
  }, []);

  const handleAcademicsMouseEnter = () => {
    if (academicsCloseTimeout.current) {
      clearTimeout(academicsCloseTimeout.current);
      academicsCloseTimeout.current = null;
    }
    if (isAcademicsOpen) return;
    if (!academicsOpenTimeout.current) {
      academicsOpenTimeout.current = setTimeout(() => {
        setIsAcademicsOpen(true);
        academicsOpenTimeout.current = null;
      }, 500); // 0.5s hover delay
    }
  };

  const handleAcademicsMouseLeave = () => {
    if (academicsOpenTimeout.current) {
      clearTimeout(academicsOpenTimeout.current);
      academicsOpenTimeout.current = null;
    }
    if (isAcademicsOpen) {
      if (!academicsCloseTimeout.current) {
        academicsCloseTimeout.current = setTimeout(() => {
          setIsAcademicsOpen(false);
          academicsCloseTimeout.current = null;
        }, 200); // 0.2s grace period
      }
    }
  };

  const handleAcademicsContentMouseEnter = () => {
    if (academicsCloseTimeout.current) {
      clearTimeout(academicsCloseTimeout.current);
      academicsCloseTimeout.current = null;
    }
  };

  const handleAcademicsContentMouseLeave = () => {
    if (!academicsCloseTimeout.current) {
      academicsCloseTimeout.current = setTimeout(() => {
        setIsAcademicsOpen(false);
        academicsCloseTimeout.current = null;
      }, 200);
    }
  };

  const handleCampusLifeMouseEnter = () => {
    if (campusLifeCloseTimeout.current) {
      clearTimeout(campusLifeCloseTimeout.current);
      campusLifeCloseTimeout.current = null;
    }
    if (isCampusLifeOpen) return;
    if (!campusLifeOpenTimeout.current) {
      campusLifeOpenTimeout.current = setTimeout(() => {
        setIsCampusLifeOpen(true);
        campusLifeOpenTimeout.current = null;
      }, 500); // 0.5s hover delay
    }
  };

  const handleCampusLifeMouseLeave = () => {
    if (campusLifeOpenTimeout.current) {
      clearTimeout(campusLifeOpenTimeout.current);
      campusLifeOpenTimeout.current = null;
    }
    if (isCampusLifeOpen) {
      if (!campusLifeCloseTimeout.current) {
        campusLifeCloseTimeout.current = setTimeout(() => {
          setIsCampusLifeOpen(false);
          campusLifeCloseTimeout.current = null;
        }, 200); // 0.2s grace period
      }
    }
  };

  const handleCampusLifeContentMouseEnter = () => {
    if (campusLifeCloseTimeout.current) {
      clearTimeout(campusLifeCloseTimeout.current);
      campusLifeCloseTimeout.current = null;
    }
  };

  const handleCampusLifeContentMouseLeave = () => {
    if (!campusLifeCloseTimeout.current) {
      campusLifeCloseTimeout.current = setTimeout(() => {
        setIsCampusLifeOpen(false);
        campusLifeCloseTimeout.current = null;
      }, 200);
    }
  };

  useEffect(() => {
    // Check auth status on mount and when path changes
    const auth = localStorage.getItem("asu_auth");
    const isAuth = auth === "true";
    Promise.resolve().then(() => {
      setIsLoggedIn(isAuth);
      setIsAcademicsOpen(false);
      setIsCampusLifeOpen(false);
    });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("asu_auth");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Building2 },
    { href: "/about", label: t("nav.about"), icon: Users },
    { href: "/about/directory", label: t("nav.directory"), icon: Users },
    { href: "/admissions", label: t("nav.admissions"), icon: GraduationCap },
    { href: "/news", label: t("nav.news"), icon: Newspaper },
    { href: "/contact", label: t("nav.contact"), icon: Phone },
  ];

  const campusLifeLinks = [
    { href: "/campus-life", label: t("nav.campusLife"), icon: TreePine },
    { href: "/library", label: language === "ar" ? "المكتبة" : "Library", icon: BookOpen },
    { href: "/research", label: t("nav.research"), icon: FlaskConical },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <ASULogo priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <Link href="/">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
              {t("nav.home")}
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
              {t("nav.about")}
            </Button>
          </Link>
          <Link href="/about/directory">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
              {t("nav.directory")}
            </Button>
          </Link>

          {/* Academics Dropdown */}
          <div
            ref={academicsContainerRef}
            className="inline-flex h-9 items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            onMouseEnter={handleAcademicsMouseEnter}
            onMouseLeave={handleAcademicsMouseLeave}
          >
            <Link
              href="/academics"
              className="flex h-full items-center ps-3 pe-1 text-sm font-medium tracking-tight focus-visible:outline-none"
            >
              {t("nav.academics")}
            </Link>
            <DropdownMenu open={isAcademicsOpen} onOpenChange={setIsAcademicsOpen} modal={false} dir={dir}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-full items-center pe-3 ps-1 focus-visible:outline-none"
                >
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isAcademicsOpen && "rotate-180"
                    )}
                  />
                  <span className="sr-only">Toggle Academics Submenu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={8}
                className="w-56 p-1"
                onMouseEnter={handleAcademicsContentMouseEnter}
                onMouseLeave={handleAcademicsContentMouseLeave}
                onPointerDownOutside={(event) => {
                  if (academicsContainerRef.current?.contains(event.target as Node)) {
                    event.preventDefault();
                  }
                }}
              >
                {faculties.map((faculty) => (
                  <DropdownMenuItem key={faculty.id} asChild>
                    <Link
                      href={`/academics/${faculty.slug}`}
                      className="w-full text-start cursor-pointer font-medium"
                      onClick={() => setIsAcademicsOpen(false)}
                    >
                      {language === "ar" ? faculty.nameAr : faculty.nameEn}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/admissions">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
              {t("nav.admissions")}
            </Button>
          </Link>

          {/* Campus Life Dropdown */}
          <div
            ref={campusLifeContainerRef}
            className="inline-flex h-9 items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            onMouseEnter={handleCampusLifeMouseEnter}
            onMouseLeave={handleCampusLifeMouseLeave}
          >
            <Link
              href="/campus-life"
              className="flex h-full items-center ps-3 pe-1 text-sm font-medium tracking-tight focus-visible:outline-none"
            >
              {t("nav.campusLife")}
            </Link>
            <DropdownMenu open={isCampusLifeOpen} onOpenChange={setIsCampusLifeOpen} modal={false} dir={dir}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-full items-center pe-3 ps-1 focus-visible:outline-none"
                >
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isCampusLifeOpen && "rotate-180"
                    )}
                  />
                  <span className="sr-only">Toggle Campus Life Submenu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={8}
                className="w-56 p-1"
                onMouseEnter={handleCampusLifeContentMouseEnter}
                onMouseLeave={handleCampusLifeContentMouseLeave}
                onPointerDownOutside={(event) => {
                  if (campusLifeContainerRef.current?.contains(event.target as Node)) {
                    event.preventDefault();
                  }
                }}
              >
                {campusLifeLinks
                  .filter((link) => link.href !== "/campus-life")
                  .map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="w-full text-start cursor-pointer font-medium"
                        onClick={() => setIsCampusLifeOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/news">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
              {t("nav.news")}
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm" className="px-2 text-sm font-medium tracking-tight">
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

          {/* Login/Portals Button */}
          {!isLoggedIn ? (
            <Link href="/login" className="hidden sm:block">
              <Button variant="default" size="sm" className="font-bold">
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
            </Link>
          ) : (
            <DropdownMenu dir={dir}>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="hidden sm:flex gap-1 font-bold">
                  {t("nav.portals")}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent align="end" sideOffset={10}>
                <DropdownMenuItem asChild className="text-start font-bold text-primary">
                  <Link href="/dashboard">{t("nav.dashboard")}</Link>
                </DropdownMenuItem>
                <div className="my-1 border-b" />
                <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                  <Link href="/portal/student">{t("nav.studentPortal")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                  <Link href="/portal/faculty">{t("nav.facultyPortal")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-start font-medium text-muted-foreground">
                  <Link href="/portal/alumni">{t("nav.alumniPortal")}</Link>
                </DropdownMenuItem>
                <div className="my-1 border-t" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-start font-bold text-destructive cursor-pointer"
                >
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-80 p-0 flex flex-col">
              <SheetHeader className="text-start border-b p-6">
                <SheetTitle>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <ASULogo imageClassName="max-h-8" />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-6 pb-8">
                <div className="mt-4">
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

                  {/* Mobile Campus Life Collapsible */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between gap-3 font-medium"
                      >
                        <span className="flex items-center gap-3">
                          <TreePine className="h-5 w-5 text-primary" />
                          {t("nav.campusLife")}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ps-10 space-y-1 py-1">
                      {campusLifeLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-muted-foreground font-normal"
                          >
                            {link.label}
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

                {/* Mobile Portals/Login */}
                <div className="my-4 border-t" />
                {!isLoggedIn ? (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start font-bold text-primary">
                      {language === "ar" ? "تسجيل الدخول" : "Login"}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <p className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-start">
                      {t("nav.portals")}
                    </p>
                    <div className="flex flex-col gap-1">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start font-bold text-primary">
                          {t("nav.dashboard")}
                        </Button>
                      </Link>
                      <div className="my-1 border-t" />
                      <Link href="/portal/student" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                          {t("nav.studentPortal")}
                        </Button>
                      </Link>
                      <Link href="/portal/faculty" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                          {t("nav.facultyPortal")}
                        </Button>
                      </Link>
                      <Link href="/portal/alumni" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                          {t("nav.alumniPortal")}
                        </Button>
                      </Link>
                      <Button 
                        onClick={handleLogout}
                        variant="ghost" 
                        className="w-full justify-start font-bold text-destructive"
                      >
                        {t("nav.logout")}
                      </Button>
                    </div>
                  </>
                )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}