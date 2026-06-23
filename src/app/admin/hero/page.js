"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

const gradientPresets = [
  "linear-gradient(135deg, #0d1f1d 0%, #13433d 50%, #0d9488 100%)",
  "linear-gradient(135deg, #0d1f1d 0%, #1a3c34 50%, #115e59 100%)",
  "linear-gradient(135deg, #0d1f1d 0%, #0f766e 50%, #14b8a6 100%)",
  "linear-gradient(135deg, #1a0d2e 0%, #3d1a6e 50%, #7c3aed 100%)",
  "linear-gradient(135deg, #2d1a0d 0%, #6e3d1a 50%, #ed8936 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
];

export default function AdminHero() {
  const { heroSlides, updateHeroSlides } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", cta: "", link: "", gradient: gradientPresets[0], active: true });

  const resetForm = () => {
    setForm({ title: "", subtitle: "", description: "", cta: "", link: "", gradient: gradientPresets[0], active: true });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (slide) => {
    setForm({ ...slide });
    setEditing(slide.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      updateHeroSlides(heroSlides.map((s) => (s.id === editing ? { ...form, id: editing } : s)));
    } else {
      const newId = Math.max(...heroSlides.map((s) => s.id), 0) + 1;
      updateHeroSlides([...heroSlides, { ...form, id: newId }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Delete this slide?")) {
      updateHeroSlides(heroSlides.filter((s) => s.id !== id));
    }
  };

  const toggleActive = (id) => {
    updateHeroSlides(heroSlides.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Hero Slides</h1>
          <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Manage homepage hero carousel slides</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          <Plus className="h-4 w-4" /> Add Slide
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {heroSlides.map((slide) => (
          <div key={slide.id} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <div className="p-5" style={{ background: slide.gradient, minHeight: "120px" }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{slide.title}</h3>
                  <p className="mt-0.5 text-sm text-white/70">{slide.subtitle}</p>
                </div>
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${slide.active ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}`}>
                  {slide.active ? "Active" : "Hidden"}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50">{slide.description}</p>
            </div>
            <div className="flex items-center justify-between border-t px-4 py-2.5" style={{ borderColor: "var(--card-border)" }}>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{slide.cta} &rarr; {slide.link}</span>
              <div className="flex gap-1">
                <button onClick={() => toggleActive(slide.id)} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10" title={slide.active ? "Hide" : "Show"}>
                  {slide.active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => openEdit(slide)} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(slide.id)} className="rounded-lg p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30" style={{ color: "var(--destructive)" }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-20" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-lg rounded-xl border p-6 mx-4" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? "Edit Slide" : "Add Slide"}</h2>
              <button onClick={resetForm} className="rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 space-y-3">
              {["title", "subtitle", "description", "cta", "link"].map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-medium capitalize" style={{ color: "var(--muted-foreground)" }}>{field}</label>
                  <input value={form[field]} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
                </div>
              ))}

              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Gradient</label>
                <div className="grid grid-cols-6 gap-2">
                  {gradientPresets.map((g, i) => (
                    <button key={i} onClick={() => setForm((p) => ({ ...p, gradient: g }))}
                      className="h-8 rounded-lg border-2 transition-all"
                      style={{ background: g, borderColor: form.gradient === g ? "var(--accent)" : "transparent" }} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Active</label>
                <button onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                  className={`rounded-lg px-3 py-1.5 text-sm ${form.active ? "text-white" : ""}`}
                  style={{ background: form.active ? "var(--accent)" : "var(--muted)" }}>
                  {form.active ? "Yes" : "No"}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={resetForm} className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Cancel</button>
              <button onClick={handleSave} className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--accent)" }}>{editing ? "Update" : "Add"} Slide</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
