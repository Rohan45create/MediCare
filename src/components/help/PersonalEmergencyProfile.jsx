import React, { useState, useEffect } from 'react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

const PersonalEmergencyProfile = () => {
  const [expanded, setExpanded] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    bloodGroup: '',
    allergies: '',
    conditions: '',
    contactName: '',
    contactPhone: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('medicare_emergency_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Could not load profile");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('medicare_emergency_profile', JSON.stringify(profile));
    setExpanded(false);
  };

  // Build summary string for collapsed state
  const getSummary = () => {
    const parts = [];
    if (profile.bloodGroup && profile.bloodGroup !== 'Unknown') parts.push(`Blood: ${profile.bloodGroup}`);
    if (profile.allergies) parts.push(`Allergies: ${profile.allergies}`);
    if (profile.conditions) parts.push(`Conditions: ${profile.conditions}`);
    
    if (parts.length === 0) return "Add your medical details to help first responders.";
    return parts.join(' | ');
  };

  const hasData = profile.name || profile.bloodGroup || profile.allergies;

  return (
    <div className="bg-white dark:bg-slate-800 border-2 border-red-500/20 dark:border-red-900/50 rounded-2xl shadow-lg shadow-red-900/5 dark:shadow-red-900/10 mb-8 overflow-hidden transition-all duration-300">
      {/* Collapsed Header / Summary */}
      <div 
        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4 w-full sm:w-auto mb-3 sm:mb-0">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500 shrink-0 border border-red-200 dark:border-red-500/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">Your Emergency ID</h2>
            <p className={`text-sm tracking-wide mt-1 line-clamp-1 ${hasData ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400 dark:text-slate-500 italic'}`}>
              {getSummary()}
            </p>
          </div>
        </div>
        
        <button className="shrink-0 text-sm font-bold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center shadow-sm">
          {expanded ? (
            <>Close <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
          ) : (
            <>Edit <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></>
          )}
        </button>
      </div>

      {/* Expanded Form */}
      {expanded && (
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1121]/50 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Your legal name"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors placeholder-slate-400 dark:placeholder-slate-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
                <select 
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors appearance-none shadow-sm"
                >
                  <option value="" disabled>Select Blood Group</option>
                  {BLOOD_GROUPS.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  Known Allergies
                </label>
                <input 
                  type="text" 
                  name="allergies"
                  value={profile.allergies}
                  onChange={handleChange}
                  placeholder="e.g. Penicillin, Peanuts, Latex"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors placeholder-slate-400 dark:placeholder-slate-600 shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Pre-existing Medical Conditions</label>
                <textarea 
                  name="conditions"
                  value={profile.conditions}
                  onChange={handleChange}
                  placeholder="e.g. Type 2 Diabetes, Asthma, Hypertension"
                  rows={2}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors placeholder-slate-400 dark:placeholder-slate-600 resize-none shadow-sm"
                ></textarea>
              </div>

            </div>

            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-6 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Primary Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="contactName"
                  value={profile.contactName}
                  onChange={handleChange}
                  placeholder="Contact Name"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm shadow-sm font-medium"
                />
                <input 
                  type="tel" 
                  name="contactPhone"
                  value={profile.contactPhone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm shadow-sm font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button 
                type="button"
                onClick={() => setExpanded(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors mr-3"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 text-sm font-black bg-blue-600 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-slate-100 rounded-xl shadow-lg transition-all active:scale-95 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonalEmergencyProfile;
