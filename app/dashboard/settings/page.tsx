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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SiteSettings() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إعدادات الموقع" : "Site Settings"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "التحكم في المعلومات الأساسية والروابط العامة للمشروع." 
              : "Control basic information and public links for the project."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <Save className="h-4 w-4" />
          {language === "ar" ? "حفظ التغييرات" : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">

          {/* Contact Info */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-3 w-3" /> {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <Input defaultValue="info@asu.edu.sy" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-3 w-3" /> {language === "ar" ? "الهاتف" : "Phone"}
                  </Label>
                  <Input defaultValue="(+963) 11 5954910" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> {language === "ar" ? "العنوان" : "Address"}
                </Label>
                <Input defaultValue="معرة صيدنايا، ريف دمشق، سوريا" />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                {language === "ar" ? "روابط التواصل الاجتماعي" : "Social Media Links"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Facebook className="h-5 w-5 text-blue-600" />
                <Input defaultValue="https://facebook.com/asu.syria" />
              </div>
              <div className="flex items-center gap-4">
                <Linkedin className="h-5 w-5 text-blue-800" />
                <Input defaultValue="https://linkedin.com/school/asu-syria" />
              </div>
              <div className="flex items-center gap-4">
                <Youtube className="h-5 w-5 text-red-600" />
                <Input defaultValue="https://youtube.com/@asu-syria" />
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="h-5 w-5 text-pink-600" />
                <Input defaultValue="https://instagram.com/asu-syria" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings / Toggles */}
        <div className="space-y-8">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{language === "ar" ? "تفضيلات النظام" : "System Preferences"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "ar" ? "فتح باب التسجيل" : "Open Registration"}</Label>
                  <p className="text-xs text-muted-foreground">{language === "ar" ? "تفعيل رابط المفاضلة والتسجيل" : "Enable admission links"}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "ar" ? "وضع الصيانة" : "Maintenance Mode"}</Label>
                  <p className="text-xs text-muted-foreground">{language === "ar" ? "إغلاق الموقع للصيانة" : "Close site for maintenance"}</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "ar" ? "إظهار النتائج" : "Show Results"}</Label>
                  <p className="text-xs text-muted-foreground">{language === "ar" ? "عرض نتائج الامتحانات في البوابة" : "Display exam results in portal"}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{language === "ar" ? "إعدادات الأمان" : "Security Settings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {language === "ar" 
                  ? "تأكد من تحديث كلمات المرور بشكل دوري ومراجعة سجلات دخول المشرفين." 
                  : "Make sure to update passwords periodically and review admin login logs."}
              </p>
              <Button variant="outline" className="w-full font-bold border-primary/20 text-primary hover:bg-primary/10">
                {language === "ar" ? "تغيير كلمة مرور المشرف" : "Change Admin Password"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
