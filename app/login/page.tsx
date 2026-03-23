"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, Mail, Moon, Sun, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const auth = localStorage.getItem("asu_auth");
    if (auth === "true") {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (email === "admin@admin.com" && password === "admin") {
        localStorage.setItem("asu_auth", "true");
        toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح" : "Logged in successfully");
        router.push("/");
      } else {
        toast.error(
          language === "ar" 
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" 
            : "Invalid email or password"
        );
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12" dir={dir}>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80000008_1px,transparent_1px),linear-gradient(to_bottom,#80000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <Card className="relative z-10 w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {language === "ar" ? "تسجيل الدخول" : "Login"}
          </CardTitle>
          <CardDescription>
            {language === "ar" 
              ? "جامعة أنطاكية السورية - بوابة الوصول" 
              : "Antioch Syrian University - Access Portal"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.form.email")}</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@admin.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </Label>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="admin"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-10"
                />
              </div>
            </div>
            <Button className="w-full font-bold" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                language === "ar" ? "دخول" : "Login"
              )}
            </Button>
            
            <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center text-xs text-muted-foreground">
              {language === "ar" 
                ? "استخدم admin@admin.com وكلمة السر admin للتجربة" 
                : "Use admin@admin.com and password admin to test"}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}