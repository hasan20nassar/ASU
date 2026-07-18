"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Loader2 } from "lucide-react";

interface MarkerPoint {
  lat: number;
  lng: number;
  nameAr: string;
  nameEn: string;
  descAr?: string;
  descEn?: string;
}

// Data extracted directly from ASU.kml file
const KML_POINTS: MarkerPoint[] = [
  {
    lat: 33.65791806613972,
    lng: 36.37497254446367,
    nameAr: "مبنى كلية الحقوق",
    nameEn: "Faculty of Law Building",
    descAr: "مبنى كلية الحقوق في الحرم الجامعي.",
    descEn: "Faculty of Law Building on the university campus."
  },
  {
    lat: 33.65739050328335,
    lng: 36.37526712368856,
    nameAr: "مبنى كلية طب الأسنان",
    nameEn: "Faculty of Dentistry Building",
    descAr: "مبنى كلية طب الأسنان ومختبراتها الطبية المتخصصة.",
    descEn: "Faculty of Dentistry Building and its specialized medical laboratories."
  },
  {
    lat: 33.65823439688824,
    lng: 36.37481761865426,
    nameAr: "مبنى كلية الصيدلة",
    nameEn: "Pharmacy College Building",
    descAr: "مبنى كلية الصيدلة والمختبرات الدوائية والعلمية.",
    descEn: "Pharmacy College Building and pharmaceutical/scientific laboratories."
  },
  {
    lat: 33.65872142897872,
    lng: 36.37441436685869,
    nameAr: "المبنى الرئيسي",
    nameEn: "The Main Building",
    descAr: "المبنى الرئيسي الذي يضم إدارة الجامعة ورئاستها وكلية الهندسة.",
    descEn: "The main building, which houses the university administration, presidency, and the College of Engineering."
  },
  {
    lat: 33.65879398807943,
    lng: 36.37522416020599,
    nameAr: "المرافق الرياضية",
    nameEn: "Sports Facilities",
    descAr: "الملاعب الرياضية والمساحات الخضراء والأنشطة الطلابية الخارجية.",
    descEn: "Sports fields, green spaces, and outdoor student activities."
  }
];

export function CampusLeafletMap() {
  const { language, dir } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  useEffect(() => {
    // Check if Leaflet is already loaded on window
    if ((window as any).L) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLeafletLoaded(true);
      return;
    }

    // Append Leaflet CSS if not already present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Append Leaflet JS script if not already present
    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        setIsLeafletLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      // If script tag exists but window.L is not initialized yet (e.g. active loading)
      const interval = setInterval(() => {
        if ((window as any).L) {
          setIsLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!isLeafletLoaded || !mapRef.current) return;

    const L = (window as any).L;

    // Initialize Leaflet Map centered on ASU campus
    const map = L.map(mapRef.current, {
      center: [33.6581, 36.3750],
      zoom: 17,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Add high quality Satellite tile layer from Google Maps
    L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      maxZoom: 20,
    }).addTo(map);

    // Custom SVG Pin Icon matching ASU Burgundy branding
    const customIcon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div style="
          background-color: #800020;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: rotate(-45deg);
          left: -15px;
          top: -30px;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    // Add points to the map
    KML_POINTS.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);

      const title = language === "ar" ? point.nameAr : point.nameEn;
      const desc = language === "ar" ? point.descAr : point.descEn;

      const popupContent = `
        <div style="
          text-align: ${dir === "rtl" ? "right" : "left"};
          font-family: system-ui, -apple-system, sans-serif;
          min-width: 180px;
          padding: 2px;
        ">
          <h4 style="
            margin: 0 0 4px 0;
            font-size: 13px;
            font-weight: 700;
            color: #800020;
          ">
            ${title}
          </h4>
          ${desc ? `
            <p style="
              margin: 0;
              font-size: 11px;
              line-height: 1.4;
              color: #4b5563;
            ">
              ${desc}
            </p>
          ` : ""}
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Clean up map instance on component unmount
    return () => {
      map.remove();
    };
  }, [isLeafletLoaded, language, dir]);

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card shadow-lg">
      <div className="relative w-full h-[550px] overflow-hidden bg-muted/20 flex items-center justify-center">
        {!isLeafletLoaded && (
          <div className="flex flex-col items-center gap-2 text-muted-foreground z-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm">
              {language === "ar" ? "جاري تحميل الخريطة التفاعلية..." : "Loading interactive map..."}
            </span>
          </div>
        )}
        <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />
      </div>
    </div>
  );
}
