"use client";

import { useState } from "react";
import { signUp } from "@/src/auth/auth-client";
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

interface SignUpFormProps {
  onToggleMode?: () => void;
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || "Failed to create account");
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
          Create an account
        </CardTitle>
        <CardDescription className="text-base">
          Enter your information to get started
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
            <Label htmlFor="name" className="text-sm font-medium">
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={8}
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={8}
              className="h-11"
            />
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>

          {onToggleMode && (
            <div className="text-center text-sm pt-2">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Button
                type="button"
                variant="link"
                onClick={onToggleMode}
                disabled={isLoading}
                className="h-auto p-0 text-sm font-medium"
              >
                Sign in
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
