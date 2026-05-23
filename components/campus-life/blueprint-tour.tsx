"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import {
  Layers,
  Maximize2,
  Minimize2,
  MapPin,
  RotateCw,
  Eye,
  Building2,
  Search,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Compass,
  Check,
  HelpCircle,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RoomInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  area: string;
  x: string; // percentage left on the blueprint
  y: string; // percentage top on the blueprint
  type: "lab" | "admin" | "class" | "service" | "library";
}

interface FloorInfo {
  id: string;
  level: number;
  nameAr: string;
  nameEn: string;
  image: string;
  area: string;
  descriptionAr: string;
  descriptionEn: string;
  rooms: RoomInfo[];
}

export function BlueprintTour() {
  const { language, dir } = useLanguage();
  const isArabic = language === "ar";

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    const element = mainWrapperRef.current;
    if (!element) return;

    try {
      const doc = document as any;
      const isCurrentlyFS = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isCurrentlyFS) {
        const requestFS = element.requestFullscreen ||
                          (element as any).webkitRequestFullscreen ||
                          (element as any).mozRequestFullScreen ||
                          (element as any).msRequestFullscreen;

        if (requestFS) {
          await requestFS.call(element);
          setIsFullscreen(true);
        } else {
          // Simulated fullscreen fallback
          setIsFullscreen(true);
        }
      } else {
        const exitFS = doc.exitFullscreen ||
                       doc.webkitExitFullscreen ||
                       doc.mozCancelFullScreen ||
                       doc.msExitFullscreen;

        if (exitFS) {
          await exitFS.call(doc);
          setIsFullscreen(false);
        } else {
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
      // Fallback
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const isCurrentlyFS = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      if (isCurrentlyFS) {
        const fsElement = doc.fullscreenElement ||
                          doc.webkitFullscreenElement ||
                          doc.mozFullScreenElement ||
                          doc.msFullscreenElement;
        setIsFullscreen(fsElement === mainWrapperRef.current);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Prevent background page scrolling when in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Loaded images state
  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Search and Focus States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RoomInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 3D Engine Camera Variables (using refs to avoid infinite rendering loops and flickering)
  const cameraRef = useRef({
    pitch: 0.85,
    yaw: -0.65,
    zoom: 0.9
  });

  const hoveredRoomRef = useRef<RoomInfo | null>(null);
  const selectedRoomRef = useRef<RoomInfo | null>(null);
  const activeFloorIndexRef = useRef<number>(1);
  const isExpandedRef = useRef<boolean>(true);
  const autoRotateRef = useRef<boolean>(true);

  const [isExpanded, setIsExpanded] = useState(true); // Spacing between floors
  const [autoRotate, setAutoRotate] = useState(true);

  // Interactive Selection States
  const [activeFloorIndex, setActiveFloorIndex] = useState<number>(1); // Ground floor default
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<RoomInfo | null>(null);

  // Keep refs in sync with React states to avoid closures / recreation of the canvas useEffect
  useEffect(() => {
    hoveredRoomRef.current = hoveredRoom;
  }, [hoveredRoom]);

  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

  useEffect(() => {
    activeFloorIndexRef.current = activeFloorIndex;
  }, [activeFloorIndex]);

  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Target camera state for smooth interpolations
  const targetCamRef = useRef<{ pitch: number; yaw: number; zoom: number } | null>(null);

  // Zoom handlers updating the target camera smoothly
  const handleZoomIn = () => {
    if (autoRotate) {
      setAutoRotate(false);
    }
    const currentTarget = targetCamRef.current || cameraRef.current;
    targetCamRef.current = {
      pitch: currentTarget.pitch,
      yaw: currentTarget.yaw,
      zoom: Math.min(2.5, currentTarget.zoom + 0.15)
    };
  };

  const handleZoomOut = () => {
    if (autoRotate) {
      setAutoRotate(false);
    }
    const currentTarget = targetCamRef.current || cameraRef.current;
    targetCamRef.current = {
      pitch: currentTarget.pitch,
      yaw: currentTarget.yaw,
      zoom: Math.max(0.4, currentTarget.zoom - 0.15)
    };
  };

  // Floor Database based on Maarat Seydnaya campus blueprints
  const floors: FloorInfo[] = useMemo(() => [
    {
      id: "basement",
      level: 0,
      nameAr: "الطابق القبو (الصالات المخبرية)",
      nameEn: "Basement Floor (Laboratory Halls)",
      image: "/images/pages/floor-basement.jpg",
      area: "1110 M²",
      descriptionAr: "يحتوي على الورش الهندسية الثقيلة، والمخابر العلمية الأساسية، ومستودعات الأجهزة والمواد.",
      descriptionEn: "Contains heavy engineering workshops, core scientific laboratories, and equipment/material stores.",
      rooms: [
        {
          id: "concrete-lab",
          nameAr: "مخبر البيتون والخرسانة",
          nameEn: "Concrete & Structure Lab",
          descAr: "مخبر مجهز بالكامل لاختبارات جودة الخرسانة والمواد الإنشائية، وقوى الضغط والشد الهيكلي.",
          descEn: "Fully equipped laboratory for testing concrete quality, structural materials, compression and tensile strengths.",
          area: "60 M²",
          x: "72%",
          y: "30%",
          type: "lab"
        },
        {
          id: "chem-lab",
          nameAr: "مخبر الكيمياء العامة",
          nameEn: "Chemistry Lab",
          descAr: "مخبر كيميائي مجهز بأنظمة سحب الغازات وأدوات التحليل الكيميائي والسلامة للطلاب.",
          descEn: "Chemical lab equipped with fume hoods, chemical analysis tools, and student safety stations.",
          area: "80 M²",
          x: "48%",
          y: "28%",
          type: "lab"
        },
        {
          id: "mat-lab",
          nameAr: "مخبر مقاومة المواد",
          nameEn: "Materials Strength Lab",
          descAr: "مخصص لاختبارات الإجهاد والانفعال وتماسك المعادن والبوليمرات الهندسية.",
          descEn: "Dedicated to stress, strain, and durability testing of metallic materials and engineering polymers.",
          area: "35 M²",
          x: "47%",
          y: "35%",
          type: "lab"
        },
        {
          id: "e-lab",
          nameAr: "مخبر الدارات والاتصالات (E-Lab)",
          nameEn: "Electronics & Comm Lab",
          descAr: "مخبر متطور للقياسات الكهربائية وتصميم الدارات الإلكترونية وهندسة الاتصالات.",
          descEn: "Advanced laboratory for electrical measurements, electronic circuit design, and communication engineering.",
          area: "120 M²",
          x: "43%",
          y: "41%",
          type: "lab"
        },
        {
          id: "survey-room",
          nameAr: "غرفة الأجهزة المساحية",
          nameEn: "Surveying Equipment Room",
          descAr: "مستودع وغرفة أجهزة المساحة الطبوغرافية والتسوية ومحطات الرصد المتكاملة.",
          descEn: "Storage and calibration room for topographic surveying, leveling instruments, and total stations.",
          area: "30 M²",
          x: "26%",
          y: "56%",
          type: "admin"
        },
        {
          id: "base-admin",
          nameAr: "المكاتب الإدارية للقبو",
          nameEn: "Basement Admin Offices",
          descAr: "مكاتب المشرفين والخدمات الإدارية للطابق السفلي.",
          descEn: "Supervisors' offices and administrative services for the basement floor.",
          area: "60 M²",
          x: "26%",
          y: "65%",
          type: "admin"
        }
      ]
    },
    {
      id: "ground",
      level: 1,
      nameAr: "الطابق الأرضي (العمادة والقاعات الدراسية)",
      nameEn: "Ground Floor (Administration & Lecture Halls)",
      image: "/images/pages/floor-ground.jpg",
      area: "1110 M²",
      descriptionAr: "المدخل الرئيسي للجامعة، ويحتوي على عمادة الكليات وشؤون الطلاب والقبول والتسجيل مع عدة قاعات دراسية.",
      descriptionEn: "Main university entrance, containing faculty deanships, student affairs, admissions, and several lecture halls.",
      rooms: [
        {
          id: "class-g05",
          nameAr: "القاعة الكبرى (G05)",
          nameEn: "Lecture Hall G05",
          descAr: "قاعة تدريسية كبرى تتسع لـ 120 طالباً، مجهزة بنظام صوتي متطور وشاشة عرض تفاعلية.",
          descEn: "Large lecture hall accommodating 120 students, equipped with advanced audio and interactive display.",
          area: "95 M²",
          x: "21%",
          y: "20%",
          type: "class"
        },
        {
          id: "class-g01-g03",
          nameAr: "القاعات الدراسية (G01–G03)",
          nameEn: "Classrooms G01-G03",
          descAr: "قاعات تدريسية تفاعلية مخصصة للمحاضرات التفاعلية وحلقات البحث.",
          descEn: "Interactive classrooms dedicated for lectures and research seminars.",
          area: "135 M²",
          x: "20%",
          y: "62%",
          type: "class"
        },
        {
          id: "deanship-offices",
          nameAr: "مكاتب عمادات الكليات (Admin 4-10)",
          nameEn: "Deanships & Admins 4-10",
          descAr: "مكتب عميد الكلية والمكاتب الإدارية المساندة لمتابعة سير العملية التدريسية.",
          descEn: "Dean's offices and supporting administrative rooms managing the academic process.",
          area: "210 M²",
          x: "53%",
          y: "20%",
          type: "admin"
        },
        {
          id: "student-affairs",
          nameAr: "القبول والتسجيل وشؤون الطلاب",
          nameEn: "Admissions & Student Affairs",
          descAr: "نافذة الطالب لإجراء المعاملات الإدارية، والتسجيل، واستلام الأوراق الجامعية.",
          descEn: "Student window for administrative transactions, registration, and receiving academic documents.",
          area: "120 M²",
          x: "68%",
          y: "20%",
          type: "admin"
        }
      ]
    },
    {
      id: "first",
      level: 2,
      nameAr: "الطابق الأول (المكتبة والخدمات الطلابية)",
      nameEn: "First Floor (Library & Student Hub)",
      image: "/images/pages/floor-first.jpg",
      area: "1250 M²",
      descriptionAr: "مركز الحياة الاجتماعية والثقافية للجامعة، حيث توجد الكافتيريا المركزية، والمكتبة الإدارية والمدرجات.",
      descriptionEn: "Center of social and cultural life of the university, featuring the central cafeteria, library administration, and auditoriums.",
      rooms: [
        {
          id: "lib-admin",
          nameAr: "إدارة المكتبة والبحث العلمي",
          nameEn: "Library Administration",
          descAr: "إدارة مصادر البحث العلمي، الفهرسة الإلكترونية، وغرف المطالعة الفردية.",
          descEn: "Management of scientific research sources, electronic cataloging, and individual study rooms.",
          area: "95 M²",
          x: "21%",
          y: "23%",
          type: "library"
        },
        {
          id: "cafeteria",
          nameAr: "الكافتيريا المركزية",
          nameEn: "Central Cafeteria",
          descAr: "مساحة استراحة الطلاب والوجبات الغذائية، مع إطلالة واسعة على جبال معرة صيدنايا.",
          descEn: "Student lounge and dining space, offering a panoramic view of Maarat Saidnaya mountains.",
          area: "125 M²",
          x: "38%",
          y: "35%",
          type: "service"
        },
        {
          id: "class-f01-f03",
          nameAr: "قاعات المحاضرات (F01–F03)",
          nameEn: "Lecture Rooms F01-F03",
          descAr: "قاعات محاضرات مجهزة بكراسي مدرجة مريحة لمواد الكليات النظرية.",
          descEn: "Lecture halls equipped with comfortable tiered seating for theoretical faculty courses.",
          area: "135 M²",
          x: "20%",
          y: "62%",
          type: "class"
        },
        {
          id: "academy-rooms",
          nameAr: "القاعات الأكاديمية (1–10)",
          nameEn: "Academic Rooms 1-10",
          descAr: "قاعات دراسية متوسطة الحجم مخصصة لحلقات البحث والمناقشات والعمل الجماعي.",
          descEn: "Medium-sized study rooms allocated for research circles, seminars, and group collaborations.",
          area: "300 M²",
          x: "55%",
          y: "24%",
          type: "class"
        }
      ]
    },
    {
      id: "second",
      level: 3,
      nameAr: "الطابق الثاني (المخابر التخصصية والمدرجات)",
      nameEn: "Second Floor (Specialized Labs & Auditoriums)",
      image: "/images/pages/floor-second.jpg",
      area: "1250 M²",
      descriptionAr: "طابق المخابر الطبية والتكنولوجية التخصصية، ومدرج المناقشات، ومكتبة الكليات التطبيقية.",
      descriptionEn: "Floor of medical and technological specialized laboratories, defense auditoriums, and applied sciences library.",
      rooms: [
        {
          id: "pharmacy-lab",
          nameAr: "مخبر الصيدلانيات والسموم (Ph_Lab)",
          nameEn: "Pharmaceutics & Toxicology Lab",
          descAr: "مخبر تخصصي صيدلاني لصناعة وتحضير الأشكال الدوائية المختلفة وتجارب السموم والأدوية.",
          descEn: "Specialized pharmacy lab for formulating dosage forms, toxicology research, and pharmacology experiments.",
          area: "45 M²",
          x: "20%",
          y: "58%",
          type: "lab"
        },
        {
          id: "eng-lab",
          nameAr: "مخبر هندسة الحاسوب والشبكات (Eng_Lab)",
          nameEn: "Computer Engineering Lab",
          descAr: "مجهز بحواسيب عالية الأداء ومجموعات تدريبية للشبكات والميكروكونترولر والذكاء الاصطناعي.",
          descEn: "Equipped with high-performance PCs and training kits for networking, microcontrollers, and artificial intelligence.",
          area: "45 M²",
          x: "20%",
          y: "50%",
          type: "lab"
        },
        {
          id: "pc-lab",
          nameAr: "مخبر الحاسوب العام (Pc_Lab)",
          nameEn: "General PC Lab",
          descAr: "مخبر حاسوبي متاح للتدريس والامتحانات المؤتمتة والدراسة الحرة للطلاب.",
          descEn: "Computer laboratory available for classes, automated examinations, and student self-study.",
          area: "45 M²",
          x: "20%",
          y: "42%",
          type: "lab"
        },
        {
          id: "lib-engineering",
          nameAr: "المكتبة الهندسية والتطبيقية",
          nameEn: "Engineering & Applied Library",
          descAr: "مكتبة متخصصة تحتوي المراجع الهندسية والتصميم المعماري وأبحاث الصيدلة التخصصية.",
          descEn: "Specialized library containing engineering reference materials, architectural designs, and advanced pharmaceutical journals.",
          area: "125 M²",
          x: "38%",
          y: "37%",
          type: "library"
        },
        {
          id: "class-s01",
          nameAr: "المدرج الدراسي الأكاديمي (S01)",
          nameEn: "Academic Auditorium S01",
          descAr: "مدرج كبير مجهز بالكامل للمؤتمرات والندوات العلمية ومناقشات بحوث التخرج.",
          descEn: "Large auditorium fully equipped for scientific conferences, seminars, and graduation project defenses.",
          area: "70 M²",
          x: "20%",
          y: "68%",
          type: "class"
        }
      ]
    }
  ], []);

  // 1. Image Preloader
  useEffect(() => {
    const imagesToLoad = {
      basement: "/images/pages/floor-basement.jpg",
      ground: "/images/pages/floor-ground.jpg",
      first: "/images/pages/floor-first.jpg",
      second: "/images/pages/floor-second.jpg",
    };

    const loaded: Record<string, HTMLImageElement> = {};
    const keys = Object.keys(imagesToLoad) as Array<keyof typeof imagesToLoad>;
    let count = 0;

    keys.forEach((key) => {
      const img = new Image();
      img.src = imagesToLoad[key];

      img.onload = () => {
        loaded[key] = img;
        count++;
        setLoadingProgress(Math.round((count / keys.length) * 100));

        if (count === keys.length) {
          setLoadedImages(loaded);
          setImagesLoading(false);
        }
      };

      img.onerror = () => {
        // Fallback in case of error, still proceed to load
        count++;
        if (count === keys.length) {
          setImagesLoading(false);
        }
      };
    });
  }, []);

  // Room type details helper
  const getRoomTypeColor = (type: RoomInfo["type"]) => {
    switch (type) {
      case "lab": return { stroke: "#0ea5e9", fill: "rgba(14, 165, 233, 0.08)", badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" };
      case "admin": return { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.08)", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "class": return { stroke: "#8b5cf6", fill: "rgba(139, 92, 246, 0.08)", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      case "library": return { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.08)", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "service": return { stroke: "#f43f5e", fill: "rgba(244, 63, 94, 0.08)", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    }
  };

  // Preset Views functions
  const setPresetView = (type: "iso" | "top" | "front" | "side") => {
    setAutoRotate(false);
    switch (type) {
      case "iso":
        targetCamRef.current = { pitch: 0.85, yaw: -0.65, zoom: 0.95 };
        break;
      case "top":
        targetCamRef.current = { pitch: 1.57, yaw: 0, zoom: 1.05 };
        break;
      case "front":
        targetCamRef.current = { pitch: 0.15, yaw: 0, zoom: 0.9 };
        break;
      case "side":
        targetCamRef.current = { pitch: 0.4, yaw: Math.PI / 2, zoom: 0.9 };
        break;
    }
  };

  // Focus camera directly on a selected room
  const focusOnRoom = (room: RoomInfo, floorIndex: number) => {
    setAutoRotate(false);
    setActiveFloorIndex(floorIndex);
    setSelectedRoom(room);

    // Calculate angle towards the room to face it
    const angle = (floorIndex - 1.5) * 0.1;
    targetCamRef.current = {
      pitch: 0.75,
      yaw: -0.5 + angle,
      zoom: 1.25
    };
  };

  // Search rooms matching query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();
    const results: RoomInfo[] = [];

    floors.forEach((floor) => {
      floor.rooms.forEach((room) => {
        if (
          room.nameAr.toLowerCase().includes(query) ||
          room.nameEn.toLowerCase().includes(query) ||
          room.descAr.toLowerCase().includes(query) ||
          room.descEn.toLowerCase().includes(query)
        ) {
          results.push(room);
        }
      });
    });

    setSearchResults(results);
  }, [searchQuery, floors]);

  // Affine transformation matrix texture mapper in Canvas 2D
  // Splits a rectangle (the blueprint image) into 2 triangles and draws them in 3D projection
  const drawTexturedQuad = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number }
  ) => {
    const w = img.width;
    const h = img.height;

    // Draw Triangle 1 (TL, TR, BR)
    drawTriangle(ctx, img, p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, 0, 0, w, 0, w, h);
    // Draw Triangle 2 (TL, BR, BL)
    drawTriangle(ctx, img, p0.x, p0.y, p2.x, p2.y, p3.x, p3.y, 0, 0, w, h, 0, h);
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x0: number, y0: number,
    x1: number, y1: number,
    x2: number, y2: number,
    u0: number, v0: number,
    u1: number, v1: number,
    u2: number, v2: number
  ) => {
    ctx.save();

    // Expand the clipping path slightly (by 0.7 pixels) outward from the centroid
    // to prevent antialiasing sub-pixel gaps/seams between triangles.
    const expand = 0.7;
    const cx = (x0 + x1 + x2) / 3;
    const cy = (y0 + y1 + y2) / 3;

    const d0x = x0 - cx;
    const d0y = y0 - cy;
    const len0 = Math.hypot(d0x, d0y) || 1;
    const ex0 = x0 + (d0x / len0) * expand;
    const ey0 = y0 + (d0y / len0) * expand;

    const d1x = x1 - cx;
    const d1y = y1 - cy;
    const len1 = Math.hypot(d1x, d1y) || 1;
    const ex1 = x1 + (d1x / len1) * expand;
    const ey1 = y1 + (d1y / len1) * expand;

    const d2x = x2 - cx;
    const d2y = y2 - cy;
    const len2 = Math.hypot(d2x, d2y) || 1;
    const ex2 = x2 + (d2x / len2) * expand;
    const ey2 = y2 + (d2y / len2) * expand;

    ctx.beginPath();
    ctx.moveTo(ex0, ey0);
    ctx.lineTo(ex1, ey1);
    ctx.lineTo(ex2, ey2);
    ctx.closePath();
    ctx.clip();

    const denom = u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0;
    if (Math.abs(denom) < 0.001) {
      ctx.restore();
      return;
    }

    const a = -(v0 * (x2 - x1) - v1 * x2 + v2 * x1 + (v1 - v2) * x0) / denom;
    const b = (u0 * (x2 - x1) - u1 * x2 + u2 * x1 + (u1 - u2) * x0) / denom;
    const c = (u0 * (v2 * x1 - v1 * x2) + u1 * (v0 * x2 - v2 * x0) + u2 * (v1 * x0 - v0 * x1)) / denom;

    const d = -(v0 * (y2 - y1) - v1 * y2 + v2 * y1 + (v1 - v2) * y0) / denom;
    const e = (u0 * (y2 - y1) - u1 * y2 + u2 * y1 + (u1 - u2) * y0) / denom;
    const f = (u0 * (v2 * y1 - v1 * y2) + u1 * (v0 * y2 - v2 * y0) + u2 * (v1 * y0 - v0 * y1)) / denom;

    ctx.transform(a, d, b, e, c, f);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  // Main 3D Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let localYaw = cameraRef.current.yaw;
    let localPitch = cameraRef.current.pitch;
    let localZoom = cameraRef.current.zoom;

    // Building Dimensions
    const buildingWidth = 360;
    const buildingDepth = 260;

    // Mouse drag handlers on canvas
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let canvasRect = canvas.getBoundingClientRect();

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpi = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const targetWidth = Math.floor(rect.width * dpi);
      const currentHeight = rect.height > 0 ? rect.height : 500;
      const targetHeight = Math.floor(currentHeight * dpi);

      // Only resize if the dimensions in device pixels actually changed to avoid layout thrashing and flicker
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${currentHeight}px`;
        ctx.scale(dpi, dpi);
      }
      canvasRect = canvas.getBoundingClientRect();
    };

    // Initialize Resize Observer
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    const getMousePos = (e: MouseEvent) => {
      return {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top,
      };
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const pos = getMousePos(e);
      prevMouseX = pos.x;
      prevMouseY = pos.y;
      if (autoRotateRef.current) {
        setAutoRotate(false);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);

      if (isDragging) {
        // Drag rotation
        const deltaX = pos.x - prevMouseX;
        const deltaY = pos.y - prevMouseY;

        localYaw += deltaX * 0.008;
        localPitch = Math.max(0.12, Math.min(1.57, localPitch + deltaY * 0.008));

        cameraRef.current.yaw = localYaw;
        cameraRef.current.pitch = localPitch;

        prevMouseX = pos.x;
        prevMouseY = pos.y;
      } else {
        // Hover room detection
        // Calculate nearest projected room node
        const wVal = canvas.width / (window.devicePixelRatio || 1);
        const hVal = canvas.height / (window.devicePixelRatio || 1);
        const transX = wVal / 2;
        const transY = hVal / 2 + 15;

        const spacing = isExpandedRef.current ? 115 : 25;
        let closestRoom: RoomInfo | null = null;
        let minDist = 24; // hover click threshold radius (pixels)

        floors.forEach((floor, fIdx) => {
          const zOffset = (fIdx - 1.5) * spacing;

          floor.rooms.forEach((room) => {
            const rx = (parseFloat(room.x) / 100 - 0.5) * buildingWidth;
            const ry = (parseFloat(room.y) / 100 - 0.5) * buildingDepth;
            const rz = zOffset + 12.5; // half height center

            // 3D projection
            const cosY = Math.cos(localYaw);
            const sinY = Math.sin(localYaw);
            const rotX = rx * cosY - ry * sinY;
            const rotY = rx * sinY + ry * cosY;

            const cosP = Math.cos(localPitch);
            const sinP = Math.sin(localPitch);
            const projY = rotY * cosP - rz * sinP;
            const depth = rotY * sinP + rz * cosP;

            const scale = 750 / (750 + depth);
            const sx = transX + rotX * localZoom * scale;
            const sy = transY + projY * localZoom * scale;

            const dist = Math.hypot(pos.x - sx, pos.y - sy);
            if (dist < minDist) {
              minDist = dist;
              closestRoom = room;
            }
          });
        });

        if (closestRoom !== hoveredRoomRef.current) {
          hoveredRoomRef.current = closestRoom;
          setHoveredRoom(closestRoom);
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onCanvasClick = () => {
      const currentHovered = hoveredRoomRef.current;
      if (currentHovered) {
        setSelectedRoom(currentHovered);
        // Find which floor this room is on
        const floorIdx = floors.findIndex((f) => f.rooms.some((r) => r.id === currentHovered.id));
        if (floorIdx !== -1) {
          setActiveFloorIndex(floorIdx);
        }
      } else {
        setSelectedRoom(null);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (autoRotateRef.current) {
        setAutoRotate(false);
      }
      localZoom = Math.max(0.4, Math.min(2.5, localZoom - e.deltaY * 0.001));
      cameraRef.current.zoom = localZoom;
    };

    // Attach listeners
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // Render loop function
    const render = () => {
      // Smooth Camera Interpolations
      if (targetCamRef.current) {
        const target = targetCamRef.current;
        localPitch += (target.pitch - localPitch) * 0.085;
        // Handle angle wrapping for smooth yaw spins
        let diffYaw = target.yaw - localYaw;
        localYaw += diffYaw * 0.085;
        localZoom += (target.zoom - localZoom) * 0.085;

        cameraRef.current.pitch = localPitch;
        cameraRef.current.yaw = localYaw;
        cameraRef.current.zoom = localZoom;

        if (
          Math.abs(localPitch - target.pitch) < 0.005 &&
          Math.abs(diffYaw) < 0.005 &&
          Math.abs(localZoom - target.zoom) < 0.005
        ) {
          targetCamRef.current = null;
        }
      } else if (autoRotateRef.current && !isDragging) {
        // Slow auto rotation
        localYaw += 0.0022;
        cameraRef.current.yaw = localYaw;
      } else {
        // Keep states synced from cameraRef
        localYaw = cameraRef.current.yaw;
        localPitch = cameraRef.current.pitch;
        localZoom = cameraRef.current.zoom;
      }

      const wVal = canvas.width / (window.devicePixelRatio || 1);
      const hVal = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, wVal, hVal);

      // Translation centers
      const transX = wVal / 2;
      const transY = hVal / 2 + 15;
      const spacing = isExpandedRef.current ? 115 : 25;

      // 3D coordinate projection local function
      const project = (x: number, y: number, z: number) => {
        const cosY = Math.cos(localYaw);
        const sinY = Math.sin(localYaw);
        const rx = x * cosY - y * sinY;
        const ry = x * sinY + y * cosY;

        const cosP = Math.cos(localPitch);
        const sinP = Math.sin(localPitch);
        const yProj = ry * cosP - z * sinP;
        const depth = ry * sinP + z * cosP;

        const distanceFactor = 750;
        const scale = distanceFactor / (distanceFactor + depth);

        return {
          x: transX + rx * localZoom * scale,
          y: transY + yProj * localZoom * scale,
          depth
        };
      };

      const selectedRoom = selectedRoomRef.current;
      const selectedFloorIdx = selectedRoom
        ? floors.findIndex((f) => f.rooms.some((r) => r.id === selectedRoom.id))
        : -1;
      const hasSelection = selectedFloorIdx !== -1;

      // 1. Draw Outer Building Transparent Shell/Cage (Only when no room is selected/isolated)
      if (!hasSelection) {
        const hLimit = (floors.length - 1.5) * spacing + 25;
        const lLimit = (-1.5) * spacing - 15;
        const cTL_b = project(-buildingWidth / 2 - 10, -buildingDepth / 2 - 10, lLimit);
        const cTR_b = project(buildingWidth / 2 + 10, -buildingDepth / 2 - 10, lLimit);
        const cBR_b = project(buildingWidth / 2 + 10, buildingDepth / 2 + 10, lLimit);
        const cBL_b = project(-buildingWidth / 2 - 10, buildingDepth / 2 + 10, lLimit);
        const cTL_t = project(-buildingWidth / 2 - 10, -buildingDepth / 2 - 10, hLimit);
        const cTR_t = project(buildingWidth / 2 + 10, -buildingDepth / 2 - 10, hLimit);
        const cBR_t = project(buildingWidth / 2 + 10, buildingDepth / 2 + 10, hLimit);
        const cBL_t = project(-buildingWidth / 2 - 10, buildingDepth / 2 + 10, hLimit);

        // Render Cage lines as low-intensity glass hologram
        ctx.strokeStyle = "rgba(51, 65, 85, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        // Bottom ring
        ctx.moveTo(cTL_b.x, cTL_b.y);
        ctx.lineTo(cTR_b.x, cTR_b.y);
        ctx.lineTo(cBR_b.x, cBR_b.y);
        ctx.lineTo(cBL_b.x, cBL_b.y);
        ctx.closePath();
        // Top ring
        ctx.moveTo(cTL_t.x, cTL_t.y);
        ctx.lineTo(cTR_t.x, cTR_t.y);
        ctx.lineTo(cBR_t.x, cBR_t.y);
        ctx.lineTo(cBL_t.x, cBL_t.y);
        ctx.closePath();
        // Columns
        ctx.moveTo(cTL_b.x, cTL_b.y); ctx.lineTo(cTL_t.x, cTL_t.y);
        ctx.moveTo(cTR_b.x, cTR_b.y); ctx.lineTo(cTR_t.x, cTR_t.y);
        ctx.moveTo(cBR_b.x, cBR_b.y); ctx.lineTo(cBR_t.x, cBR_t.y);
        ctx.moveTo(cBL_b.x, cBL_b.y); ctx.lineTo(cBL_t.x, cBL_t.y);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
      }

      // 2. Draw Floor Plates (Iterating Bottom to Top)
      floors.forEach((floor, idx) => {
        // If a room is selected, isolate and only draw that floor
        if (hasSelection && idx !== selectedFloorIdx) return;

        const isFloorActive = activeFloorIndexRef.current === idx;
        const zOffset = (idx - 1.5) * spacing;

        const pTL = project(-buildingWidth / 2, -buildingDepth / 2, zOffset);
        const pTR = project(buildingWidth / 2, -buildingDepth / 2, zOffset);
        const pBR = project(buildingWidth / 2, buildingDepth / 2, zOffset);
        const pBL = project(-buildingWidth / 2, buildingDepth / 2, zOffset);

        // Draw textured blueprint layer
        const imgKey = floor.id === "basement" ? "basement" : floor.id === "ground" ? "ground" : floor.id === "first" ? "first" : "second";
        const img = loadedImages[imgKey];

        if (img) {
          ctx.globalAlpha = isFloorActive ? 0.65 : 0.28;
          drawTexturedQuad(ctx, img, pTL, pTR, pBR, pBL);
          ctx.globalAlpha = 1.0;
        } else {
          // Fallback solid translucent plate
          ctx.fillStyle = isFloorActive ? "rgba(15, 23, 42, 0.45)" : "rgba(15, 23, 42, 0.15)";
          ctx.beginPath();
          ctx.moveTo(pTL.x, pTL.y);
          ctx.lineTo(pTR.x, pTR.y);
          ctx.lineTo(pBR.x, pBR.y);
          ctx.lineTo(pBL.x, pBL.y);
          ctx.closePath();
          ctx.fill();
        }

        // Draw Floor plate border
        ctx.strokeStyle = isFloorActive
          ? "rgba(163, 22, 22, 0.75)"  // Primary red active
          : "rgba(71, 85, 105, 0.35)";  // Inactive gray
        ctx.lineWidth = isFloorActive ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(pTL.x, pTL.y);
        ctx.lineTo(pTR.x, pTR.y);
        ctx.lineTo(pBR.x, pBR.y);
        ctx.lineTo(pBL.x, pBL.y);
        ctx.closePath();
        ctx.stroke();

        // Active Floor Ring Glow
        if (isFloorActive) {
          ctx.strokeStyle = "rgba(163, 22, 22, 0.25)";
          ctx.lineWidth = 6;
          ctx.stroke();
        }

        // Draw floor title tag next to the plate
        ctx.fillStyle = isFloorActive ? "#ffffff" : "rgba(148, 163, 184, 0.5)";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = dir === "rtl" ? "right" : "left";
        const labelPoint = project(buildingWidth / 2 + 15, -buildingDepth / 2, zOffset);
        ctx.fillText(
          isArabic ? `L${floor.level} - ${floor.nameAr.split(" (")[0]}` : `L${floor.level} - ${floor.nameEn.split(" (")[0]}`,
          labelPoint.x,
          labelPoint.y
        );

        // 3. Draw Rooms inside this floor as 3D wireframe boxes
        floor.rooms.forEach((room) => {
          const roomX = (parseFloat(room.x) / 100 - 0.5) * buildingWidth;
          const roomY = (parseFloat(room.y) / 100 - 0.5) * buildingDepth;
          const roomZ = zOffset;

          // Estimate dimensions based on area
          const areaVal = parseFloat(room.area) || 50;
          const sizeScale = Math.sqrt(areaVal / 50);
          const w = 48 * sizeScale;
          const d = 36 * sizeScale;
          const h = 25; // 3D wall height

          // Vertices definition
          const v0 = project(roomX - w / 2, roomY - d / 2, roomZ);
          const v1 = project(roomX + w / 2, roomY - d / 2, roomZ);
          const v2 = project(roomX + w / 2, roomY + d / 2, roomZ);
          const v3 = project(roomX - w / 2, roomY + d / 2, roomZ);
          const v4 = project(roomX - w / 2, roomY - d / 2, roomZ + h);
          const v5 = project(roomX + w / 2, roomY - d / 2, roomZ + h);
          const v6 = project(roomX + w / 2, roomY + d / 2, roomZ + h);
          const v7 = project(roomX - w / 2, roomY + d / 2, roomZ + h);

          const isRoomSelected = selectedRoomRef.current?.id === room.id;
          const isRoomHovered = hoveredRoomRef.current?.id === room.id;
          const isHighlight = isRoomSelected || isRoomHovered;

          // Get styling based on room type
          const style = getRoomTypeColor(room.type);
          if (!style) return;

          // Transparent faces fill
          ctx.fillStyle = isHighlight
            ? "rgba(163, 22, 22, 0.35)" // glowing red active
            : style.fill;

          // Draw faces (Bottom, Top, Sides)
          const fillFace = (pts: Array<{ x: number; y: number }>) => {
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.fill();
          };

          // Draw translucency
          fillFace([v0, v1, v2, v3]);
          fillFace([v4, v5, v6, v7]);
          fillFace([v0, v1, v5, v4]);
          fillFace([v1, v2, v6, v5]);
          fillFace([v2, v3, v7, v6]);
          fillFace([v3, v0, v4, v7]);

          // Draw Edges
          ctx.strokeStyle = isHighlight
            ? "#ef4444" // Bright glowing red outline
            : style.stroke;
          ctx.lineWidth = isHighlight ? 2.5 : 0.8;

          // Glow effects for highlight rooms
          if (isHighlight) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ef4444";
          }

          ctx.beginPath();
          // bottom ring
          ctx.moveTo(v0.x, v0.y); ctx.lineTo(v1.x, v1.y); ctx.lineTo(v2.x, v2.y); ctx.lineTo(v3.x, v3.y); ctx.closePath();
          // top ring
          ctx.moveTo(v4.x, v4.y); ctx.lineTo(v5.x, v5.y); ctx.lineTo(v6.x, v6.y); ctx.lineTo(v7.x, v7.y); ctx.closePath();
          // vertical columns
          ctx.moveTo(v0.x, v0.y); ctx.lineTo(v4.x, v4.y);
          ctx.moveTo(v1.x, v1.y); ctx.lineTo(v5.x, v5.y);
          ctx.moveTo(v2.x, v2.y); ctx.lineTo(v6.x, v6.y);
          ctx.moveTo(v3.x, v3.y); ctx.lineTo(v7.x, v7.y);
          ctx.stroke();

          // Reset shadows
          ctx.shadowBlur = 0;

          // Draw selected room floating pointer overlay (HUD AR style)
          if (isHighlight) {
            // Room center screen projection
            const rc = project(roomX, roomY, roomZ + h / 2);

            // Pulsing target dot
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(rc.x, rc.y, 4 + Math.sin(Date.now() * 0.01) * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Connecting HUD line
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(rc.x, rc.y);
            const lineEndX = rc.x + (dir === "rtl" ? -55 : 55);
            const lineEndY = rc.y - 45;
            ctx.lineTo(lineEndX, lineEndY);
            ctx.lineTo(lineEndX + (dir === "rtl" ? -15 : 15), lineEndY);
            ctx.stroke();

            // Holographic tag text box
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1;
            const boxW = 120;
            const boxH = 26;
            const boxX = lineEndX + (dir === "rtl" ? -boxW - 15 : 15);
            const boxY = lineEndY - boxH / 2;

            ctx.beginPath();
            ctx.roundRect(boxX, boxY, boxW, boxH, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 9px monospace";
            ctx.textAlign = "center";
            ctx.fillText(
              isArabic ? room.nameAr : room.nameEn,
              boxX + boxW / 2,
              boxY + boxH / 2 + 3.5
            );
          }
        });
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [loadedImages, isArabic, dir]);

  const activeFloor = floors[activeFloorIndex];

  return (
    <div
      ref={mainWrapperRef}
      className={cn(
        "flex flex-col lg:flex-row w-full bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative text-start transition-all duration-300",
        isFullscreen ? "fixed inset-0 z-[9999] w-screen h-screen min-h-0 rounded-none border-none animate-in fade-in duration-200" : "h-full min-h-[600px]"
      )}
    >

      {/* 1. Left View: 3D Holographic Canvas Viewport */}
      <div
        ref={containerRef}
        className={cn(
          "flex-1 relative bg-slate-900 overflow-hidden flex items-center justify-center p-0",
          isFullscreen ? "h-full lg:h-full" : "h-[480px] lg:h-auto min-h-[420px]"
        )}
      >
        {/* Images preloader overlay */}
        {imagesLoading && (
          <div className="absolute inset-0 bg-slate-950/90 z-40 flex flex-col items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <div className="text-xs font-mono text-slate-300">
              {isArabic ? "جاري تحميل خريطة الحرم الجامعي..." : "Generating holographic 3D model..."}
            </div>
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500">{loadingProgress}%</span>
          </div>
        )}

        {/* 3D Holographic Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing z-10"
        />

        {/* Overlay Search Input bar */}
        <div className="absolute top-4 left-4 right-4 z-20 max-w-sm" dir={dir}>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 rtl:right-3 rtl:left-auto -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder={isArabic ? "ابحث عن قاعة، مختبر أو مكتب..." : "Search hall, lab or office..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 rtl:pr-9 rtl:pl-8 bg-slate-950/80 border-white/10 text-white rounded-xl placeholder:text-slate-500 h-9 backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 rtl:left-3 rtl:right-auto -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search suggestions dropdown list */}
          <AnimatePresence>
            {isSearching && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 mt-1 bg-slate-950/95 border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-2xl backdrop-blur-lg overflow-hidden divide-y divide-white/5"
              >
                {searchResults.map((room) => {
                  const floorIdx = floors.findIndex((f) => f.rooms.some((r) => r.id === room.id));
                  return (
                    <button
                      key={room.id}
                      onClick={() => {
                        focusOnRoom(room, floorIdx);
                        setIsSearching(false);
                      }}
                      className="w-full px-3 py-2 text-xs hover:bg-primary/20 text-slate-300 hover:text-white flex items-center justify-between text-left rtl:text-right"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{isArabic ? room.nameAr : room.nameEn}</span>
                        <span className="text-[10px] text-slate-500">
                          {isArabic ? floors[floorIdx].nameAr.split(" (")[0] : floors[floorIdx].nameEn.split(" (")[0]}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[8px] uppercase px-1.5 py-0">
                        {room.type}
                      </Badge>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating View Presets Widget */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-white/5 backdrop-blur-md">
          <span className="text-[9px] font-mono text-slate-500 block text-center border-b border-white/5 pb-1">VIEWS</span>
          <div className="flex gap-1.5">
            <Button size="icon-sm" variant="ghost" className="text-[10px] h-6 w-10 text-white font-mono hover:bg-slate-900 border border-white/5" onClick={() => setPresetView("iso")}>ISO</Button>
            <Button size="icon-sm" variant="ghost" className="text-[10px] h-6 w-10 text-white font-mono hover:bg-slate-900 border border-white/5" onClick={() => setPresetView("top")}>TOP</Button>
            <Button size="icon-sm" variant="ghost" className="text-[10px] h-6 w-10 text-white font-mono hover:bg-slate-900 border border-white/5" onClick={() => setPresetView("front")}>FRONT</Button>
          </div>
        </div>

        {/* Navigation Floating toolbar */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-2 bg-slate-950/80 p-2 rounded-xl border border-white/5 backdrop-blur-md">
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-slate-400 hover:text-white"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-slate-400 hover:text-white"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className={cn("text-slate-400 hover:text-white", autoRotate ? "text-primary hover:text-primary" : "")}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause Rotation" : "Auto Rotate"}
          >
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-slate-400 hover:text-white"
            onClick={() => {
              targetCamRef.current = { pitch: 0.85, yaw: -0.65, zoom: 0.9 };
              setIsExpanded(true);
            }}
            title="Reset View"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-slate-400 hover:text-white border-t border-white/5 pt-1 mt-1"
            onClick={toggleFullscreen}
            title={isFullscreen ? (isArabic ? "إلغاء ملء الشاشة" : "Exit Fullscreen") : (isArabic ? "ملء الشاشة" : "Fullscreen")}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 text-primary" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>

        {/* Center Help Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-slate-500 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
          <Compass className="h-3 w-3 animate-spin-slow" />
          <span>{isArabic ? "اسحب لتدوير المجسم • مرر للتقريب" : "Drag to rotate • Scroll to zoom"}</span>
        </div>
      </div>

      {/* 2. Right View: Description panel & details drawer */}
      <div
        className={cn(
          "bg-slate-950 flex flex-col relative z-20",
          isFullscreen 
            ? "w-full lg:w-[380px] h-1/3 lg:h-full border-t lg:border-t-0 lg:border-l border-white/10" 
            : "w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-white/10"
        )}
      >

        {/* Toggle Exploded/Collapsed Stack Mode */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/40">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs font-bold text-slate-300">
              {isArabic ? "مجسم الحرم الجامعي" : "Campus Interactive Model"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 text-slate-400 hover:text-white border-white/10 rounded-lg shrink-0"
              onClick={toggleFullscreen}
              title={isFullscreen ? (isArabic ? "إلغاء ملء الشاشة" : "Exit Fullscreen") : (isArabic ? "ملء الشاشة" : "Fullscreen")}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4 text-primary animate-in zoom-in-50" /> : <Maximize2 className="h-4 w-4" />}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-xs font-semibold border-white/10 text-white gap-1.5 h-8 rounded-lg whitespace-nowrap"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5 text-primary" />
                  {isArabic ? "دمج الطوابق" : "Collapse Stack"}
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5 text-primary" />
                  {isArabic ? "تفكيك الطبقات" : "Explode Floors"}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Floor selectors tabs */}
        <div className="p-3 bg-slate-900/20 border-b border-white/10 flex gap-1 overflow-x-auto select-none" dir={dir}>
          {floors.map((fl, idx) => (
            <button
              key={fl.id}
              onClick={() => {
                setActiveFloorIndex(idx);
                setSelectedRoom(null);
              }}
              className={cn(
                "px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-all border",
                activeFloorIndex === idx
                  ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
                  : "bg-slate-900 border-white/5 text-slate-400 hover:text-white"
              )}
            >
              {isArabic ? fl.nameAr.split(" (")[0] : fl.nameEn.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Floor & Room details body content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-5 space-y-5",
            isFullscreen ? "max-h-none" : "max-h-[480px] lg:max-h-[520px]"
          )}
          dir={dir}
        >

          {/* Active Floor Overview Card */}
          <div className="space-y-2 text-start">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-md text-white flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-primary" />
                {isArabic ? activeFloor.nameAr : activeFloor.nameEn}
              </h3>
              <Badge variant="outline" className="text-[10px] text-slate-400 font-mono">
                {activeFloor.area}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isArabic ? activeFloor.descriptionAr : activeFloor.descriptionEn}
            </p>
          </div>

          <hr className="border-white/10" />

          {/* Selected Room Details / Facility list */}
          <AnimatePresence mode="wait">
            {selectedRoom ? (
              <motion.div
                key={selectedRoom.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4 text-start"
              >
                <div className="bg-slate-900 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  {/* Glowing color background accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />

                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm text-white">
                      {isArabic ? selectedRoom.nameAr : selectedRoom.nameEn}
                    </h4>
                    <span className="text-[10px] font-bold font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                      {selectedRoom.area}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {isArabic ? selectedRoom.descAr : selectedRoom.descEn}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center">
                    {(() => {
                      const style = getRoomTypeColor(selectedRoom.type);
                      return style && (
                        <Badge className={cn("text-[9px] uppercase font-bold tracking-wider", style.badge)}>
                          {selectedRoom.type}
                        </Badge>
                      );
                    })()}
                    <span className="text-[10px] text-slate-400 font-medium">
                      {isArabic ? "مستوى الطابق: " : "Floor Level: "} L{activeFloor.level}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 text-slate-400 hover:text-white mt-3 text-xs flex items-center gap-1"
                    onClick={() => setSelectedRoom(null)}
                  >
                    ← {isArabic ? "الرجوع لنظرة الطابق العامة" : "Back to floor summary"}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3.5 text-start"
              >
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                  {isArabic ? "مرافق وقاعات هذا الطابق:" : "Facilities on this floor:"}
                </span>

                {/* Grid of rooms available on this floor */}
                <div className="grid grid-cols-1 gap-2">
                  {activeFloor.rooms.map((room) => {
                    const isRoomHovered = hoveredRoom?.id === room.id;
                    const style = getRoomTypeColor(room.type);
                    return (
                      <div
                        key={room.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer transition-all duration-200",
                          isRoomHovered
                            ? "bg-slate-900 border-primary text-white shadow-sm"
                            : "bg-slate-900/40 border-white/5 text-slate-300 hover:bg-slate-900/60 hover:text-white"
                        )}
                        onClick={() => setSelectedRoom(room)}
                        onMouseEnter={() => setHoveredRoom(room)}
                        onMouseLeave={() => setHoveredRoom(null)}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: style?.stroke }}
                          />
                          <span className="text-xs font-semibold">
                            {isArabic ? room.nameAr : room.nameEn}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 font-bold">
                          {room.area}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Coordinate details */}
        <div className="p-4 border-t border-white/10 bg-slate-950 font-mono text-[9px] text-slate-500 flex justify-between">
          <span>COORDINATES: MAARAT SEYDNAYA</span>
          <span>ASU HOLO_VIEW V2.0</span>
        </div>
      </div>
    </div>
  );
}
