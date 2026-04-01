import React, { useState, useEffect } from 'react';

const EmergencyContacts = () => {
  const [personalContacts, setPersonalContacts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  useEffect(() => {
    const saved = localStorage.getItem('medicare_personal_contacts');
    if (saved) {
      try {
        setPersonalContacts(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse contacts from local storage");
      }
    }
  }, []);

  const saveContacts = (contacts) => {
    setPersonalContacts(contacts);
    localStorage.setItem('medicare_personal_contacts', JSON.stringify(contacts));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.phone.trim()) return;
    
    const updated = [...personalContacts, { ...newContact, id: Date.now() }];
    saveContacts(updated);
    setNewContact({ name: '', phone: '' });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updated = personalContacts.filter(c => c.id !== id);
    saveContacts(updated);
  };

  // National emergency grid with adaptive colors
  const NOISE_CONTACTS = [
    { label: 'Ambulance', number: '108', icon: '🚑', bg: 'bg-red-50 dark:bg-red-900/40', border: 'border-red-200 dark:border-red-500/50', text: 'text-red-600 dark:text-red-400' },
    { label: 'Police', number: '100', icon: '👮', bg: 'bg-blue-50 dark:bg-blue-900/40', border: 'border-blue-200 dark:border-blue-500/50', text: 'text-blue-600 dark:text-blue-400' },
    { label: 'Fire', number: '101', icon: '🚒', bg: 'bg-amber-50 dark:bg-amber-900/40', border: 'border-amber-200 dark:border-amber-500/50', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'Women Helpline', number: '1091', icon: '👩', bg: 'bg-purple-50 dark:bg-purple-900/40', border: 'border-purple-200 dark:border-purple-500/50', text: 'text-purple-600 dark:text-purple-400' },
    { label: 'Poison Control', number: '1800-11-6117', icon: '☠️', bg: 'bg-green-50 dark:bg-green-900/40', border: 'border-green-200 dark:border-green-500/50', text: 'text-green-600 dark:text-green-400' },
  ];

  return (
    <div className="w-full">
      {/* National Grid */}
      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center">
         National Emergency Response (India)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {NOISE_CONTACTS.map((c, i) => (
          <a
            key={i}
            href={`tel:${c.number}`}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${c.bg} ${c.border} hover:scale-[1.02] active:scale-95 transition-all group shadow-sm`}
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{c.icon}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300 text-center uppercase tracking-widest">{c.label}</span>
            <span className={`text-xl font-black font-mono mt-1 ${c.text}`}>{c.number}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-bold flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Tap to call
            </span>
          </a>
        ))}
      </div>

      {/* Personal Contacts */}
      <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Personal Emergency Contacts</h3>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-white text-xs font-bold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            Add Contact
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-6 animate-in fade-in zoom-in-95 duration-200 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-tight">Name (e.g. Mother, Dr. Sharma)</label>
              <input 
                type="text" 
                autoFocus
                value={newContact.name}
                onChange={e => setNewContact({...newContact, name: e.target.value})}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm shadow-sm"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-tight">Phone Number</label>
              <input 
                type="tel" 
                value={newContact.phone}
                onChange={e => setNewContact({...newContact, phone: e.target.value})}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm shadow-sm"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!newContact.name || !newContact.phone}
              className="px-6 py-2 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition-all shadow-lg active:scale-95"
            >
              Save Contact
            </button>
          </div>
        </form>
      )}

      {personalContacts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {personalContacts.map(c => (
            <div key={c.id} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between group shadow-sm hover:shadow-md transition-shadow">
              <div className="truncate pr-3">
                <p className="text-slate-900 dark:text-white font-black text-sm truncate">{c.name}</p>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-xs font-medium">{c.phone}</p>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <a 
                  href={`tel:${c.phone}`}
                  className="bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white p-2.5 rounded-xl transition-all active:scale-90 shadow-sm"
                  aria-label={`Call ${c.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <button 
                  onClick={() => handleDelete(c.id)}
                  className="text-slate-300 dark:text-slate-600 hover:text-red-500 p-2.5 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:outline-none"
                  aria-label={`Delete ${c.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showAddForm && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 border-dashed rounded-2xl p-8 text-center shadow-inner">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">No personal emergency contacts added yet.</p>
          </div>
        )
      )}
    </div>
  );
};

export default EmergencyContacts;
