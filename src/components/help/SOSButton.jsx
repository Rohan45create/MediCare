import React, { useState, useEffect } from 'react';

const SOSButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              lat: position.coords.latitude.toFixed(5),
              lng: position.coords.longitude.toFixed(5)
            });
          },
          (error) => console.error("Error getting location", error)
        );
      }
    }
  }, [modalOpen]);

  const handleCopy = () => {
    if (coords) {
      navigator.clipboard.writeText(`${coords.lat}, ${coords.lng}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="SOS Emergency"
      >
        <span className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></span>
        <span className="relative z-10 font-bold text-xl tracking-wider">SOS</span>
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-500/50 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-8 mt-2">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-500">
                <span className="text-4xl animate-pulse">🚨</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Emergency</h2>
              <p className="text-red-600 dark:text-red-400 font-bold">Ready to call National Emergency Number</p>
            </div>

            <a 
              href="tel:108"
              className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg shadow-red-500/40 mb-8"
            >
              <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 108 Now
            </a>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-inner">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black mb-3">Your Precise Location</p>
              {coords ? (
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <span className="text-slate-900 dark:text-white font-mono text-sm font-bold tracking-wider">
                    {coords.lat}, {coords.lng}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-black px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 transition-all active:scale-90"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-bold italic py-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Acquiring GPS...
                </div>
              )}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 leading-tight font-medium">
                Read these coordinates to the dispatcher if they ask for your location.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
