import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sun, 
  MapPin, 
  Zap, 
  Calendar,
  Building2,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Upload,
  Info,
  AlertCircle,
  Navigation,
  FileBadge,
  Activity,
  Gauge,
  Wifi,
  ShieldCheck,
  Lock,
  Database,
  Server,
  Layers,
  Cpu
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import LocationPicker from '../../components/ui/LocationPicker';
import Select from '../../components/ui/Select';

// Option Constants
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' }
];

const VOLTAGE_OPTIONS = [
  { value: 'lt', label: 'LT (415V)' },
  { value: '11kv', label: '11 kV' },
  { value: '33kv', label: '33 kV' }
];

const INVERTER_TYPE_OPTIONS = [
  { value: 'string', label: 'String Inverter' },
  { value: 'central', label: 'Central Inverter' },
  { value: 'micro', label: 'Micro Inverter' }
];

const METER_TYPE_OPTIONS = [
  { value: 'bi_directional', label: 'Bi-directional (Net Meter)' },
  { value: 'export', label: 'Export Only' },
  { value: 'import', label: 'Import Only' }
];

const PROTOCOL_OPTIONS = [
  { value: 'modbus_tcp', label: 'Modbus TCP' },
  { value: 'modbus_rtu', label: 'Modbus RTU' },
  { value: 'mqtt', label: 'MQTT' },
  { value: 'opc_ua', label: 'OPC-UA' }
];

const INTERNET_OPTIONS = [
  { value: '4g', label: '4G / LTE' },
  { value: 'ethernet', label: 'Ethernet / LAN' },
  { value: 'wifi', label: 'Wi-Fi' }
];

function CreatePlant() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    // 1. Plant Identity
    plantName: '',
    plantCode: '',
    plantType: 'grid_connected',
    capacity: '',
    status: 'draft',
    
    // 2. Location & Grid Info
    location: '',
    latitude: '',
    longitude: '',
    country: '',
    state: '',
    city: '',
    utilityName: '',
    gridVoltage: '',
    netMetering: 'yes',
    connectionDate: '',

    // 3. Electrical Config
    inverterType: 'string',
    inverterMake: '',
    inverterCount: '',
    inverterRatedPower: '',
    transformerPresent: 'no',
    transformerRating: '', // LT->HT
    transformerCapacity: '',

    // 4. Metering & Connectivity
    meterType: 'bi_directional',
    meterMake: '',
    meterProtocol: 'modbus_rtu',
    solarIrradiance: false,
    ambientTemp: false,
    moduleTemp: false,
    
    // 5. Connectivity
    dataProtocol: 'modbus_tcp',
    loggerId: '',
    internetType: '4g',
    dataPushInterval: '15', // minutes

    // 6. Control & Safety
    antiIslanding: true,
    protectionEnabled: true,
    curtailmentAllowed: 'no',
    
    // 7. Access
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      // Identity
      case 'plantName':
        if (!value.trim()) return 'Grid name is required';
        if (value.length < 3) return 'Name must be at least 3 characters';
        return '';
      case 'plantCode':
        if (!value.trim()) return 'Plant Code is required';
        return '';
      case 'capacity':
        if (!value) return 'Capacity is required';
        if (parseFloat(value) <= 0) return 'Capacity must be greater than 0';
        return '';
      
      // Location
      case 'location':
        if (!value.trim()) return 'Location is required';
        return '';
      case 'latitude':
      case 'longitude':
        if (!value) return 'Coordinates are required';
        return '';
      
      // Grid
      case 'utilityName':
        // Optional but recommended
        return '';
        
      // Electrical
      case 'inverterCount':
      case 'inverterRatedPower':
        // Logic validation done separately or here
        if (value && parseFloat(value) < 0) return 'Must be positive';
        return '';
        
      // Contact
      case 'ownerName':
        if (!value.trim()) return 'Owner name is required';
        return '';
      case 'ownerPhone':
        if (!value.trim()) return 'Phone number is required';
        return '';
      case 'ownerEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
        return '';
        
      default:
        return '';
    }
  };

  // Cross-field validation (e.g. Inverter Capacity vs Plant Capacity)
  React.useEffect(() => {
    if (formData.inverterCount && formData.inverterRatedPower && formData.capacity) {
      const totalInvCapacity = parseFloat(formData.inverterCount) * parseFloat(formData.inverterRatedPower);
      const plantCap = parseFloat(formData.capacity);
      if (totalInvCapacity > plantCap * 1.5) { // Allow some oversizing (DC:AC ratio), but warn if excessive
        setErrors(prev => ({ ...prev, capacityWarning: 'Total inverter capacity is significantly higher than plant capacity' }));
      } else {
        setErrors(prev => {
          const { capacityWarning, ...rest } = prev;
          return rest;
        });
      }
    }
  }, [formData.inverterCount, formData.inverterRatedPower, formData.capacity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle location change from picker
  const handleLocationChange = (locationData) => {
    const { addressDetails } = locationData;
    setFormData(prev => ({
      ...prev,
      // Update location fields
      location: locationData.location,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      // Auto-fill address details if available
      country: addressDetails?.country || prev.country,
      state: addressDetails?.state || prev.state,
      city: addressDetails?.city || addressDetails?.town || addressDetails?.village || prev.city,
    }));
    
    // Clear validation error for location
    if (touched.location) {
      setErrors(prev => ({ ...prev, location: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
      navigate('/plants');
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-400');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-deep-navy text-white overflow-hidden">
      {/* Cinematic Overlays */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      
      {/* Background Gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #000033 0%, #001f3f 40%, #003366 80%, #001f3f 100%)'
        }}
      />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-solar-yellow/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-solar-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 mx-auto pb-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/plants')}
          className="flex items-center gap-3 text-white/60 hover:text-white mb-8 group transition-colors pt-8 h-auto p-0 hover:bg-transparent justify-start"
        >
          <div className="w-10 h-10 glass rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-solar-yellow" />
          </div>
          <span className="text-sm text-solar-yellow font-bold uppercase tracking-widest">Back to Grids</span>
        </Button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase rim-light tracking-tighter">
            Create <span className="text-solar-yellow">Grid</span>
          </h1>
          <p className="text-white/40 text-lg mt-4">
            Register your grid to start monitoring power generation and efficiency.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* SECTION 1: Plant Identity */}
          <div className="glass rounded-3xl p-8 md:p-12 relative z-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-solar-yellow/10 rounded-xl flex items-center justify-center">
                <FileBadge className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider">Identity & Status</h2>
                <p className="text-sm text-white/40">Essential plant identification details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="plantName" label="Grid Name" required touched={touched} errors={errors}>
                <div className="relative">
                  <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30`} />
                  <input type="text" name="plantName" value={formData.plantName} onChange={handleChange} placeholder="e.g., Sector 45 Solar Grid" className={getInputClassName('plantName', touched, errors)} />
                </div>
              </FormField>

              <FormField name="plantCode" label="Unique Plant ID" required touched={touched} errors={errors}>
                <div className="relative">
                  <FileBadge className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30`} />
                  <input type="text" name="plantCode" value={formData.plantCode} onChange={handleChange} placeholder="e.g., SOL-2024-001" className={getInputClassName('plantCode', touched, errors)} />
                </div>
              </FormField>

              <FormField name="plantType" label="Plant Type" touched={touched} errors={errors}>
                <div className="relative">
                  <Activity className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-solar-yellow`} />
                  <input type="text" value="Grid Connected" disabled className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-solar-yellow font-bold uppercase tracking-wider cursor-not-allowed opacity-80" />
                </div>
              </FormField>

              <FormField name="capacity" label="Installed Capacity (kW)" required touched={touched} errors={errors}>
                <div className="relative">
                  <Zap className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30`} />
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g., 500" className={getInputClassName('capacity', touched, errors)} />
                </div>
              </FormField>

              <div className="relative">
                <Select
                  name="status"
                  label="Plant Status"
                  value={formData.status}
                  onChange={handleChange}
                  options={STATUS_OPTIONS}
                  icon={Activity}
                  error={touched.status && errors.status}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Location & Grid Info */}
          <div className="glass rounded-3xl p-8 md:p-12 relative z-40">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-solar-yellow/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider">Location & Grid</h2>
                <p className="text-sm text-white/40">Site coordinates and utility connection</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <LocationPicker
                  value={{
                    location: formData.location,
                    latitude: formData.latitude,
                    longitude: formData.longitude
                  }}
                  onChange={(data) => {
                    handleLocationChange(data);
                    handleChange({ target: { name: 'location', value: data.location } });
                  }}
                  errors={errors}
                  touched={touched}
                  onBlur={(field) => handleBlur({ target: { name: field } })}
                />
              </div>

              <FormField name="country" label="Country" touched={touched} errors={errors}>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className={getInputClassName('country', touched, errors)} />
              </FormField>
              <FormField name="state" label="State" touched={touched} errors={errors}>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className={getInputClassName('state', touched, errors)} />
              </FormField>

              <FormField name="utilityName" label="Utility / DISCOM" touched={touched} errors={errors}>
                <div className="relative">
                  <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30`} />
                  <input type="text" name="utilityName" value={formData.utilityName} onChange={handleChange} placeholder="e.g., BSES Rajdhani" className={getInputClassName('utilityName', touched, errors)} />
                </div>
              </FormField>

               <div className="relative">
                <Select
                  name="gridVoltage"
                  label="Grid Voltage Level"
                  value={formData.gridVoltage}
                  onChange={handleChange}
                  options={VOLTAGE_OPTIONS}
                  icon={Zap}
                  placeholder="Select Voltage"
                  error={touched.gridVoltage && errors.gridVoltage}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Electrical Config */}
          <div className="glass rounded-3xl p-8 md:p-12 relative z-30">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-solar-yellow/10 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider">Electrical Configuration</h2>
                <p className="text-sm text-white/40">Inverters and transformers setup</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Select
                  name="inverterType"
                  label="Inverter Type"
                  value={formData.inverterType}
                  onChange={handleChange}
                  options={INVERTER_TYPE_OPTIONS}
                  error={touched.inverterType && errors.inverterType}
                />
              </div>
              <FormField name="inverterMake" label="Inverter Brand/Model" touched={touched} errors={errors}>
                <input type="text" name="inverterMake" value={formData.inverterMake} onChange={handleChange} placeholder="e.g., Sungrow SG110CX" className={getInputClassName('inverterMake', touched, errors)} />
              </FormField>
              <FormField name="inverterCount" label="Number of Inverters" touched={touched} errors={errors}>
                <input type="number" name="inverterCount" value={formData.inverterCount} onChange={handleChange} className={getInputClassName('inverterCount', touched, errors)} />
              </FormField>
              <FormField name="inverterRatedPower" label="Rated Power per Inverter (kW)" touched={touched} errors={errors}>
                <input type="number" name="inverterRatedPower" value={formData.inverterRatedPower} onChange={handleChange} className={getInputClassName('inverterRatedPower', touched, errors)} />
              </FormField>

              <div className="md:col-span-2 pt-4 border-t border-white/10">
                <label className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/80 mb-4 cursor-pointer">
                  <input type="checkbox" checked={formData.transformerPresent === 'yes'} onChange={(e) => setFormData({...formData, transformerPresent: e.target.checked ? 'yes' : 'no'})} className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-solar-yellow checked:border-solar-yellow" />
                  Transformer Present?
                </label>
              </div>

              {formData.transformerPresent === 'yes' && (
                <>
                  <FormField name="transformerRating" label="Transformer Rating (LT -> HT)" touched={touched} errors={errors}>
                    <input type="text" name="transformerRating" value={formData.transformerRating} onChange={handleChange} placeholder="e.g., 0.415 kV / 11 kV" className={getInputClassName('transformerRating', touched, errors)} />
                  </FormField>
                  <FormField name="transformerCapacity" label="Transformer Capacity (kVA)" touched={touched} errors={errors}>
                    <input type="number" name="transformerCapacity" value={formData.transformerCapacity} onChange={handleChange} className={getInputClassName('transformerCapacity', touched, errors)} />
                  </FormField>
                </>
              )}
            </div>
          </div>

          {/* SECTION 4: Metering & Connectivity */}
          <div className="glass rounded-3xl p-8 md:p-12 relative z-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-solar-yellow/10 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider">Metering & Connectivity</h2>
                <p className="text-sm text-white/40">Data acquisition and communication</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Select
                  name="meterType"
                  label="Energy Meter Type"
                  value={formData.meterType}
                  onChange={handleChange}
                  options={METER_TYPE_OPTIONS}
                  error={touched.meterType && errors.meterType}
                />
              </div>
              <FormField name="meterMake" label="Meter Make/Model" touched={touched} errors={errors}>
                <input type="text" name="meterMake" value={formData.meterMake} onChange={handleChange} placeholder="e.g., Secure Premier" className={getInputClassName('meterMake', touched, errors)} />
              </FormField>

              <div className="relative">
                <Select
                  name="dataProtocol"
                  label="Communication Protocol"
                  value={formData.dataProtocol}
                  onChange={handleChange}
                  options={PROTOCOL_OPTIONS}
                  icon={Wifi}
                  error={touched.dataProtocol && errors.dataProtocol}
                />
              </div>

              <div className="relative">
                <Select
                  name="internetType"
                  label="Internet Connection"
                  value={formData.internetType}
                  onChange={handleChange}
                  options={INTERNET_OPTIONS}
                  error={touched.internetType && errors.internetType}
                />
              </div>

              <div className="md:col-span-2 pt-4 border-t border-white/10">
                 <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-white/60">Installed Sensors</label>
                 <div className="flex flex-wrap gap-6">
                    {['solarIrradiance', 'ambientTemp', 'moduleTemp'].map((sensor) => (
                      <label key={sensor} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${formData[sensor] ? 'bg-solar-yellow border-solar-yellow' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
                           {formData[sensor] && <CheckCircle2 className="w-4 h-4 text-deep-navy" />}
                        </div>
                        <input type="checkbox" checked={formData[sensor]} onChange={(e) => setFormData({...formData, [sensor]: e.target.checked})} className="hidden" />
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors capitalize">{sensor.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Control, Safety & Access */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-solar-yellow/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider">Safety & Access</h2>
                <p className="text-sm text-white/40">Grid protection and user roles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                 <div className="glass p-4 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-bold">Anti-Islanding</span>
                    <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Enabled
                    </div>
                 </div>
                 <div className="glass p-4 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-bold">Protection</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.protectionEnabled} onChange={(e) => setFormData({...formData, protectionEnabled: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-solar-yellow"></div>
                    </label>
                 </div>
                 <div className="glass p-4 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-bold">Remote Curtailment</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.curtailmentAllowed === 'yes'} onChange={(e) => setFormData({...formData, curtailmentAllowed: e.target.checked ? 'yes' : 'no'})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-solar-yellow"></div>
                    </label>
                 </div>
              </div>

               <FormField name="ownerName" label="Owner Name" required touched={touched} errors={errors}>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                   <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={getInputClassName('ownerName', touched, errors)} />
                 </div>
               </FormField>
               <FormField name="ownerPhone" label="Owner Phone" required touched={touched} errors={errors}>
                 <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                   <input type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className={getInputClassName('ownerPhone', touched, errors)} />
                 </div>
               </FormField>
               <FormField name="ownerEmail" label="Owner Email" touched={touched} errors={errors}>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                   <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} className={getInputClassName('ownerEmail', touched, errors)} />
                 </div>
               </FormField>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-20"
          >
            <Button 
              type="submit"
              variant="default"
              size="lg"
              className="w-full sm:w-auto hover:scale-105 transition-transform font-black px-12 py-6 rounded-full text-sm shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              REGISTER GRID
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => navigate('/plants')}
              className="w-full sm:w-auto px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}

export default CreatePlant;

// Helper functions (extracted to prevent re-renders)
const getInputClassName = (fieldName, touched, errors) => {
  const hasError = touched[fieldName] && errors[fieldName];
  return `w-full pl-12 pr-4 py-4 bg-white/5 border ${
    hasError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-solar-yellow/50'
  } rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors`;
};

const FormField = ({ name, label, required, children, className = '', touched = {}, errors = {} }) => (
  <div className={className}>
    <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${
      touched[name] && errors[name] ? 'text-red-400' : 'text-white/60'
    }`}>
      {label} {required && '*'}
    </label>
    {children}
    {touched[name] && errors[name] && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-2 flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" /> {errors[name]}
      </motion.p>
    )}
  </div>
);


