"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Search, ShoppingCart, Heart, Menu, Sun, Moon, X, Shield } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const { cartCount, wishlist, theme, toggleTheme, searchQuery, setSearchQuery, mounted } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: "var(--accent)" }}>
            M
          </div>
          <span className="text-base font-semibold tracking-tight">MobileShop</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400">
            Products
          </Link>
          <Link href="/products?category=flagship" className="text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400">
            Flagship
          </Link>
          <Link href="/products?category=midrange" className="text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400">
            Mid-Range
          </Link>
          <Link href="/admin" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400">
            <Shield className="h-3.5 w-3.5" /> Admin
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-48 rounded-lg border py-2 pl-10 pr-4 text-sm outline-none transition-all focus:w-60"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--muted)",
                  color: "var(--foreground)",
                }}
              />
          </div>

          <button onClick={toggleTheme} className="rounded-lg p-2 transition-colors hover:opacity-70" style={{ background: "var(--muted)" }}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link href="/wishlist" className="relative rounded-lg p-2 transition-colors hover:opacity-70" style={{ background: "var(--muted)" }}>
            <Heart className="h-4 w-4" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "var(--destructive)" }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative rounded-lg p-2 transition-colors hover:opacity-70" style={{ background: "var(--muted)" }}>
            <ShoppingCart className="h-4 w-4" />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "var(--accent)" }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t px-4 py-4 md:hidden" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
              />
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/products?category=flagship" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Flagship</Link>
            <Link href="/products?category=midrange" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Mid-Range</Link>
            <Link href="/cart" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Cart {mounted && cartCount > 0 && `(${cartCount})`}</Link>
            <Link href="/wishlist" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Wishlist {mounted && wishlist.length > 0 && `(${wishlist.length})`}</Link>
            <Link href="/account" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}>Account</Link>
            <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30" onClick={() => setMenuOpen(false)}><Shield className="h-3.5 w-3.5" /> Admin</Link>
            <button onClick={toggleTheme} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
