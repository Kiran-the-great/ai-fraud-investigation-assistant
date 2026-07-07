import React from "react";
import { 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown,
  Clock,
  ArrowUpRight,
  Search
} from "lucide-react";

function Dashboard() {
  // Enhanced stats tracking the metric trends seen in your mockups
  const stats = [
    {
      title: "Cases Analyzed",
      value: "1,247",
      trend: "+12.5%",
      trendType: "up",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border border-blue-100",
    },
    {
      title: "Fraud Detected",
      value: "89",
      trend: "+8.2%",
      trendType: "up",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border border-amber-100",
    },
    {
      title: "Cases Resolved",
      value: "1,158",
      trend: "+15.3%",
      trendType: "up",
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border border-emerald-100",
    },
    {
      title: "Pending Review",
      value: "34",
      trend: "-5.1%",
      trendType: "down",
      icon: Clock,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border border-rose-100",
    },
  ];

  // Recreated the exact professional table/list stream from the reference image
  const recentCases = [
    {
      id: "FR-2024-001",
      risk: "High Risk",
      riskStyle: "bg-rose-50 text-rose-700 border-rose-100",
      title: "Identity verification anomaly detected",
      status: "Under Review",
      date: "2024-06-20",
    },
    {
      id: "FR-2024-002",
      risk: "Medium Risk",
      riskStyle: "bg-amber-50 text-amber-700 border-amber-100",
      title: "Unusual transaction pattern",
      status: "Investigating",
      date: "2024-06-19",
    },
    {
      id: "FR-2024-003",
      risk: "High Risk",
      riskStyle: "bg-rose-50 text-rose-700 border-rose-100",
      title: "Multiple rapid cross-border transfers",
      status: "Under Review",
      date: "2024-06-18",
    },
  ];

  return (
    <div className="p-8 font-sans w-full min-h-full m-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Overview of fraud investigation activities and insights
          </p>
        </div>
        
        {/* Modern contextual quick search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search cases, tokens..." 
            className="w-full bg-white border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-slate-300 shadow-sm placeholder-slate-400"
          />
        </div>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  {stat.title}
                </span>
                <div className={`${stat.iconBg} p-2 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  {stat.trendType === "up" ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  <span className={`text-[11px] font-bold ${
                    stat.trendType === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {stat.trend}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOWER LAYOUT BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RECENT CASES STREAM CONTAINER */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Cases</h3>
              <p className="text-xs font-medium text-slate-400">Latest structural anomalies caught</p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3.5">
            {recentCases.map((c, idx) => (
              <div 
                key={idx}
                className="group border border-slate-100 rounded-xl p-4 bg-slate-50/30 hover:bg-white hover:border-slate-200/80 hover:shadow-sm transition-all duration-150 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 tracking-mono font-mono">
                    {c.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.riskStyle}`}>
                    {c.risk}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-700 leading-snug">
                  {c.title}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100/60 pt-2 mt-0.5 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {c.status}
                  </span>
                  <span>{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* METRIC GRAPH / AI PERFORMANCE CARD CONTAINER */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Detection Rate</h3>
              <p className="text-xs font-medium text-slate-400 mb-6">AI performance validation this month</p>
            </div>

            {/* Circular Chart Replica */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-blue-50/50 border border-blue-100 shadow-inner">
                {/* SVG Radial Track Ring */}
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#eff6ff" strokeWidth="8" fill="transparent" />
                  <circle cx="50" cy="50" r="42" stroke="#2563eb" strokeWidth="8" fill="transparent" strokeDasharray="263" strokeDashoffset="20" strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">92.3%</span>
                  <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider mt-0.5">Accuracy</p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs font-medium text-slate-400 px-4">
              Model accuracy shows standard +1.4% improvement in spatial sequence evaluation patterns.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;