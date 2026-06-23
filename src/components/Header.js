"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Search, ShoppingCart, Heart, Menu, Sun, Moon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { cartCount, wishlist, theme, toggleTheme, searchQuery, setSearchQuery, mounted } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: "var(--accent)" }}>
            M
          </div>
          <span className="text-lg font-bold tracking-tight">MobileShop</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-opacity hover:opacity-70">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium transition-opacity hover:opacity-70">
            Products
          </Link>
          <Link href="/products?category=flagship" className="text-sm font-medium transition-opacity hover:opacity-70">
            Flagship
          </Link>
          <Link href="/products?category=midrange" className="text-sm font-medium transition-opacity hover:opacity-70">
            Mid-Range
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              placeholder="Search phones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 rounded-xl border py-2 pl-10 pr-4 text-sm outline-none transition-all focus:w-64"
              style={{
                borderColor: "var(--border)",
                background: "var(--muted)",
                color: "var(--foreground)",
              }}
            />
          </div>

          <button onClick={toggleTheme} className="rounded-xl p-2 transition-colors" style={{ background: "var(--muted)" }}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/wishlist"
            className="relative rounded-xl p-2 transition-colors"
            style={{ background: "var(--muted)" }}
          >
            <Heart className="h-4 w-4" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--destructive)" }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-xl p-2 transition-colors"
            style={{ background: "var(--muted)" }}
          >
            <ShoppingCart className="h-4 w-4" />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--accent)" }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="w-full rounded-xl border py-2 pl-10 pr-4 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
          </div>
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link href="/products?category=flagship" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Flagship
            </Link>
            <Link href="/products?category=midrange" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Mid-Range
            </Link>
            <Link href="/cart" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link href="/wishlist" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Wishlist {mounted && wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link href="/account" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-medium">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
