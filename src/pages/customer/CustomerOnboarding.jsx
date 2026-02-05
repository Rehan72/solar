import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Home, 
  Sun, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Building,
  Factory,
  Zap,
  UploadCloud
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import LocationPicker from '../../components/ui/LocationPicker';

const CustomerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
      // Location
      country: 'India',
      location: '',
      latitude: '',
      longitude: '',
      state: '',
      city: '',
      pincode: '',
      // Property
      propertyType: 'home',
      roofType: 'rcc',
      roofArea: '',
      // Requirement
      billRange: '',
      solarType: 'grid_tied'
  });

  const handleNext = () => {
      if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
      if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
      console.log('Lead Submitted:', formData);
      navigate('/customer/dashboard');
  };

  const handleLocationChange = (val) => {
      setFormData(prev => ({
          ...prev,
          latitude: val.latitude,
          longitude: val.longitude,
          location: val.location,
          // Auto-fill details if available
          state: val.addressDetails?.state || prev.state,
          city: val.addressDetails?.city || val.addressDetails?.town || val.addressDetails?.village || prev.city,
          pincode: val.addressDetails?.postcode || prev.pincode
      }));
  };

  return (
    <div className="min-h-screen bg-deep-navy text-white overflow-hidden relative flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #000033 0%, #001f3f 40%, #003366 80%, #001f3f 100%)' }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-solar-yellow/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  Go <span className="text-solar-yellow">Solar</span>
              </h1>
              <p className="text-white/50">Step {step} of 3 • {
                  step === 1 ? 'Location Details' : 
                  step === 2 ? 'Property Details' : 'Your Requirement'
              }</p>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden max-w-xs mx-auto">
                  <motion.div 
                      className="h-full bg-solar-yellow"
                      initial={{ width: '33%' }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                  />
              </div>
          </div>

          {/* Form Card */}
          <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden min-h-[500px]">
              <AnimatePresence mode='wait'>
                  
                  {/* STEP 1: LOCATION */}
                  {step === 1 && (
                      <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                      >
                          <h2 className="text-xl font-bold flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-solar-yellow" />
                              Install Solar at Your Place
                          </h2>

                          {/* Location Picker Component */}
                          <div className="space-y-4">
                              <LocationPicker 
                                  value={{
                                      latitude: formData.latitude,
                                      longitude: formData.longitude,
                                      location: formData.location
                                  }}
                                  onChange={handleLocationChange}
                                  errors={{}}
                                  touched={{}}
                              />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">State</label>
                                  <input 
                                      type="text"
                                      value={formData.state}
                                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-solar-yellow/50"
                                      placeholder="Auto-filled from map"
                                  />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">City / Area</label>
                                  <input 
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-solar-yellow/50"
                                    placeholder="Auto-filled from map" 
                                   />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Pincode</label>
                                  <input 
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-solar-yellow/50"
                                    placeholder="e.g. 800001" 
                                  />
                              </div>
                          </div>
                      </motion.div>
                  )}

                  {/* STEP 2: PROPERTY */}
                  {step === 2 && (
                      <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                      >
                          <h2 className="text-xl font-bold flex items-center gap-2">
                              <Home className="w-5 h-5 text-solar-yellow" />
                              Property Information
                          </h2>
                          
                          {/* Property Type Choice */}
                          <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Property Type</label>
                              <div className="grid grid-cols-3 gap-4">
                                  {[
                                      { id: 'home', label: 'Home', icon: Home },
                                      { id: 'shop', label: 'Shop/Office', icon: Building },
                                      { id: 'industrial', label: 'Industrial', icon: Factory },
                                  ].map(type => {
                                      const Icon = type.icon;
                                      return (
                                          <div
                                            key={type.id}
                                            onClick={() => setFormData({...formData, propertyType: type.id})}
                                            className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                                                formData.propertyType === type.id
                                                ? 'bg-solar-yellow text-deep-navy border-solar-yellow'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                            }`}
                                          >
                                              <Icon className="w-6 h-6 mx-auto mb-2" />
                                              <span className="text-xs font-bold uppercase">{type.label}</span>
                                          </div>
                                      )
                                  })}
                              </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Roof Type</label>
                                  <select 
                                      value={formData.roofType}
                                      onChange={(e) => setFormData({...formData, roofType: e.target.value})}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-solar-yellow/50"
                                  >
                                      <option value="rcc">Concrete (RCC)</option>
                                      <option value="tin_shed">Tin Shed</option>
                                      <option value="open_ground">Open Ground</option>
                                  </select>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Roof Area (Sq.ft)</label>
                                  <input 
                                    type="number"
                                    value={formData.roofArea}
                                    onChange={(e) => setFormData({...formData, roofArea: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-solar-yellow/50"
                                    placeholder="e.g. 1200" 
                                   />
                              </div>
                          </div>
                      </motion.div>
                  )}

                  {/* STEP 3: REQUIREMENT */}
                  {step === 3 && (
                      <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                      >
                          <h2 className="text-xl font-bold flex items-center gap-2">
                              <Zap className="w-5 h-5 text-solar-yellow" />
                              Your Solar Requirement
                          </h2>

                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Avg. Monthly Bill</label>
                              <div className="grid grid-cols-2 gap-4">
                                  {['< ₹3,000', '₹3,000 - ₹5,000', '₹5,000 - ₹10,000', '> ₹10,000'].map(range => (
                                      <div
                                        key={range}
                                        onClick={() => setFormData({...formData, billRange: range})}
                                        className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                                            formData.billRange === range
                                            ? 'bg-emerald-500 text-white border-emerald-500 font-bold'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                        }`}
                                      >
                                          {range}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Preference</label>
                              <div className="flex gap-4">
                                   <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 flex-1 cursor-pointer hover:bg-white/10 transition-colors">
                                       <input 
                                          type="radio" 
                                          name="solarType" 
                                          checked={formData.solarType === 'grid_tied'}
                                          onChange={() => setFormData({...formData, solarType: 'grid_tied'})}
                                          className="accent-solar-yellow w-5 h-5"
                                       />
                                       <div>
                                           <p className="font-bold text-sm">Grid-Tied</p>
                                           <p className="text-xs text-white/50">Save on bills</p>
                                       </div>
                                   </label>
                                   <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 flex-1 cursor-pointer hover:bg-white/10 transition-colors">
                                       <input 
                                          type="radio" 
                                          name="solarType" 
                                          checked={formData.solarType === 'hybrid'}
                                          onChange={() => setFormData({...formData, solarType: 'hybrid'})}
                                          className="accent-solar-yellow w-5 h-5"
                                       />
                                       <div>
                                           <p className="font-bold text-sm">Hybrid</p>
                                           <p className="text-xs text-white/50">With Battery Backup</p>
                                       </div>
                                   </label>
                              </div>
                          </div>

                      </motion.div>
                  )}

              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  {step > 1 ? (
                      <Button onClick={handleBack} variant="ghost" className="text-white/40 hover:text-white">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                  ) : <div></div>}

                  {step < 3 ? (
                      <Button onClick={handleNext} className="bg-solar-yellow text-deep-navy font-bold hover:bg-gold">
                          Next Step <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                  ) : (
                      <Button onClick={handleSubmit} className="bg-emerald-500 text-white font-bold hover:bg-emerald-600 px-8">
                          Submit Request
                      </Button>
                  )}
              </div>
          </div>

      </div>
    </div>
  );
};

export default CustomerOnboarding;
