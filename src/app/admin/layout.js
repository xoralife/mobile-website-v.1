"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Image, Tags, Building2, Star, Settings, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Slides", icon: Image },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/brands", label: "Brands", icon: Building2 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--foreground)",
                }}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "var(--muted-foreground)" }}>
            <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400">Home</Link>
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Admin</span>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="capitalize" style={{ color: "var(--foreground)" }}>
                  {pathname.split("/").pop()}
                </span>
              </>
            )}
          </div>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMobileNav(!mobileNav)} style={{ background: "var(--muted)" }}>
            {mobileNav ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileNav && (
          <div className="mb-4 flex flex-wrap gap-1.5 rounded-xl border p-3 md:hidden" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNav(false)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background: isActive ? "var(--accent)" : "var(--muted)",
                    color: isActive ? "#fff" : "var(--foreground)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
        <div className="flex items-center justify-around py-1.5">
          {sidebarLinks.slice(0, 5).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-0.5 px-1.5 py-1 text-[10px] font-medium"
                style={{ color: isActive ? "var(--accent)" : "var(--muted-foreground)" }}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
