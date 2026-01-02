"use client";

import { useSession } from "@/src/auth/auth-client";
import { AuthPage } from "@/src/auth/components/auth-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPageRoute() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect via useEffect
  }

  return <AuthPage />;
}
