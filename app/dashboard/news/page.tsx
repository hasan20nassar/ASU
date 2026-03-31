"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { newsArticles, events } from "@/data/news";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Newspaper, 
  Calendar, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ContentManagement() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("news");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "ar" ? "إدارة المحتوى" : "Content Management"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "إضافة وتعديل أخبار الجامعة والفعاليات القادمة." 
              : "Add and edit university news and upcoming events."}
          </p>
        </div>
        <Button className="font-bold flex gap-2">
          <Plus className="h-4 w-4" />
          {activeTab === "news" 
            ? (language === "ar" ? "خبر جديد" : "New Article") 
            : (language === "ar" ? "فعالية جديدة" : "New Event")}
        </Button>
      </div>

      <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="news" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Newspaper className="h-4 w-4" />
            {language === "ar" ? "الأخبار" : "News"}
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Calendar className="h-4 w-4" />
            {language === "ar" ? "الفعاليات" : "Events"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={language === "ar" ? "بحث عن خبر..." : "Search news..."}
                    className="ps-10 bg-background"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20">
                    <TableHead className="text-start font-bold">{language === "ar" ? "العنوان" : "Title"}</TableHead>
                    <TableHead className="text-start font-bold">{language === "ar" ? "التصنيف" : "Category"}</TableHead>
                    <TableHead className="text-start font-bold">{language === "ar" ? "التاريخ" : "Date"}</TableHead>
                    <TableHead className="text-center font-bold">{language === "ar" ? "مميز" : "Featured"}</TableHead>
                    <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsArticles.map((article) => (
                    <TableRow key={article.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="max-w-md">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm truncate">{language === "ar" ? article.titleAr : article.titleEn}</span>
                          <span className="text-xs text-muted-foreground truncate">{language === "ar" ? article.excerptAr : article.excerptEn}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize text-xs">
                          {article.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs tabular-nums text-muted-foreground">
                        {article.date}
                      </TableCell>
                      <TableCell className="text-center">
                        {article.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500 mx-auto" />}
                      </TableCell>
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
                              <Eye className="h-4 w-4" /> {language === "ar" ? "معاينة" : "Preview"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> {language === "ar" ? "حذف" : "Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={language === "ar" ? "بحث عن فعالية..." : "Search events..."}
                    className="ps-10 bg-background"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20">
                    <TableHead className="text-start font-bold">{language === "ar" ? "الفعالية" : "Event"}</TableHead>
                    <TableHead className="text-start font-bold">{language === "ar" ? "التاريخ والوقت" : "Date & Time"}</TableHead>
                    <TableHead className="text-start font-bold">{language === "ar" ? "الموقع" : "Location"}</TableHead>
                    <TableHead className="text-start font-bold">{language === "ar" ? "النوع" : "Type"}</TableHead>
                    <TableHead className="text-end font-bold px-6">{language === "ar" ? "إجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-bold text-sm">
                        {language === "ar" ? event.titleAr : event.titleEn}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs text-muted-foreground tabular-nums">
                          <span>{event.date}</span>
                          <span>{event.time}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        {language === "ar" ? event.location.ar : event.location.en}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> {language === "ar" ? "إلغاء الفعالية" : "Cancel"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
