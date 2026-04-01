import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const NearbyHospitalsMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [hospitals, setHospitals] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null); // 'denied', 'no_google', null
  const { theme } = useTheme();

  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1e293b" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] }
  ];

  const lightMapStyles = []; // Standard Google Maps look

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      setErrorStatus('no_google');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          if (!mapInstanceRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: userLocation,
              zoom: 14,
              mapId: "MEDICARE_HOSPITAL_MAP",
              disableDefaultUI: true,
              zoomControl: true,
              styles: theme === 'dark' ? darkMapStyles : lightMapStyles
            });
            mapInstanceRef.current = map;

            // User marker
            new window.google.maps.Marker({
              position: userLocation,
              map: map,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 3,
              },
              title: "You are here"
            });

            const service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch(
              {
                location: userLocation,
                rankBy: window.google.maps.places.RankBy.DISTANCE,
                type: ['hospital']
              },
              (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                  const limitedResults = results.slice(0, 6);
                  
                  // Get detailed info (for phone numbers)
                  const detailedHospitals = [];
                  let checkedCount = 0;

                  limitedResults.forEach((place) => {
                    new window.google.maps.Marker({
                      map,
                      position: place.geometry.location,
                      icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#ef4444",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                      },
                      title: place.name
                    });

                    service.getDetails({ placeId: place.place_id, fields: ['name', 'vicinity', 'formatted_phone_number', 'geometry'] }, (details, detStatus) => {
                      checkedCount++;
                      if (detStatus === window.google.maps.places.PlacesServiceStatus.OK) {
                        detailedHospitals.push(details);
                      } else {
                        detailedHospitals.push(place); // fallback
                      }

                      if (checkedCount === limitedResults.length) {
                        setHospitals(detailedHospitals);
                      }
                    });
                  });
                } else {
                  setHospitals([]); // none found nearby
                }
              }
            );
          } else {
            // Map already exists, just update styles
            mapInstanceRef.current.setOptions({ styles: theme === 'dark' ? darkMapStyles : lightMapStyles });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setErrorStatus('denied');
        }
      );
    } else {
      setErrorStatus('denied');
    }
  }, [theme]); // Re-run when theme changes

  if (errorStatus === 'denied') {
    return (
      <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center h-48 shadow-inner">
        <svg className="w-12 h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-slate-900 dark:text-slate-300 font-black mb-2">Enable location access to find nearby hospitals</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-medium">We need GPS permissions to route you to the closest emergency room.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center">
        <svg className="w-6 h-6 text-red-600 dark:text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Nearest Hospitals
      </h3>
      
      {/* Map Container */}
      <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 mb-6 relative" ref={mapRef}>
        {!errorStatus && hospitals.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-sm z-10">
             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
             <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">Locating hospitals...</p>
          </div>
        )}
      </div>

      {errorStatus === 'no_google' && (
         <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-xl text-sm mb-6 border border-amber-200 dark:border-amber-800 font-medium">
            Map script not loaded. Make sure Google Maps API is configured in index.html.
         </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hosp, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-lg group">
            <div className="mb-4">
              <h4 className="text-slate-900 dark:text-white font-black leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight text-sm">{hosp.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 font-medium">{hosp.vicinity}</p>
            </div>
            <div className="flex space-x-2 mt-auto">
              {/* Directions Button */}
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.geometry?.location?.lat()},${hosp.geometry?.location?.lng()}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-xl py-2.5 text-xs font-black text-center transition-all flex items-center justify-center active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Route
              </a>
              
              {/* Call Button */}
              {hosp.formatted_phone_number ? (
                <a 
                  href={`tel:${hosp.formatted_phone_number}`}
                  className="flex-1 bg-green-50 dark:bg-green-600/20 hover:bg-green-600 hover:text-white dark:hover:bg-green-600/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/30 rounded-xl py-2.5 text-xs font-black text-center transition-all flex items-center justify-center active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center py-2.5 text-xs font-bold text-slate-300 dark:text-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent">
                  No PH
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitalsMap;
