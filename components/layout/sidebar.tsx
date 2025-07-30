"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { NAVIGATION_ITEMS, ROLE_LABELS } from "@/lib/constants";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  DollarSign,
  BarChart3,
  Coins,
  Home,
  LogOut,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Users,
  GraduationCap,
  DollarSign,
  BarChart3,
  Coins,
  Home,
};

export function Sidebar() {
  const pathname = usePathname();
  const { userRole, logout, isHydrated } = useAuthStore();

  // Don't render sidebar until hydrated to prevent hydration mismatch
  if (!isHydrated || !userRole) {
    return null;
  }

  const navigationItems = NAVIGATION_ITEMS[userRole] || [];

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Edu-Lider</h1>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-2 px-4">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-secondary"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="mb-4 px-4">
          <p className="text-sm font-medium">Logged in as</p>
          <p className="text-sm text-muted-foreground">
            {ROLE_LABELS[userRole]}
          </p>
        </div>
        <Button variant="outline" className="w-full" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
