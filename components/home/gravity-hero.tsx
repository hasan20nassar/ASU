"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronsDown } from "lucide-react";

export function GravityHero() {
  const { language, t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const containerRef = useRef<HTMLElement>(null);

  // Subtle Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 40 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const textX = useTransform(parallaxX, [-0.5, 0.5], [15, -15]);
  const textY = useTransform(parallaxY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
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
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/videos/home-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.png"
          className="h-full w-full object-cover opacity-60 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          style={{ x: textX, y: textY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {language === "ar" ? "جامعة أنطاكية السورية" : "Antioch Syrian University"}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-2xl text-pretty text-lg font-medium text-foreground/80 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/admissions">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-3 rounded-full shadow-xl hover:scale-105 transition-transform">
              {t("hero.cta.admissions")}
              <Arrow className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/academics">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-3 rounded-full bg-background/50 backdrop-blur-md hover:scale-105 transition-transform">
              {t("hero.cta.explore")}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronsDown className="h-8 w-8 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
