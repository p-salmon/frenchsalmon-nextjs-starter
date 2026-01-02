"use client";

import { useState } from "react";
import { SignInForm } from "@/src/auth/components/sign-in-form";
import { SignUpForm } from "@/src/auth/components/sign-up-form";

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        {isSignUp ? (
          <SignUpForm onToggleMode={() => setIsSignUp(false)} />
        ) : (
          <SignInForm onToggleMode={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
}
