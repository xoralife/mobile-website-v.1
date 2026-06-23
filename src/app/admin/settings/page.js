"use client";

import { useStore } from "@/lib/store";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const { settings, updateSettings, features, updateFeatures } = useStore();

  const handleSettingChange = (key, value) => {
    updateSettings({ ...settings, [key]: value });
  };

  const handleFeatureChange = (id, key, value) => {
    updateFeatures(features.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Manage your store information</p>
      </div>

      <div className="mb-8 rounded-xl border p-5" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
        <h2 className="mb-4 text-base font-semibold">Store Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { key: "name", label: "Store Name" },
            { key: "tagline", label: "Tagline" },
            { key: "logo", label: "Logo (letter)" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{label}</label>
              <input value={settings[key]} onChange={(e) => handleSettingChange(key, e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>About</label>
            <textarea rows={2} value={settings.about} onChange={(e) => handleSettingChange("about", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }} />
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl border p-5" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
        <h2 className="mb-4 text-base font-semibold">Features (Homepage)</h2>
        <p className="mb-4 text-xs" style={{ color: "var(--muted-foreground)" }}>Edit the feature boxes shown below the hero section. Icon names: Truck, Shield, HeadphonesIcon, RotateCcw</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.id} className="rounded-lg border p-3" style={{ borderColor: "var(--card-border)", background: "var(--muted)" }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)" }}>#{f.id}</span>
              </div>
              <div className="space-y-2">
                <input placeholder="Title" value={f.title} onChange={(e) => handleFeatureChange(f.id, "title", e.target.value)}
                  className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
                <input placeholder="Description" value={f.desc} onChange={(e) => handleFeatureChange(f.id, "desc", e.target.value)}
                  className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
                <input placeholder="Icon name" value={f.icon} onChange={(e) => handleFeatureChange(f.id, "icon", e.target.value)}
                  className="w-full rounded-lg border px-2.5 py-1.5 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border p-4" style={{ borderColor: "var(--accent)", background: "var(--card)" }}>
        <Save className="h-5 w-5" style={{ color: "var(--accent)" }} />
        <div className="flex-1 text-sm">
          <span className="font-medium">All changes are saved automatically</span>
          <span className="ml-2" style={{ color: "var(--muted-foreground)" }}>Settings are stored in your browser (localStorage)</span>
        </div>
      </div>
    </>
  );
}
