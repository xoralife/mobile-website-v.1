"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { brands, categories } from "@/lib/data";

export default function FilterSidebar({ open, onClose }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = {
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    storage: searchParams.get("storage") || "",
    sort: searchParams.get("sort") || "newest",
  };

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = Object.values(filters).some((v) => v);

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Filters</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400" style={{ color: "var(--accent)" }}>
            Clear all
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => setFilter("category", "")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!filters.category ? "font-medium" : ""}`}
            style={{
              background: !filters.category ? "var(--muted)" : "transparent",
              color: "var(--foreground)",
            }}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter("category", cat.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${filters.category === cat.id ? "font-medium" : ""}`}
              style={{
                background: filters.category === cat.id ? "var(--muted)" : "transparent",
                color: "var(--foreground)",
              }}
            >
              {cat.image} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Brand</h4>
        <div className="space-y-1">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setFilter("brand", brand.id === filters.brand ? "" : brand.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${filters.brand === brand.id ? "font-medium" : ""}`}
              style={{
                background: filters.brand === brand.id ? "var(--muted)" : "transparent",
                color: "var(--foreground)",
              }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "var(--accent)" }}>
                {brand.logo}
              </span>
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Price</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-teal-500"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilter("maxPrice", e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-teal-500"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Storage</h4>
        <div className="flex flex-wrap gap-2">
          {["128GB", "256GB", "512GB", "1TB"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter("storage", s === filters.storage ? "" : s)}
              className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                borderColor: filters.storage === s ? "var(--accent)" : "var(--border)",
                background: filters.storage === s ? "var(--accent)" : "transparent",
                color: filters.storage === s ? "white" : "var(--foreground)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Sort</h4>
        <select
          value={filters.sort}
          onChange={(e) => setFilter("sort", e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-teal-500"
          style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">{content}</div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r p-6 shadow-lg lg:hidden"
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Filters</h2>
              <button onClick={onClose} className="p-1"><X size={16} /></button>
            </div>
            {content}
          </div>
        </>
      )}
    </>
  );
}
