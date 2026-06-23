"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl border p-4 transition-all hover:shadow-lg"
        style={{ borderColor: "var(--card-border)", background: "var(--card)" }}
      >
        {product.badge && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
            style={{ background: product.badge === "Sale" || product.badge === "Best Value" || product.badge === "Budget Pick" ? "var(--destructive)" : "var(--accent)" }}
          >
            {product.badge}
          </span>
        )}

        {product.originalPrice > product.price && (
          <span
            className="absolute right-3 top-3 z-10 rounded-full px-2 py-1 text-[11px] font-semibold text-white"
            style={{ background: "var(--destructive)" }}
          >
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-12 z-10 rounded-full p-1.5 opacity-0 transition-all group-hover:opacity-100"
          style={{ background: "var(--muted)" }}
        >
          <Heart
            size={16}
            className={inWishlist ? "fill-current" : ""}
            style={{ color: inWishlist ? "var(--destructive)" : "var(--muted-foreground)" }}
          />
        </button>

        <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl" style={{ background: "var(--muted)" }}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mb-2 flex items-center gap-1">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            ({product.reviews})
          </span>
        </div>

        <h3 className="mb-1 text-sm font-semibold leading-tight">{product.name}</h3>

        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm line-through" style={{ color: "var(--muted-foreground)" }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, product.storage[0], product.colors[0]);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
