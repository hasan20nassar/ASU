"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export function BlueprintTour() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  const landmarks = [
    { id: 1, x: "45%", y: "40%", title: language === "ar" ? "المبنى الرئيسي" : "Main Building", delay: 0.5 },
    { id: 2, x: "65%", y: "55%", title: language === "ar" ? "المكتبة" : "Library Wing", delay: 1.2 },
    { id: 3, x: "30%", y: "65%", title: language === "ar" ? "القاعات الدراسية" : "Lecture Halls", delay: 1.9 },
    { id: 4, x: "50%", y: "25%", title: language === "ar" ? "عمادة الكليات" : "Deanship", delay: 2.5 },
  ];

  return (
    <div className="relative flex h-[450px] sm:h-[600px] w-full items-center justify-center overflow-hidden bg-slate-900 border border-primary/20 shadow-inner group">
      
      {/* Background Image Loading Placeholder */}
      <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary"
        />
      </div>

      {/* The 3D Rendered Isometric Blueprint */}
      <div className="absolute inset-0 z-10 w-full h-full mix-blend-screen opacity-90 transition-transform duration-[10s] ease-linear group-hover:scale-105">
        <Image
          src="/images/pages/blueprint-building.png"
          alt="ASU 3D Virtual Tour"
          fill
          className={`object-cover object-center transition-all duration-1000 ${isLoaded ? 'opacity-100 filter grayscale contrast-125 sepia-[0.3] hue-rotate-[-30deg]' : 'opacity-0 scale-95'}`}
          onLoad={() => setIsLoaded(true)}
          priority
        />
      </div>

      {/* Overlay Blueprint Grid */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Scanner Animation Effect */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-[150px] w-full bg-gradient-to-b from-transparent via-primary/10 to-transparent border-b border-primary/40 shadow-[0_4px_15px_rgba(128,0,0,0.3)]" />
      </motion.div>

      {/* Dynamic 3D Floating Landmarks */}
      {isLoaded && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {landmarks.map((mark) => (
            <motion.div
              key={mark.id}
              className="absolute flex flex-col items-center"
              style={{ left: mark.x, top: mark.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: mark.delay, duration: 0.5, type: "spring" }}
            >
              {/* Pulsing Point */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-8 w-8 rounded-full bg-primary/30"
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_#800000] z-10" />
              </div>
              
              {/* Label */}
              <motion.div
                className="mt-3 bg-black/60 backdrop-blur-md border border-primary/50 text-white text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: mark.delay + 0.3, duration: 0.5 }}
              >
                {mark.title}
              </motion.div>
              
              {/* Connecting Line */}
              <motion.div
                className="w-px h-6 bg-gradient-to-t from-transparent to-primary/80 absolute -top-6"
                initial={{ height: 0 }}
                animate={{ height: 24 }}
                transition={{ delay: mark.delay + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Data Overlay Frame */}
      <div className="absolute inset-0 z-50 pointer-events-none border-[8px] border-slate-950/20 rounded-xl">
        <div className="absolute top-4 left-4 flex gap-2">
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-2 w-2 rounded-full bg-red-500 mt-1" />
          <span className="text-[10px] sm:text-xs font-mono text-white/80 font-bold bg-black/40 px-2 py-0.5 rounded">
            REC // 3D RENDER ENGINE
          </span>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border text-end border-white/10">
          <p className="text-[10px] sm:text-xs font-mono text-primary font-bold">ASU VR-SYS v2.4</p>
          <p className="text-[8px] sm:text-[10px] font-mono text-white/60">SCANNING...</p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end border-t border-white/10 pt-2 backdrop-blur-[2px]">
          <div className="flex gap-4 sm:gap-8">
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[10px] text-white/50 font-mono">COORDINATES</span>
              <span className="text-[10px] sm:text-xs text-white/90 font-mono">LAT: 33.682°N</span>
              <span className="text-[10px] sm:text-xs text-white/90 font-mono">LON: 36.331°E</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[8px] sm:text-[10px] text-white/50 font-mono">MODEL</span>
              <span className="text-[10px] sm:text-xs text-white/90 font-mono">ASU_CAMPUS_PHASE_1</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[8px] sm:text-[10px] text-white/50 font-mono">STATUS</span>
            <span className="text-[10px] sm:text-xs text-primary font-mono font-bold animate-pulse">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
