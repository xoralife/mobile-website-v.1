import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(star <= Math.round(rating) ? "fill-current" : "fill-none")}
          style={{
            color: star <= Math.round(rating) ? "var(--star)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}
