import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Clock, 
    CheckCircle2, 
    MapPin, 
    Sun, 
    Activity, 
    LogOut,
    Calendar,
    ChevronDown,
    FileText,
    ArrowRight,
    Wallet
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REQUEST = {
    id: 'SOL-2026-992',
    type: 'Home Solar Installation',
    location: 'Patna, Bihar',
    property: 'Residential',
    status: 'Survey Scheduled',
    progress: [
        { id: 1, title: 'Request Submitted', completed: true },
        { id: 2, title: 'Survey Assigned', completed: true },
        { id: 3, title: 'Survey Pending', completed: false, current: true },
        { id: 4, title: 'Installation', completed: false },
        { id: 5, title: 'Solar Activated', completed: false }
    ],
    quotation: null // Set to object to test quotation view
};

// Mock Quotation Data (for demonstration)
const MOCK_QUOTATION = {
    capacity: '5 kW',
    breakdown: [
        { item: 'Solar Panels (Mono PERC)', cost: 180000 },
        { item: 'Inverter (Grid-Tied)', cost: 60000 },
        { item: 'Structure & Wiring', cost: 40000 },
        { item: 'Installation & Commissioning', cost: 20000 }
    ],
    total: 300000,
    subsidy: 78000,
    final: 222000
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [showQuote, setShowQuote] = useState(false); // Toggle for demo
  const [request, setRequest] = useState(MOCK_REQUEST);

  // Demo toggle function
  const toggleDemoState = () => {
      if (!showQuote) {
          setRequest({
              ...request, 
              status: 'Quotation Received',
              quotation: MOCK_QUOTATION,
              progress: request.progress.map(p => 
                  p.id <= 3 ? { ...p, completed: true, current: false } : 
                  p.id === 4 ? { ...p, current: true } : p
              )
          });
      } else {
          setRequest(MOCK_REQUEST);
      }
      setShowQuote(!showQuote);
  };

  return (
    <div className="min-h-screen bg-deep-navy text-white overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #000033 0%, #001f3f 40%, #003366 80%, #001f3f 100%)' }} />
      
      {/* Navbar */}
      <div className="relative z-50 glass border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-solar-yellow/20 flex items-center justify-center">
                   <Sun className="w-5 h-5 text-solar-yellow" />
              </div>
              <span className="font-black tracking-tighter uppercase text-lg">Solar<span className="text-solar-yellow">Connect</span></span>
          </div>
          <div className="flex items-center gap-4">
               {/* Demo Toggle */}
              <button onClick={toggleDemoState} className="text-xs text-white/20 hover:text-white/60 border border-white/10 px-2 py-1 rounded">
                  Toggle Survey/Quote
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="text-right hidden md:block">
                      <p className="text-sm font-bold text-white/90">Rahul Kumar</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Customer</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="text-white/40 hover:text-white">
                      <LogOut className="w-5 h-5" />
                  </Button>
              </div>
          </div>
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto w-full flex-1">
          <div className="mb-8">
              <h1 className="text-3xl font-black uppercase text-white mb-2">Welcome, Rahul 👋</h1>
              <p className="text-white/50">Your Solar Installation Journey</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* PRIMARY CARD */}
              <div className="lg:col-span-2 space-y-6">
                   <motion.div 
                      layout
                      className="glass rounded-3xl p-8 border border-white/5 bg-white/5 relative overflow-hidden"
                   >
                        {/* Status Badge */}
                        <div className="absolute top-0 right-0 p-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-2 ${
                                request.quotation ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                'bg-solar-yellow/10 text-solar-yellow border-solar-yellow/20'
                            }`}>
                                {request.quotation ? <Wallet className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                                {request.status}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <Sun className="w-6 h-6 text-solar-yellow" /> 
                                {request.type}
                            </h2>
                            <div className="flex flex-col gap-1 text-white/50 text-sm">
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {request.location}</span>
                                <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> {request.property} Property</span>
                            </div>
                        </div>

                        {/* Progress Checklist */}
                        <div className="space-y-4 mb-8 bg-black/20 p-6 rounded-2xl border border-white/5">
                            <p className="text-xs uppercase font-bold text-white/30 mb-4">Installation Progress</p>
                            {request.progress.map((step) => (
                                <div key={step.id} className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                        step.completed ? 'bg-emerald-500 border-emerald-500 text-deep-navy' :
                                        step.current ? 'border-solar-yellow text-solar-yellow animate-pulse' :
                                        'border-white/10 text-transparent'
                                    }`}>
                                        {step.completed && <CheckCircle2 className="w-3 h-3" />}
                                        {step.current && <div className="w-2 h-2 bg-solar-yellow rounded-full" />}
                                    </div>
                                    <span className={`text-sm font-bold ${
                                        step.completed ? 'text-emerald-400/80 line-through decoration-emerald-500/30' :
                                        step.current ? 'text-white' :
                                        'text-white/30'
                                    }`}>{step.title}</span>
                                </div>
                            ))}
                        </div>
                        
                        {!request.quotation && (
                            <div className="bg-solar-yellow/5 border border-solar-yellow/10 p-4 rounded-xl flex gap-4 items-start">
                                <div className="p-2 bg-solar-yellow/10 rounded-lg text-solar-yellow">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-solar-yellow font-bold text-sm mb-1">Next Step: Site Survey</p>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        Our certified survey team has been assigned and will visit your location shortly to assess roof structure and shadow analysis.
                                    </p>
                                </div>
                            </div>
                        )}
                   </motion.div>

                   {/* QUOTATION VIEW */}
                   <AnimatePresence>
                       {request.quotation && (
                           <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-emerald-900/20 to-deep-navy"
                           >
                               <div className="flex justify-between items-start mb-6">
                                   <div>
                                       <h3 className="text-xl font-bold text-white">Your Solar Quotation</h3>
                                       <p className="text-white/50 text-sm">Based on survey results • {request.quotation.capacity} System</p>
                                   </div>
                                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                                        <Wallet className="w-6 h-6 text-emerald-400" />
                                    </div>
                               </div>

                               <div className="space-y-3 mb-6">
                                   {request.quotation.breakdown.map((item, idx) => (
                                       <div key={idx} className="flex justify-between text-sm">
                                           <span className="text-white/60">{item.item}</span>
                                           <span className="font-mono text-white">₹{item.cost.toLocaleString()}</span>
                                       </div>
                                   ))}
                                   <div className="h-px bg-white/10 my-2" />
                                   <div className="flex justify-between text-sm">
                                       <span className="text-white/60">Total Cost</span>
                                       <span className="font-mono text-white">₹{request.quotation.total.toLocaleString()}</span>
                                   </div>
                                   <div className="flex justify-between text-sm text-emerald-400">
                                       <span>Govt. Subsidy Applied</span>
                                       <span className="font-mono">- ₹{request.quotation.subsidy.toLocaleString()}</span>
                                   </div>
                               </div>

                               <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex justify-between items-center mb-6">
                                   <span className="font-bold text-emerald-400 uppercase text-xs tracking-widest">Final Payable</span>
                                   <span className="text-2xl font-black text-white">₹{request.quotation.final.toLocaleString()}</span>
                               </div>

                               <div className="flex gap-4">
                                   <Button className="flex-1 bg-emerald-500 text-white font-bold hover:bg-emerald-600">
                                       Accept Quotation <ArrowRight className="w-4 h-4 ml-2" />
                                   </Button>
                                   <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                                       Request Callback
                                   </Button>
                               </div>

                           </motion.div>
                       )}
                   </AnimatePresence>
              </div>

              {/* SIDEBAR INFO */}
              <div className="space-y-6">
                  <div className="glass p-6 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-solar-yellow" /> Important Dates
                      </h4>
                      <div className="space-y-4 relative">
                          <div className="absolute left-1.5 top-2 bottom-2 w-px bg-white/10" />
                          <div className="relative pl-6">
                              <div className="w-3 h-3 bg-solar-yellow rounded-full absolute left-0 top-1 ring-4 ring-deep-navy" />
                              <p className="text-xs text-white/40 mb-0.5">5 Feb 2026</p>
                              <p className="text-sm font-bold text-white">Request Submitted</p>
                          </div>
                      </div>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-solar-yellow/5 to-transparent">
                      <h4 className="font-bold text-white mb-2">Need Support?</h4>
                      <p className="text-xs text-white/50 mb-4">Our solar experts are here to help you through the process.</p>
                      <Button variant="ghost" size="sm" className="w-full border border-white/10 hover:bg-white/10 text-white/70">
                          Contact Support
                      </Button>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
