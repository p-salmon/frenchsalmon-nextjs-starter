"use client";

import { ProtectedRoute } from "@/src/auth/components/protected-route";

export default function HomePage() {

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-warm">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <p>Hello World!</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
