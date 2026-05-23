"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTopStudentsByFaculty } from "@/data/top-students";
import type { TopStudent } from "@/data/top-students";
import { Trophy, Star, Hash, Award } from "lucide-react";

interface TopStudentsProps {
  facultySlug: string;
}

const rankConfig = {
  1: {
    gradient: "top-student-card-gold",
    medalBg: "top-student-medal-gold",
    labelAr: "الأول",
    labelEn: "1st",
    icon: "🥇",
  },
  2: {
    gradient: "top-student-card-silver",
    medalBg: "top-student-medal-silver",
    labelAr: "الثاني",
    labelEn: "2nd",
    icon: "🥈",
  },
  3: {
    gradient: "top-student-card-bronze",
    medalBg: "top-student-medal-bronze",
    labelAr: "الثالث",
    labelEn: "3rd",
    icon: "🥉",
  },
} as const;

function StudentCard({ student }: { student: TopStudent }) {
  const { language } = useLanguage();
  const config = rankConfig[student.rank];

  return (
    <div className={`top-student-card ${config.gradient}`}>
      {/* Rank Badge */}
      <div className={`top-student-medal ${config.medalBg}`}>
        <span className="top-student-medal-icon">{config.icon}</span>
        <span className="top-student-medal-label">
          {language === "ar" ? config.labelAr : config.labelEn}
        </span>
      </div>

      {/* Student Image */}
      <div className="top-student-image-wrapper">
        <div className={`top-student-image-ring ${config.medalBg}-ring`}>
          <div className="top-student-image-container">
            <Image
              src={student.image}
              alt={language === "ar" ? student.nameAr : student.nameEn}
              fill
              className="top-student-image"
              sizes="(max-width: 768px) 120px, 140px"
            />
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="top-student-info">
        <h4 className="top-student-name">
          {language === "ar" ? student.nameAr : student.nameEn}
        </h4>

        <div className="top-student-details">
          <div className="top-student-detail-item">
            <Hash className="h-3.5 w-3.5" />
            <span>{student.studentId}</span>
          </div>
          <div className="top-student-detail-item">
            <Award className="h-3.5 w-3.5" />
            <span>
              {language === "ar" ? "الترتيب:" : "Rank:"}{" "}
              {language === "ar" ? config.labelAr : config.labelEn}
            </span>
          </div>
        </div>

        {/* GPA Display */}
        <div className="top-student-gpa-wrapper">
          <div className="top-student-gpa-label">
            <Star className="h-3.5 w-3.5" />
            <span>GPA</span>
          </div>
          <div className="top-student-gpa-value">
            {student.gpa.toFixed(2)}
            <span className="top-student-gpa-max"> / 4.00</span>
          </div>
          {/* GPA Bar */}
          <div className="top-student-gpa-bar-bg">
            <div
              className={`top-student-gpa-bar ${config.medalBg}-bar`}
              style={{ width: `${(student.gpa / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopStudents({ facultySlug }: TopStudentsProps) {
  const { language } = useLanguage();
  const students = getTopStudentsByFaculty(facultySlug);

  if (students.length === 0) return null;

  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [students[1], students[0], students[2]].filter(Boolean);

  return (
    <section className="top-students-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="top-students-header">
          <div className="top-students-header-icon">
            <Trophy className="h-6 w-6" />
          </div>
          <h2 className="top-students-title">
            {language === "ar"
              ? "الطلاب الأوائل"
              : "Top Students"}
          </h2>
          <p className="top-students-subtitle">
            {language === "ar"
              ? "نفخر بطلابنا المتفوقين الذين حققوا أعلى المعدلات"
              : "We are proud of our outstanding students who achieved the highest GPAs"}
          </p>
        </div>

        {/* Cards - Podium style on desktop, simple list on mobile */}
        <div className="top-students-grid">
          {/* Mobile: show in order 1, 2, 3 */}
          <div className="top-students-list-mobile">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {/* Desktop: podium (2nd, 1st, 3rd) */}
          <div className="top-students-podium-desktop">
            {podiumOrder.map((student, index) => (
              <div
                key={student.id}
                className={`top-students-podium-item ${
                  index === 1 ? "top-students-podium-center" : "top-students-podium-side"
                }`}
              >
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
