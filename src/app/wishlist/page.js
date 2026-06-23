"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, ShoppingCart, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import StarRating from "@/components/StarRating";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, isInCart, mounted } = useStore();
  const router = useRouter();

  if (!mounted) {
    return <div className="mx-auto max-w-6xl px-4 py-12" />;
  }

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
            <Heart size="28" style={{ color: "var(--muted-foreground)" }} />
          </div>
        </div>
        <h2 className="mb-1.5 text-xl font-semibold tracking-tight">Your wishlist is empty</h2>
        <p className="mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Save your favorite items and come back to them later.
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white" style={{ background: "var(--accent)" }}>
          Explore Products <ArrowRight size="16" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-1.5 text-xl font-bold tracking-tight sm:text-2xl">My Wishlist</h1>
      <p className="mb-6 text-sm sm:mb-8" style={{ color: "var(--muted-foreground)" }}>
        {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-xl border bg-white p-3 dark:bg-zinc-900/50 sm:p-4"
            style={{ borderColor: "var(--card-border)" }}
          >
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute right-2 top-2 z-10 rounded-md p-1.5 sm:right-3 sm:top-3"
              style={{ background: "var(--muted)" }}
            >
              <Heart size="14" className="fill-current" style={{ color: "var(--destructive)" }} />
            </button>

            <Link href={`/products/${product.id}`}>
              <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-lg sm:mb-4" style={{ background: "var(--muted)" }}>
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mb-1 text-xs font-medium sm:text-sm">{product.name}</h3>
              <div className="mb-1 flex items-center gap-1">
                <StarRating rating={product.rating} size="10" />
              </div>
              <div className="mb-3 flex items-baseline gap-1.5 sm:mb-4 sm:gap-2">
                <span className="text-sm font-semibold sm:text-base" style={{ color: "var(--accent)" }}>${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-[10px] line-through sm:text-xs" style={{ color: "var(--muted-foreground)" }}>${product.originalPrice}</span>
                )}
              </div>
            </Link>

            <button
              onClick={() => {
                const inCart = isInCart(product.id);
                if (inCart) {
                  router.push("/cart");
                  return;
                }
                addToCart(product, product.storage[0], product.colors[0]);
              }}
              className="flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium text-white transition-all hover:opacity-90 sm:gap-1.5 sm:py-2 sm:text-xs"
              style={{ background: "var(--accent)" }}
            >
              {isInCart(product.id) ? <Check size="13" /> : <ShoppingCart size="13" />}
              {isInCart(product.id) ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
