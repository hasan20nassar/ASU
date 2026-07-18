"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

// Dimensions of campus-map.png
const MAP_W = 516;
const MAP_H = 718;
const CAMPUS_MAP_SRC = "/images/campus-map.png";

interface Point {
  x: number;
  y: number;
}

interface Building {
  nameAr: string;
  nameEn: string;
  pos: Point;
  route: Point[];
}

const BUILDINGS: Record<string, Building> = {
  admin: {
    nameAr: "مبنى الإدارة",
    nameEn: "Administration Building",
    pos: { x: 186, y: 165 },
    route: [{ x: 186, y: 165 }],
  },
  acad1: {
    nameAr: "المبنى الأكاديمي الأول",
    nameEn: "First Academic Building",
    pos: { x: 110, y: 76 },
    route: [{ x: 186, y: 165 }, { x: 150, y: 120 }, { x: 110, y: 76 }],
  },
  acad2: {
    nameAr: "المبنى الأكاديمي الثاني",
    nameEn: "Second Academic Building",
    pos: { x: 300, y: 340 },
    route: [{ x: 186, y: 165 }, { x: 232, y: 232 }, { x: 268, y: 288 }, { x: 300, y: 340 }],
  },
  acad3: {
    nameAr: "المبنى الأكاديمي الثالث",
    nameEn: "Third Academic Building",
    pos: { x: 380, y: 610 },
    route: [
      { x: 186, y: 165 }, { x: 232, y: 232 }, { x: 268, y: 288 },
      { x: 320, y: 420 }, { x: 352, y: 520 }, { x: 380, y: 610 },
    ],
  },
};

interface Room {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  building: keyof typeof BUILDINGS;
  floorAr: string;
  floorEn: string;
  type: "lecture" | "lab" | "hall";
  walkMin: number;
  landmarkAr: string;
  landmarkEn: string;
  marker: { dx: number; dy: number };
  stepsAr: string[];
  stepsEn: string[];
}

const ROOMS: Room[] = [
  {
    id: "adm-101",
    code: "ADM-101",
    nameAr: "قاعة اجتماعات الإدارة",
    nameEn: "Administration Meeting Hall",
    building: "admin",
    floorAr: "الطابق الأرضي",
    floorEn: "Ground Floor",
    type: "hall",
    walkMin: 1,
    landmarkAr: "داخل مبنى الإدارة مباشرة",
    landmarkEn: "Directly inside the Administration building",
    marker: { dx: 10, dy: -8 },
    stepsAr: ["هذه القاعة داخل مبنى الإدارة نفسه — توجّه لموظف الاستقبال عند المدخل للدلالة على الطابق."],
    stepsEn: ["This room is inside the Administration building - head to the receptionist at the entrance for directions."],
  },
  {
    id: "a101",
    code: "A101",
    nameAr: "قاعة محاضرات A101",
    nameEn: "Lecture Hall A101",
    building: "acad1",
    floorAr: "الطابق الأرضي",
    floorEn: "Ground Floor",
    type: "lecture",
    walkMin: 3,
    landmarkAr: "أول باب بعد المدخل",
    landmarkEn: "First door after the entrance",
    marker: { dx: -14, dy: 10 },
    stepsAr: [
      "من مبنى الإدارة، اتجه شمالاً باتجاه المبنى الأكاديمي الأول الظاهر أعلى الطريق.",
      "امشِ بمحاذاة الطريق الفرعي حتى تصل لمدخل المبنى.",
      "A101 أول باب على يمينك بعد المدخل مباشرة.",
    ],
    stepsEn: [
      "From the Administration building, head north towards the First Academic Building visible at the top of the road.",
      "Walk along the side path until you reach the building entrance.",
      "A101 is the first door on your right immediately after the entrance.",
    ],
  },
  {
    id: "a205",
    code: "A205",
    nameAr: "قاعة محاضرات A205",
    nameEn: "Lecture Hall A205",
    building: "acad1",
    floorAr: "الطابق الأول",
    floorEn: "First Floor",
    type: "lecture",
    walkMin: 4,
    landmarkAr: "نهاية الممر العلوي",
    landmarkEn: "End of the upper corridor",
    marker: { dx: 16, dy: -6 },
    stepsAr: [
      "من مبنى الإدارة، اتجه شمالاً باتجاه المبنى الأكاديمي الأول.",
      "ادخل من المدخل الرئيسي واصعد الطابق الأول.",
      "A205 في نهاية الممر.",
    ],
    stepsEn: [
      "From the Administration building, head north towards the First Academic Building.",
      "Enter through the main entrance and go up to the first floor.",
      "A205 is at the end of the corridor.",
    ],
  },
  {
    id: "b110",
    code: "B110",
    nameAr: "قاعة محاضرات B110",
    nameEn: "Lecture Hall B110",
    building: "acad2",
    floorAr: "الطابق الأول",
    floorEn: "First Floor",
    type: "lecture",
    walkMin: 6,
    landmarkAr: "بجانب الدرج الرئيسي",
    landmarkEn: "Next to the main stairs",
    marker: { dx: -12, dy: 14 },
    stepsAr: [
      "من مبنى الإدارة، اتبع الطريق المنحني جنوب شرق باتجاه المبنى الأكاديمي الثاني.",
      "ادخل من المدخل الرئيسي واصعد الطابق الأول.",
      "B110 بجانب الدرج الرئيسي مباشرة.",
    ],
    stepsEn: [
      "From the Administration building, follow the curved path southeast towards the Second Academic Building.",
      "Enter through the main entrance and go up to the first floor.",
      "B110 is right next to the main stairs.",
    ],
  },
  {
    id: "clab",
    code: "ENG-LAB2",
    nameAr: "مختبر الحاسب الآلي",
    nameEn: "Computer Lab",
    building: "acad2",
    floorAr: "الطابق الأرضي",
    floorEn: "Ground Floor",
    type: "lab",
    walkMin: 5,
    landmarkAr: "يمين الاستقبال",
    landmarkEn: "Right of reception",
    marker: { dx: 18, dy: 4 },
    stepsAr: [
      "من مبنى الإدارة، اتبع الطريق المنحني جنوب شرق باتجاه المبنى الأكاديمي الثاني.",
      "المختبر يمين الاستقبال مباشرة عند الدخول — لا حاجة للصعود.",
    ],
    stepsEn: [
      "From the Administration building, follow the curved path southeast towards the Second Academic Building.",
      "The lab is directly to the right of the reception upon entering - no need to go upstairs.",
    ],
  },
  {
    id: "c001",
    code: "C001",
    nameAr: "المدرّج الكبير",
    nameEn: "Main Auditorium",
    building: "acad3",
    floorAr: "الطابق الأرضي",
    floorEn: "Ground Floor",
    type: "hall",
    walkMin: 9,
    landmarkAr: "أول قاعة عند المدخل",
    landmarkEn: "First hall at the entrance",
    marker: { dx: -10, dy: -12 },
    stepsAr: [
      "من مبنى الإدارة، اتبع الطريق الرئيسي جنوباً محاذياً للحقول الزراعية.",
      "استمر حتى تصل للمبنى الأكاديمي الثالث في نهاية الطريق.",
      "المدرّج الكبير أول قاعة عند المدخل مباشرة.",
    ],
    stepsEn: [
      "From the Administration building, follow the main road south alongside the agricultural fields.",
      "Continue until you reach the Third Academic Building at the end of the road.",
      "The Main Auditorium is the first hall directly at the entrance.",
    ],
  },
  {
    id: "d310",
    code: "D310",
    nameAr: "قاعة محاضرات D310",
    nameEn: "Lecture Hall D310",
    building: "acad3",
    floorAr: "الطابق الثاني",
    floorEn: "Second Floor",
    type: "lecture",
    walkMin: 10,
    landmarkAr: "قرب المكتبة الفرعية",
    landmarkEn: "Near the sub-library",
    marker: { dx: 14, dy: 10 },
    stepsAr: [
      "من مبنى الإدارة، اتبع الطريق الرئيسي جنوباً محاذياً للحقول الزراعية.",
      "عند الوصول للمبنى الأكاديمي الثالث، اصعد للطابق الثاني.",
      "D310 قرب المكتبة الفرعية، الباب الثاني على يمينك.",
    ],
    stepsEn: [
      "From the Administration building, follow the main road south alongside the agricultural fields.",
      "Upon reaching the Third Academic Building, go up to the second floor.",
      "D310 is near the sub-library, the second door on your right.",
    ],
  },
];

const LABELS = {
  ar: {
    title: "وين أروح؟ نوصّلك.",
    eyebrow: "دليل التنقل الجامعي",
    subtitle: "اكتب اسم القاعة أو رمزها، وراح نوريك أسهل طريق لها خطوة بخطوة على صورة الحرم الجامعي الفعلية — بداية من مبنى الإدارة.",
    searchPlaceholder: "مثال: A101، مدرّج، مختبر الحاسب...",
    popularRooms: "أو اختر من القاعات الأكثر بحثاً:",
    emptyTitle: "ابحث عن قاعتك لتبدأ",
    emptyDesc: "راح نوريك المسار كامل على صورة الحرم الجامعي مع خطوات واضحة.",
    backSearch: "رجوع للبحث",
    walkTime: (min: number) => `~${min} دقائق مشياً`,
    landmark: "المعلم القريب",
    floor: "الطابق",
    building: "المبنى",
    mapTitle: "مسار الوصول على صورة الحرم الجامعي",
    legendAdmin: "مبنى الإدارة (المرجع)",
    legendPath: "المسار المقطوع",
    legendYou: "موقعك في الشرح",
    lecture: "قاعة محاضرات",
    lab: "مختبر",
    hall: "مدرّج",
    adminLabel: "مبنى الإدارة",
  },
  en: {
    title: "Where to go? We guide you.",
    eyebrow: "Campus Navigation Guide",
    subtitle: "Type the name or code of the room, and we will show you the easiest route step-by-step on the actual campus map - starting from the Administration building.",
    searchPlaceholder: "e.g., A101, auditorium, computer lab...",
    popularRooms: "Or choose from the most searched rooms:",
    emptyTitle: "Search for your room to begin",
    emptyDesc: "We will show you the entire path on the campus map with clear instructions.",
    backSearch: "Back to Search",
    walkTime: (min: number) => `~${min} min walk`,
    landmark: "Landmark",
    floor: "Floor",
    building: "Building",
    mapTitle: "Navigation route on the campus map",
    legendAdmin: "Admin Bldg (Reference)",
    legendPath: "Travelled Path",
    legendYou: "Your Location in Steps",
    lecture: "Lecture Hall",
    lab: "Laboratory",
    hall: "Auditorium",
    adminLabel: "Admin Building",
  }
};

function segLen(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function pathToString(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function pointAtFraction(points: Point[], t: number) {
  const lens = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const l = segLen(points[i], points[i + 1]);
    lens.push(l);
    total += l;
  }
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i] || i === lens.length - 1) {
      const frac = lens[i] === 0 ? 0 : target / lens[i];
      const a = points[i], b = points[i + 1];
      return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
    }
    target -= lens[i];
  }
  return points[points.length - 1];
}

function buildRoute(room: Room) {
  const b = BUILDINGS[room.building];
  const roomPoint = { x: b.pos.x + room.marker.dx, y: b.pos.y + room.marker.dy };
  return [...b.route, roomPoint];
}

function DirIcon({ deg = 0 }: { deg?: number }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ transform: `rotate(${deg}deg)` }}>
      <path d="M12 3 L12 19 M12 3 L6 9 M12 3 L18 9" stroke="currentColor" strokeWidth="2.4"
        fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function stepDeg(text: string) {
  if (text.includes("يمين") || text.includes("right")) return 90;
  if (text.includes("يسار") || text.includes("left")) return -90;
  if (text.includes("جنوب") || text.includes("south") || text.includes("اصعب") || text.includes("up")) return 135;
  if (text.includes("شمال") || text.includes("north")) return 0;
  return 45;
}

export default function RoomFinder() {
  const { language, dir } = useLanguage() as { language: "ar" | "en"; dir: "rtl" | "ltr" };
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [drawT, setDrawT] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const labels = LABELS[language] || LABELS.ar;

  const selected = useMemo(() => ROOMS.find((r) => r.id === selectedId) || null, [selectedId]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ROOMS.filter((r) => {
      const b = BUILDINGS[r.building];
      const name = language === "ar" ? r.nameAr : r.nameEn;
      const bName = language === "ar" ? b.nameAr : b.nameEn;
      return (
        r.code.toLowerCase().includes(q) ||
        name.toLowerCase().includes(q) ||
        bName.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [query, language]);



  useEffect(() => {
    if (!selected) return;
    const steps = language === "ar" ? selected.stepsAr : selected.stepsEn;
    const target = steps.length <= 1 ? 1 : activeStep / (steps.length - 1);
    let raf: number;
    const animate = () => {
      setDrawT((prev) => {
        const next = prev + (target - prev) * 0.18;
        if (Math.abs(next - target) > 0.002) {
          raf = requestAnimationFrame(animate);
        }
        return next;
      });
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [activeStep, selected, language]);

  function pickRoom(id: string) {
    setSelectedId(id);
    setActiveStep(0);
    setQuery("");
    setFocused(false);
  }

  const popular = ROOMS.slice(0, 4);
  const route = selected ? buildRoute(selected) : null;
  const dot = route ? pointAtFraction(route, drawT) : null;
  const fullPathLen = route
    ? route.reduce((acc, p, i) => (i === 0 ? 0 : acc + segLen(route[i - 1], p)), 0)
    : 0;

  const steps = selected ? (language === "ar" ? selected.stepsAr : selected.stepsEn) : [];

  return (
    <div dir={dir} className="rf-app text-start">
      <style>{`
        .rf-app {
          --ink: var(--foreground);
          --paper: var(--card);
          --paper-2: var(--muted);
          --gold: #E3A23B;
          --teal: var(--primary);
          --line: var(--border);
          --muted: var(--muted-foreground);
          color: var(--ink);
          background: transparent;
          min-height: auto;
          padding: 0;
          margin: 0;
        }
        .rf-app * { box-sizing: border-box; }
        .rf-shell { max-width: 1000px; margin: 0 auto; padding: 24px 0px 48px; }

        .rf-eyebrow { font-size: 13px; font-weight: 600; letter-spacing: .08em;
          color: var(--teal); text-transform: uppercase; margin: 0 0 8px; }
        .rf-title { font-weight: 800; font-size: clamp(24px, 3.5vw, 36px);
          margin: 0 0 10px; line-height: 1.2; color: var(--foreground); }
        .rf-sub { color: var(--muted); font-size: 15px; margin: 0 0 28px; max-width: 620px; }

        .rf-search-wrap { position: relative; margin-bottom: 18px; }
        .rf-search { display: flex; align-items: center; gap: 12px; background: var(--paper);
          border: 2px solid var(--line); border-radius: 12px; padding: 12px 16px;
          transition: border-color .15s, box-shadow .15s; }
        .rf-search:focus-within { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(31, 122, 108, 0.15); }
        .rf-search input { border: none; outline: none; flex: 1; font-family: inherit;
          font-size: 16px; background: transparent; color: var(--ink); }
        .rf-search input::placeholder { color: var(--muted); opacity: 0.7; }
        .rf-search svg { flex-shrink: 0; color: var(--muted); }

        .rf-suggestions { position: absolute; top: calc(100% + 6px); right: 0; left: 0; background: var(--paper);
          border: 2px solid var(--line); border-radius: 12px; overflow: hidden; z-index: 50;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
        .rf-sugg-item { display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 12px 16px; cursor: pointer; border-bottom: 1px solid var(--line); transition: background 0.15s; }
        .rf-sugg-item:last-child { border-bottom: none; }
        .rf-sugg-item:hover { background: var(--paper-2); }
        .rf-sugg-name { font-weight: 700; font-size: 14px; color: var(--foreground); }
        .rf-sugg-meta { font-size: 12px; color: var(--muted); }
        .rf-sugg-code { font-size: 11px; font-weight: 600; background: var(--paper-2);
          padding: 2px 6px; border-radius: 4px; color: var(--foreground); border: 1px solid var(--line); }

        .rf-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
        .rf-chips-label { font-size: 13px; color: var(--muted); margin-bottom: 10px; }
        .rf-chip { font-size: 13px; font-weight: 600; padding: 6px 14px;
          border-radius: 999px; border: 1.5px solid var(--line); background: var(--paper); cursor: pointer;
          color: var(--foreground); transition: border-color .15s, background .15s; }
        .rf-chip:hover { border-color: var(--teal); background: var(--paper-2); }

        .rf-empty { margin-top: 24px; text-align: center; padding: 48px 20px; border: 2px dashed var(--line);
          border-radius: 16px; background: var(--paper); }
        .rf-empty svg { color: var(--teal); margin: 0 auto 12px; }
        .rf-empty p { color: var(--muted); font-size: 14px; margin: 6px 0 0; }

        .rf-content { margin-top: 24px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        @media (max-width: 820px) { .rf-content { grid-template-columns: 1fr; } }

        .rf-card { background: var(--paper); border: 1.5px solid var(--line); border-radius: 16px; padding: 22px; }
        .rf-info-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
          margin-bottom: 14px; }
        .rf-room-code { font-size: 12px; font-weight: 700; background: var(--teal);
          color: var(--paper); padding: 3px 8px; border-radius: 6px; display: inline-block; margin-bottom: 8px; }
        .rf-room-name { font-weight: 800; font-size: 20px; margin: 0; color: var(--foreground); }
        .rf-type-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
          background: var(--paper-2); color: var(--foreground); white-space: nowrap; border: 1px solid var(--line); }

        .rf-meta-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 20px; }
        .rf-meta { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted);
          background: var(--paper-2); padding: 6px 10px; border-radius: 8px; border: 1px solid var(--line); }
        .rf-meta b { color: var(--foreground); font-weight: 700; }

        .rf-steps { list-style: none; margin: 0; padding: 0; }
        .rf-step { display: flex; gap: 12px; padding: 12px; border-radius: 10px; cursor: pointer;
          border-left: 3px solid transparent; border-right: 3px solid transparent; transition: background .15s, border-color .15s; }
        .rf-step:hover { background: var(--paper-2); }
        .rf-step.active { background: var(--paper-2); border-inline-start-color: var(--gold); }
        .rf-step-num { font-size: 12px; font-weight: 700;
          width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: var(--foreground); color: var(--card); flex-shrink: 0; }
        .rf-step.active .rf-step-num { background: var(--gold); color: #fff; }
        .rf-step-text { font-size: 14px; line-height: 1.5; color: var(--foreground); }
        .rf-step-icon { color: var(--teal); flex-shrink: 0; display: inline-flex; align-items: center; }

        .rf-map-title { font-size: 13px; font-weight: 700;
          color: var(--muted); text-transform: uppercase; margin-bottom: 12px; }

        .rf-back { font-size: 14px; font-weight: 700; color: var(--teal);
          background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 18px;
          display: flex; align-items: center; gap: 6px; transition: opacity 0.15s; }
        .rf-back:hover { opacity: 0.8; }

        .rf-legend { display: flex; gap: 16px; margin-top: 14px; font-size: 12px; color: var(--muted); flex-wrap: wrap; }
        .rf-legend span { display: inline-flex; align-items: center; gap: 6px; }
        .rf-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }

        .rf-map-photo { position: relative; width: 100%; aspect-ratio: ${MAP_W}/${MAP_H};
          border-radius: 12px; overflow: hidden; border: 1.5px solid var(--line); background: var(--paper-2); }
        .rf-map-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .rf-map-photo svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 10; }
      `}</style>

      <div className="rf-shell">
        <p className="rf-eyebrow">{labels.eyebrow}</p>
        <h2 className="rf-title">{labels.title}</h2>
        <p className="rf-sub">{labels.subtitle}</p>

        <div className="rf-search-wrap">
          <div className="rf-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder={labels.searchPlaceholder}
            />
          </div>
          {focused && matches.length > 0 && (
            <div className="rf-suggestions">
              {matches.map((r) => {
                const name = language === "ar" ? r.nameAr : r.nameEn;
                const bName = language === "ar" ? BUILDINGS[r.building].nameAr : BUILDINGS[r.building].nameEn;
                const floor = language === "ar" ? r.floorAr : r.floorEn;
                return (
                  <div key={r.id} className="rf-sugg-item" onMouseDown={() => pickRoom(r.id)}>
                    <div>
                      <div className="rf-sugg-name">{name}</div>
                      <div className="rf-sugg-meta">{bName} · {floor}</div>
                    </div>
                    <span className="rf-sugg-code">{r.code}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!selected && (
          <>
            <p className="rf-chips-label">{labels.popularRooms}</p>
            <div className="rf-chips">
              {popular.map((r) => {
                const name = language === "ar" ? r.nameAr : r.nameEn;
                return (
                  <button key={r.id} className="rf-chip" onClick={() => pickRoom(r.id)}>
                    {name}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {!selected && (
          <div className="rf-empty">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="mb-2">
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.9 12 21 12 21Z"
                stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <div className="font-bold text-foreground text-lg mb-1">{labels.emptyTitle}</div>
            <p className="text-muted-foreground max-w-sm mx-auto">{labels.emptyDesc}</p>
          </div>
        )}

        {selected && (
          <>
            <button className="rf-back" onClick={() => { setSelectedId(null); setActiveStep(0); }}>
              <DirIcon deg={dir === "rtl" ? 90 : -90} /> {labels.backSearch}
            </button>

            <div className="rf-content">
              <div className="rf-card">
                <div className="rf-info-head">
                  <div>
                    <span className="rf-room-code">{selected.code}</span>
                    <h3 className="rf-room-name">{language === "ar" ? selected.nameAr : selected.nameEn}</h3>
                  </div>
                  <span className="rf-type-badge">
                    {selected.type === "lecture" ? labels.lecture : selected.type === "lab" ? labels.lab : labels.hall}
                  </span>
                </div>

                <div className="rf-meta-row">
                  <span className="rf-meta">
                    🏛 <b>{labels.building}: {language === "ar" ? BUILDINGS[selected.building].nameAr : BUILDINGS[selected.building].nameEn}</b>
                  </span>
                  <span className="rf-meta">
                    ▤ <b>{labels.floor}: {language === "ar" ? selected.floorAr : selected.floorEn}</b>
                  </span>
                  <span className="rf-meta">
                    ⏱ <b>{labels.walkTime(selected.walkMin)}</b>
                  </span>
                  <span className="rf-meta">
                    📍 {language === "ar" ? selected.landmarkAr : selected.landmarkEn}
                  </span>
                </div>

                <ol className="rf-steps">
                  {steps.map((s, i) => (
                    <li
                      key={i}
                      className={`rf-step ${activeStep === i ? "active" : ""}`}
                      onClick={() => setActiveStep(i)}
                    >
                      <span className="rf-step-num">{i + 1}</span>
                      <span className="rf-step-icon"><DirIcon deg={stepDeg(s)} /></span>
                      <span className="rf-step-text">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rf-card">
                <div className="rf-map-title">{labels.mapTitle}</div>
                <div className="rf-map-photo">
                  <Image src={CAMPUS_MAP_SRC} alt="Campus Map" fill className="object-cover" />
                  {route && (
                    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid slice">
                      <path d={pathToString(route)} fill="none" stroke="#ffffff" strokeOpacity="0.55"
                        strokeWidth="5" strokeDasharray="1 10" strokeLinecap="round" />

                      <path
                        d={pathToString(route)}
                        fill="none" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${fullPathLen}`}
                        strokeDashoffset={`${fullPathLen * (1 - drawT)}`}
                      />

                      <circle cx={BUILDINGS.admin.pos.x} cy={BUILDINGS.admin.pos.y} r="7"
                        fill="var(--foreground)" stroke="#fff" strokeWidth="2.5" />
                      <text x={BUILDINGS.admin.pos.x + 12} y={BUILDINGS.admin.pos.y + 4}
                        fontSize="13" fontWeight="700" fill="#fff"
                        stroke="var(--background)" strokeWidth="3" paintOrder="stroke">
                        {labels.adminLabel}
                      </text>

                      <circle cx={route[route.length - 1].x} cy={route[route.length - 1].y} r="8"
                        fill="#fff" stroke="#E3A23B" strokeWidth="3.5" />
                      <circle cx={route[route.length - 1].x} cy={route[route.length - 1].y} r="3" fill="#E3A23B" />

                      {dot && (
                        <g>
                          <circle cx={dot.x} cy={dot.y} r="11" fill="#E3A23B" opacity="0.3" />
                          <circle cx={dot.x} cy={dot.y} r="6" fill="#E3A23B" stroke="var(--foreground)" strokeWidth="2" />
                        </g>
                      )}
                    </svg>
                  )}
                </div>

                <div className="rf-legend">
                  <span><span className="rf-dot bg-foreground" /> {labels.legendAdmin}</span>
                  <span><span className="rf-dot bg-primary" /> {labels.legendPath}</span>
                  <span><span className="rf-dot" style={{ background: "#E3A23B" }} /> {labels.legendYou}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
