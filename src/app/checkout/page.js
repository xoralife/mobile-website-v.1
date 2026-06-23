"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, cartTotal, mounted } = useStore();
  const [submitted, setSubmitted] = useState(false);

  if (!mounted) {
    return <div className="mx-auto max-w-5xl px-4 py-12" />;
  }

  if (cart.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h2 className="mb-1.5 text-xl font-semibold tracking-tight">Nothing to checkout</h2>
        <p className="mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>Your cart is empty. Add some items first.</p>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white" style={{ background: "var(--accent)" }}>
          Browse Products
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle size="36" className="text-green-600" />
          </div>
        </div>
        <h2 className="mb-1.5 text-2xl font-bold tracking-tight">Order Placed!</h2>
        <p className="mb-1 text-sm" style={{ color: "var(--muted-foreground)" }}>Thank you for your purchase.</p>
        <p className="mb-8 text-sm font-medium">Order #ORD-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white" style={{ background: "var(--accent)" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 50 ? 0 : 5;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link href="/cart" className="mb-4 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400 sm:mb-6" style={{ color: "var(--muted-foreground)" }}>
        <ArrowLeft size="16" />
        Back to Cart
      </Link>

      <h1 className="mb-6 text-xl font-bold tracking-tight sm:mb-8 sm:text-2xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest sm:mb-5" style={{ color: "var(--muted-foreground)" }}>Shipping</h2>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>First Name</label>
                <input type="text" placeholder="John" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Last Name</label>
                <input type="text" placeholder="Doe" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Email</label>
                <input type="email" placeholder="john@example.com" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Address</label>
                <input type="text" placeholder="123 Main Street" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>City</label>
                <input type="text" placeholder="New York" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>ZIP Code</label>
                <input type="text" placeholder="10001" className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none sm:px-3.5" style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest sm:mb-5" style={{ color: "var(--muted-foreground)" }}>Payment</h2>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 sm:p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <input type="radio" name="payment" defaultChecked style={{ accentColor: "var(--accent)" }} />
                <CreditCard size="18" style={{ color: "var(--accent)" }} />
                <div>
                  <p className="text-sm font-medium">Credit Card</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Visa, Mastercard, Amex</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 sm:p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <input type="radio" name="payment" style={{ accentColor: "var(--accent)" }} />
                <span className="text-lg">💳</span>
                <div>
                  <p className="text-sm font-medium">PayPal</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Fast & secure</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-2">
          <div className="sticky top-24">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest sm:mb-5" style={{ color: "var(--muted-foreground)" }}>Summary</h2>
            <div className="rounded-xl border bg-white p-4 dark:bg-zinc-900/50 sm:p-5" style={{ borderColor: "var(--card-border)" }}>
              <div className="mb-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-11 sm:w-11" style={{ background: "var(--muted)" }}>
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{item.name}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Qty: {item.quantity}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-3 text-sm sm:pt-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
                  <span className="font-medium">${cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base" style={{ borderColor: "var(--border)" }}>
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>${cartTotal + shipping}</span>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="mt-5 w-full rounded-lg py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 sm:mt-6"
                style={{ background: "var(--accent)" }}
              >
                Place Order — ${cartTotal + shipping}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
