"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/ui/components/button";
import { UserMenu } from "@/src/auth/components/user-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/src/ui/components/sheet";
import {
  Home,
  Menu
} from "lucide-react";

const allNavigationItems = [
  {
    href: "/",
    title: "Home",
    icon: Home,
  },
];

function NavigationContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-left">
          <h1 className="text-lg font-bold text-oak-dark">FrenchSalmon NextJS Starter</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {allNavigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
            >
              <Link key={item.href} href={item.href}>
                <Icon className="h-5 w-5" />
                <span className="text-ellipsis max-w-full overflow-hidden">
                  {item.title}
                </span>
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* User Menu at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-center">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
        <NavigationContent />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-oak-dark">FrenchSalmon NextJS Starter</span>
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTitle>FrenchSalmon NextJS Starter</SheetTitle>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <NavigationContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}
