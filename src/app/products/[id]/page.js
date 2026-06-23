"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Heart, ShoppingCart, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { products, reviews } from "@/lib/data";
import { useStore } from "@/lib/store";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useStore();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(params.id));
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);

  if (!product) notFound();

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const productReviews = reviews.filter((r) => r.product === product.name);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ChevronLeft size="16" />
        Back to Products
      </Link>

      <div className="mb-16 grid gap-10 lg:grid-cols-2">
        <div>
          <div
            className="flex aspect-square items-center justify-center overflow-hidden rounded-xl"
            style={{ background: "var(--muted)" }}
          >
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          {product.badge && (
            <span
              className="mb-4 inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white"
              style={{
                background: product.badge === "Sale" || product.badge === "Best Value" || product.badge === "Budget Pick"
                  ? "var(--destructive)" : "var(--accent)",
              }}
            >
              {product.badge}
            </span>
          )}

          <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>

          <div className="mb-5 flex items-center gap-3">
            <StarRating rating={product.rating} size="15" />
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-base line-through" style={{ color: "var(--muted-foreground)" }}>
                  ${product.originalPrice}
                </span>
                <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: product.inStock ? "#dcfce7" : "#fef2f2" }}>
              {product.inStock ? <Check size="12" className="text-green-600" /> : <span className="text-[9px] font-bold text-red-600">X</span>}
            </div>
            <span className="text-sm font-medium" style={{ color: product.inStock ? "var(--foreground)" : "var(--destructive)" }}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {product.description}
          </p>

          <div className="mb-6">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Storage</p>
            <div className="flex flex-wrap gap-2">
              {product.storage.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStorage(s)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    borderColor: selectedStorage === s ? "var(--accent)" : "var(--border)",
                    background: selectedStorage === s ? "var(--accent)" : "transparent",
                    color: selectedStorage === s ? "white" : "var(--foreground)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Color</p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all"
                  style={{
                    borderColor: selectedColor === c ? "var(--accent)" : "var(--border)",
                    background: c,
                  }}
                >
                  {selectedColor === c && (
                    <Check size="13" className={["#ffffff","#f8f9fa","#e0e1dd","#f5f5f5","#edf2f4","#e8e8e8","#f0f0f0","#dfe6e9"].includes(c) ? "text-black" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (inCart) {
                  router.push("/cart");
                  return;
                }
                addToCart(product, selectedStorage, selectedColor);
              }}
              disabled={!product.inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              {inCart ? <Check size="17" /> : <ShoppingCart size="17" />}
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all"
              style={{ borderColor: "var(--border)" }}
            >
              <Heart size="17" className={inWishlist ? "fill-current" : ""} style={{ color: inWishlist ? "var(--destructive)" : "var(--foreground)" }} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Free Shipping" },
              { icon: Shield, text: "2 Year Warranty" },
              { icon: RotateCcw, text: "30-Day Returns" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center rounded-lg py-3 text-center" style={{ background: "var(--muted)" }}>
                <item.icon size="16" style={{ color: "var(--accent)" }} />
                <span className="mt-1 text-[11px] font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">Specifications</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between rounded-lg border px-4 py-3"
              style={{ borderColor: "var(--card-border)" }}
            >
              <span className="text-sm font-medium">{key}</span>
              <span className="text-sm text-right max-w-[60%]" style={{ color: "var(--muted-foreground)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {productReviews.length > 0 && (
        <div className="mb-14">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">Customer Reviews</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {productReviews.map((review) => (
              <div key={review.id} className="rounded-xl border bg-white p-5 dark:bg-zinc-900/50" style={{ borderColor: "var(--card-border)" }}>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ background: "var(--accent)" }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="12" />
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-14">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">Related Products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
