"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, ChevronRight } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
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

      <div className="flex-1">
        <div className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Admin</span>
          {pathname !== "/admin" && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="capitalize" style={{ color: "var(--foreground)" }}>
                {pathname.split("/").pop()}
              </span>
            </>
          )}
        </div>
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
        <div className="flex items-center justify-around py-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium"
                style={{ color: isActive ? "var(--accent)" : "var(--muted-foreground)" }}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
