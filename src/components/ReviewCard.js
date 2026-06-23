import StarRating from "./StarRating";

export default function ReviewCard({ review }) {
  return (
    <div
      className="rounded-xl border bg-white p-5 dark:bg-zinc-900/50"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {review.product} · {review.date}
          </p>
        </div>
      </div>
      <StarRating rating={review.rating} size={13} />
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
