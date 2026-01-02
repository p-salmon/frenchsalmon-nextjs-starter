"use client";

import { useState } from "react";
import { signIn } from "@/src/auth/auth-client";
import { Button } from "@/src/ui/components/button";
import { Input } from "@/src/ui/components/input";
import { Label } from "@/src/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/components/card";
import { Alert, AlertDescription } from "@/src/ui/components/alert";

interface SignInFormProps {
  onToggleMode?: () => void;
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Failed to sign in");
      } else {
        // Redirect will be handled by Better Auth
        window.location.reload();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive" className="mb-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-11 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          {onToggleMode && (
            <div className="text-center text-sm pt-2">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Button
                type="button"
                variant="link"
                onClick={onToggleMode}
                disabled={isLoading}
                className="h-auto p-0 text-sm font-medium"
              >
                Sign up
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
