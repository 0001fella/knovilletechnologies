import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi } from 'lucide-react';
import MapControls from '../components/MapControls';
import { CoverageEligibilityPanel } from '../components/CoverageEligibilityPanel';

const CoverageMap = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const kmlLayer = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const pulseIntervalRef = useRef(null);
  const locationTimeoutRef = useRef(null);
  const wifiMarkers = useRef([]);

  const [mapReady, setMapReady] = useState(false);
  const [kmlVisible, setKmlVisible] = useState(true);
  const [address, setAddress] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEligibilityPanel, setShowEligibilityPanel] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Coverage areas with coordinates
  const coveredAreas = [
    { name: "Baba Dogo", lat: -1.235, lng: 36.891 },
    { name: "Kasabun", lat: -1.242, lng: 36.876 },
    { name: "Riverside", lat: -1.255, lng: 36.865 },
    { name: "Seasons", lat: -1.263, lng: 36.852 },
    { name: "Hunters", lat: -1.271, lng: 36.843 },
    { name: "Gumba", lat: -1.279, lng: 36.831 },
    { name: "Laundry", lat: -1.286, lng: 36.817 },
    { name: "Lucky Summer", lat: -1.241, lng: 36.870 },
    { name: "Ngomongo", lat: -1.228, lng: 36.883 },
  ];

  const NAIROBI_BOUNDS = [
    [-1.45, 36.65],
    [-1.15, 37.05],
  ];

  // Add WiFi markers to the map
  const addWifiMarkers = (map) => {
    const L = window.L;
    
    // Clear existing markers
    wifiMarkers.current.forEach(marker => map.removeLayer(marker));
    wifiMarkers.current = [];

    // Add new markers
    coveredAreas.forEach(area => {
      const wifiIcon = L.divIcon({
        className: 'wifi-marker',
        html: `<div class="wifi-icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([area.lat, area.lng], {
        icon: wifiIcon,
        zIndexOffset: 500
      }).addTo(map);

      marker.bindPopup(`<b>${area.name}</b><br>Coverage available`);
      wifiMarkers.current.push(marker);
    });
  };

  const centerOnUserLocation = () => {
    if (!mapInstance.current || !navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    clearTimeout(locationTimeoutRef.current);
    clearInterval(pulseIntervalRef.current);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        setUserLocation(userCoords);
        setLocationError(null);
        
        mapInstance.current.setView([userCoords.lat, userCoords.lng], 18);
        
        accuracyCircleRef.current = window.L.circle([userCoords.lat, userCoords.lng], {
          radius: userCoords.accuracy,
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.2,
          weight: 1
        }).addTo(mapInstance.current);

        createPulseEffect([userCoords.lat, userCoords.lng]);

        const displayName = await getAddressFromCoordinates(userCoords.lat, userCoords.lng);
        setAddress(displayName);

        setIsLoading(true);
        setShowEligibilityPanel(true);

        locationTimeoutRef.current = setTimeout(() => {
          checkEligibility(userCoords);
          setIsLocating(false);
        }, 1500);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const createPulseEffect = (latlng) => {
    const L = window.L;
    clearInterval(pulseIntervalRef.current);
    
    if (markerRef.current) mapInstance.current.removeLayer(markerRef.current);
    if (accuracyCircleRef.current) mapInstance.current.removeLayer(accuracyCircleRef.current);

    markerRef.current = L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      }),
      zIndexOffset: 1000
    }).addTo(mapInstance.current);

    const pulseCircle = L.circle(latlng, {
      radius: 10,
      stroke: false,
      fillColor: '#4285F4',
      fillOpacity: 0.7,
      className: 'location-pulse',
    }).addTo(mapInstance.current);

    let radius = 10;
    let opacity = 0.7;
    let growing = true;

    pulseIntervalRef.current = setInterval(() => {
      if (growing) {
        radius += 2;
        opacity -= 0.02;
        if (radius >= 30) growing = false;
      } else {
        radius -= 2;
        opacity += 0.02;
        if (radius <= 10) growing = true;
      }

      pulseCircle.setRadius(radius);
      pulseCircle.setStyle({ fillOpacity: opacity });
    }, 50);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      let displayName = 'Your current location';
      if (data.address) {
        const addr = data.address;
        displayName = [
          addr.road,
          addr.neighbourhood,
          addr.suburb,
          addr.city_district,
          addr.city
        ].filter(Boolean).join(', ');
      }
      
      return displayName;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Your current location';
    }
  };

  const checkEligibility = (coords) => {
    if (!window.L || !kmlLayer.current) return;
    const point = window.L.latLng(coords.lat, coords.lng);
    let eligible = false;

    kmlLayer.current.eachLayer((layer) => {
      if (layer.getBounds && layer.getBounds().contains(point)) {
        eligible = true;
      }
    });

    setIsEligible(eligible);
    setIsLoading(false);
  };

  const toggleKmlVisibility = () => {
    if (!kmlLayer.current) return;
    if (kmlLayer.current.getMap()) {
      kmlLayer.current.remove();
    } else {
      kmlLayer.current.addTo(mapInstance.current);
    }
    setKmlVisible(!kmlVisible);
  };

  const handleConnectClick = () => {
    navigate('/wifiplans');
    setShowEligibilityPanel(false);
  };

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCss);

        await import('leaflet');

        const omnivoreScript = document.createElement('script');
        omnivoreScript.src = 'https://unpkg.com/leaflet-omnivore@0.3.4/leaflet-omnivore.min.js';
        omnivoreScript.onload = () => setMapReady(true);
        document.body.appendChild(omnivoreScript);

        const fullscreenCss = document.createElement('link');
        fullscreenCss.rel = 'stylesheet';
        fullscreenCss.href = 'https://unpkg.com/leaflet.fullscreen/Control.FullScreen.css';
        document.head.appendChild(fullscreenCss);

        const fullscreenScript = document.createElement('script');
        fullscreenScript.src = 'https://unpkg.com/leaflet.fullscreen/Control.FullScreen.js';
        document.body.appendChild(fullscreenScript);
      } catch (err) {
        console.error('Error loading map libraries:', err);
      }
    };

    loadLeaflet();

    return () => {
      mapInstance.current?.remove();
      kmlLayer.current?.remove();
      clearTimeout(locationTimeoutRef.current);
      clearInterval(pulseIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !window.L || !window.omnivore || !mapRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      minZoom: 11,
      maxBounds: NAIROBI_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    }).setView([-1.286389, 36.817223], 12);

    mapInstance.current = map;

    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    baseLayer.addTo(map);

    L.control.scale({ position: 'bottomleft' }).addTo(map);

    if (L.control.fullscreen) {
      L.control.fullscreen({ position: 'topright' }).addTo(map);
    }

    L.rectangle(NAIROBI_BOUNDS, {
      color: '#0ff',
      weight: 3,
      fill: false,
      dashArray: '10 5',
      className: 'leaflet-animated-border',
    }).addTo(map);

    kmlLayer.current = window.omnivore.kml('/coverage.kml')
      .on('ready', () => {
        try {
          map.fitBounds(kmlLayer.current.getBounds(), { padding: [30, 30] });
        } catch (e) {
          console.warn('Could not fit KML bounds:', e);
        }
      })
      .addTo(map);

    // Add WiFi markers
    addWifiMarkers(map);

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.attribution({
      position: 'bottomright',
      prefix: '<a href="https://leafletjs.com/">Leaflet</a>',
    }).addTo(map);
  }, [mapReady]);

  return (
    <motion.div
      className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 px-6 z-20 relative">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Our Coverage Area</h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-72px)]">
        {/* Map Section */}
        <div className="w-full lg:w-2/3 h-full relative">
          <main ref={mapRef} className="absolute inset-0 z-10" />
          
          {mapReady && (
            <MapControls
              map={mapInstance.current}
              showLegend={showLegend}
              setShowLegend={setShowLegend}
              kmlVisible={kmlVisible}
              toggleKmlVisibility={toggleKmlVisibility}
              centerOnUserLocation={centerOnUserLocation}
              userLocation={userLocation}
              locationError={locationError}
              isLocating={isLocating}
            />
          )}
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/3 bg-white border-l border-gray-200 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Coverage in Knoxville</h2>
            <p className="text-gray-600 mb-4">
              We're constantly expanding our network. Check if your area is covered or view our current coverage areas below.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Check Your Address</h3>
              <button 
                onClick={centerOnUserLocation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {isLocating ? 'Locating...' : 'Check Eligibility'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800">Areas We Cover</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {coveredAreas.map((area, index) => (
                <div key={index} className="flex items-center bg-gray-50 rounded p-3">
                  <Wifi className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">{area.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-3 text-gray-800">Legend</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-gray-700">Covered Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500"></div>
              <span className="text-gray-700">Your Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Panel */}
      <AnimatePresence>
        {showEligibilityPanel && (
          <CoverageEligibilityPanel
            address={address}
            isEligible={isEligible}
            isLoading={isLoading}
            onClose={() => setShowEligibilityPanel(false)}
            onConnect={handleConnectClick}
          />
        )}
      </AnimatePresence>

      {/* Add custom styles for WiFi markers */}
      <style jsx global>{`
        .wifi-marker {
          background: transparent;
          border: none;
        }
        .wifi-icon-container {
          background: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .wifi-marker svg {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </motion.div>
  );
};

export default CoverageMap;