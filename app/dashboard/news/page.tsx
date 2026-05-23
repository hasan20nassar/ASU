"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { newsArticles, events } from "@/data/news";
import {
  Card,
  CardContent,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContentManagement() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeTab, setActiveTab] = useState("news");

  // State lists
  const [articles, setArticles] = useState(newsArticles);
  const [eventsList, setEventsList] = useState(events);

  // Search states
  const [newsSearchQuery, setNewsSearchQuery] = useState("");
  const [eventsSearchQuery, setEventsSearchQuery] = useState("");

  // News Modal states
  const [isOpenNewsModal, setIsOpenNewsModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<typeof newsArticles[0] | null>(null);
  const [newsTitleAr, setNewsTitleAr] = useState("");
  const [newsTitleEn, setNewsTitleEn] = useState("");
  const [newsExcerptAr, setNewsExcerptAr] = useState("");
  const [newsExcerptEn, setNewsExcerptEn] = useState("");
  const [newsCategory, setNewsCategory] = useState<"announcement" | "event" | "achievement" | "research">("announcement");
  const [newsDate, setNewsDate] = useState("");
  const [newsFeatured, setNewsFeatured] = useState(false);

  // Event Modal states
  const [isOpenEventModal, setIsOpenEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<typeof events[0] | null>(null);
  const [eventTitleAr, setEventTitleAr] = useState("");
  const [eventTitleEn, setEventTitleEn] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocationAr, setEventLocationAr] = useState("");
  const [eventLocationEn, setEventLocationEn] = useState("");
  const [eventType, setEventType] = useState<"academic" | "cultural" | "sports" | "career">("academic");

  // News CRUD Actions
  const handleOpenAddNews = () => {
    setEditingArticle(null);
    setNewsTitleAr("");
    setNewsTitleEn("");
    setNewsExcerptAr("");
    setNewsExcerptEn("");
    setNewsCategory("announcement");
    setNewsDate(new Date().toISOString().split("T")[0]);
    setNewsFeatured(false);
    setIsOpenNewsModal(true);
  };

  const handleOpenEditNews = (article: typeof newsArticles[0]) => {
    setEditingArticle(article);
    setNewsTitleAr(article.titleAr);
    setNewsTitleEn(article.titleEn);
    setNewsExcerptAr(article.excerptAr);
    setNewsExcerptEn(article.excerptEn);
    setNewsCategory(article.category);
    setNewsDate(article.date);
    setNewsFeatured(article.featured);
    setIsOpenNewsModal(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleAr || !newsTitleEn || !newsExcerptAr || !newsExcerptEn || !newsDate) {
      toast.error(isArabic ? "يرجى ملء الحقول المطلوبة" : "Please fill in required fields");
      return;
    }

    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? {
        ...a,
        titleAr: newsTitleAr,
        titleEn: newsTitleEn,
        excerptAr: newsExcerptAr,
        excerptEn: newsExcerptEn,
        category: newsCategory,
        date: newsDate,
        featured: newsFeatured,
      } : a));
      toast.success(isArabic ? "تم تعديل الخبر بنجاح" : "Article updated successfully");
    } else {
      const newArticle = {
        id: `news-${Date.now()}`,
        slug: `slug-${Date.now()}`,
        titleAr: newsTitleAr,
        titleEn: newsTitleEn,
        excerptAr: newsExcerptAr,
        excerptEn: newsExcerptEn,
        contentAr: newsExcerptAr,
        contentEn: newsExcerptEn,
        image: "/images/news/registration.png",
        category: newsCategory,
        date: newsDate,
        featured: newsFeatured,
      };
      setArticles([newArticle, ...articles]);
      toast.success(isArabic ? "تم إضافة الخبر الجديد بنجاح" : "New article added successfully");
    }
    setIsOpenNewsModal(false);
  };

  const handleDeleteNews = (id: string, title: string) => {
    setArticles(articles.filter(a => a.id !== id));
    toast.success(
      isArabic 
        ? `تم حذف الخبر "${title}" بنجاح` 
        : `Article "${title}" deleted successfully`
    );
  };

  // Event CRUD Actions
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventTitleAr("");
    setEventTitleEn("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setEventTime("10:00 AM - 12:00 PM");
    setEventLocationAr("");
    setEventLocationEn("");
    setEventType("academic");
    setIsOpenEventModal(true);
  };

  const handleOpenEditEvent = (event: typeof events[0]) => {
    setEditingEvent(event);
    setEventTitleAr(event.titleAr);
    setEventTitleEn(event.titleEn);
    setEventDate(event.date);
    setEventTime(event.time);
    setEventLocationAr(event.location.ar);
    setEventLocationEn(event.location.en);
    setEventType(event.type);
    setIsOpenEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitleAr || !eventTitleEn || !eventDate || !eventTime || !eventLocationAr || !eventLocationEn) {
      toast.error(isArabic ? "يرجى ملء الحقول المطلوبة" : "Please fill in required fields");
      return;
    }

    if (editingEvent) {
      setEventsList(eventsList.map(ev => ev.id === editingEvent.id ? {
        ...ev,
        titleAr: eventTitleAr,
        titleEn: eventTitleEn,
        date: eventDate,
        time: eventTime,
        location: { ar: eventLocationAr, en: eventLocationEn },
        type: eventType,
      } : ev));
      toast.success(isArabic ? "تم تعديل الفعالية بنجاح" : "Event updated successfully");
    } else {
      const newEvent = {
        id: `event-${Date.now()}`,
        titleAr: eventTitleAr,
        titleEn: eventTitleEn,
        descriptionAr: eventTitleAr,
        descriptionEn: eventTitleEn,
        date: eventDate,
        time: eventTime,
        location: { ar: eventLocationAr, en: eventLocationEn },
        type: eventType,
      };
      setEventsList([newEvent, ...eventsList]);
      toast.success(isArabic ? "تم إضافة الفعالية الجديدة بنجاح" : "New event added successfully");
    }
    setIsOpenEventModal(false);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    setEventsList(eventsList.filter(ev => ev.id !== id));
    toast.success(
      isArabic 
        ? `تم إلغاء الفعالية "${title}" بنجاح` 
        : `Event "${title}" cancelled successfully`
    );
  };

  // Filters
  const filteredArticles = articles.filter(a => 
    a.titleAr.includes(newsSearchQuery) ||
    a.titleEn.toLowerCase().includes(newsSearchQuery.toLowerCase()) ||
    a.excerptAr.includes(newsSearchQuery) ||
    a.excerptEn.toLowerCase().includes(newsSearchQuery.toLowerCase())
  );

  const filteredEvents = eventsList.filter(ev => 
    ev.titleAr.includes(eventsSearchQuery) ||
    ev.titleEn.toLowerCase().includes(eventsSearchQuery.toLowerCase()) ||
    ev.location.ar.includes(eventsSearchQuery) ||
    ev.location.en.toLowerCase().includes(eventsSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-start" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isArabic ? "إدارة المحتوى" : "Content Management"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic 
              ? "إضافة وتعديل أخبار الجامعة والفعاليات القادمة." 
              : "Add and edit university news and upcoming events."}
          </p>
        </div>
        <Button 
          className="font-bold flex gap-2" 
          onClick={activeTab === "news" ? handleOpenAddNews : handleOpenAddEvent}
        >
          <Plus className="h-4 w-4" />
          {activeTab === "news" 
            ? (isArabic ? "خبر جديد" : "New Article") 
            : (isArabic ? "فعالية جديدة" : "New Event")}
        </Button>
      </div>

      <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="news" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Newspaper className="h-4 w-4" />
            {isArabic ? "الأخبار" : "News"}
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Calendar className="h-4 w-4" />
            {isArabic ? "الفعاليات" : "Events"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? "بحث عن خبر..." : "Search news..."}
                    value={newsSearchQuery}
                    onChange={(e) => setNewsSearchQuery(e.target.value)}
                    className="ps-10 bg-background"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20">
                      <TableHead className="text-start font-bold">{isArabic ? "العنوان" : "Title"}</TableHead>
                      <TableHead className="text-start font-bold">{isArabic ? "التصنيف" : "Category"}</TableHead>
                      <TableHead className="text-start font-bold">{isArabic ? "التاريخ" : "Date"}</TableHead>
                      <TableHead className="text-center font-bold">{isArabic ? "مميز" : "Featured"}</TableHead>
                      <TableHead className="text-end font-bold px-6">{isArabic ? "إجراءات" : "Actions"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-bold">
                          {isArabic ? "لا توجد أخبار مطابقة لبحثك" : "No articles match your search"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredArticles.map((article) => (
                        <TableRow key={article.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="max-w-md">
                            <div className="flex flex-col">
                              <span className="font-bold text-sm truncate">{isArabic ? article.titleAr : article.titleEn}</span>
                              <span className="text-xs text-muted-foreground truncate mt-0.5">{isArabic ? article.excerptAr : article.excerptEn}</span>
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
                                <DropdownMenuItem className="gap-2" onClick={() => handleOpenEditNews(article)}>
                                  <Edit className="h-4 w-4" /> {isArabic ? "تعديل" : "Edit"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" onClick={() => toast.info(isArabic ? `معاينة الخبر: ${article.titleAr}` : `Previewing article: ${article.titleEn}`)}>
                                  <Eye className="h-4 w-4" /> {isArabic ? "معاينة" : "Preview"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-destructive font-bold" onClick={() => handleDeleteNews(article.id, isArabic ? article.titleAr : article.titleEn)}>
                                  <Trash2 className="h-4 w-4" /> {isArabic ? "حذف" : "Delete"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
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
                    placeholder={isArabic ? "بحث عن فعالية..." : "Search events..."}
                    value={eventsSearchQuery}
                    onChange={(e) => setEventsSearchQuery(e.target.value)}
                    className="ps-10 bg-background"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20">
                      <TableHead className="text-start font-bold">{isArabic ? "الفعالية" : "Event"}</TableHead>
                      <TableHead className="text-start font-bold">{isArabic ? "التاريخ والوقت" : "Date & Time"}</TableHead>
                      <TableHead className="text-start font-bold">{isArabic ? "الموقع" : "Location"}</TableHead>
                      <TableHead className="text-start font-bold">{isArabic ? "النوع" : "Type"}</TableHead>
                      <TableHead className="text-end font-bold px-6">{isArabic ? "إجراءات" : "Actions"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-bold">
                          {isArabic ? "لا توجد فعاليات مطابقة لبحثك" : "No events match your search"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-bold text-sm">
                            {isArabic ? event.titleAr : event.titleEn}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col text-xs text-muted-foreground tabular-nums">
                              <span>{event.date}</span>
                              <span>{event.time}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">
                            {isArabic ? event.location.ar : event.location.en}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs capitalize">
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
                                <DropdownMenuItem className="gap-2" onClick={() => handleOpenEditEvent(event)}>
                                  <Edit className="h-4 w-4" /> {isArabic ? "تعديل" : "Edit"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-destructive font-bold" onClick={() => handleDeleteEvent(event.id, isArabic ? event.titleAr : event.titleEn)}>
                                  <Trash2 className="h-4 w-4" /> {isArabic ? "إلغاء الفعالية" : "Cancel"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add / Edit News Dialog */}
      <Dialog open={isOpenNewsModal} onOpenChange={setIsOpenNewsModal}>
        <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="text-start">
              {editingArticle 
                ? (isArabic ? "تعديل الخبر" : "Edit Article") 
                : (isArabic ? "إضافة خبر جديد" : "Add New Article")}
            </DialogTitle>
            <DialogDescription className="text-start">
              {isArabic 
                ? "أدخل تفاصيل الخبر باللغتين العربية والإنجليزية وحدد تصنيفه وتاريخ النشر."
                : "Enter news article details in both Arabic and English, choose a category, and date of publication."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNews} className="space-y-4 pt-4 text-start">
            <div className="space-y-2">
              <Label htmlFor="newsTitleAr">{isArabic ? "عنوان الخبر (بالعربية)" : "Article Title (Arabic)"}</Label>
              <Input
                id="newsTitleAr"
                required
                value={newsTitleAr}
                onChange={(e) => setNewsTitleAr(e.target.value)}
                placeholder="جامعة أنطاكية السورية تعلن..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsTitleEn">{isArabic ? "عنوان الخبر (بالإنجليزية)" : "Article Title (English)"}</Label>
              <Input
                id="newsTitleEn"
                required
                value={newsTitleEn}
                onChange={(e) => setNewsTitleEn(e.target.value)}
                placeholder="Antioch Syrian University announces..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsExcerptAr">{isArabic ? "موجز الخبر (بالعربية)" : "Excerpt (Arabic)"}</Label>
              <Input
                id="newsExcerptAr"
                required
                value={newsExcerptAr}
                onChange={(e) => setNewsExcerptAr(e.target.value)}
                placeholder="تفاصيل موجزة عن الإعلان..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsExcerptEn">{isArabic ? "موجز الخبر (بالإنجليزية)" : "Excerpt (English)"}</Label>
              <Input
                id="newsExcerptEn"
                required
                value={newsExcerptEn}
                onChange={(e) => setNewsExcerptEn(e.target.value)}
                placeholder="Brief summary of the announcement..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newsCategory">{isArabic ? "التصنيف" : "Category"}</Label>
                <select
                  id="newsCategory"
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as any)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="announcement">{isArabic ? "إعلان" : "Announcement"}</option>
                  <option value="event">{isArabic ? "فعالية" : "Event"}</option>
                  <option value="achievement">{isArabic ? "إنجاز" : "Achievement"}</option>
                  <option value="research">{isArabic ? "بحث علمي" : "Research"}</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsDate">{isArabic ? "التاريخ" : "Date"}</Label>
                <Input
                  id="newsDate"
                  type="date"
                  required
                  value={newsDate}
                  onChange={(e) => setNewsDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                id="newsFeatured"
                type="checkbox"
                checked={newsFeatured}
                onChange={(e) => setNewsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="newsFeatured" className="cursor-pointer font-bold">
                {isArabic ? "تثبيت الخبر في الصفحة الرئيسية (مميز)" : "Pin article to homepage (Featured)"}
              </Label>
            </div>

            <DialogFooter className="pt-4 gap-2 sm:justify-start">
              <Button type="button" variant="outline" onClick={() => setIsOpenNewsModal(false)} className="bg-transparent w-full sm:w-auto">
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit" className="w-full sm:w-auto font-bold">
                {isArabic ? "حفظ الخبر" : "Save Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add / Edit Event Dialog */}
      <Dialog open={isOpenEventModal} onOpenChange={setIsOpenEventModal}>
        <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="text-start">
              {editingEvent 
                ? (isArabic ? "تعديل الفعالية" : "Edit Event") 
                : (isArabic ? "إضافة فعالية جديدة" : "Add New Event")}
            </DialogTitle>
            <DialogDescription className="text-start">
              {isArabic 
                ? "أدخل تفاصيل الفعالية باللغتين العربية والإنجليزية وحدد وقتها وتاريخها وموقعها."
                : "Enter event details in both Arabic and English, then specify time, date, and location."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEvent} className="space-y-4 pt-4 text-start">
            <div className="space-y-2">
              <Label htmlFor="eventTitleAr">{isArabic ? "اسم الفعالية (بالعربية)" : "Event Title (Arabic)"}</Label>
              <Input
                id="eventTitleAr"
                required
                value={eventTitleAr}
                onChange={(e) => setEventTitleAr(e.target.value)}
                placeholder="ندوة البحث العلمي..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventTitleEn">{isArabic ? "اسم الفعالية (بالإنجليزية)" : "Event Title (English)"}</Label>
              <Input
                id="eventTitleEn"
                required
                value={eventTitleEn}
                onChange={(e) => setEventTitleEn(e.target.value)}
                placeholder="Scientific Research Seminar..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">{isArabic ? "التاريخ" : "Date"}</Label>
                <Input
                  id="eventDate"
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTime">{isArabic ? "الوقت" : "Time"}</Label>
                <Input
                  id="eventTime"
                  required
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="10:00 AM - 12:00 PM"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventLocationAr">{isArabic ? "الموقع (بالعربية)" : "Location (Arabic)"}</Label>
                <Input
                  id="eventLocationAr"
                  required
                  value={eventLocationAr}
                  onChange={(e) => setEventLocationAr(e.target.value)}
                  placeholder="المدرج الكبير"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventLocationEn">{isArabic ? "الموقع (بالإنجليزية)" : "Location (English)"}</Label>
                <Input
                  id="eventLocationEn"
                  required
                  value={eventLocationEn}
                  onChange={(e) => setEventLocationEn(e.target.value)}
                  placeholder="Main Auditorium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">{isArabic ? "النوع" : "Type"}</Label>
              <select
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="academic">{isArabic ? "أكاديمي" : "Academic"}</option>
                <option value="cultural">{isArabic ? "ثقافي" : "Cultural"}</option>
                <option value="sports">{isArabic ? "رياضي" : "Sports"}</option>
                <option value="career">{isArabic ? "مهني" : "Career"}</option>
              </select>
            </div>

            <DialogFooter className="pt-4 gap-2 sm:justify-start">
              <Button type="button" variant="outline" onClick={() => setIsOpenEventModal(false)} className="bg-transparent w-full sm:w-auto">
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit" className="w-full sm:w-auto font-bold">
                {isArabic ? "حفظ الفعالية" : "Save Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
