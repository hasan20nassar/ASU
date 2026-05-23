"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { contactInfo, universityInfo } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const { language, t, dir } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    { href: contactInfo.socialMedia.facebook, icon: Facebook, label: "Facebook" },
    { href: contactInfo.socialMedia.twitter, icon: Twitter, label: "Twitter" },
    { href: contactInfo.socialMedia.instagram, icon: Instagram, label: "Instagram" },
    { href: contactInfo.socialMedia.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: contactInfo.socialMedia.youtube, icon: Youtube, label: "YouTube" },
  ];

  // Map settings
  const mapUrl = `https://maps.google.com/maps?q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                {t("nav.contact")}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {t("contact.title")}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {language === "ar"
                  ? "نحن هنا لمساعدتك. تواصل معنا للاستفسارات والمعلومات"
                  : "We're here to help. Contact us for inquiries and information"}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Cards */}
              <div className="space-y-4 sm:space-y-6">
                <Card>
                  <CardContent className="flex items-start gap-4 p-6 text-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t("contact.phone")}
                      </h3>
                      <p className="mt-1 text-muted-foreground" dir="ltr">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6 text-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t("contact.email")}
                      </h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="mt-1 text-muted-foreground hover:text-primary break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6 text-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t("contact.address")}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {language === "ar"
                          ? contactInfo.address.ar
                          : contactInfo.address.en}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6 text-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === "ar" ? "ساعات العمل" : "Working Hours"}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {language === "ar"
                          ? contactInfo.workingHours.ar
                          : contactInfo.workingHours.en}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardContent className="p-6 text-start">
                    <h3 className="mb-4 font-semibold text-foreground">
                      {t("footer.followUs")}
                    </h3>
                    <div className="flex gap-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="text-start">
                    <CardTitle className="text-xl sm:text-2xl">
                      {language === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                        <h3 className="text-xl font-semibold text-foreground">
                          {language === "ar"
                            ? "تم إرسال رسالتك بنجاح!"
                            : "Message sent successfully!"}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {language === "ar"
                            ? "سنتواصل معك في أقرب وقت ممكن"
                            : "We'll get back to you as soon as possible"}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6 text-start">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t("contact.form.name")}</Label>
                            <Input
                              id="name"
                              required
                              placeholder={
                                language === "ar"
                                  ? "أدخل اسمك الكامل"
                                  : "Enter your full name"
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">{t("contact.form.email")}</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              placeholder={
                                language === "ar"
                                  ? "أدخل بريدك الإلكتروني"
                                  : "Enter your email"
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            {language === "ar" ? "الموضوع" : "Subject"}
                          </Label>
                          <Input
                            id="subject"
                            required
                            placeholder={
                              language === "ar"
                                ? "موضوع الرسالة"
                                : "Message subject"
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">{t("contact.form.message")}</Label>
                          <Textarea
                            id="message"
                            required
                            rows={6}
                            placeholder={
                              language === "ar"
                                ? "اكتب رسالتك هنا..."
                                : "Write your message here..."
                            }
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full gap-2">
                          <Send className="h-4 w-4" />
                          {t("contact.form.submit")}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              {language === "ar" ? "موقعنا" : "Our Location"}
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 w-full bg-muted">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={language === "ar" ? "موقع الجامعة" : "University Location"}
                  />
                </div>
                <div className="border-t p-4 sm:p-6">
                  <div className="flex flex-col gap-4 text-start sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">
                        {language === "ar"
                          ? universityInfo.name.ar
                          : universityInfo.name.en}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                        {language === "ar"
                          ? contactInfo.address.ar
                          : contactInfo.address.en}
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="outline" className="w-full sm:w-auto">
                        {language === "ar" ? "احصل على الاتجاهات" : "Get Directions"}
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}