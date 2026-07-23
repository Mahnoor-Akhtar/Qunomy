import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Bell,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Globe,
  Settings as SettingsIcon,
} from "lucide-react";
import { toast } from "sonner";
import AdminShell from "@/components/dashboard/AdminShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Master Settings — Qanomy Platform" },
      { name: "description", content: "Manage platform master data, templates and feature availability." },
    ],
  }),
  component: MasterSettingsPage,
});

type CourtLevel = "National" | "High Court" | "District Court" | "Special Court" | "Tribunal";

type Court = {
  id: string;
  name: string;
  type: string;
  level: CourtLevel;
  status: "Active" | "Inactive";
};

const INITIAL_COURTS: Court[] = [
  { id: "crt-1", name: "Supreme Court of Pakistan", type: "Supreme Court", level: "National", status: "Active" },
  { id: "crt-2", name: "Islamabad High Court", type: "High Court", level: "High Court", status: "Active" },
  { id: "crt-3", name: "Lahore High Court", type: "High Court", level: "High Court", status: "Active" },
  { id: "crt-4", name: "Sindh High Court", type: "High Court", level: "High Court", status: "Active" },
  { id: "crt-5", name: "Peshawar High Court", type: "High Court", level: "High Court", status: "Active" },
  { id: "crt-6", name: "Balochistan High Court", type: "High Court", level: "High Court", status: "Active" },
  { id: "crt-7", name: "Banking Court (Lahore)", type: "Banking Court", level: "Special Court", status: "Active" },
  { id: "crt-8", name: "Banking Court (Karachi)", type: "Banking Court", level: "Special Court", status: "Active" },
  { id: "crt-9", name: "National Accountability Bureau (NAB) Court", type: "NAB Court", level: "Special Court", status: "Active" },
  { id: "crt-10", name: "Anti-Terrorism Court (ATC)", type: "ATC", level: "Special Court", status: "Active" },
  { id: "crt-11", name: "Sessions Court", type: "Sessions Court", level: "District Court", status: "Active" },
  { id: "crt-12", name: "District Court", type: "District Court", level: "District Court", status: "Active" },
  { id: "crt-13", name: "Family Court", type: "Family Court", level: "District Court", status: "Active" },
  { id: "crt-14", name: "Rent Tribunal", type: "Rent Tribunal", level: "Tribunal", status: "Active" },
  { id: "crt-15", name: "Labour Court", type: "Labour Court", level: "Tribunal", status: "Active" },
  { id: "crt-16", name: "Consumer Court", type: "Consumer Court", level: "Tribunal", status: "Active" },
  { id: "crt-17", name: "Tax Tribunal", type: "Tax Tribunal", level: "Tribunal", status: "Active" },
  { id: "crt-18", name: "Service Tribunal", type: "Service Tribunal", level: "Tribunal", status: "Active" },
  { id: "crt-19", name: "FIA Court", type: "FIA Court", level: "Special Court", status: "Active" },
  { id: "crt-20", name: "Customs Court", type: "Customs Court", level: "Special Court", status: "Active" },
];

type NotificationTemplate = {
  id: string;
  name: string;
  language: string;
  purpose: string;
  status: "Active" | "Inactive";
};

const INITIAL_TEMPLATES: NotificationTemplate[] = [
  { id: "tmpl-1", name: "Hearing Reminder (7 Days Before)", language: "English", purpose: "Hearing reminder 7 days before", status: "Active" },
  { id: "tmpl-2", name: "Hearing Reminder (1 Day Before)", language: "English", purpose: "Hearing reminder 1 day before", status: "Active" },
  { id: "tmpl-3", name: "Hearing Today", language: "English", purpose: "Hearing today notification", status: "Active" },
  { id: "tmpl-4", name: "Hearing Update (Adjourned)", language: "English", purpose: "Hearing adjourned notification", status: "Active" },
  { id: "tmpl-5", name: "Hearing Update (Next Date)", language: "English", purpose: "Next hearing date update", status: "Active" },
  { id: "tmpl-6", name: "Payment Due Reminder", language: "English", purpose: "Invoice payment due reminder", status: "Active" },
  { id: "tmpl-7", name: "Payment Receipt", language: "English", purpose: "Payment receipt confirmation", status: "Active" },
  { id: "tmpl-8", name: "Document Shared", language: "English", purpose: "Document shared with client", status: "Active" },
  { id: "tmpl-9", name: "Case Disposed", language: "English", purpose: "Case disposed notification", status: "Active" },
  { id: "tmpl-10", name: "New Client Welcome", language: "English", purpose: "Welcome new client", status: "Active" },
];

type FeatureRow = {
  id: string;
  name: string;
  free: string;
  basic: string;
  pro: string;
  enterprise: string;
};

const INITIAL_FEATURES: FeatureRow[] = [
  { id: "f-1", name: "Cases Management", free: "Limited", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-2", name: "Hearings & Reminders", free: "Limited", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-3", name: "Documents Storage", free: "100 MB", basic: "10 GB", pro: "50 GB", enterprise: "Unlimited" },
  { id: "f-4", name: "WhatsApp / SMS Reminders", free: "Disabled", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-5", name: "Client Portal", free: "Disabled", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-6", name: "Invoicing & Billing", free: "Disabled", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-7", name: "Reports & Analytics", free: "Basic", basic: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { id: "f-8", name: "API Access", free: "Disabled", basic: "Disabled", pro: "Enabled", enterprise: "Enabled" },
  { id: "f-9", name: "Team Members Limit", free: "1 User", basic: "3 Users", pro: "10 Users", enterprise: "Unlimited" },
  { id: "f-10", name: "Custom Court List", free: "Disabled", basic: "Enabled", pro: "Enabled", enterprise: "Enabled" },
];

function MasterSettingsPage() {
  const [topTab, setTopTab] = useState<"courts" | "templates" | "features" | "other">("courts");
  const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
  const [courtSearch, setCourtSearch] = useState("");
  const [templateChannel, setTemplateChannel] = useState<"whatsapp" | "sms" | "email">("whatsapp");
  const [templates, setTemplates] = useState<NotificationTemplate[]>(INITIAL_TEMPLATES);
  const [features, setFeatures] = useState<FeatureRow[]>(INITIAL_FEATURES);

  const filteredCourts = useMemo(() => {
    return courts.filter((c) => !courtSearch || c.name.toLowerCase().includes(courtSearch.toLowerCase()));
  }, [courts, courtSearch]);

  const handleDeleteCourt = (id: string, name: string) => {
    setCourts(courts.filter((c) => c.id !== id));
    toast.success(`Removed court "${name}"`);
  };

  const handleDeleteTemplate = (id: string, name: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    toast.success(`Removed template "${name}"`);
  };

  const toggleFeatureState = (featureId: string, plan: "free" | "basic" | "pro" | "enterprise") => {
    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id !== featureId) return f;
        const currentVal = f[plan];
        let newVal = currentVal;
        if (currentVal === "Enabled") newVal = "Disabled";
        else if (currentVal === "Disabled") newVal = "Enabled";
        else if (currentVal === "Limited") newVal = "Enabled";
        else if (currentVal === "Basic") newVal = "Advanced";
        else if (currentVal === "Advanced") newVal = "Basic";
        toast.info(`Updated ${f.name} (${plan.toUpperCase()}) to "${newVal}"`);
        return { ...f, [plan]: newVal };
      }),
    );
  };

  const renderBadgeValue = (val: string, featureId: string, plan: "free" | "basic" | "pro" | "enterprise") => {
    if (val === "Enabled") {
      return (
        <button
          onClick={() => toggleFeatureState(featureId, plan)}
          className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:opacity-80"
        >
          <span className="flex h-5 w-9 items-center rounded-full bg-emerald-500 p-0.5 transition">
            <span className="h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm" />
          </span>
        </button>
      );
    }
    if (val === "Disabled") {
      return (
        <button
          onClick={() => toggleFeatureState(featureId, plan)}
          className="inline-flex items-center gap-1 text-rose-600 font-medium hover:opacity-80"
        >
          <span className="flex h-5 w-9 items-center rounded-full bg-gray-200 p-0.5 transition">
            <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
          </span>
        </button>
      );
    }
    if (val === "Limited" || val === "Plan Limit") {
      return (
        <button
          onClick={() => toggleFeatureState(featureId, plan)}
          className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200 hover:bg-amber-100"
        >
          Limited
        </button>
      );
    }
    if (val === "Basic" || val === "Advanced") {
      return (
        <button
          onClick={() => toggleFeatureState(featureId, plan)}
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
            val === "Advanced"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
          }`}
        >
          {val}
        </button>
      );
    }
    return (
      <span className="text-xs font-medium text-gray-700">{val}</span>
    );
  };

  return (
    <AdminShell
      active="settings"
      title="Master Settings"
      subtitle="Manage platform master data, templates and feature availability."
    >
      <div className="space-y-6">
        {/* Top Header Tabs */}
        <div className="border-b border-gray-200/80 bg-white px-6 pt-3 shadow-sm rounded-xl">
          <div className="flex space-x-8">
            <button
              onClick={() => setTopTab("courts")}
              className={`border-b-2 py-3 text-sm font-semibold transition ${
                topTab === "courts"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Master Courts
            </button>
            <button
              onClick={() => setTopTab("templates")}
              className={`border-b-2 py-3 text-sm font-semibold transition ${
                topTab === "templates"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Notification Templates
            </button>
            <button
              onClick={() => setTopTab("features")}
              className={`border-b-2 py-3 text-sm font-semibold transition ${
                topTab === "features"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Feature Toggles
            </button>
            <button
              onClick={() => setTopTab("other")}
              className={`border-b-2 py-3 text-sm font-semibold transition ${
                topTab === "other"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Other Settings
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Master Courts (Pakistan) */}
          {topTab === "courts" && (
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Master Courts (Pakistan)</h3>
                <p className="text-xs text-gray-500">Manage all courts that will be available to firms.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast.info("Opening Add Court modal...")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Court
                </button>
                <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mt-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search court name..."
                  value={courtSearch}
                  onChange={(e) => setCourtSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-1.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-3.5 w-3.5 text-gray-500" />
                Filter
              </button>
            </div>

            {/* Courts Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="border-b border-gray-100 bg-gray-50/50 font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="w-8 px-2 py-2.5 text-center"></th>
                    <th className="px-3 py-2.5">Court Name</th>
                    <th className="px-3 py-2.5">Court Type</th>
                    <th className="px-3 py-2.5">Level</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCourts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-2 py-2 text-center text-gray-300 cursor-grab">
                        <GripVertical className="h-3.5 w-3.5 mx-auto" />
                      </td>
                      <td className="px-3 py-2.5 font-medium text-gray-900">{c.name}</td>
                      <td className="px-3 py-2.5 text-gray-600">{c.type}</td>
                      <td className="px-3 py-2.5 text-gray-600">{c.level}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                          {c.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => toast.info(`Editing ${c.name}`)}
                            className="rounded p-1 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourt(c.id, c.name)}
                            className="rounded p-1 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
              <span>Showing 1 to {filteredCourts.length} of 42 courts</span>
              <div className="flex items-center gap-1.5">
                <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                  1
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                  2
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                  3
                </button>
                <span>...</span>
                <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <select className="ml-2 rounded border border-gray-200 px-1.5 py-1 text-[11px]">
                  <option>20 / page</option>
                </select>
              </div>
            </div>
          </div>
        )}

          {/* Default Notification Templates */}
          {topTab === "templates" && (
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Default Notification Templates</h3>
                  <p className="text-xs text-gray-500">
                    Create and manage default templates used for WhatsApp, SMS and Email notifications.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toast.info("Opening Add Template modal...")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Template
                  </button>
                  <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Channel Sub-tabs */}
              <div className="mt-3 flex gap-2 border-b border-gray-100 pb-2">
                <button
                  onClick={() => setTemplateChannel("whatsapp")}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    templateChannel === "whatsapp"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setTemplateChannel("sms")}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    templateChannel === "sms"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setTemplateChannel("email")}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    templateChannel === "email"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Email
                </button>
              </div>

              {/* Templates Table */}
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="border-b border-gray-100 bg-gray-50/50 font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2">Template Name</th>
                      <th className="px-3 py-2">Language</th>
                      <th className="px-3 py-2">Subject / Purpose</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {templates.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-3 py-2 font-medium text-gray-900">{t.name}</td>
                        <td className="px-3 py-2 text-gray-600">{t.language}</td>
                        <td className="px-3 py-2 text-gray-600">{t.purpose}</td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                            {t.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => toast.info(`Editing template ${t.name}`)}
                              className="rounded p-1 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTemplate(t.id, t.name)}
                              className="rounded p-1 text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
                <span>Showing 1 to 10 of 18 templates</span>
                <div className="flex items-center gap-1.5">
                  <button className="flex h-6 w-6 items-center justify-center rounded border border-gray-200">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                    1
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded border border-gray-200">
                    2
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded border border-gray-200">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <select className="ml-2 rounded border border-gray-200 px-1 py-0.5 text-[10px]">
                    <option>10 / page</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Feature Toggle (Per Plan) */}
          {topTab === "features" && (
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Feature Toggle (Per Plan)</h3>
                  <p className="text-xs text-gray-500">Enable or disable features for each subscription plan.</p>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="border-b border-gray-100 bg-gray-50/50 font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2.5 font-bold text-gray-900">Features</th>
                      <th className="px-3 py-2.5 text-center">Free</th>
                      <th className="px-3 py-2.5 text-center">Basic</th>
                      <th className="px-3 py-2.5 text-center">Pro</th>
                      <th className="px-3 py-2.5 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {features.map((f) => (
                      <tr key={f.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-3 py-2.5 font-medium text-gray-900">{f.name}</td>
                        <td className="px-3 py-2.5 text-center">
                          {renderBadgeValue(f.free, f.id, "free")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {renderBadgeValue(f.basic, f.id, "basic")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {renderBadgeValue(f.pro, f.id, "pro")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {renderBadgeValue(f.enterprise, f.id, "enterprise")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Enabled
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span> Disabled
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span> Limited / Plan Limit
                  </span>
                </div>
                <span className="text-gray-400 italic">Click on any cell to change</span>
              </div>
            </div>
          )}
          
          {/* Other Settings */}
          {topTab === "other" && (
             <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
               <SettingsIcon className="mb-3 h-8 w-8 text-gray-300" />
               <h3 className="text-sm font-bold text-gray-900">Other Settings</h3>
               <p className="mt-1 text-xs text-gray-500">Configure other platform settings here.</p>
             </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
