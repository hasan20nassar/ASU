export interface FacultyMember {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  departmentAr: string;
  departmentEn: string;
  facultySlug: string;
  email: string;
  officeHours: string;
  image?: string;
}

export const facultyMembers: FacultyMember[] = [
  // Engineering Faculty
  {
    id: "f1",
    nameAr: "د. أحمد خليل",
    nameEn: "Dr. Ahmed Khalil",
    titleAr: "أستاذ دكتور",
    titleEn: "Professor",
    departmentAr: "الهندسة المدنية",
    departmentEn: "Civil Engineering",
    facultySlug: "engineering",
    email: "a.khalil@asu.edu.sy",
    officeHours: "Sun, Tue 10:00 AM - 12:00 PM",
  },
  {
    id: "f2",
    nameAr: "د. ريم محمود",
    nameEn: "Dr. Reem Mahmoud",
    titleAr: "أستاذ مساعد",
    titleEn: "Associate Professor",
    departmentAr: "هندسة الحاسوب والاتصالات",
    departmentEn: "Computer & Communications Engineering",
    facultySlug: "engineering",
    email: "r.mahmoud@asu.edu.sy",
    officeHours: "Mon, Wed 1:00 PM - 3:00 PM",
  },
  // Dentistry Faculty
  {
    id: "f3",
    nameAr: "أ.د. سامر السيد",
    nameEn: "Prof. Samer Al-Sayed",
    titleAr: "عميد الكلية",
    titleEn: "Dean of Faculty",
    departmentAr: "جراحة الفم والفكين",
    departmentEn: "Oral and Maxillofacial Surgery",
    facultySlug: "dentistry",
    email: "s.alsayed@asu.edu.sy",
    officeHours: "By Appointment",
  },
  // Pharmacy Faculty
  {
    id: "f4",
    nameAr: "د. ليلى عبد الرحمن",
    nameEn: "Dr. Laila Abdulrahman",
    titleAr: "أستاذ مساعد",
    titleEn: "Associate Professor",
    departmentAr: "الصيدلانيات والتقنية الصيدلية",
    departmentEn: "Pharmaceutics and Pharmaceutical Technology",
    facultySlug: "pharmacy",
    email: "l.abdulrahman@asu.edu.sy",
    officeHours: "Thu 9:00 AM - 12:00 PM",
  },
  // Business / Admin Sciences
  {
    id: "f5",
    nameAr: "د. طارق زيدان",
    nameEn: "Dr. Tarek Zaidan",
    titleAr: "مدرس",
    titleEn: "Lecturer",
    departmentAr: "إدارة الأعمال",
    departmentEn: "Business Administration",
    facultySlug: "administrative-sciences",
    email: "t.zaidan@asu.edu.sy",
    officeHours: "Sun, Wed 11:00 AM - 1:00 PM",
  },
  // Arts
  {
    id: "f6",
    nameAr: "د. سارة عثمان",
    nameEn: "Dr. Sarah Othman",
    titleAr: "أستاذ مساعد",
    titleEn: "Associate Professor",
    departmentAr: "اللغة الإنجليزية والترجمة",
    departmentEn: "English Language and Translation",
    facultySlug: "arts",
    email: "s.othman@asu.edu.sy",
    officeHours: "Mon 10:00 AM - 1:00 PM",
  },
  // Law
  {
    id: "f7",
    nameAr: "أ.د. يوسف ناصيف",
    nameEn: "Prof. Youssef Nassif",
    titleAr: "أستاذ دكتور",
    titleEn: "Professor",
    departmentAr: "القانون الخاص",
    departmentEn: "Private Law",
    facultySlug: "law",
    email: "y.nassif@asu.edu.sy",
    officeHours: "Tue, Thu 12:00 PM - 2:00 PM",
  },
];
