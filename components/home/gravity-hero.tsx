"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Award,
  Atom,
  BookOpen,
  Beaker,
  Globe,
  Lightbulb,
} from "lucide-react";
import { universityInfo } from "@/data/contact";

// Floating element configuration
interface FloatingElement {
  id: number;
  Icon: React.ComponentType<{ className?: string }>;
  initialX: number;
  initialY: number;
  size: number;
  color: string;
}

const floatingElements: FloatingElement[] = [
  { id: 1, Icon: Atom, initialX: 10, initialY: 20, size: 48, color: "text-primary/20" },
  { id: 2, Icon: BookOpen, initialX: 85, initialY: 15, size: 40, color: "text-primary/15" },
  { id: 3, Icon: Beaker, initialX: 75, initialY: 70, size: 36, color: "text-primary/20" },
  { id: 4, Icon: Globe, initialX: 15, initialY: 75, size: 44, color: "text-primary/15" },
  { id: 5, Icon: Lightbulb, initialX: 90, initialY: 45, size: 32, color: "text-primary/20" },
  { id: 6, Icon: GraduationCap, initialX: 5, initialY: 50, size: 40, color: "text-primary/15" },
];

// Individual floating element with repel behavior
function FloatingIcon({
  element,
  mouseX,
  mouseY,
  containerRef,
}: {
  element: FloatingElement;
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  // Floating animation
  useEffect(() => {
    const speed = 0.5 + Math.random() * 0.5;
    const amplitude = 15 + Math.random() * 10;
    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setFloatOffset({
        x: Math.sin(elapsed * speed) * amplitude,
        y: Math.cos(elapsed * speed * 0.8) * amplitude,
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Repel effect from mouse
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const elementX = (element.initialX / 100) * rect.width;
    const elementY = (element.initialY / 100) * rect.height;

    const dx = mouseX - elementX;
    const dy = mouseY - elementY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 150;

    if (distance < repelRadius && distance > 0) {
      const force = (1 - distance / repelRadius) * 60;
      setPosition({
        x: -(dx / distance) * force,
        y: -(dy / distance) * force,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY, element.initialX, element.initialY, containerRef]);

  const Icon = element.Icon;

  return (
    <motion.div
      className={`absolute ${element.color}`}
      style={{
        left: `${element.initialX}%`,
        top: `${element.initialY}%`,
      }}
      animate={{
        x: position.x + floatOffset.x,
        y: position.y + floatOffset.y,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <Icon style={{ width: element.size, height: element.size }} />
    </motion.div>
  );
}

export function GravityHero() {
  const { language, t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const containerRef = useRef<HTMLElement>(null);

  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth parallax
  const springConfig = { stiffness: 50, damping: 30 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  // Parallax transforms for text
  const textX = useTransform(parallaxX, [-0.5, 0.5], [20, -20]);
  const textY = useTransform(parallaxY, [-0.5, 0.5], [15, -15]);

  // Opposite parallax for background shapes
  const bgX = useTransform(parallaxX, [-0.5, 0.5], [-30, 30]);
  const bgY = useTransform(parallaxY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-background"
    >
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80000008_1px,transparent_1px),linear-gradient(to_bottom,#80000008_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{ x: bgX, y: bgY }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Abstract Background Shapes with Parallax */}
      <motion.div
        className="absolute -start-20 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        style={{ x: bgX, y: bgY }}
      />
      <motion.div
        className="absolute -end-20 bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        style={{
          x: useTransform(parallaxX, [-0.5, 0.5], [30, -30]),
          y: useTransform(parallaxY, [-0.5, 0.5], [20, -20]),
        }}
      />

      {/* Floating Elements with Repel Effect */}
      {floatingElements.map((element) => (
        <FloatingIcon
          key={element.id}
          element={element}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          containerRef={containerRef}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content with Parallax */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === "ar" ? "تأسست عام 2017" : "Established 2017"}
              </span>
            </motion.div>

            {/* Title with Mouse Parallax */}
            <motion.h1
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ x: textX, y: textY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {language === "ar" ? (
                <>
                  جامعة{" "}
                  <span className="text-primary">أنطاكية</span> السورية
                </>
              ) : (
                <>
                  <span className="text-primary">Antioch</span> Syrian
                  <br />
                  University
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("hero.description")}
            </motion.p>

            {/* Affiliation */}
            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {language === "ar"
                ? universityInfo.affiliation.ar
                : universityInfo.affiliation.en}
            </motion.p>

            {/* CTAs with Magnetic Effect */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Magnetic strength={0.4} radius={80}>
                <Link href="/admissions">
                  <Button size="lg" className="gap-2">
                    {t("hero.cta.admissions")}
                    <Arrow className="h-4 w-4" />
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic strength={0.4} radius={80}>
                <Link href="/academics">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    {t("hero.cta.explore")}
                  </Button>
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Stats Cards with Stagger Animation */}
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">
                {universityInfo.stats.faculties}
              </div>
              <div className="mt-1 text-muted-foreground">{t("stats.faculties")}</div>
              <div className="absolute -bottom-4 -end-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">
                {universityInfo.stats.programs}+
              </div>
              <div className="mt-1 text-muted-foreground">
                {language === "ar" ? "برنامج أكاديمي" : "Academic Programs"}
              </div>
              <div className="absolute -bottom-4 -end-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg sm:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {t("stats.system")}
                  </div>
                  <div className="mt-1 text-muted-foreground">{t("stats.campus")}</div>
                </div>
                <div className="text-end">
                  <div className="text-3xl font-bold text-primary">
                    {universityInfo.stats.students.toLocaleString()}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("stats.students")}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -end-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
