"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { products, brands, categories } from "@/lib/data";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const filters = {
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    storage: searchParams.get("storage") || "",
    sort: searchParams.get("sort") || "newest",
  };

  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
  if (filters.brand) {
    filtered = filtered.filter((p) => p.brand === filters.brand);
  }
  if (filters.minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
  }
  if (filters.storage) {
    filtered = filtered.filter((p) => p.storage.includes(filters.storage));
  }

  switch (filters.sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      filtered.sort((a, b) => b.id - a.id);
  }

  const activeFilters = Object.entries(filters).filter(([k, v]) => v && k !== "sort");
  const categoryName = categories.find((c) => c.id === filters.category)?.name;
  const brandName = brands.find((b) => b.id === filters.brand)?.name;
  const hasFilters = activeFilters.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {categoryName || brandName
            ? `${categoryName || ""} ${brandName || ""} Phones`
            : "All Smartphones"}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          {filtered.length} {filtered.length === 1 ? "phone" : "phones"} found
        </p>
      </div>

      {hasFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {activeFilters.map(([key, value]) => (
            <span
              key={key}
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium"
              style={{ background: "var(--muted)", color: "var(--foreground)" }}
            >
              {key === "minPrice" || key === "maxPrice"
                ? `$${value}`
                : key === "category" || key === "brand"
                  ? categories.find((c) => c.id === value)?.name || brands.find((b) => b.id === value)?.name || value
                  : `${key}: ${value}`}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {filtered.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-4xl">📱</div>
            <h3 className="mb-1 text-base font-semibold">No phones found</h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)" }}
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {filtered.length} results
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <FilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-1 h-8 w-56 rounded-md" style={{ background: "var(--muted)" }} />
          <div className="h-4 w-28 rounded-md" style={{ background: "var(--muted)" }} />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: "var(--card-border)" }}>
              <div className="mb-4 aspect-square rounded-lg" style={{ background: "var(--muted)" }} />
              <div className="mb-2 h-3 w-20 rounded" style={{ background: "var(--muted)" }} />
              <div className="mb-1.5 h-4 w-36 rounded" style={{ background: "var(--muted)" }} />
              <div className="mb-4 h-5 w-14 rounded" style={{ background: "var(--muted)" }} />
              <div className="h-9 w-full rounded-lg" style={{ background: "var(--muted)" }} />
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
