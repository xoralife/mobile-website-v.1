"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { products as staticProducts, categories as staticCategories, brands as staticBrands, reviews as staticReviews } from "./data";

const StoreContext = createContext();

const defaultHeroSlides = [
  { id: 1, title: "iPhone 16 Pro Max", subtitle: "The ultimate iPhone experience", description: "A18 Pro chip · 48MP camera · All-day battery", cta: "Shop Now", link: "/products/1", gradient: "linear-gradient(135deg, #0d1f1d 0%, #13433d 50%, #0d9488 100%)", active: true },
  { id: 2, title: "Galaxy S25 Ultra", subtitle: "Galaxy AI is here", description: "S Pen · 200MP camera · Snapdragon 8 Gen 4", cta: "Explore", link: "/products/2", gradient: "linear-gradient(135deg, #0d1f1d 0%, #1a3c34 50%, #115e59 100%)", active: true },
  { id: 3, title: "Pixel 10 Pro", subtitle: "Google AI at your fingertips", description: "Tensor G5 · 7 years of updates · Best camera", cta: "Discover", link: "/products/5", gradient: "linear-gradient(135deg, #0d1f1d 0%, #0f766e 50%, #14b8a6 100%)", active: true },
];

const defaultFeatures = [
  { id: 1, title: "Free Shipping", desc: "On orders over $50", icon: "Truck" },
  { id: 2, title: "2 Year Warranty", desc: "Full coverage included", icon: "Shield" },
  { id: 3, title: "24/7 Support", desc: "We're here to help", icon: "HeadphonesIcon" },
  { id: 4, title: "30-Day Returns", desc: "No questions asked", icon: "RotateCcw" },
];

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [features, setFeatures] = useState([]);
  const [settings, setSettings] = useState({ name: "MobileShop", tagline: "Premium Smartphones", logo: "M", email: "hello@mobileshop.com", phone: "+1 (555) 123-4567", about: "Your trusted destination for the latest smartphones." });
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    const savedTheme = localStorage.getItem("theme");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist, mounted]);

  useEffect(() => {
    const saved = localStorage.getItem("siteData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProducts(data.products || staticProducts);
        setCategories(data.categories || staticCategories);
        setBrands(data.brands || staticBrands);
        setReviews(data.reviews || staticReviews);
        setHeroSlides(data.heroSlides || defaultHeroSlides);
        setFeatures(data.features || defaultFeatures);
        setSettings(data.settings || { name: "MobileShop", tagline: "Premium Smartphones", logo: "M", email: "hello@mobileshop.com", phone: "+1 (555) 123-4567", about: "Your trusted destination for the latest smartphones." });
      } catch {
        initDefaults();
      }
    } else {
      initDefaults();
    }
    setSiteLoaded(true);
  }, []);

  const initDefaults = () => {
    setProducts(staticProducts);
    setCategories(staticCategories);
    setBrands(staticBrands);
    setReviews(staticReviews);
    setHeroSlides(defaultHeroSlides);
    setFeatures(defaultFeatures);
  };

  const persistSiteData = (updates) => {
    const current = { products, categories, brands, reviews, heroSlides, features, settings };
    const next = { ...current, ...updates };
    localStorage.setItem("siteData", JSON.stringify(next));
  };

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    persistSiteData({ products: newProducts });
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
    persistSiteData({ categories: newCategories });
  };

  const updateBrands = (newBrands) => {
    setBrands(newBrands);
    persistSiteData({ brands: newBrands });
  };

  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    persistSiteData({ reviews: newReviews });
  };

  const updateHeroSlides = (newSlides) => {
    setHeroSlides(newSlides);
    persistSiteData({ heroSlides: newSlides });
  };

  const updateFeatures = (newFeatures) => {
    setFeatures(newFeatures);
    persistSiteData({ features: newFeatures });
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    persistSiteData({ settings: newSettings });
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const addToCart = (product, storage, color) => {
    setCart((prev) => {
      const key = `${product.id}-${storage}-${color}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        { ...product, key, selectedStorage: storage, selectedColor: color, quantity: 1 },
      ];
    });
  };

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <StoreContext.Provider
      value={{
        cart, wishlist, theme, searchQuery, mounted,
        cartCount, cartTotal,
        products, categories, brands, reviews, heroSlides, features, settings, siteLoaded,
        updateProducts, updateCategories, updateBrands, updateReviews,
        updateHeroSlides, updateFeatures, updateSettings,
        toggleTheme, addToCart, updateQuantity, removeFromCart,
        toggleWishlist, isInWishlist, isInCart, setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
