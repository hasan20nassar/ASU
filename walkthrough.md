# 🏛️ ASU Web Application - AI Agent Context & Walkthrough

This document serves as a comprehensive system blueprint and code walkthrough for AI agents. It contains all architectural details, file structures, state management mechanisms, dynamic hooks, and implementation guidelines for the Antioch Syrian University (ASU) web application.

---

## 📌 1. Project Context & Purpose

The ASU application is a multilingual academic portal for Antioch Syrian University (located in Maarat Saidnaya, Syria). It provides:
- A public university website detailing faculties, programs, campus life, admissions, and research.
- A private student and faculty portal (`/portal`, `/dashboard`, `/login`) to manage grades, registrations, courses, and schedules.

---

## 🎨 2. Tech Stack & Dependencies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict type safety)
- **Styling**: Tailwind CSS v4 (using OKLCH color palettes)
- **UI Base**: Shadcn/UI (Radix UI primitives)
- **Animations**: Framer Motion 12 & Tailwind Animate
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis Scroll
- **Forms**: React Hook Form + Zod validation
- **Data Visualizations**: Recharts

---

## 📂 3. Directory Map & Architecture

Here is the functional breakdown of the codebase:

```text
├── app/                        # Pages & Routing (Next.js App Router)
│   ├── layout.tsx              # Root Layout wrapping Providers, Navbar, Footer, & Lenis Scroll
│   ├── globals.css             # Main styling, Tailwind CSS v4 variables, & font setups
│   ├── page.tsx                # Main Landing Page
│   ├── about/                  # About ASU, history, and mission
│   ├── academics/              # Faculties, departments, & program finder
│   ├── admissions/             # Admission criteria, fees, & scholarship details
│   ├── campus-life/            # Student activities, news, & campus details
│   ├── contact/                # Contact form (React Hook Form + Zod)
│   ├── dashboard/              # Student/Faculty interactive dashboard (Recharts, schedules)
│   ├── library/                # Digital library catalog page
│   ├── login/                  # Portal login screen
│   ├── portal/                 # Student portal landing page
│   ├── privacy/ & terms/       # Legal agreements pages
│   └── research/               # Academic papers and research showcase
│
├── components/                 # Reusable components (Modular structure)
│   ├── ui/                     # Atomic UI Elements (Button, Input, Card, Table, Select)
│   ├── layout/                 # Global UI (Navbar, Footer, LanguageSwitcher, ThemeToggle)
│   ├── home/ / academics/ etc. # Feature-specific components (e.g. GravityHero, FacultiesGrid)
│   ├── auth-guard.tsx          # Protects client-side dashboard routes
│   ├── html-dir-updater.tsx    # Synchronizes HTML direction and font family based on locale
│   └── smooth-scroll.tsx       # React Lenis scroll wrapper for smooth scrolling
│
├── contexts/                   # State Providers (React Context)
│   ├── language-context.tsx    # Bilingual i18n manager (ar/en) + RTL/LTR direction controller
│   └── theme-context.tsx       # Light/Dark mode state management
│
├── data/                       # Mock databases and configuration files (Centralized text content)
│   ├── contact.ts              # Contact details and department contact numbers
│   ├── dashboard.ts            # Student grades, active courses, GPA trends, and schedules
│   ├── faculty.ts              # Listing of all professors, titles, and departments
│   ├── faculty-details.ts      # Detailed academic profiles for professors (office hours, publications)
│   ├── news.ts                 # University news, announcements, and events
│   ├── portal.ts               # Student portal navigation options and tools
│   ├── programs.ts             # Master database of academic programs, credit hours, and admission limits
│   └── top-students.ts         # Academic honor roll database
│
├── hooks/                      # Custom React Hooks
│   ├── use-mobile.ts           # Media query hook for mobile screen detection
│   └── use-toast.ts            # Hook to trigger sonner/shadcn notifications
│
└── lib/                        # Helper utils and configurations
    └── utils.ts                # Class name merger (clsx + tailwind-merge)
```

---

## 🔄 4. Core System Mechanics

### 1. Internationalization (i18n) & RTL/LTR Direction
The application manages translations in-memory through `contexts/language-context.tsx`. It handles English (LTR) and Arabic (RTL).

- **Hook**: `useLanguage()`
- **Core API**:
  ```tsx
  import { useLanguage } from "@/contexts/language-context";

  const { language, setLanguage, t, dir } = useLanguage();
  // language: "ar" | "en"
  // setLanguage: (lang: "ar" | "en") => void
  // t: (key: string) => string
  // dir: "rtl" | "ltr"
  ```
- **RTL Synchronizer**: The `components/html-dir-updater.tsx` runs a client effect that updates the `<html>` attributes dynamically:
  ```ts
  const html = document.documentElement;
  html.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  html.setAttribute("lang", language);
  html.style.fontFamily = language === "ar" 
    ? "'Tajawal', 'Cairo', sans-serif" 
    : "'Inter', sans-serif";
  ```

### 2. Smooth Scrolling (Lenis)
Smooth scrolling is initialized globally in `app/layout.tsx` using `components/smooth-scroll.tsx` which wraps the app in `<ReactLenis root>` from `lenis/react`.

### 3. Client Components Directive
Use `"use client";` strictly at the top of components that involve:
- Hooks (`useState`, `useEffect`, `useContext`)
- Browser-specific event handlers (`onClick`, `onChange`)
- Animation components (`framer-motion`)

---

## 📜 5. Crucial Coding Rules for AI Agents

To maintain code structure, AI agents MUST follow these rules (derived from `AI_RULES.md`):

1. **Single Component Per File**: Never group multiple component definitions into a single file. Create a separate `.tsx` file for each sub-component.
2. **Component File Sizing**: Keep component files under **100 lines** of code. If a component grows larger, refactor it by extracting sub-sections into child components.
3. **No Hardcoded Strings**: All text content shown to the user must use the `t("translation.key")` translation function. Translation keys are mapped in `contexts/language-context.tsx`.
4. **Tailwind Breakpoints**: Always code with a mobile-first approach. Use responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`) for layout grids and flex directions.
5. **RTL Formatting**: Do not hardcode padding directions. Instead of `pl-4` or `pr-4`, consider dynamic classes or standard logical properties like `ps-4` and `pe-4` (supported in Tailwind) or apply RTL direction-based conditional logic if necessary.

---

## 🛠️ 6. Code Examples & Patterns

### Translation Hook Usage (Client Component)
```tsx
"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";

export function WelcomeMessage() {
  const { t, dir } = useLanguage();

  return (
    <div className="flex flex-col gap-2" dir={dir}>
      <h1 className="text-2xl font-bold font-sans text-foreground">
        {t("hero.title")}
      </h1>
      <p className="text-muted-foreground text-sm">
        {t("hero.description")}
      </p>
    </div>
  );
}
```

### Accessing Mock Data
Mock data configuration is stored in `data/`. For example, retrieving academic programs:
```typescript
import { programs } from "@/data/programs";

// Structure of a program:
// {
//   id: "civil-eng",
//   facultyId: "engineering",
//   nameAr: "الهندسة المدنية",
//   nameEn: "Civil Engineering",
//   creditHours: 160,
//   years: 5,
//   minScore: 70
// }
```

When rendering lists from `data/`, check the active language and select the correct field:
```tsx
const programName = language === "ar" ? program.nameAr : program.nameEn;
```

---

## 📝 7. Walkthrough Verification Checklist

When building/modifying features in this codebase:
- [ ] Test screen responsiveness on Mobile, Tablet, and Desktop screen widths.
- [ ] Verify both **Arabic (RTL)** and **English (LTR)** layouts do not break, text wraps correctly, and alignment flips perfectly.
- [ ] Confirm that all added user interface strings are registered in `contexts/language-context.tsx` and fetched via `t()`.
- [ ] Check console logs to ensure no rendering mismatches, hydrate issues, or Radix UI errors.
