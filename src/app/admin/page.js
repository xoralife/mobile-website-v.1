"use client";

import { products, brands, categories, reviews } from "@/lib/data";
import { Package, ShoppingBag, Users, Star, DollarSign, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-xl border p-5" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--muted)" }}>
          <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const totalProducts = products.length;
  const totalBrands = brands.length;
  const totalCategories = categories.length;
  const totalReviews = reviews.length;
  const inStock = products.filter((p) => p.inStock).length;
  const outOfStock = totalProducts - inStock;
  const avgRating = (products.reduce((s, p) => s + p.rating, 0) / totalProducts).toFixed(1);
  const totalRevenue = products.reduce((s, p) => s + p.price, 0);
  const topProduct = products.reduce((best, p) => (p.reviews > best.reviews ? p : best), products[0]);

  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Total Products" value={totalProducts} sub={`${inStock} in stock, ${outOfStock} out`} />
        <StatCard icon={ShoppingBag} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="Combined product prices" />
        <StatCard icon={Star} label="Avg Rating" value={avgRating} sub={`Across ${totalProducts} products`} />
        <StatCard icon={Users} label="Brands" value={totalBrands} sub={`${totalCategories} categories`} />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-5" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
          <h2 className="mb-4 text-base font-semibold">Top Product</h2>
          <div className="flex items-start gap-4">
            <img src={topProduct.image} alt={topProduct.name} className="h-16 w-16 rounded-lg object-cover" />
            <div>
              <div className="font-medium">{topProduct.name}</div>
              <div className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                ${topProduct.price} &middot; {topProduct.rating} stars &middot; {topProduct.reviews} reviews
              </div>
              {topProduct.badge && (
                <span className="mt-1.5 inline-block rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: "var(--accent)", color: "#fff" }}>
                  {topProduct.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
            <TrendingUp className="h-4 w-4" style={{ color: "var(--accent)" }} />
            Quick Stats
          </h2>
          <div className="space-y-3">
            {[
              { label: "Flagship phones", value: products.filter((p) => p.category === "flagship").length },
              { label: "Mid-range phones", value: products.filter((p) => p.category === "midrange").length },
              { label: "Budget phones", value: products.filter((p) => p.category === "budget").length },
              { label: "Foldable phones", value: products.filter((p) => p.category === "foldable").length },
              { label: "Discounted items", value: products.filter((p) => p.originalPrice > p.price).length },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>{stat.label}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
        <div className="border-b px-5 py-3.5" style={{ borderColor: "var(--card-border)" }}>
          <h2 className="text-base font-semibold">Recent Products</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--card-border)" }}>
          {recentProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium">{p.name}</div>
                <div className="text-xs capitalize" style={{ color: "var(--muted-foreground)" }}>{p.brand} &middot; {p.category}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${p.price}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.inStock ? "In Stock" : "Out of Stock"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
