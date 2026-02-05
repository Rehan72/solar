import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Map, 
  Users, 
  AlertCircle,
  Calendar,
  ChevronRight,
  FileText,
  Camera,
  Upload,
  Zap,
  Hammer
} from 'lucide-react';
import { Button } from '../../components/ui/button';

// Mock Workflow Data
const WORKFLOW_STEPS = [
  { id: 'survey', label: 'Survey', status: 'completed', date: '2023-10-15', completedBy: 'Alice Springer' },
  { id: 'mounting', label: 'Mounting', status: 'completed', date: '2023-10-18', completedBy: 'Installation Team Alpha' },
  { id: 'inverter', label: 'Inverter', status: 'in_progress', date: null, completedBy: null },
  { id: 'wiring', label: 'Wiring', status: 'pending', date: null, completedBy: null },
  { id: 'commissioning', label: 'Commissioning', status: 'pending', date: null, completedBy: null },
];

const INSTALLATION_DATA = {
    plantName: 'Sector 45 Residence',
    status: 'In Progress',
    startDate: '2023-10-10',
    assignedTeam: {
        name: 'Installation Team Alpha',
        lead: 'John Doe',
        contact: '+91 98765 43210'
    },
    surveyInfo: {
        status: 'completed',
        completedDate: '2023-10-15',
        teamName: 'Survey Squad A'
    }
};

function InstallationWorkflow() {
  const navigate = useNavigate();
  const [activeStepId, setActiveStepId] = useState('inverter');
  const [workflow, setWorkflow] = useState(WORKFLOW_STEPS);

  const activeStep = workflow.find(s => s.id === activeStepId);

  const getStepIcon = (id) => {
      switch(id) {
          case 'survey': return Map;
          case 'mounting': return Hammer;
          case 'inverter': return Zap;
          case 'wiring': return Activity; // Need to import Activity if not present
          default: return CheckCircle2;
      }
  };

  const statusColors = {
      completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      in_progress: 'text-solar-yellow bg-solar-yellow/10 border-solar-yellow/20 animate-pulse',
      pending: 'text-white/20 bg-white/5 border-white/5'
  };

  return (
    <div className="relative min-h-screen bg-deep-navy text-white overflow-hidden">
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-solar-yellow/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #000033 0%, #001f3f 40%, #003366 80%, #001f3f 100%)' }} />
      
      <div className="relative z-10 px-6 md:px-12 py-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-3 text-white/60 hover:text-white p-0 h-auto hover:bg-transparent">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Execution & Progress</span>
            </Button>
            <h1 className="text-2xl font-black uppercase rim-light tracking-tighter">
                Installation <span className="text-solar-yellow">Workflow</span>
            </h1>
        </div>

        {/* Survey Status Banner */}
        <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                    <h3 className="font-bold text-emerald-400 uppercase tracking-wide">Survey Completed</h3>
                    <p className="text-sm text-white/50">Site feasible. Ready for installation.</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                 <div className="hidden md:block text-right">
                    <p className="text-xs text-white/40 uppercase font-bold">Completed By</p>
                    <p className="text-sm font-bold text-white">{INSTALLATION_DATA.surveyInfo.teamName}</p>
                 </div>
                 <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                    onClick={() => navigate('/handoff/review')}
                 >
                    <FileText className="w-4 h-4 mr-2" /> View Report
                 </Button>
            </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="glass p-6 rounded-2xl border-l-4 border-l-solar-yellow">
                <p className="text-xs text-white/40 uppercase font-bold mb-1">Current Status</p>
                <p className="text-xl font-black text-white">{INSTALLATION_DATA.status}</p>
            </div>
            <div className="glass p-6 rounded-2xl">
                 <p className="text-xs text-white/40 uppercase font-bold mb-1">Assigned Team</p>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-solar-yellow" />
                    <p className="font-bold">{INSTALLATION_DATA.assignedTeam.name}</p>
                </div>
            </div>
             <div className="glass p-6 rounded-2xl">
                 <p className="text-xs text-white/40 uppercase font-bold mb-1">Start Date</p>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <p className="font-bold">{INSTALLATION_DATA.startDate}</p>
                </div>
            </div>
             <div className="glass p-6 rounded-2xl flex items-center justify-center flex-col gap-2">
                 <Button onClick={() => navigate('/commissioning/handoff')} className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider text-xs">
                     Submit for Commissioning
                 </Button>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left: Stepper */}
            <div className="lg:w-1/3">
                <div className="glass rounded-3xl p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Progress Tracker</h3>
                    <div className="space-y-4">
                        {workflow.map((step, index) => (
                            <div 
                                key={step.id}
                                onClick={() => setActiveStepId(step.id)}
                                className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                                    activeStepId === step.id 
                                    ? 'bg-white/10 border-solar-yellow shadow-[0_0_15px_rgba(255,215,0,0.2)]' 
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                            >   
                                {/* Connecting Line */}
                                {index !== workflow.length - 1 && (
                                    <div className={`absolute left-8 top-12 bottom-[-16px] w-0.5 ${step.status === 'completed' ? 'bg-emerald-500/30' : 'bg-white/5'}`} />
                                )}

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                                        step.status === 'completed' ? 'bg-emerald-500 text-deep-navy border-emerald-500' :
                                        step.status === 'in_progress' ? 'bg-solar-yellow text-deep-navy border-solar-yellow' :
                                        'bg-transparent text-white/20 border-white/20'
                                    }`}>
                                        {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                                         step.status === 'in_progress' ? <Zap className="w-5 h-5" /> :
                                         <Circle className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className={`font-bold ${activeStepId === step.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{step.label}</p>
                                            {step.date && <span className="text-xs text-white/30 font-mono">{step.date}</span>}
                                        </div>
                                        <p className="text-xs text-white/30 uppercase tracking-wider font-bold mt-1">
                                            {step.status.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Step Detail */}
            <div className="lg:w-2/3">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeStepId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass rounded-3xl p-8 min-h-[500px]"
                    >
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">{activeStep?.label} Phase</h2>
                                <p className="text-white/50">Execution & Progress</p>
                            </div>
                            <div className={`px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs border ${
                                activeStep?.status === 'completed' ? 'text-emerald-400 border-emerald-400 bg-emerald-400/10' :
                                activeStep?.status === 'in_progress' ? 'text-solar-yellow border-solar-yellow bg-solar-yellow/10' :
                                'text-white/30 border-white/10'
                            }`}>
                                {activeStep?.status.replace('_', ' ')}
                            </div>
                        </div>

                        <div className="space-y-8">
                             {/* Activity Log */}
                             <div>
                                 <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Activity Log</h3>
                                 {activeStep?.completedBy ? (
                                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                         <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold">
                                                 {activeStep.completedBy.charAt(0)}
                                             </div>
                                             <div>
                                                 <p className="font-bold text-sm">Marked as Completed</p>
                                                 <p className="text-xs text-white/40">by {activeStep.completedBy}</p>
                                             </div>
                                         </div>
                                         <span className="text-xs font-mono text-white/30">{activeStep.date}</span>
                                     </div>
                                 ) : (
                                     <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-white/30 text-sm">
                                         No activity recorded yet for this step.
                                     </div>
                                 )}
                             </div>

                             {/* Image Upload Mock */}
                             <div>
                                 <div className="flex items-center justify-between mb-4">
                                     <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Site Photos</h3>
                                     <Button variant="ghost" size="sm" className="text-solar-yellow hover:text-white">
                                         <Upload className="w-4 h-4 mr-2" /> Upload
                                     </Button>
                                 </div>
                                 <div className="grid grid-cols-3 gap-4">
                                     <div className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/20 hover:text-white/40 hover:bg-white/10 transition-colors cursor-pointer group">
                                         <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                         <span className="text-xs font-bold uppercase">Add Photo</span>
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Notes */}
                             <div>
                                 <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Field Notes</h3>
                                 <textarea 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-solar-yellow/50 min-h-[100px]"
                                    placeholder="Add notes about this installation step..."
                                 />
                             </div>

                        </div>
                        
                        {/* Actions */}
                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-end gap-4">
                            {activeStep?.status !== 'completed' && (
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6">
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Step Complete
                                </Button>
                            )}
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>

      </div>
    </div>
  );
}

export default InstallationWorkflow;
