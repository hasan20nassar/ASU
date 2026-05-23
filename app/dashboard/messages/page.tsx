"use client";

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Reply, 
  Mail, 
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mockMessages = [
  {
    id: 1,
    name: "خالد العبد الله",
    email: "khaled@example.com",
    subject: "استفسار عن القبول المباشر",
    message: "مرحبا، هل لا يزال القبول المباشر في كلية الصيدلة متاحاً؟ وما هي الأوراق المطلوبة؟",
    date: "2024-03-31",
    time: "10:30 ص",
    isRead: false,
  },
  {
    id: 2,
    name: "سارة حسن",
    email: "sara.h@gmail.com",
    subject: "طلب توظيف",
    message: "أنا خريجة ماجستير في اللغة الإنكليزية وأرغب في التقدم لطلب توظيف كمعيدة في كليتكم الموقرة.",
    date: "2024-03-30",
    time: "02:15 م",
    isRead: true,
  },
  {
    id: 3,
    name: "م. محمد علي",
    email: "m.ali.eng@live.com",
    subject: "مشكلة في تسجيل المواد",
    message: "يواجه أحد الطلاب مشكلة في بوابة الطالب، حيث لا تظهر مادة الرسم الهندسي في قائمة المواد المتاحة للتسجيل.",
    date: "2024-03-29",
    time: "09:00 ص",
    isRead: true,
  },
];

export default function MessagesManagement() {
  const { language } = useLanguage();
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);

  return (
    <div className="h-[calc(100vh-10rem)] animate-in fade-in duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "ar" ? "صندوق الرسائل" : "Incoming Messages"}
        </h1>
        <p className="text-muted-foreground">
          {language === "ar" 
            ? "استعراض والرد على رسائل تواصل الزوار والطلاب." 
            : "Review and respond to visitor and student messages."}
        </p>
      </div>

      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Messages List */}
        <Card className="flex flex-col border-none shadow-md overflow-hidden lg:col-span-1">
          <CardHeader className="bg-muted/30 border-b p-4">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={language === "ar" ? "بحث في البريد..." : "Search mail..."}
                className="ps-10 bg-background"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col">
                {mockMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={cn(
                      "flex flex-col items-start gap-2 border-b p-4 text-start transition-colors hover:bg-muted/50",
                      selectedMessage.id === msg.id && "bg-muted",
                      !msg.isRead && "border-s-4 border-s-primary"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className={cn("text-sm font-bold", !msg.isRead && "text-primary")}>
                        {msg.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {msg.date}
                      </span>
                    </div>
                    <span className="text-xs font-medium line-clamp-1">{msg.subject}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {msg.message}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="flex flex-col border-none shadow-md overflow-hidden lg:col-span-2">
          {selectedMessage ? (
            <>
              <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between p-4 space-y-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {selectedMessage.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-base">{selectedMessage.name}</CardTitle>
                    <CardDescription>{selectedMessage.email}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {selectedMessage.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {selectedMessage.time}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                  <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="mt-auto border-t pt-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Reply className="h-4 w-4 text-primary" />
                      {language === "ar" ? "الرد السريع" : "Quick Reply"}
                    </h3>
                    <textarea 
                      className="w-full min-h-[150px] p-4 text-sm rounded-xl border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={language === "ar" ? "اكتب ردك هنا..." : "Type your reply here..."}
                    ></textarea>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" className="font-bold">
                        {language === "ar" ? "حفظ كمسودة" : "Save as Draft"}
                      </Button>
                      <Button className="font-bold flex gap-2">
                        <Mail className="h-4 w-4" />
                        {language === "ar" ? "إرسال الرد" : "Send Reply"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center gap-4 text-muted-foreground">
              <MessageSquare className="h-12 w-12 opacity-20" />
              <p>{language === "ar" ? "اختر رسالة لعرض محتواها" : "Select a message to view content"}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
