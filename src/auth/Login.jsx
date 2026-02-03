import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Mail, Lock, ArrowRight, Github, AlertCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import Toaster from "../components/ui/Toaster";

const Login = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    if (!formData.email) newErrors.email = "EMAIL IS REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "INVALID EMAIL FORMAT";
    
    if (!formData.password) newErrors.password = "PASSWORD IS REQUIRED";
    else if (formData.password.length < 6) newErrors.password = "MINIMUM 6 CHARACTERS";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addToast("AUTHENTICATION SUCCESSFUL", "success");
      // Proceed with login logic
    } else {
      addToast("PLEASE FIX FORM ERRORS", "error");
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
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            opacity: { duration: 2 },
            scale: { duration: 2 },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-[600px] md:w-[1000px] aspect-square"
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
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
          
          <div className="text-center mb-10">
            {/* <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center p-4 rounded-2xl bg-solar-yellow/5 border border-solar-yellow/20 mb-6"
            >
              <Sun className="w-8 h-8 text-solar-yellow" />
            </motion.div> */}
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Welcome <span className="text-solar-yellow">Back</span></h2>
            <p className="text-blue-100/40 text-sm font-light uppercase tracking-widest">Access your solar portal</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.email ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.email && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
                  >
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-500' : 'text-solar-yellow/50'}`} />
                  <input 
                    type="password" 
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20 ${errors.password ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-solar-yellow/50'}`}
                  />
                </div>
                {errors.password && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 px-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
                  >
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-solar-yellow transition-colors">
                  <div className="w-2 h-2 bg-solar-yellow rounded-sm opacity-0 group-has-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-blue-100/40 group-hover:text-white transition-colors">Remember Me</span>
              </label>
              <button className="text-solar-yellow hover:text-solar-gold transition-colors underline decoration-dotted underline-offset-4">Forgot Password?</button>
            </div>

            <Button className="w-full bg-solar-yellow text-deep-navy font-black py-7 rounded-2xl text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(255,215,0,0.2)] group overflow-hidden relative">
              <span className="relative z-10 flex items-center justify-center gap-2">
                AUTHENTICATE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-center text-xs font-black text-blue-100/20 tracking-[0.3em] uppercase mb-6">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 glass py-3 rounded-xl hover:bg-white/10 transition-all text-[10px] font-black tracking-widest uppercase">
                <Github className="w-4 h-4 text-solar-yellow" /> Github
              </button>
              <button className="flex items-center justify-center gap-3 glass py-3 rounded-xl hover:bg-white/10 transition-all text-[10px] font-black tracking-widest uppercase">
                <svg className="w-4 h-4 text-solar-yellow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-2.008 4.252-1.348 1.348-3.488 2.82-7.84 2.82-6.72 0-12.12-5.4-12.12-12.12s5.4-12.12 12.12-12.12c3.48 0 6.24 2.32 7.84 4.56l2.48-2.48C18.12 2.36 15.36 0 12.48 0 5.58 0 0 5.58 0 12.48s5.58 12.48 12.48 12.48c3.72 0 6.6-1.2 8.76-3.48 2.22-2.22 2.94-5.28 2.94-7.8 0-.72-.06-1.38-.18-1.92h-11.52z" />
                </svg>
                Google
              </button>
            </div>
          </div>
          
          <p className="mt-10 text-center text-xs font-bold tracking-widest uppercase text-blue-100/40">
            DON'T HAVE AN ACCOUNT?{' '}
            <button 
              onClick={() => onNavigate('register')}
              className="text-solar-yellow hover:text-solar-gold transition-colors font-black"
            >
              INITIALIZE SIGNUP
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <motion.button 
          onClick={() => onNavigate('landing')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black tracking-[0.4em] uppercase w-full group relative z-20"
        >
          <Sun className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" /> Return to Earth
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;