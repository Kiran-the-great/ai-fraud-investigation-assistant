import React from 'react';
import { LayoutDashboard, MessageSquare, UploadCloud, ShieldAlert } from 'lucide-react';

function NavBar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'upload', label: 'Upload', icon: UploadCloud },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-100 flex flex-col justify-between font-sans shrink-0 box-border select-none">
      
      {/* Top Sidebar Block Wrapper */}
      <div className="flex flex-col w-full">
        
        {/* BRAND LOGO CONTEXT - Prevents Overlaps & Text Splitting */}
        <div className="p-5 border-b border-slate-50 w-full block">
          <div className="flex items-center gap-2.5 w-full">
            {/* Locked Visual Icon Frame */}
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm shadow-blue-200 shrink-0 flex items-center justify-center">
              <ShieldAlert size={20} strokeWidth={2.2} />
            </div>
            
            {/* Explicitly Scaled & Contained Typography */}
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-slate-900 text-sm tracking-tight leading-none truncate block">
                FraudAI
              </h1>
              <span className="text-[14px] font-semibold text-slate-400 block mt-1 tracking-normal leading-none truncate">
                Investigation Assistant
              </span>
            </div>
          </div>
        </div>
        
        {/* NAVIGATION LINKS SELECTION */}
        <nav className="p-4 space-y-1 mt-3 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50/60 hover:text-slate-900'
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER NOTICE BLOCK */}
      <div className="p-4 m-4 bg-slate-50/60 rounded-xl border border-slate-100/80 shrink-0">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
          System Status
        </p>
        <p className="text-[11px] font-medium text-slate-500 leading-normal block">
          AI matrix analysis core active
        </p>
      </div>
      
    </aside>
  );
}

export default NavBar;