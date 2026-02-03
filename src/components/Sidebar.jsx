import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Zap,
  Settings,
  ShieldAlert,
  ChevronLeft,
  Sun,
  PieChart,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'DASHBOARD', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'ANALYTICS', icon: Activity, path: '/analytics' },
    { name: 'SYSTEM HEALTH', icon: Zap, path: '/health' },
    { name: 'DEVICES', icon: HardDrive, path: '/devices' },
    { name: 'SECURITY', icon: ShieldAlert, path: '/security' },
    { name: 'REPORTS', icon: PieChart, path: '/reports' },
    { name: 'SETTINGS', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col backdrop-blur-3xl bg-black/40 border-r border-white/5 duration-300 ease-[0.22,1,0.36,1] lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >

        {/* Sidebar Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-8 px-4 relative">
          {/* Subtle Internal Glow */}
          <div className="absolute top-0 left-0 w-full h-32 bg-radial-gradient from-solar-yellow/5 to-transparent pointer-events-none" />

          <div className="mb-4 relative z-10">
            <h3 className="px-4 text-[10px] font-black tracking-[0.3em] text-white/20 uppercase mb-4">Core Management</h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                      ? 'bg-solar-yellow/10 text-solar-yellow shadow-[0_0_20px_rgba(255,215,0,0.05)] border border-solar-yellow/20'
                      : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-solar-yellow' : 'text-white/20 group-hover:text-solar-yellow/60'}`} />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">{item.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute right-4 w-1.5 h-1.5 rounded-full bg-solar-yellow shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* System Status Mock */}
          <div className="mt-12 px-4 relative z-10">
            <div className="glass p-5 rounded-3xl border-white/5 bg-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">System Status</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                  <div className="w-1 h-1 rounded-full bg-green-500 opacity-50" />
                  <div className="w-1 h-1 rounded-full bg-green-500 opacity-20" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] items-end">
                  <span className="text-white/20 font-bold uppercase tracking-widest">Efficiency</span>
                  <span className="text-solar-yellow font-black">98.4%</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.4%" }}
                    className="h-full bg-solar-yellow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="glass p-4 rounded-2xl flex items-center gap-3 border-white/5 bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-solar-yellow flex items-center justify-center text-deep-navy font-black shadow-lg">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-white truncate uppercase tracking-widest">Rehan Syed</p>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">Super Admin v1.0.4</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
