"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function HeroSection() {
  const { heroSlides, siteLoaded } = useStore();
  const [current, setCurrent] = useState(0);
  const activeSlides = heroSlides.filter((s) => s.active);

  useEffect(() => {
    if (activeSlides.length < 2) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % activeSlides.length), 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (!siteLoaded || activeSlides.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl" style={{ minHeight: "440px" }}>
      {activeSlides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 flex items-center transition-all duration-700 ease-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: `translateX(${(i - current) * 100}%)`,
            background: slide.gradient,
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-xl">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
                New Arrival
              </span>
              <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mb-1 text-lg font-medium text-white/90">{slide.subtitle}</p>
              <p className="mb-8 text-base text-white/60">{slide.description}</p>
              <Link
                href={slide.link}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-white/90"
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "white" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
