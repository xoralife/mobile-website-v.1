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
    <section className="relative overflow-hidden rounded-2xl" style={{ minHeight: "clamp(320px, 50vw, 440px)" }}>
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
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="max-w-lg lg:max-w-xl">
              <span className="mb-3 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:px-3 sm:py-1 sm:text-[11px]">
                New Arrival
              </span>
              <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:mb-3 sm:text-4xl lg:text-5xl xl:text-6xl">
                {slide.title}
              </h1>
              <p className="mb-1 text-sm font-medium text-white/90 sm:text-base lg:text-lg">{slide.subtitle}</p>
              <p className="mb-5 text-xs text-white/60 sm:mb-8 sm:text-sm lg:text-base">{slide.description}</p>
              <Link
                href={slide.link}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-medium text-zinc-900 transition-all hover:bg-white/90 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {slide.cta}
                <ArrowRight size={14} className="sm:size-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6">
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
