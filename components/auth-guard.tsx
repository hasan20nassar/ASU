"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("asu_auth");
    const isAuth = auth === "true";
    
    setIsAuthenticated(isAuth);

    const isProtectedPath = pathname.startsWith("/portal");

    if (!isAuth && isProtectedPath) {
      router.push("/login");
    } else if (isAuth && pathname === "/login") {
      router.push("/");
    }
  }, [pathname, router]);

  const isProtectedPath = pathname.startsWith("/portal");

  // Prevent flicker while checking auth on protected routes
  if (isAuthenticated === null && isProtectedPath) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent rendering if not authenticated on a protected route while redirecting
  if (!isAuthenticated && isProtectedPath) {
    return null;
  }

  // Allow children if authenticated OR if we are on an unprotected page
  return <>{children}</>;
}