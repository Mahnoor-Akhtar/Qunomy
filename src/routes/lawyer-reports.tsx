import { createFileRoute } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Filter, 
  Download, 
  BarChart2, 
  Briefcase, 
  Users, 
  DollarSign, 
  Clock, 
  FileText, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  PieChart,
  User,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

export const Route = createFileRoute("/lawyer-reports")({
  component: LawyerReports,
});

// Mock Data
const STATS = [
  { title: "Total Active Cases", value: "532", trend: "+8.4% vs Apr 2025", icon: Briefcase, color: "blue" },
  { title: "Cases Disposed", value: "86", trend: "+15.2% vs Apr 2025", icon: CheckCircle2, color: "emerald" },
  { title: "Adjourned Cases", value: "312", trend: "+6.1% vs Apr 2025", icon: Clock, color: "amber" },
  { title: "Total Clients", value: "248", trend: "+5.3% vs Apr 2025", icon: Users, color: "purple" },
  { title: "Total Revenue (PKR)", value: "PKR 1,850,000", trend: "+12.7% vs Apr 2025", icon: DollarSign, color: "emerald" },
  { title: "Outstanding (PKR)", value: "PKR 725,000", trend: "+7.6% vs Apr 2025", icon: FileText, color: "rose" },
];

const CASES_BY_STATUS = [
  { name: "Pending", value: 209, color: "#3B82F6" },
  { name: "Adjourned", value: 312, color: "#F59E0B" },
  { name: "Disposed", value: 86, color: "#10B981" },
  { name: "Stayed/Others", value: 15, color: "#6B7280" },
];

const CASES_BY_COURT = [
  { name: "District", value: 176 },
  { name: "High", value: 128 },
  { name: "Banking", value: 72 },
  { name: "Family", value: 46 },
  { name: "NAB", value: 34 },
  { name: "Labour", value: 28 },
  { name: "Other", value: 48 },
];

const REVENUE_OVERVIEW = [
  { month: "Dec 2024", billed: 1200000, received: 800000, outstanding: 400000 },
  { month: "Jan 2025", billed: 1400000, received: 950000, outstanding: 450000 },
  { month: "Feb 2025", billed: 1800000, received: 1300000, outstanding: 500000 },
  { month: "Mar 2025", billed: 1500000, received: 1050000, outstanding: 450000 },
  { month: "Apr 2025", billed: 1950000, received: 1400000, outstanding: 550000 },
  { month: "May 2025", billed: 2050000, received: 1450000, outstanding: 600000 },
];

const TEAM_PERFORMANCE = [
  { member: "Muhammad Aslam (Adv.)", active: 86, disposed: 18, adjourned: 45, success: 85 },
  { member: "Saad Iqbal (Adv.)", active: 72, disposed: 16, adjourned: 38, success: 78 },
  { member: "Farah Naz (Adv.)", active: 64, disposed: 12, adjourned: 29, success: 82 },
  { member: "Aqsa Malik (Clerk)", active: 58, disposed: 10, adjourned: 31, success: 70 },
  { member: "Imran Raza (Clerk)", active: 46, disposed: 8, adjourned: 22, success: 75 },
];

const REVENUE_BY_CASE_TYPE = [
  { name: "Civil", value: 720000, percentage: "38.9%", color: "#3B82F6" },
  { name: "Criminal", value: 420000, percentage: "22.7%", color: "#10B981" },
  { name: "Banking", value: 310000, percentage: "16.8%", color: "#F59E0B" },
  { name: "Family", value: 190000, percentage: "10.3%", color: "#8B5CF6" },
  { name: "Other", value: 210000, percentage: "11.3%", color: "#06B6D4" },
];

const TOP_LAWYERS = [
  { member: "Muhammad Aslam", revenue: "PKR 620,000", cases: 86, success: 85 },
  { member: "Saad Iqbal", revenue: "PKR 480,000", cases: 72, success: 78 },
  { member: "Farah Naz", revenue: "PKR 360,000", cases: 64, success: 82 },
  { member: "Ali Raza", revenue: "PKR 210,000", cases: 46, success: 75 },
  { member: "Wasim Khan", revenue: "PKR 180,000", cases: 38, success: 70 },
];

function LawyerReports() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <LawyerShell active="reports">
      <div className="flex flex-col h-full space-y-6 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-[24px] font-bold text-[#14213D] tracking-tight">Reports & Analytics</h1>
            <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1">
              Analyze your law firm performance and case statistics.
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-9 px-3 bg-white border border-[#14213D]/10 rounded-lg text-[12px] font-bold text-[#14213D] flex items-center gap-2 shadow-sm">
               <Calendar className="h-4 w-4 text-[#1F1F1F]/40" />
               01 May 2025 - 31 May 2025
            </div>
            <button className="h-9 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 rounded-lg text-[12px] font-bold text-[#14213D] transition-colors shadow-sm">
              <Filter className="h-4 w-4 text-[#1F1F1F]/50" /> Filters
            </button>
            <button className="h-9 px-4 flex items-center gap-2 bg-white border border-[#14213D]/10 hover:bg-gray-50 rounded-lg text-[12px] font-bold text-[#14213D] transition-colors shadow-sm">
              <Download className="h-4 w-4 text-[#1F1F1F]/50" /> Export
            </button>
            <button className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold transition-colors shadow-sm">
              <BarChart2 className="h-4 w-4" /> Custom Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 shrink-0">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-[#14213D]/10 rounded-xl p-4 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#14213D]/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    stat.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider leading-tight">{stat.title}</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#14213D] leading-none mb-1.5">{stat.value}</div>
                  <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-[#14213D]/10 shrink-0">
          {["overview", "cases", "revenue", "team performance", "detailed reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[13px] font-bold capitalize transition-colors relative ${
                activeTab === tab ? "text-emerald-600" : "text-[#1F1F1F]/40 hover:text-[#1F1F1F]/80"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-10 space-y-6">
          
          {activeTab === "overview" && (
            <>
              {/* Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Cases by Status (Donut) */}
                <div className="lg:col-span-3 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Cases by Status</h3>
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={CASES_BY_STATUS}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {CASES_BY_STATUS.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                      <div className="text-[11px] font-bold text-[#1F1F1F]/50">Total</div>
                      <div className="text-[20px] font-bold text-[#14213D]">532</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {CASES_BY_STATUS.map(s => (
                      <div key={s.name} className="flex justify-between items-center text-[11px]">
                        <div className="flex items-center gap-2 font-bold text-[#1F1F1F]/70">
                          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }}></span>
                          {s.name}
                        </div>
                        <div className="font-bold text-[#14213D]">{s.value} <span className="text-[#1F1F1F]/40 font-medium">({((s.value/532)*100).toFixed(1)}%)</span></div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Detailed Report <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Cases by Court (Bar) */}
                <div className="lg:col-span-4 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[14px] font-bold text-[#14213D]">Cases by Court</h3>
                    <select className="h-7 text-[11px] font-bold text-[#14213D] bg-gray-50 border border-[#14213D]/10 rounded px-2 outline-none">
                      <option>Top Courts</option>
                    </select>
                  </div>
                  <div className="flex-1 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CASES_BY_COURT} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 9, fill: '#6B7280', fontWeight: 600 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }}
                        />
                        <Tooltip 
                          cursor={{ fill: '#F3F4F6' }}
                          contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#93C5FD" radius={[4, 4, 0, 0]} maxBarSize={40}>
                           {CASES_BY_COURT.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? "#3B82F6" : "#93C5FD"} />
                            ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <button className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Detailed Report <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Revenue Overview (Line) */}
                <div className="lg:col-span-5 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[14px] font-bold text-[#14213D]">Revenue Overview (PKR)</h3>
                    <select className="h-7 text-[11px] font-bold text-[#14213D] bg-gray-50 border border-[#14213D]/10 rounded px-2 outline-none">
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="flex-1 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={REVENUE_OVERVIEW} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }}
                          tickFormatter={(value) => `${value / 1000000}M`}
                        />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => `PKR ${value.toLocaleString()}`}
                        />
                        <Legend 
                          iconType="plainline" 
                          wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }}
                        />
                        <Line type="monotone" dataKey="billed" name="Billed" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981", strokeWidth: 2 }} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="received" name="Received" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: "#3B82F6", strokeWidth: 2 }} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="outstanding" name="Outstanding" stroke="#EF4444" strokeWidth={2} dot={{ r: 3, fill: "#EF4444", strokeWidth: 2 }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <button className="mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Revenue Report <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Team Performance */}
                <div className="lg:col-span-4 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Team Performance (By Cases Handled)</h3>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#14213D]/10">
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50">#</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50">Team Member</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-center">Active</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-center">Disposed</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-center">Adjourned</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-right">Success Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TEAM_PERFORMANCE.map((row, idx) => (
                          <tr key={idx} className="border-b border-[#14213D]/5 last:border-0">
                            <td className="py-2.5 text-[11px] font-bold text-[#1F1F1F]/40">{idx + 1}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D]">{row.member}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D] text-center">{row.active}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D] text-center">{row.disposed}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D] text-center">{row.adjourned}</td>
                            <td className="py-2.5">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.success}%` }}></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Team Report <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Revenue by Case Type */}
                <div className="lg:col-span-4 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Revenue by Case Type (PKR)</h3>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-40 w-40 relative shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={REVENUE_BY_CASE_TYPE}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {REVENUE_BY_CASE_TYPE.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                             contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                             formatter={(value: number) => `PKR ${value.toLocaleString()}`}
                          />
                        </RePieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                        <div className="text-[10px] font-bold text-[#1F1F1F]/50">Total</div>
                        <div className="text-[12px] font-bold text-[#14213D]">PKR 1,850k</div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      {REVENUE_BY_CASE_TYPE.map(s => (
                        <div key={s.name} className="flex justify-between items-center text-[11px]">
                          <div className="flex items-center gap-2 font-bold text-[#1F1F1F]/70">
                            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }}></span>
                            {s.name}
                          </div>
                          <div className="text-right">
                             <div className="font-bold text-[#14213D]">PKR {(s.value/1000).toFixed(0)}k</div>
                             <div className="text-[9px] text-[#1F1F1F]/40 font-bold">{s.percentage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Revenue Details <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Top Performing Lawyers */}
                <div className="lg:col-span-4 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Top Performing Lawyers (By Revenue)</h3>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#14213D]/10">
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50">#</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50">Lawyer</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50">Revenue (PKR)</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-center">Cases</th>
                          <th className="pb-2 text-[10px] font-bold text-[#1F1F1F]/50 text-right">Success Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOP_LAWYERS.map((row, idx) => (
                          <tr key={idx} className="border-b border-[#14213D]/5 last:border-0">
                            <td className="py-2.5 text-[11px] font-bold text-[#1F1F1F]/40">{idx + 1}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D]">{row.member}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D]">{row.revenue}</td>
                            <td className="py-2.5 text-[11px] font-bold text-[#14213D] text-center">{row.cases}</td>
                            <td className="py-2.5">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.success}%` }}></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="mt-4 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Full Report <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recently Generated Reports */}
                <div className="lg:col-span-4 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Recently Generated Reports</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between group">
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 rounded bg-rose-50 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4 text-rose-500" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#14213D]">Case Status Report - May 2025</div>
                          <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Generated on 31 May 2025, 10:30 AM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">PDF</span>
                         <button className="text-[#1F1F1F]/30 hover:text-[#14213D] transition-colors">
                           <Download className="h-4 w-4" />
                         </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 rounded bg-emerald-50 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#14213D]">Revenue Report - May 2025</div>
                          <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Generated on 31 May 2025, 10:15 AM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Excel</span>
                         <button className="text-[#1F1F1F]/30 hover:text-[#14213D] transition-colors">
                           <Download className="h-4 w-4" />
                         </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 rounded bg-rose-50 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4 text-rose-500" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#14213D]">Team Performance Report - May 2025</div>
                          <div className="text-[10px] text-[#1F1F1F]/50 mt-0.5">Generated on 31 May 2025, 10:05 AM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">PDF</span>
                         <button className="text-[#1F1F1F]/30 hover:text-[#14213D] transition-colors">
                           <Download className="h-4 w-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Reports */}
                <div className="lg:col-span-5 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm">
                  <h3 className="text-[14px] font-bold text-[#14213D] mb-4">Quick Reports</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-blue-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PieChart className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Cases<br/>Status</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-emerald-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase className="h-5 w-5 text-emerald-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Cases by<br/>Court</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-amber-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <DollarSign className="h-5 w-5 text-amber-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Revenue<br/>Report</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-purple-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="h-5 w-5 text-purple-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Team<br/>Performance</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-cyan-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <User className="h-5 w-5 text-cyan-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Client<br/>Report</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 border border-[#14213D]/10 rounded-xl hover:bg-gray-50 hover:border-rose-200 group transition-all">
                      <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock className="h-5 w-5 text-rose-500" />
                      </div>
                      <span className="text-[11px] font-bold text-[#14213D] text-center leading-tight">Aging<br/>Outstanding</span>
                    </button>
                  </div>
                </div>

                {/* Need Custom Report */}
                <div className="lg:col-span-3 bg-white border border-[#14213D]/10 rounded-xl p-5 shadow-sm flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                     <BarChart2 className="h-32 w-32" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[15px] font-bold text-[#14213D] mb-2">Need a Custom Report?</h3>
                    <p className="text-[12px] text-[#1F1F1F]/60 leading-relaxed mb-6">
                      Create custom reports with specific filters and data that matters to your firm.
                    </p>
                  </div>
                  <button className="w-full h-10 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm relative z-10">
                    <BarChart2 className="h-4 w-4" /> Create Custom Report
                  </button>
                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </LawyerShell>
  );
}
