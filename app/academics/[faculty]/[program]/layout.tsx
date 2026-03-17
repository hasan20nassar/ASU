import { faculties } from "@/data/programs";

// Required for static export - must be in a Server Component
export function generateStaticParams() {
  return faculties.flatMap((faculty) =>
    faculty.programs.map((program) => ({
      faculty: faculty.slug,
      program: program.slug,
    }))
  );
}

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
