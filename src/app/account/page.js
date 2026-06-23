"use client";

import { useState } from "react";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { wishlist } = useStore();

  const TabContent = ({ id }) => {
    switch (id) {
      case "profile":
        return (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white" style={{ background: "var(--accent)" }}>
                JD
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">John Doe</h2>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>john.doe@example.com</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>First Name</label>
                <input type="text" defaultValue="John" className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Email</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Phone</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
            </div>

            <button className="mt-6 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90" style={{ background: "var(--accent)" }}>
              Save Changes
            </button>
          </div>
        );
      case "orders":
        return (
          <div className="py-16 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
                <Package size="24" style={{ color: "var(--muted-foreground)" }} />
              </div>
            </div>
            <h3 className="mb-1 text-base font-semibold">No orders yet</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>When you place an order, it will appear here.</p>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--accent)" }}>
              Start Shopping
            </Link>
          </div>
        );
      case "addresses":
        return (
          <div className="rounded-xl border bg-white p-5 dark:bg-zinc-900/50" style={{ borderColor: "var(--card-border)" }}>
            <h3 className="mb-1 text-sm font-medium">Home</h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              123 Main Street, Apt 4B<br />New York, NY 10001<br />United States
            </p>
          </div>
        );
      case "wishlist":
        return (
          <div>
            {wishlist.length === 0 ? (
              <div className="py-16 text-center">
                <p className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>No items in your wishlist yet.</p>
                <Link href="/products" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--accent)" }}>
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {wishlist.map((item) => (
                  <Link key={item.id} href={`/products/${item.id}`} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "var(--card-border)" }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg" style={{ background: "var(--muted)" }}>
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>${item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">My Account</h1>

      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? "var(--muted)" : "transparent",
                  color: "var(--foreground)",
                }}
              >
                <tab.icon size="17" style={{ color: activeTab === tab.id ? "var(--accent)" : "var(--muted-foreground)" }} />
                {tab.label}
              </button>
            ))}
            <button className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium" style={{ color: "var(--destructive)" }}>
              <LogOut size="17" />
              Sign Out
            </button>
          </nav>
        </div>

        <div className="lg:col-span-3">
          <TabContent id={activeTab} />
        </div>
      </div>
    </div>
  );
}
