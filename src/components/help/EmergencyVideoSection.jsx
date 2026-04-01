import React, { useState } from 'react';

const EmergencyVideoSection = ({ video }) => {
  const [error, setError] = useState(false);

  if (!video || !video.youtubeId) return null;

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 pt-8 border-t border-slate-100 dark:border-slate-800">
      <h3 className="flex items-center text-xl font-black text-slate-900 dark:text-white mb-6">
        <svg className="w-6 h-6 text-red-600 dark:text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Visual Guide: {video.title}
      </h3>

      {!error ? (
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 mb-6 relative group">
          <iframe
            className="w-full h-full absolute top-0 left-0"
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setError(true)}
          ></iframe>
        </div>
      ) : (
        <div className="w-full p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mb-6 text-center shadow-inner">
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-4">Video couldn't load in this browser.</p>
          <a
            href={`https://youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/30"
          >
            Watch on YouTube
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      )}

      <div className="bg-slate-50 dark:bg-[#0b1121]/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
        <h4 className="font-black text-slate-900 dark:text-white text-lg leading-tight mb-2 tracking-tight">{video.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 font-bold text-sm leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
};

export default EmergencyVideoSection;
