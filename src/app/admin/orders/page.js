"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import { Search, ChevronDown } from "lucide-react";

const statusColors = {
  pending: "#f59e0b",
  shipped: "#3b82f6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

const initialOrders = [
  { id: "ORD-1001", customer: "Alex Chen", email: "alex@example.com", date: "2026-06-20", total: 1199, status: "delivered", items: [products[0]] },
  { id: "ORD-1002", customer: "Sarah Johnson", email: "sarah@example.com", date: "2026-06-19", total: 2598, status: "shipped", items: [products[1], products[6]] },
  { id: "ORD-1003", customer: "Mike Rivera", email: "mike@example.com", date: "2026-06-18", total: 799, status: "pending", items: [products[3]] },
  { id: "ORD-1004", customer: "Emily Zhang", email: "emily@example.com", date: "2026-06-17", total: 999, status: "delivered", items: [products[4]] },
  { id: "ORD-1005", customer: "David Park", email: "david@example.com", date: "2026-06-16", total: 349, status: "cancelled", items: [products[11]] },
  { id: "ORD-1006", customer: "Lisa Thompson", email: "lisa@example.com", date: "2026-06-15", total: 599, status: "delivered", items: [products[5]] },
  { id: "ORD-1007", customer: "James Wilson", email: "james@example.com", date: "2026-06-14", total: 999, status: "shipped", items: [products[16]] },
  { id: "ORD-1008", customer: "Maria Garcia", email: "maria@example.com", date: "2026-06-13", total: 1099, status: "pending", items: [products[17]] },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setMenuId(null);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColors.pending }}></span>
            Pending
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColors.shipped }}></span>
            Shipped
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColors.delivered }}></span>
            Delivered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColors.cancelled }}></span>
            Cancelled
          </span>
        </div>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
        <input
          type="text" placeholder="Search orders..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="rounded-xl border" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <button
              onClick={() => setOpenId(openId === order.id ? null : order.id)}
              className="flex w-full items-center gap-4 px-5 py-3.5 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{order.id}</span>
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                    style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {order.customer} &middot; {order.date}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${order.total.toLocaleString()}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{order.items.length} item{order.items.length > 1 ? "s" : ""}</div>
              </div>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openId === order.id ? "rotate-180" : ""}`}
                style={{ color: "var(--muted-foreground)" }} />
            </button>

            {openId === order.id && (
              <div className="border-t px-5 py-4" style={{ borderColor: "var(--card-border)" }}>
                <div className="mb-3 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Customer</div>
                    <div className="font-medium">{order.customer}</div>
                    <div style={{ color: "var(--muted-foreground)" }}>{order.email}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Order Date</div>
                    <div className="font-medium">{order.date}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Status</div>
                    <div className="relative">
                      <button
                        onClick={() => setMenuId(menuId === order.id ? null : order.id)}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-medium capitalize"
                        style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}
                      >
                        {order.status}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      {menuId === order.id && (
                        <div className="absolute left-0 top-full z-10 mt-1 w-32 rounded-lg border py-1 shadow-lg"
                          style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                          {["pending", "shipped", "delivered", "cancelled"].map((s) => (
                            <button key={s} onClick={() => updateStatus(order.id, s)}
                              className={`flex w-full items-center gap-2 px-3 py-1.5 text-sm capitalize ${s === order.status ? "font-medium" : ""}`}
                              style={{ color: s === order.status ? statusColors[s] : "var(--foreground)" }}>
                              <span className="inline-block h-2 w-2 rounded-full" style={{ background: statusColors[s] }}></span>
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Items</div>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-lg p-2" style={{ background: "var(--muted)" }}>
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium">{item.name}</div>
                        <div className="text-xs capitalize" style={{ color: "var(--muted-foreground)" }}>{item.brand}</div>
                      </div>
                      <div className="text-sm font-medium">${item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
