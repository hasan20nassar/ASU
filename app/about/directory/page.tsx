import { Metadata } from "next";
import { FacultyDirectory } from "@/components/about/faculty-directory";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "دليل أعضاء الكادر الأكاديمي | Faculty Directory - Antioch Syrian University",
  description: "ابحث وتواصل مع أعضاء هيئة التدريس والباحثين في جامعة أنطاكية السورية",
};

export default function FacultyDirectoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-primary">
              دليل أعضاء هيئة التدريس
            </h1>
            <h2 className="text-xl text-muted-foreground mt-2 font-medium">Faculty Directory</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              تعرّف على نخبة الأساتذة والباحثين في جامعة أنطاكية السورية. يمكنك البحث والتواصل المباشر مع أعضاء الهيئة التدريسية ومعرفة مجالات تخصصهم وأوقات الساعات المكتبية.
            </p>
          </div>
          
          <FacultyDirectory />
        </div>
      </main>
      <Footer />
    </div>
  );
}
