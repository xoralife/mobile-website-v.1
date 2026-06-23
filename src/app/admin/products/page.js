"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search } from "lucide-react";
import { useStore } from "@/lib/store";

export default function AdminProducts() {
  const { products, brands, categories, updateProducts } = useStore();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const getEmptyProduct = () => ({
    name: "", brand: brands[0]?.id || "", category: categories[0]?.id || "",
    price: "", originalPrice: "", rating: "", reviews: "",
    image: "", colors: [], storage: [], badge: "", inStock: true,
    description: "", specs: { Display: "", Processor: "", RAM: "", Battery: "", Camera: "", OS: "" },
  });
  const [form, setForm] = useState(getEmptyProduct);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm(emptyProduct);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (product) => {
    setForm({
      ...product,
      price: String(product.price),
      originalPrice: String(product.originalPrice),
      rating: String(product.rating),
      reviews: String(product.reviews),
      colors: product.colors.join(", "),
      storage: product.storage.join(", "),
    });
    setEditing(product.id);
    setShowForm(true);
  };

  const handleSave = () => {
    const parsed = {
      ...form,
      id: editing || Date.now(),
      price: Number(form.price),
      originalPrice: Number(form.originalPrice) || Number(form.price),
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      storage: form.storage.split(",").map((s) => s.trim()).filter(Boolean),
      badge: form.badge || null,
    };

    if (editing) {
      updateProducts(products.map((p) => (p.id === editing ? parsed : p)));
    } else {
      updateProducts([...products, parsed]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) {
      updateProducts(products.filter((p) => p.id !== id));
    }
  };

  const setSpec = (key, value) => {
    setForm((prev) => ({ ...prev, specs: { ...prev.specs, [key]: value } }));
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
        <input
          type="text" placeholder="Search products..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--muted)" }}>
              <th className="px-4 py-3 text-left font-medium">Product</th>
              <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Brand</th>
              <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
              <th className="px-4 py-3 text-center font-medium hidden lg:table-cell">Stock</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover shrink-0" />
                    <span className="truncate font-medium max-w-[180px]">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize hidden sm:table-cell" style={{ color: "var(--muted-foreground)" }}>{p.brand}</td>
                <td className="px-4 py-3 capitalize hidden md:table-cell" style={{ color: "var(--muted-foreground)" }}>{p.category}</td>
                <td className="px-4 py-3 text-right font-medium">${p.price}</td>
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${p.inStock ? "" : ""}`}
                    style={{ background: p.inStock ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: p.inStock ? "#10b981" : "#ef4444" }}>
                    {p.inStock ? "In Stock" : "Out"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(p)} className="rounded-lg p-1.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="rounded-lg p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30" style={{ color: "var(--destructive)" }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-20" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-2xl rounded-xl border p-6 mx-4" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={resetForm} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Name</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Image URL</label>
                <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Brand</label>
                <select value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}>
                  {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Category</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Price ($)</label>
                <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Original Price ($)</label>
                <input type="number" value={form.originalPrice} onChange={(e) => setForm((p) => ({ ...p, originalPrice: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Rating (0-5)</label>
                <input type="number" step="0.1" min="0" max="5" value={form.rating}
                  onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Review Count</label>
                <input type="number" value={form.reviews} onChange={(e) => setForm((p) => ({ ...p, reviews: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Colors (comma-separated)</label>
                <input value={form.colors} onChange={(e) => setForm((p) => ({ ...p, colors: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Storage (comma-separated)</label>
                <input value={form.storage} onChange={(e) => setForm((p) => ({ ...p, storage: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Badge</label>
                <input value={form.badge || ""} onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value || null }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>In Stock</label>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => setForm((p) => ({ ...p, inStock: true }))}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
                    style={{ background: form.inStock ? "var(--accent)" : "var(--muted)", color: form.inStock ? "#fff" : "var(--foreground)" }}>
                    <Check className="h-3.5 w-3.5" /> Yes
                  </button>
                  <button onClick={() => setForm((p) => ({ ...p, inStock: false }))}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
                    style={{ background: !form.inStock ? "var(--destructive)" : "var(--muted)", color: !form.inStock ? "#fff" : "var(--foreground)" }}>
                    <X className="h-3.5 w-3.5" /> No
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none"
                style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Specifications</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.keys(emptyProduct.specs).map((key) => (
                  <div key={key}>
                    <label className="mb-0.5 block text-xs" style={{ color: "var(--muted-foreground)" }}>{key}</label>
                    <input value={form.specs[key]} onChange={(e) => setSpec(key, e.target.value)}
                      className="w-full rounded-lg border px-3 py-1.5 text-sm outline-none"
                      style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={resetForm} className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                Cancel
              </button>
              <button onClick={handleSave} className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--accent)" }}>
                {editing ? "Update" : "Add"} Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
