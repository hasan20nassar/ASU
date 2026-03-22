"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  GraduationCap,
  Atom,
  BookOpen,
  Beaker,
  Globe,
  Lightbulb,
  Glasses,
  Award,
  School,
  Library,
  Calculator,
  PenTool,
} from "lucide-react";

interface FloatingElement {
  id: number;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  initialX: number;
  initialY: number;
  size: number;
  color: string;
}

const floatingElements: FloatingElement[] = [
  { id: 1, Icon: Atom, initialX: 10, initialY: 5, size: 48, color: "text-primary/10" },
  { id: 2, Icon: BookOpen, initialX: 85, initialY: 10, size: 40, color: "text-primary/10" },
  { id: 3, Icon: Beaker, initialX: 75, initialY: 85, size: 36, color: "text-primary/10" },
  { id: 4, Icon: Globe, initialX: 15, initialY: 90, size: 44, color: "text-primary/10" },
  { id: 5, Icon: Lightbulb, initialX: 90, initialY: 45, size: 32, color: "text-primary/10" },
  { id: 6, Icon: GraduationCap, initialX: 5, initialY: 40, size: 50, color: "text-primary/10" },
  { id: 7, Icon: Glasses, initialX: 25, initialY: 25, size: 38, color: "text-primary/10" },
  { id: 8, Icon: Award, initialX: 70, initialY: 30, size: 42, color: "text-primary/10" },
  { id: 9, Icon: School, initialX: 45, initialY: 15, size: 46, color: "text-primary/10" },
  { id: 10, Icon: Library, initialX: 35, initialY: 75, size: 40, color: "text-primary/10" },
  { id: 11, Icon: Calculator, initialX: 60, initialY: 60, size: 34, color: "text-primary/10" },
  { id: 12, Icon: PenTool, initialX: 20, initialY: 55, size: 32, color: "text-primary/10" },
  { id: 13, Icon: GraduationCap, initialX: 80, initialY: 65, size: 45, color: "text-primary/10" },
  { id: 14, Icon: BookOpen, initialX: 50, initialY: 40, size: 38, color: "text-primary/10" },
  { id: 15, Icon: Glasses, initialX: 10, initialY: 70, size: 36, color: "text-primary/10" },
  { id: 16, Icon: Lightbulb, initialX: 40, initialY: 95, size: 40, color: "text-primary/10" },
  { id: 17, Icon: Award, initialX: 95, initialY: 20, size: 34, color: "text-primary/10" },
  { id: 18, Icon: School, initialX: 5, initialY: 15, size: 32, color: "text-primary/10" },
];

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

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const elementX = (element.initialX / 100) * rect.width;
    const elementY = (element.initialY / 100) * rect.height;

    const dx = mouseX - elementX;
    const dy = mouseY - elementY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 250;

    if (distance < repelRadius && distance > 0) {
      const force = (1 - distance / repelRadius) * 80;
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
        pointerEvents: "none",
        zIndex: 0,
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
      <Icon size={element.size} />
    </motion.div>
  );
}

export function MouseGravityIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
    >
      {floatingElements.map((element) => (
        <FloatingIcon
          key={element.id}
          element={element}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
