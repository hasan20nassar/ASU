"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import { 
  dashboardStats, 
  recentActivities, 
  enrollmentData, 
  facultyDistribution 
} from "@/data/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ["#800000", "#c0c0c0", "#1a1a1a", "#4b5563", "#9ca3af", "#d1d5db"];

export default function DashboardOverview() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "ar" ? "نظرة عامة" : "Overview"}
        </h1>
        <p className="text-muted-foreground">
          {language === "ar" 
            ? "مرحباً بك مجدداً، إليك آخر إحصائيات الجامعة اليوم." 
            : "Welcome back, here are today's university statistics."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === "ar" ? stat.title : stat.titleEn}
              </CardTitle>
              <div className={cn("p-2 rounded-xl", stat.bg)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={cn(
                  "font-bold inline-flex items-center gap-0.5",
                  stat.change.startsWith("+") ? "text-emerald-500" : stat.change === "0%" ? "text-muted-foreground" : "text-destructive"
                )}>
                  {stat.change.startsWith("+") ? <ArrowUpRight className="h-3 w-3" /> : stat.change === "0%" ? "" : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
                {" "}
                {language === "ar" ? "منذ الشهر الماضي" : "from last month"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Enrollment Chart */}
        <Card className="col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>{language === "ar" ? "نمو التسجيل" : "Enrollment Growth"}</CardTitle>
            <CardDescription>
              {language === "ar" ? "عدد الطلاب المسجلين خلال السنوات الخمس الأخيرة" : "Number of enrolled students over the last 5 years"}
            </CardDescription>
          </CardHeader>
          <CardContent className="ps-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(128, 0, 0, 0.05)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar
                    dataKey="students"
                    fill="#800000"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Distribution */}
        <Card className="col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>{language === "ar" ? "توزيع الكليات" : "Faculties Distribution"}</CardTitle>
            <CardDescription>
              {language === "ar" ? "نسبة الطلاب لكل كلية" : "Percentage of students per faculty"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={facultyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {facultyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value, name, props) => [`${value}%`, language === "ar" ? props.payload.name : props.payload.nameEn]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {facultyDistribution.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="truncate">{language === "ar" ? f.name : f.nameEn}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{language === "ar" ? "النشاطات الأخيرة" : "Recent Activity"}</CardTitle>
            <CardDescription>
              {language === "ar" ? "آخر الإجراءات المتخذة في النظام من قبل المشرفين" : "Latest actions taken in the system by administrators"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            {language === "ar" ? "عرض جميع السجلات" : "View all logs"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 group">
                <div className={cn(
                  "mt-1 p-2 rounded-xl transition-colors",
                  activity.status === "update" ? "bg-blue-500/10 text-blue-500" : 
                  activity.status === "success" ? "bg-emerald-500/10 text-emerald-500" :
                  activity.status === "warning" ? "bg-amber-500/10 text-amber-500" :
                  "bg-purple-500/10 text-purple-500"
                )}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">
                      {language === "ar" ? activity.user : activity.userEn}
                    </p>
                    <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                      {language === "ar" ? activity.time : activity.timeEn}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {language === "ar" ? activity.action : activity.actionEn}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full mt-6 text-primary sm:hidden">
            {language === "ar" ? "عرض جميع السجلات" : "View all logs"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
