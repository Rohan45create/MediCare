import React, { useState } from 'react';
import PersonalEmergencyProfile from '../components/help/PersonalEmergencyProfile';
import EmergencyContacts from '../components/help/EmergencyContacts';
import EmergencySearch from '../components/help/EmergencySearch';
import QuickTopicChips from '../components/help/QuickTopicChips';
import InfoCard from '../components/help/InfoCard';
import NearbyHospitalsMap from '../components/help/NearbyHospitalsMap';
import SOSButton from '../components/help/SOSButton';
import { EMERGENCY_TOPICS } from '../data/emergencyData';
import { useTranslation } from 'react-i18next';

const HelpPage = () => {
  const { t } = useTranslation('help');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSelectTopic = (id) => {
    setSelectedTopicId(id);
    // Give time for UI update, then scroll to info
    if (id) {
        setTimeout(() => {
            const el = document.getElementById('emergency-info-view');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  const selectedTopic = selectedTopicId 
    ? EMERGENCY_TOPICS.find(t => t.id === selectedTopicId) 
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] font-sans text-slate-900 dark:text-white pb-20 selection:bg-red-500 selection:text-white transition-colors duration-300">
      {/* SECTION 1: Header */}
      <div className="relative pt-24 pb-12 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 dark:from-red-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900/30 text-4xl mb-4 border border-red-200 dark:border-red-500/20 shadow-lg shadow-red-900/10 dark:shadow-red-900/20">
                🆘
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 drop-shadow-sm">
                {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                {t('subtitle')}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* SECTION 2: Profile */}
        <PersonalEmergencyProfile />

        {/* SECTION 3: National Contacts Grid */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700 mb-10">
            <EmergencyContacts />
        </div>

        {/* SECTION 4 & 5: Search & Chips */}
        <div className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('searchPrompt')}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('searchDesc')}</p>
            </div>
            
            <EmergencySearch onSearch={handleSearch} onSelect={handleSelectTopic} />
            
            <div className="flex justify-center mt-2">
                <QuickTopicChips onSelect={handleSelectTopic} activeId={selectedTopicId} />
            </div>
        </div>

        {/* SECTION 6: Main Content Area */}
        <div id="emergency-info-view" className="min-h-[400px] mb-12 scroll-mt-24">
            
            {selectedTopicId && selectedTopic ? (
                // Topic Selected Detail View
                <div>
                   <button 
                        onClick={() => setSelectedTopicId(null)}
                        className="mb-6 flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                   >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t('backToTopics')}
                   </button>
                   <InfoCard topic={selectedTopic} />
                </div>
            ) : searchQuery ? (
                // Search active but no exact UI match (if they hit enter with no matches)
                <div className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <span className="text-4xl mb-4 block opacity-50">🔍</span>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('noResults')} "{searchQuery}"</h3>
                    <p className="text-slate-500 dark:text-gray-400">Try searching for: <strong className="text-slate-700 dark:text-gray-300 pointer-events-none">CPR, choking, bleeding, stroke</strong></p>
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline font-semibold"
                    >
                        {t('clearSearch')}
                    </button>
                </div>
            ) : (
                // Grid of all topics
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-500">
                    {EMERGENCY_TOPICS.map(topic => (
                        <div 
                            key={topic.id}
                            onClick={() => handleSelectTopic(topic.id)}
                            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition-all duration-200 group flex flex-col h-full shadow-sm hover:shadow-xl dark:shadow-black/20"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-3xl bg-slate-50 dark:bg-slate-700 group-hover:bg-slate-100 dark:group-hover:bg-slate-600 p-2 rounded-xl transition-colors">{topic.icon}</span>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight">{topic.title}</h3>
                                    {topic.severity === 'critical' && <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md inline-block mt-1 border border-red-100 dark:border-red-500/20">Critical</span>}
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2 leading-relaxed font-medium">{topic.summary}</p>
                            <div className="mt-auto flex items-center text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                {t('viewGuide')} 
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* SECTION 7: Nearby Hospitals Map */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden mb-10">
            <NearbyHospitalsMap />
        </div>

      </div>

      {/* SECTION 8: SOS Button */}
      <SOSButton />
    </div>
  );
};

export default HelpPage;
