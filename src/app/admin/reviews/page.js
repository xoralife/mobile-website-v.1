"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Trash2, Search, Star } from "lucide-react";

export default function AdminReviews() {
  const { reviews, updateReviews } = useStore();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = reviews.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.product.toLowerCase().includes(search.toLowerCase()) ||
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    updateReviews(reviews.filter((r) => r.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Manage customer reviews ({reviews.length} total)</p>
        </div>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
        <input type="text" placeholder="Search reviews..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
      </div>

      <div className="space-y-3">
        {filtered.map((review) => (
          <div key={review.id} className="rounded-xl border p-4" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--accent)" }}>
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{review.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} size="11" className={i < review.rating ? "fill-current" : ""}
                            style={{ color: i < review.rating ? "var(--star)" : "var(--border)" }} />
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{review.date}</span>
                    </div>
                  </div>
                  <button onClick={() => setDeleteConfirm(deleteConfirm === review.id ? null : review.id)}
                    className="rounded-lg p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 shrink-0" style={{ color: "var(--destructive)" }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-1.5 text-xs font-medium capitalize" style={{ color: "var(--muted-foreground)" }}>on {review.product}</div>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>&ldquo;{review.text}&rdquo;</p>
              </div>
            </div>
            {deleteConfirm === review.id && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: "var(--destructive)" }}>
                <span className="text-xs">Delete this review?</span>
                <button onClick={() => handleDelete(review.id)} className="rounded px-2 py-0.5 text-xs font-medium text-white" style={{ background: "var(--destructive)" }}>Delete</button>
                <button onClick={() => setDeleteConfirm(null)} className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)" }}>Keep</button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>No reviews found</div>
        )}
      </div>
    </>
  );
}
