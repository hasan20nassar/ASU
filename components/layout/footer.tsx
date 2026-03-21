"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { contactInfo, universityInfo } from "@/data/contact";
import { faculties } from "@/data/programs";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  const quickLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/academics", label: t("nav.academics") },
    { href: "/admissions", label: t("nav.admissions") },
    { href: "/campus-life", label: t("nav.campusLife") },
    { href: "/research", label: t("nav.research") },
    { href: "/news", label: t("nav.news") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { href: contactInfo.socialMedia.facebook, icon: Facebook, label: "Facebook" },
    { href: contactInfo.socialMedia.twitter, icon: Twitter, label: "Twitter" },
    { href: contactInfo.socialMedia.instagram, icon: Instagram, label: "Instagram" },
    { href: contactInfo.socialMedia.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: contactInfo.socialMedia.youtube, icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="ASU Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-foreground">
                  {language === "ar" ? "جامعة أنطاكية" : "Antioch Syrian"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language === "ar" ? "السورية" : "University"}
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {language === "ar"
                ? universityInfo.affiliation.ar
                : universityInfo.affiliation.en}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === "ar"
                ? `تأسست عام ${universityInfo.established}`
                : `Established ${universityInfo.established}`}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Faculties */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("nav.academics")}
            </h3>
            <ul className="space-y-2">
              {faculties.slice(0, 5).map((faculty) => (
                <li key={faculty.id}>
                  <Link
                    href={`/academics/${faculty.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {language === "ar" ? faculty.nameAr : faculty.nameEn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/academics"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {t("common.viewAll")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground" dir="ltr">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? contactInfo.address.ar
                    : contactInfo.address.en}
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {t("footer.followUs")}
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              {language === "ar"
                ? universityInfo.name.ar
                : universityInfo.name.en}
              . {t("footer.rights")}.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary">
                {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="hover:text-primary">
                {language === "ar" ? "الشروط والأحكام" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
