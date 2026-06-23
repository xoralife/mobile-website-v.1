"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { cart, cartTotal, mounted } = useStore();

  if (!mounted) {
    return <div className="mx-auto max-w-3xl px-4 py-12" />;
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
            <ShoppingBag size="28" style={{ color: "var(--muted-foreground)" }} />
          </div>
        </div>
        <h2 className="mb-1.5 text-xl font-semibold tracking-tight">Your cart is empty</h2>
        <p className="mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Start Shopping <ArrowRight size="16" />
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 50 ? 0 : 5;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Shopping Cart</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
        {cart.reduce((s, i) => s + i.quantity, 0)} {cart.reduce((s, i) => s + i.quantity, 0) === 1 ? "item" : "items"}
      </p>

      <div className="mb-8 space-y-3">
        {cart.map((item) => (
          <CartItem key={item.key} item={item} />
        ))}
      </div>

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900/50" style={{ borderColor: "var(--card-border)" }}>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
            <span className="font-medium">${cartTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
            <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Free shipping on orders over $50 (${(50 - cartTotal).toFixed(0)} away)
            </p>
          )}
          <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>
                ${cartTotal + shipping}
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Proceed to Checkout <ArrowRight size="16" />
        </Link>
      </div>
    </div>
  );
}
