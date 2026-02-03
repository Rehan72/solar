import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Mail, Lock, User, ArrowRight, ShieldCheck, Phone, AlertCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import Toaster from "../components/ui/Toaster";

const Register = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    password: '', 
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "REQUIRED";
    if (!formData.lastName) newErrors.lastName = "REQUIRED";
    if (!formData.email) newErrors.email = "EMAIL IS REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "INVALID EMAIL";
    
    if (!formData.phone) newErrors.phone = "PHONE IS REQUIRED";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "INVALID PHONE";

    if (!formData.password) newErrors.password = "PASSWORD REQUIRED";
    else if (formData.password.length < 6) newErrors.password = "MIN 6 CHARS";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "PASSWORDS MISMATCH";
    }

    if (!formData.agreeToTerms) {
      addToast("PLEASE AGREE TO TERMS", "error");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addToast("REGISTRATION INITIALIZED", "success");
      // Proceed with registration
    } else {
      addToast("VALIDATION FAILED", "error");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-deep-navy font-sans antialiased text-white">
      <Toaster toasts={toasts} onRemove={removeToast} />
      
      {/* Dynamic Background Gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #001f3f 0%, #003366 40%, #FF8C00 80%, #FFD700 100%)" }}
      />

      {/* Cinematic Overlays */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      
      {/* Reactive Cursor Flare */}
      <motion.div 
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-solar-yellow/5 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
        animate={{ 
          x: mousePos.x - 200, 
          y: mousePos.y - 200,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
      />

      {/* Ultra-Realistic Sun System (Background Layer) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            opacity: { duration: 2 },
            scale: { duration: 2 },
            y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 35, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-[800px] md:w-[1200px] aspect-square"
        >
          {/* 1. Cinematic Lens Flare Elements */}
          <div className="absolute inset-0 pointer-events-none z-50">
            <div className="lens-flare-element w-32 h-32 bg-solar-yellow/20 -top-20 -left-20 animate-pulse" />
            <div className="lens-flare-element w-16 h-16 bg-blue-300/10 top-40 left-60" />
            <div className="lens-flare-element w-48 h-48 lens-flare-halo -bottom-40 -right-20" />
          </div>

          {/* 2. Deep Volumetric Atmosphere */}
          <div className="absolute inset-[-60%] bg-radial-gradient from-solar-yellow/30 via-solar-gold/10 to-transparent blur-[120px] rounded-full mix-blend-screen" />

          {/* 3. 3D Volumetric Light Shafts */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: [angle, angle + 360], 
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 30 + i * 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300%] h-2 volumetric-shaft"
              style={{ rotate: angle }}
            />
          ))}

          {/* 4. The Celestial Core */}
          <div className="relative w-full h-full rounded-full sun-depth-shadow overflow-hidden sun-spherical-mask mix-blend-screen opacity-40">
            <div className="absolute inset-0 z-20 plasma-boil-overlay bg-solar-yellow/30" />
            <motion.img 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              src="/assets/sun_v2.png" 
              alt="Sun" 
              className="w-full h-full object-cover scale-150"
            />
            {/* Surface Turbulence Filter */}
            <svg width="0" height="0" className="absolute invisible">
              <filter id="plasma-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2">
                  <animate attributeName="baseFrequency" dur="20s" values="0.015;0.018;0.015" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="25" />
              </filter>
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg px-6 my-12"
      >
        <div className="glass-dark p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-solar-yellow/5 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <div className="text-center mb-10">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ["drop-shadow(0 0 0px rgba(255,215,0,0))", "drop-shadow(0 0 15px rgba(255,215,0,0.4))", "drop-shadow(0 0 0px rgba(255,215,0,0))"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center p-4 rounded-2xl bg-solar-yellow/5 border border-solar-yellow/20 mb-6"
            >
              <Sun className="w-8 h-8 text-solar-yellow" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Initialize <span className="text-solar-yellow">Access</span></h2>
            <p className="text-blue-100/40 text-sm font-light uppercase tracking-widest">Join the solar revolution</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.firstName ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="text" 
                    placeholder="FIRST NAME"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.firstName ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.firstName && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.firstName}
                  </motion.div>
                )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.lastName ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="text" 
                    placeholder="LAST NAME"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.lastName ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.lastName && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.lastName}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.email ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                />
              </div>
              {errors.email && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </motion.div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.phone ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                <input 
                  type="tel" 
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.phone ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                />
              </div>
              {errors.phone && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="password" 
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.password ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.password && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </motion.div>
                )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.confirmPassword ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="password" 
                    placeholder="CONFIRM"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.confirmPassword && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </motion.div>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-2xl transition-all ${formData.agreeToTerms ? 'bg-solar-yellow/10 border-solar-yellow/20' : 'bg-white/5 border-white/10'} border`}>
              <label 
                className="flex items-start gap-4 cursor-pointer group"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms });
                }}
              >
                <div className={`mt-1 w-5 h-5 shrink-0 rounded-lg border flex items-center justify-center transition-all ${formData.agreeToTerms ? 'bg-solar-yellow border-solar-yellow' : 'border-white/20 group-hover:border-solar-yellow'}`}>
                  {formData.agreeToTerms && <ShieldCheck className="w-3 h-3 text-deep-navy" />}
                </div>
                <span className="text-[10px] leading-relaxed text-blue-100/40 group-hover:text-white transition-colors font-bold uppercase tracking-widest">
                  I AGREE TO THE <button type="button" className="text-solar-yellow underline underline-offset-4 decoration-dotted">TERMS OF SERVICE</button> AND <button type="button" className="text-solar-yellow underline underline-offset-4 decoration-dotted">PRIVACY POLICY</button>
                </span>
              </label>
            </div>

            <Button className="w-full bg-solar-yellow text-deep-navy font-black py-8 rounded-2xl text-base tracking-[0.3em] shadow-[0_0_30px_rgba(255,215,0,0.2)] group overflow-hidden relative">
              <span className="relative z-10 flex items-center justify-center gap-2">
                CREATE ACCOUNT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </Button>
          </form>
          
          <p className="mt-10 text-center text-xs font-bold tracking-widest uppercase text-blue-100/40">
            ALREADY SECURED?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="text-solar-yellow hover:text-solar-gold transition-colors font-black"
            >
              NAVIGATE TO LOGIN
            </button>
          </p>
        </div>

        {/* Home Link */}
        <motion.button 
          onClick={() => onNavigate('landing')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black tracking-[0.4em] uppercase w-full group relative z-20"
        >
          <Sun className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" /> Back to Solar System
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;