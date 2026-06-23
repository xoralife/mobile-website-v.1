"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const iconOptions = ["📱", "📲", "📞", "📂", "🎮", "⌚", "💻", "📷", "🎧", "🔋"];

export default function AdminCategories() {
  const { categories, updateCategories, products } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", id: "", image: iconOptions[0] });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const resetForm = () => {
    setForm({ name: "", id: "", image: iconOptions[0] });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (cat) => {
    setForm({ name: cat.name, id: cat.id, image: cat.image });
    setEditing(cat.id);
    setShowForm(true);
  };

  const handleSave = () => {
    const id = form.id.toLowerCase().replace(/\s+/g, "-");
    const count = products.filter((p) => p.category === id).length;
    if (editing) {
      updateCategories(categories.map((c) => (c.id === editing ? { ...c, name: form.name, image: form.image } : c)));
    } else {
      if (categories.some((c) => c.id === id)) return alert("Category ID already exists!");
      updateCategories([...categories, { id, name: form.name, image: form.image, count }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    const inUse = products.some((p) => p.category === id);
    if (inUse) return alert("Cannot delete: category is in use by products. Reassign products first.");
    updateCategories(categories.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  const updateCount = (id, newId) => {
    const newCat = id === newId ? form.name.toLowerCase().replace(/\s+/g, "-") : newId;
    updateCategories(categories.map((c) => ({
      ...c,
      count: c.id === newCat ? products.filter((p) => p.category === c.id).length : c.count,
    })));
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Manage product categories</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--muted)" }}>
              <th className="px-4 py-3 text-left font-medium">Icon</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-center font-medium">Products</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
            {categories.map((cat) => (
              <tr key={cat.id} className="transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-4 py-3 text-xl">{cat.image}</td>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{cat.id}</td>
                <td className="px-4 py-3 text-center">{products.filter((p) => p.category === cat.id).length}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(cat)} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(deleteConfirm === cat.id ? null : cat.id)}
                      className="rounded-lg p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30" style={{ color: "var(--destructive)" }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {deleteConfirm === cat.id && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: "var(--destructive)" }}>
                      <span className="text-xs">Delete {cat.name}?</span>
                      <button onClick={() => handleDelete(cat.id)} className="rounded px-2 py-0.5 text-xs font-medium text-white" style={{ background: "var(--destructive)" }}>Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className="rounded px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)" }}>No</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-20 pb-20" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-md rounded-xl border p-6 mx-4" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? "Edit Category" : "Add Category"}</h2>
              <button onClick={resetForm} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Name</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
              {!editing && (
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>ID (slug)</label>
                  <input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
                </div>
              )}
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((ico) => (
                    <button key={ico} onClick={() => setForm((p) => ({ ...p, image: ico }))}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-all ${form.image === ico ? "ring-2" : ""}`}
                      style={{ background: "var(--muted)", ringColor: form.image === ico ? "var(--accent)" : "transparent" }}>
                      {ico}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={resetForm} className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Cancel</button>
              <button onClick={handleSave} className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--accent)" }}>{editing ? "Update" : "Add"} Category</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
