"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

interface ASULogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function ASULogo({ className, imageClassName, priority = false }: ASULogoProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  const src = `/logo/logo-${language}-${theme}.png`;
  const alt = language === "ar" ? "جامعة أنطاكية السورية" : "Antioch Syrian University";

  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src={src}
        alt={alt}
        width={180}
        height={50}
        className={cn("object-contain h-auto w-auto max-h-12", imageClassName)}
        priority={priority}
      />
    </div>
  );
}
