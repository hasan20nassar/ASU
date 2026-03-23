"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getDepartmentHead, getDepartmentStaff } from "@/data/faculty";
import type { FacultyMember } from "@/data/faculty";
import { Mail, Clock, Crown, GraduationCap } from "lucide-react";

interface DepartmentStaffProps {
  facultySlug: string;
}

function HeadCard({ head }: { head: FacultyMember }) {
  const { language } = useLanguage();

  return (
    <div className="department-head-card">
      <div className="department-head-inner">
        {/* Image Side */}
        <div className="department-head-image-wrapper">
          <div className="department-head-image-container">
            <Image
              src={head.image}
              alt={language === "ar" ? head.nameAr : head.nameEn}
              fill
              className="department-head-image"
              sizes="(max-width: 768px) 200px, 280px"
            />
          </div>
          <div className="department-head-badge">
            <Crown className="h-4 w-4" />
            <span>{language === "ar" ? "رئيس القسم" : "Department Head"}</span>
          </div>
        </div>

        {/* Info Side */}
        <div className="department-head-info">
          <h3 className="department-head-name">
            {language === "ar" ? head.nameAr : head.nameEn}
          </h3>
          <p className="department-head-title">
            {language === "ar" ? head.titleAr : head.titleEn}
          </p>
          <p className="department-head-dept">
            {language === "ar" ? head.departmentAr : head.departmentEn}
          </p>
          <p className="department-head-desc">
            {language === "ar" ? head.descriptionAr : head.descriptionEn}
          </p>

          <div className="department-head-meta">
            <div className="department-head-meta-item">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{head.email}</span>
            </div>
            <div className="department-head-meta-item">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{head.officeHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffCard({ member }: { member: FacultyMember }) {
  const { language } = useLanguage();

  return (
    <div className="staff-card">
      <div className="staff-card-image-wrapper">
        <Image
          src={member.image}
          alt={language === "ar" ? member.nameAr : member.nameEn}
          fill
          className="staff-card-image"
          sizes="220px"
        />
        <div className="staff-card-overlay">
          <div className="staff-card-overlay-content">
            <div className="staff-card-overlay-item">
              <Mail className="h-3.5 w-3.5" />
              <span>{member.email}</span>
            </div>
            <div className="staff-card-overlay-item">
              <Clock className="h-3.5 w-3.5" />
              <span>{member.officeHours}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="staff-card-content">
        <h4 className="staff-card-name">
          {language === "ar" ? member.nameAr : member.nameEn}
        </h4>
        <p className="staff-card-title">
          {language === "ar" ? member.titleAr : member.titleEn}
        </p>
        <p className="staff-card-dept">
          {language === "ar" ? member.departmentAr : member.departmentEn}
        </p>
        <p className="staff-card-desc">
          {language === "ar" ? member.descriptionAr : member.descriptionEn}
        </p>
      </div>
    </div>
  );
}

export function DepartmentStaff({ facultySlug }: DepartmentStaffProps) {
  const { language } = useLanguage();
  const head = getDepartmentHead(facultySlug);
  const staff = getDepartmentStaff(facultySlug);

  if (!head && staff.length === 0) return null;

  // Duplicate staff for infinite scroll effect
  const duplicatedStaff = [...staff, ...staff];

  return (
    <section className="department-staff-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="department-staff-header">
          <div className="department-staff-header-icon">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="department-staff-title">
            {language === "ar"
              ? "الهيئة التدريسية"
              : "Academic Staff"}
          </h2>
          <p className="department-staff-subtitle">
            {language === "ar"
              ? "تعرّف على أعضاء هيئة التدريس المتميزين في كليتنا"
              : "Meet our distinguished faculty members"}
          </p>
        </div>

        {/* Head of Department */}
        {head && <HeadCard head={head} />}

        {/* Staff Marquee */}
        {staff.length > 0 && (
          <div className="staff-marquee-wrapper">
            <h3 className="staff-marquee-title">
              {language === "ar"
                ? "أعضاء الهيئة التدريسية"
                : "Faculty Members"}
            </h3>
            <div className="staff-marquee-container">
              <div className="staff-marquee-fade-left" />
              <div className="staff-marquee-fade-right" />
              <div className="staff-marquee-track">
                {duplicatedStaff.map((member, index) => (
                  <StaffCard key={`${member.id}-${index}`} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
