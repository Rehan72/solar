import React from 'react';
import { Search, Bell, Menu, User, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex h-16 items-center justify-between px-6 md:px-10">
      {/* Branding & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors border border-white/5"
        >
          <Menu className="w-5 h-5 text-solar-yellow" />
        </button>

        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.7 }}
          >
            <Sun className="w-8 h-8 text-solar-yellow" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
            SOLAR<span className="text-solar-yellow italic">MAX</span>
          </span>
        </Link>
      </div>

      {/* Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 max-w-xl px-10">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-solar-yellow transition-colors" />
          <input
            type="text"
            placeholder="SEARCH TELEMETRY..."
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-[10px] font-black tracking-[0.2em] uppercase focus:outline-none focus:bg-white/10 focus:border-solar-yellow/20 transition-all placeholder:text-white/10"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
        >
          <Bell className="w-5 h-5 text-solar-yellow/60 group-hover:text-solar-yellow transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-solar-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
        </motion.button>

        {/* User Profile */}
        <div className="h-10 w-px bg-white/5 mx-2 hidden sm:block" />

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 glass p-1.5 pr-4 rounded-2xl border-white/5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-solar-yellow/10 flex items-center justify-center border border-solar-yellow/20 group-hover:bg-solar-yellow/20 transition-colors">
            <User className="w-4 h-4 text-solar-yellow" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[10px] font-black tracking-widest uppercase leading-none mb-1">Super Admin</p>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest leading-none">Online</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Header;