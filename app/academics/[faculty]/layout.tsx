import { faculties } from "@/data/programs";

// Required for static export - must be in a Server Component
export function generateStaticParams() {
  return faculties.map((faculty) => ({
    faculty: faculty.slug,
  }));
}

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
