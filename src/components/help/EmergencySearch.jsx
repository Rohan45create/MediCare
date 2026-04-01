import React, { useState, useEffect, useRef } from 'react';
import { EMERGENCY_TOPICS, SYMPTOM_MAP } from '../../data/emergencyData';

const EmergencySearch = ({ onSearch, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 1) {
      const lowerQuery = value.toLowerCase();
      
      // Check exact symptom match
      const symptomKey = Object.keys(SYMPTOM_MAP).find(sym => lowerQuery.includes(sym));
      let symptomMatch = null;
      if (symptomKey) {
        const topicId = SYMPTOM_MAP[symptomKey];
        const topic = EMERGENCY_TOPICS.find(t => t.id === topicId);
        if (topic) {
          symptomMatch = { ...topic, _reason: `Did you mean: ${topic.title}?` };
        }
      }

      // Title/Alias match
      let matches = EMERGENCY_TOPICS.filter(t => 
        t.title.toLowerCase().includes(lowerQuery) || 
        t.aliases.some(alias => alias.toLowerCase().includes(lowerQuery))
      ).slice(0, 5);

      if (symptomMatch && !matches.find(m => m.id === symptomMatch.id)) {
        matches = [symptomMatch, ...matches].slice(0, 5);
      }

      setSuggestions(matches);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    onSearch('');
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please type your emergency.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript); // auto trigger search
      setIsListening(false);
      setShowDropdown(false); // Hide dropdown if we auto search
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (topicId) => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    onSelect(topicId);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-xl overflow-hidden transition-all focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 dark:focus-within:ring-red-500/40">
        
        {/* Search Icon */}
        <div className="pl-5 pr-3 py-4 text-slate-400 dark:text-slate-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search emergency... e.g. CPR, choking, chest pain"
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 py-4 text-sm md:text-base font-bold outline-none w-full"
        />

        {/* Clear Button */}
        {query && (
          <button onClick={handleClear} className="p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-white transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Voice Button */}
        <button 
          onClick={startVoiceSearch}
          title="Voice Search"
          className={`p-4 pr-6 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-white transition-colors flex items-center justify-center relative ${isListening ? 'text-red-600' : ''}`}
        >
          {isListening && (
            <span className="absolute right-5 top-4 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
          )}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700 animate-in slide-in-from-top-2 duration-200">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSuggestionClick(item.id)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-3 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-200">{item.icon}</span>
              <div className="flex-1">
                <span className="block text-slate-900 dark:text-white font-black text-base">{item.title}</span>
                {item._reason && (
                  <span className="block text-xs text-red-600 dark:text-red-400 font-bold mt-0.5">{item._reason}</span>
                )}
              </div>
              <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencySearch;
