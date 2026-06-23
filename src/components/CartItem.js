"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <div
      className="flex gap-4 rounded-xl border bg-white p-4 dark:bg-zinc-900/50"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{ background: "var(--muted)" }}
      >
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {item.selectedStorage} ·{" "}
            <span
              className="inline-block h-2.5 w-2.5 rounded-full align-middle"
              style={{ background: item.selectedColor }}
            />
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.key, -1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.key, 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
              ${item.price * item.quantity}
            </span>
            <button
              onClick={() => removeFromCart(item.key)}
              className="rounded-md p-1.5 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
