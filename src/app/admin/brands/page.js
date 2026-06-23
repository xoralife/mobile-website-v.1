"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminBrands() {
  const { brands, updateBrands, products } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", id: "", logo: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const resetForm = () => {
    setForm({ name: "", id: "", logo: "" });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (brand) => {
    setForm({ name: brand.name, id: brand.id, logo: brand.logo });
    setEditing(brand.id);
    setShowForm(true);
  };

  const handleSave = () => {
    const id = form.id.toLowerCase().replace(/\s+/g, "-");
    if (editing) {
      updateBrands(brands.map((b) => (b.id === editing ? { ...b, name: form.name, logo: form.logo } : b)));
    } else {
      if (brands.some((b) => b.id === id)) return alert("Brand ID already exists!");
      updateBrands([...brands, { id, name: form.name, logo: form.logo }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    const inUse = products.some((p) => p.brand === id);
    if (inUse) return alert("Cannot delete: brand is in use by products. Reassign products first.");
    updateBrands(brands.filter((b) => b.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Brands</h1>
          <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Manage phone brands</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}>
          <Plus className="h-4 w-4" /> Add Brand
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--muted)" }}>
              <th className="px-4 py-3 text-left font-medium">Logo</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-center font-medium">Products</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
            {brands.map((brand) => (
              <tr key={brand.id} className="transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--accent)" }}>
                    {brand.logo}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{brand.name}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{brand.id}</td>
                <td className="px-4 py-3 text-center">{products.filter((p) => p.brand === brand.id).length}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(brand)} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(deleteConfirm === brand.id ? null : brand.id)}
                      className="rounded-lg p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30" style={{ color: "var(--destructive)" }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {deleteConfirm === brand.id && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: "var(--destructive)" }}>
                      <span className="text-xs">Delete {brand.name}?</span>
                      <button onClick={() => handleDelete(brand.id)} className="rounded px-2 py-0.5 text-xs font-medium text-white" style={{ background: "var(--destructive)" }}>Yes</button>
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
              <h2 className="text-lg font-semibold">{editing ? "Edit Brand" : "Add Brand"}</h2>
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
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Logo (single letter)</label>
                <input maxLength={2} value={form.logo} onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={resetForm} className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Cancel</button>
              <button onClick={handleSave} className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--accent)" }}>{editing ? "Update" : "Add"} Brand</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
