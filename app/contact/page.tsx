"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { contactInfo, universityInfo } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

function generateRandomText() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";
  let text = "";
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

export default function ContactPage() {
  const { language, t, dir } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaText, setCaptchaText] = useState(() => generateRandomText());
  const [userCaptcha, setUserCaptcha] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCaptcha = useCallback((text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, "#f9fafb");
    gradient.addColorStop(1, "#f3f4f6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.35)`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw noise dots
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.4)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    // Draw characters
    const fonts = [
      "Arial",
      "Georgia",
      "Courier New",
      "Verdana",
      "Times New Roman",
    ];
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const fontSize = Math.floor(Math.random() * 6) + 22; // 22px to 28px
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      ctx.font = `bold ${fontSize}px ${font}`;
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 120)}, ${Math.floor(Math.random() * 120)}, ${Math.floor(Math.random() * 120)})`;

      const x = 12 + i * 22 + Math.random() * 4;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      const angle = ((Math.random() * 30 - 15) * Math.PI) / 180; // -15 to 15 degrees

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }, []);

  const generateCaptcha = useCallback(() => {
    const text = generateRandomText();
    setCaptchaText(text);
    setUserCaptcha("");
  }, []);

  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText, drawCaptcha]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate captcha
    if (userCaptcha.toLowerCase() !== captchaText.toLowerCase()) {
      toast.error(
        language === "ar"
          ? "رمز التحقق (الكابتشا) غير صحيح. يرجى المحاولة مرة أخرى."
          : "Incorrect verification code (captcha). Please try again.",
      );
      generateCaptcha();
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setUserCaptcha("");
      generateCaptcha();
    }, 3000);
  };

  const socialLinks = [
    {
      href: contactInfo.socialMedia.facebook,
      icon: Facebook,
      label: "Facebook",
    },
    { href: contactInfo.socialMedia.twitter, icon: Twitter, label: "Twitter" },
    {
      href: contactInfo.socialMedia.instagram,
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: contactInfo.socialMedia.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: contactInfo.socialMedia.youtube, icon: Youtube, label: "YouTube" },
  ];

  // Map settings
  const mapUrl = `https://maps.google.com/maps?q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-muted/30 py-12 sm:py-16">
          <div className="section-container">
            <div className="text-center">
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
          <div className="section-container">
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
                      {language === "ar"
                        ? "أرسل لنا رسالة"
                        : "Send us a Message"}
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
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-6 text-start"
                      >
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              {t("contact.form.name")}
                            </Label>
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
                            <Label htmlFor="email">
                              {t("contact.form.email")}
                            </Label>
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
                          <Label htmlFor="message">
                            {t("contact.form.message")}
                          </Label>
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

                        <div className="space-y-2">
                          <Label htmlFor="captcha">
                            {language === "ar"
                              ? "رمز التحقق "
                              : "Verification Code"}
                          </Label>
                          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                            <div className="relative overflow-hidden rounded-xl border border-primary/20 shrink-0 select-none bg-muted h-[40px] flex items-center justify-center">
                              <canvas
                                ref={canvasRef}
                                width={150}
                                height={40}
                                className="block"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={generateCaptcha}
                              title={
                                language === "ar"
                                  ? "تحديث رمز التحقق"
                                  : "Refresh captcha"
                              }
                              className="h-10 w-10 shrink-0 rounded-xl"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Input
                              id="captcha"
                              type="text"
                              required
                              value={userCaptcha}
                              onChange={(e) => setUserCaptcha(e.target.value)}
                              placeholder={
                                language === "ar"
                                  ? "أدخل الرمز الموضح في الصورة "
                                  : "Enter the code shown in the image"
                              }
                              className="flex-1 rounded-xl"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full gap-2"
                        >
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
          <div className="section-container">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              {language === "ar" ? "موقعنا" : "Our Location"}
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[400px] sm:h-[550px] md:h-[650px] w-full bg-muted overflow-hidden">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    style={{ border: 0, height: "calc(100% + 12px)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={
                      language === "ar" ? "موقع الجامعة" : "University Location"
                    }
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
                        {language === "ar"
                          ? "احصل على الاتجاهات"
                          : "Get Directions"}
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
