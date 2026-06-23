import Link from "next/link";
import { Heart, ShoppingCart, User, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: "var(--accent)" }}>
                M
              </div>
              <span className="text-lg font-bold tracking-tight">MobileShop</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Your trusted destination for the latest smartphones. Premium devices, expert service, and unbeatable prices.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=flagship" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Flagship Phones
                </Link>
              </li>
              <li>
                <Link href="/products?category=midrange" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Mid-Range Phones
                </Link>
              </li>
              <li>
                <Link href="/products?category=budget" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Budget Phones
                </Link>
              </li>
              <li>
                <Link href="/products?category=foldable" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Foldable Phones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-sm transition-colors" style={{ color: "var(--muted-foreground)" }}>
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <li>support@mobileshop.com</li>
              <li>1-800-MOBILE</li>
              <li>123 Tech Street, Silicon Valley, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          <p>&copy; {new Date().getFullYear()} MobileShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
