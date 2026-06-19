import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Kos, Landmark } from '../types';

interface InteractiveMapProps {
  kosList: Kos[];
  selectedKos: Kos | null;
  onSelectKos: (kos: Kos) => void;
  landmarks: Landmark[];
  activeLandmarkId: string;
  searchRadius: number; // in km
  userLocation: { lat: number; lng: number } | null;
}

export default function InteractiveMap({
  kosList,
  selectedKos,
  onSelectKos,
  landmarks,
  activeLandmarkId,
  searchRadius,
  userLocation,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const landmarksGroupRef = useRef<L.LayerGroup | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center in Makassar
    const defaultCenter: L.LatLngExpression = [-5.1476, 119.4327];
    const defaultZoom = 12;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // will add customized zoom control on bottom right
      attributionControl: true,
    }).setView(defaultCenter, defaultZoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    // Add scale and custom zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.scale({ position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;
    markersGroupRef.current = L.layerGroup().addTo(map);
    landmarksGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersGroupRef.current = null;
        landmarksGroupRef.current = null;
        radiusCircleRef.current = null;
        userMarkerRef.current = null;
      }
    };
  }, []);

  // Update Kos Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    kosList.forEach((kos) => {
      const isSelected = selectedKos?.id === kos.id;
      const isFull = kos.roomsAvailable === 0;

      // Determine marker color classes based on Kos type or availability
      let markerColorClass = 'bg-slate-500 text-white'; // Default full
      let typeLabel = 'Penuh';

      if (!isFull) {
        if (kos.type === 'Putra') {
          markerColorClass = 'bg-blue-600 text-white';
          typeLabel = 'Putra';
        } else if (kos.type === 'Putri') {
          markerColorClass = 'bg-pink-600 text-white';
          typeLabel = 'Putri';
        } else if (kos.type === 'Campur') {
          markerColorClass = 'bg-purple-600 text-white hover:bg-purple-700';
          typeLabel = 'Campur';
        } else {
          markerColorClass = 'bg-teal-600 text-white hover:bg-teal-700';
          typeLabel = 'Belum Tahu';
        }
      }

      const activePulse = isSelected ? 'ring-4 ring-orange-400 ring-offset-2 scale-125 z-[999]' : '';

      const customHtml = `
        <div class="relative flex items-center justify-center w-9 h-9 rounded-full ${markerColorClass} shadow-md transition-all duration-300 ${activePulse}">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 2 0 0 1-2 2H5a2 2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <div class="absolute -bottom-1.5 px-1 bg-white text-gray-800 text-[8px] font-bold rounded shadow-xs border border-gray-200">
            ${kos.roomsAvailable > 0 ? `${kos.roomsAvailable} Km` : 'Penuh'}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-leaflet-marker-wrapper',
        html: customHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([kos.lat, kos.lng], { icon })
        .addTo(markersGroup)
        .on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onSelectKos(kos);
          map.setView([kos.lat, kos.lng], Math.max(map.getZoom(), 14), {
            animate: true,
            duration: 0.5,
          });
        });

      // Bind simple popup
      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(kos.priceMonthly);

      marker.bindPopup(`
        <div class="font-sans text-xs p-1">
          <div class="font-bold text-gray-900 leading-tight">${kos.name}</div>
          <div class="text-[10px] text-gray-500 mt-0.5">${kos.address}</div>
          <div class="flex items-center gap-1.5 mt-1">
            <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold ${
              isFull ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }">
              ${isFull ? 'Penuh' : `${kos.roomsAvailable} Kamar Sedia`}
            </span>
            <span class="font-semibold text-indigo-600">${formattedPrice}/bln</span>
          </div>
        </div>
      `);
    });
  }, [kosList, selectedKos, onSelectKos]);

  // Update Landmarks and Distance Circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    const landmarksGroup = landmarksGroupRef.current;
    if (!map || !landmarksGroup) return;

    landmarksGroup.clearLayers();

    // Remove old circle
    if (radiusCircleRef.current) {
      radiusCircleRef.current.remove();
      radiusCircleRef.current = null;
    }

    const activeLandmark = landmarks.find((l) => l.id === activeLandmarkId);

    // Draw Academic/City Landmarks
    landmarks.forEach((landmark) => {
      const isActive = landmark.id === activeLandmarkId;
      const landmarkHtml = `
        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500 text-white shadow-md border-2 border-white transform transition-all ${
          isActive ? 'ring-4 ring-orange-300 scale-125 z-[1000]' : 'opacity-85'
        }">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-leaflet-landmark-wrapper',
        html: landmarkHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([landmark.lat, landmark.lng], { icon })
        .addTo(landmarksGroup)
        .bindTooltip(landmark.name, {
          permanent: false,
          direction: 'top',
          className: 'text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-orange-100',
        });
    });

    // Draw active radius circle
    if (activeLandmark) {
      const radiusInMeters = searchRadius * 1000;
      radiusCircleRef.current = L.circle([activeLandmark.lat, activeLandmark.lng], {
        radius: radiusInMeters,
        color: '#f97316', // Orange-500
        fillColor: '#fdba74', // Orange-300
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '5, 5',
      }).addTo(map);

      // Smoothly zoom/fit bounds of the custom circle
      map.fitBounds(radiusCircleRef.current.getBounds(), {
        padding: [25, 25],
        maxZoom: 15,
      });
    } else if (activeLandmarkId === 'Semua' && kosList.length > 0) {
      // Zoom map to fit all visible kos markers
      const coordinates: L.LatLngExpression[] = kosList.map(k => [k.lat, k.lng]);
      if (coordinates.length > 0) {
        const bounds = L.latLngBounds(coordinates);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }
  }, [landmarks, activeLandmarkId, searchRadius, kosList]);

  // Update user current position marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userHtml = `
        <div class="relative flex items-center justify-center w-6 h-6">
          <div class="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-45"></div>
          <div class="relative w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow"></div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'user-loc-marker',
        html: userHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon })
        .addTo(map)
        .bindTooltip('Lokasi Saya', { permanent: false, direction: 'top' });

      // Pan to user location initially
      map.setView([userLocation.lat, userLocation.lng], 14);
    }
  }, [userLocation]);

  // Handle selected kos focus centering from parent component selectors
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedKos) return;
    map.setView([selectedKos.lat, selectedKos.lng], 15, { animate: true, duration: 0.8 });
  }, [selectedKos]);

  return (
    <div className="relative w-full h-full min-h-[350px] md:h-full overflow-hidden border border-slate-100 rounded-xl shadow-xs">
      <div id="makassar-kos-map" ref={mapContainerRef} className="w-full h-full z-10" />
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-[10px] font-medium text-slate-600 z-[999] pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 border border-white inline-block"></span>
          <span>Kos Putra</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-pink-600 border border-white inline-block"></span>
          <span>Kos Putri</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-600 border border-white inline-block"></span>
          <span>Kos Campur</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-teal-600 border border-white inline-block"></span>
          <span>Belum Tahu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-500 border border-white inline-block"></span>
          <span>Kamar Penuh</span>
        </div>
      </div>
    </div>
  );
}
