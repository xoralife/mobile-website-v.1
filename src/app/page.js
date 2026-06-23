"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Truck, Shield, HeadphonesIcon, RotateCcw, Star, Send, Check } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import { useStore } from "@/lib/store";

const iconMap = { Truck, Shield, HeadphonesIcon, RotateCcw };

export default function HomePage() {
  const { products, categories, brands, reviews, features, updateReviews } = useStore();
  const [fbName, setFbName] = useState("");
  const [fbRating, setFbRating] = useState(0);
  const [fbText, setFbText] = useState("");
  const [fbSubmitted, setFbSubmitted] = useState(false);

  const handleFeedback = (e) => {
    e.preventDefault();
    if (!fbName.trim() || !fbText.trim() || fbRating === 0) return;
    const newReview = {
      id: Date.now(),
      name: fbName.trim(),
      avatar: fbName.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
      rating: fbRating,
      text: fbText.trim(),
      product: "General Feedback",
      date: "Just now",
    };
    updateReviews([...reviews, newReview]);
    setFbName("");
    setFbRating(0);
    setFbText("");
    setFbSubmitted(true);
  };
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.badge === "Popular" || p.badge === "Most Popular");
  const newArrivals = products.filter((p) => p.badge === "New" || p.id > 10);
  const saleProducts = products.filter((p) => p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="py-8 sm:py-10 lg:py-12">
        <HeroSection />
      </section>

      <section className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {features.map((f) => {
          const Icon = iconMap[f.icon] || Truck;
          return (
            <div
              key={f.id}
              className="flex flex-col items-center rounded-xl border bg-white p-5 text-center dark:bg-zinc-900/50"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--muted)" }}>
                <Icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <p className="text-sm font-medium">{f.title}</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {f.desc}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400" style={{ color: "var(--accent)" }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`}>
              <div
                className="flex flex-col items-center rounded-xl border bg-white p-6 text-center transition-all hover:shadow-sm dark:bg-zinc-900/50"
                style={{ borderColor: "var(--card-border)" }}
              >
                <span className="mb-2 text-3xl">{cat.image}</span>
                <p className="text-sm font-medium">{cat.name}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {cat.count} phones
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Best Sellers</h2>
          <Link href="/products?sort=rating" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400" style={{ color: "var(--accent)" }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">New Arrivals</h2>
          <Link href="/products?sort=newest" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400" style={{ color: "var(--accent)" }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {saleProducts.length > 0 && (
        <section className="mb-14 overflow-hidden rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 p-8 sm:p-12">
          <div className="flex flex-col items-center text-center text-white">
            <span className="mb-2 inline-block rounded-md bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
              Limited Time Offer
            </span>
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Summer Sale</h2>
            <p className="mb-6 max-w-md text-sm text-white/70">
              Up to 30% off on selected smartphones. Don&apos;t miss out on these incredible deals.
            </p>
            <Link
              href="/products?sort=price-low"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-white/90"
            >
              Shop Deals <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Trusted Brands</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${brand.id}`}
              className="flex flex-col items-center rounded-xl border bg-white p-4 transition-all hover:shadow-sm dark:bg-zinc-900/50"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div
                className="mb-2 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "var(--accent)" }}
              >
                {brand.logo}
              </div>
              <span className="text-xs font-medium">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">What Our Customers Say</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mx-auto max-w-lg">
          <div className="rounded-xl border p-6 sm:p-8 text-center" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <h2 className="mb-1.5 text-xl font-semibold tracking-tight">Share Your Feedback</h2>
            <p className="mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>Help us improve! Let us know what you think about our store.</p>

            {fbSubmitted ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(16,185,129,0.15)" }}>
                  <Check size="24" style={{ color: "#10b981" }} />
                </div>
                <div>
                  <p className="font-medium">Thank you for your feedback!</p>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>We appreciate your support.</p>
                </div>
                <button onClick={() => setFbSubmitted(false)} className="mt-2 text-sm font-medium transition-colors hover:text-teal-600" style={{ color: "var(--accent)" }}>
                  Write another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedback} className="space-y-4 text-left">
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Your Name</label>
                  <input type="text" value={fbName} onChange={(e) => setFbName(e.target.value)} placeholder="Enter your name" required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Rating</label>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setFbRating(star)}
                        className="rounded-md p-1 transition-all hover:scale-110">
                        <Star size="24" className={star <= fbRating ? "fill-current" : ""}
                          style={{ color: star <= fbRating ? "var(--star)" : "var(--border)" }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Your Message</label>
                  <textarea rows={3} value={fbText} onChange={(e) => setFbText(e.target.value)} placeholder="Tell us about your experience..." required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none resize-none"
                    style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
                </div>

                <button type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: fbName.trim() && fbText.trim() && fbRating > 0 ? "var(--accent)" : "var(--muted-foreground)" }}>
                  <Send size="15" /> Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
