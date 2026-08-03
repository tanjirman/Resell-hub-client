"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (isPending) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/api/profile/${session.user.email}`
        );

        const user = await res.json();

        if (user.role !== "admin") {
          router.replace("/");
          return;
        }

        setChecking(false);
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    };

    checkAdmin();
  }, [session, isPending, router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Checking permissions...
      </div>
    );
  }

  return children;
}