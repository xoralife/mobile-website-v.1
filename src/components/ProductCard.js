"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useStore();
  const router = useRouter();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="group relative overflow-hidden rounded-xl border bg-white p-3 transition-all hover:shadow-sm dark:bg-zinc-900/50 sm:p-4"
        style={{ borderColor: "var(--card-border)" }}
      >
        {product.badge && (
          <span
            className="absolute left-2 top-2 z-10 rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white sm:left-3 sm:top-3 sm:text-[10px]"
            style={{ background: product.badge === "Sale" || product.badge === "Best Value" || product.badge === "Budget Pick" ? "var(--destructive)" : "var(--accent)" }}
          >
            {product.badge}
          </span>
        )}

        {product.originalPrice > product.price && (
          <span
            className="absolute right-2 top-2 z-10 rounded-md px-1.5 py-0.5 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-2 sm:text-[10px]"
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
          className="absolute right-2 top-11 z-10 rounded-md p-1.5 opacity-100 transition-all group-hover:opacity-100 sm:right-3 sm:top-12 sm:opacity-0"
          style={{ background: "var(--muted)" }}
        >
          <Heart
            size={14}
            className={inWishlist ? "fill-current" : ""}
            style={{ color: inWishlist ? "var(--destructive)" : "var(--muted-foreground)" }}
          />
        </button>

        <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-lg sm:mb-4" style={{ background: "var(--muted)" }}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mb-1.5 flex items-center gap-1">
          <StarRating rating={product.rating} size={11} />
          <span className="text-[10px] sm:text-[11px]" style={{ color: "var(--muted-foreground)" }}>
            ({product.reviews})
          </span>
        </div>

        <h3 className="mb-1.5 text-xs font-medium leading-snug sm:text-sm">{product.name}</h3>

        <div className="mb-3 flex items-baseline gap-1.5 sm:mb-4 sm:gap-2">
          <span className="text-sm font-semibold sm:text-base" style={{ color: "var(--accent)" }}>
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] line-through sm:text-xs" style={{ color: "var(--muted-foreground)" }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (inCart) {
              router.push("/cart");
              return;
            }
            addToCart(product, product.storage[0], product.colors[0]);
          }}
          className="flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium text-white transition-all hover:opacity-90 sm:gap-1.5 sm:py-2 sm:text-xs"
          style={{ background: "var(--accent)" }}
        >
          {inCart ? <Check size={13} /> : <ShoppingCart size={13} />}
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
