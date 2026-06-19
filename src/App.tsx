import { useState, useEffect, useMemo } from 'react';
import { INITIAL_KOS_DATA, LANDMARKS, calculateHaversineDistance } from './data';
import { Kos, FilterState, Landmark, Bookmark } from './types';
import FilterPanel from './components/FilterPanel';
import KosList from './components/KosList';
import InteractiveMap from './components/InteractiveMap';
import KosDetailModal from './components/KosDetailModal';
import AddKosModal from './components/AddKosModal';
import { Compass, Home, BookmarkCheck, Heart, Sparkles, Plus, MapPin, CheckCircle, Smartphone } from 'lucide-react';

const initialFilters: FilterState = {
  searchQuery: '',
  type: 'Semua',
  minPrice: 400005,
  maxPrice: 3000000,
  area: 'Semua',
  landmarkId: 'Semua',
  maxDistance: 10,
};

const RANDOM_NAMES = [
  'Muhammad Kamal', 'Siti Fadilah', 'Andi Faisal', 'Dian Pratiwi', 
  'Rahmat Hidayat', 'Fadel Muhammad', 'Nur Azizah', 'Sri Wahyuni',
  'Irfan Setiawan', 'Ayu Lestari', 'Bambang Prasetyo', 'Kartika Putri'
];

export default function App() {
  // Real-time mutable Kos state
  const [kosList, setKosList] = useState<Kos[]>(() => {
    const saved = localStorage.getItem('makassar_kos_data');
    return saved ? JSON.parse(saved) : INITIAL_KOS_DATA;
  });

  // Filters state
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Bookmarks state (list of ids)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('makassar_kos_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Selected Kos for detail overlay and map centering
  const [selectedKos, setSelectedKos] = useState<Kos | null>(null);

  // Filter Bookmarks Only toggle
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Geolocation states
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Modal forms
  const [isNewKosModalOpen, setIsNewKosModalOpen] = useState(false);

  // Save mutable Kos list when edited
  useEffect(() => {
    localStorage.setItem('makassar_kos_data', JSON.stringify(kosList));
  }, [kosList]);

  // Save bookmarks state
  useEffect(() => {
    localStorage.setItem('makassar_kos_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Geolocation triggers
  const handleLocateUser = () => {
    setIsLocatingUser(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolokasi tidak didukung oleh browser Anda.');
      setIsLocatingUser(false);
      triggerMockLocation();
      return;
    }

    // Attempt geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocatingUser(false);
        // Reset active landmark filter to point to user location
        setFilters((prev) => ({
          ...prev,
          landmarkId: 'user_location',
          maxDistance: 4, // standard 4km from user
        }));
      },
      (error) => {
        console.warn('Geolocation blocked or error:', error.message);
        setLocationError('Gagal mendeteksi lokasi (Akses diblokir oleh iFrame). Mengaktifkan simulasi koordinat.');
        setIsLocatingUser(false);
        triggerMockLocation();
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const triggerMockLocation = () => {
    // Set a realistic coordinates in Makassar Rappocini area (near UNM Gunungsari)
    const mockLat = -5.1840;
    const mockLng = 119.4315;
    setUserLocation({ lat: mockLat, lng: mockLng });
  };

  // Toggle bookmarked status
  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Manual rent simulator triggers from details popup
  const handleBookRoomSimulate = (kosId: string) => {
    setKosList((prev) =>
      prev.map((k) => {
        if (k.id === kosId && k.roomsAvailable > 0) {
          const nextVal = k.roomsAvailable - 1;
          return { ...k, roomsAvailable: nextVal };
        }
        return k;
      })
    );
  };

  const handleReleaseRoomSimulate = (kosId: string) => {
    setKosList((prev) =>
      prev.map((k) => {
        if (k.id === kosId && k.roomsAvailable < k.roomCount) {
          const nextVal = k.roomsAvailable + 1;
          return { ...k, roomsAvailable: nextVal };
        }
        return k;
      })
    );
  };

  // Handle adding custom property from form modal
  const handleAddKos = (newKos: Kos) => {
    setKosList((prev) => [newKos, ...prev]);
    setSelectedKos(newKos);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setUserLocation(null);
    setOnlyBookmarks(false);
  };

  // Calculate dynamic distances based on active location criteria (either academic landmark or detected coordinates)
  const activeLandmark = useMemo(() => {
    if (filters.landmarkId === 'Semua') return null;
    if (filters.landmarkId === 'user_location' && userLocation) {
      return {
        id: 'user_location',
        name: 'Lokasi Radar Anda',
        lat: userLocation.lat,
        lng: userLocation.lng,
      };
    }
    return LANDMARKS.find((l) => l.id === filters.landmarkId) || null;
  }, [filters.landmarkId, userLocation]);

  const kosDistancesMap = useMemo(() => {
    const distances: Record<string, number> = {};
    if (!activeLandmark) return distances;

    kosList.forEach((kos) => {
      distances[kos.id] = calculateHaversineDistance(
        activeLandmark.lat,
        activeLandmark.lng,
        kos.lat,
        kos.lng
      );
    });
    return distances;
  }, [activeLandmark, kosList]);

  // Main Filtering Engine logic
  const filteredKosList = useMemo(() => {
    return kosList.filter((kos) => {
      // Index bookmarks only toggle
      if (onlyBookmarks && !bookmarks.includes(kos.id)) {
        return false;
      }

      // Gender Type Filter
      if (filters.type !== 'Semua' && kos.type !== filters.type) {
        return false;
      }

      // Area / Zone Kecamatan
      if (filters.area !== 'Semua' && kos.locationArea !== filters.area) {
        return false;
      }

      // Price monthly constraint
      if (kos.priceMonthly > filters.maxPrice) {
        return false;
      }

      // Proximity Distance boundaries
      if (activeLandmark) {
        const distance = kosDistancesMap[kos.id];
        if (distance === undefined || distance > filters.maxDistance) {
          return false;
        }
      }

      // Case-insensitive textual search matcher
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = kos.name.toLowerCase().includes(query);
        const matchesAddress = kos.address.toLowerCase().includes(query);
        const matchesDesc = kos.description.toLowerCase().includes(query);
        const matchesOwner = kos.ownerName.toLowerCase().includes(query);

        if (!matchesName && !matchesAddress && !matchesDesc && !matchesOwner) {
          return false;
        }
      }

      return true;
    });
  }, [kosList, filters, bookmarks, onlyBookmarks, activeLandmark, kosDistancesMap]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* 1. Header Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <Compass className="w-5 h-5 text-white transform hover:rotate-45 transition-transform" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            KosKuMakassar<span className="text-indigo-600">.com</span>
          </h1>
        </div>

        {/* Quick Buttons action container */}
        <div className="flex items-center gap-3">
          {/* Bookmarks Toggle button */}
          <button
            onClick={() => setOnlyBookmarks((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              onlyBookmarks
                ? 'bg-red-500/10 border-red-200 text-red-600'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-red-500 text-red-500 animate-pulse' : ''}`} />
            <span>{onlyBookmarks ? 'Menampilkan Tersimpan' : 'Disimpan'} ({bookmarks.length})</span>
          </button>

          {/* Register New Kos Button */}
          <button
            onClick={() => setIsNewKosModalOpen(true)}
            className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all border border-indigo-600"
          >
            <Plus className="w-4 h-4" />
            <span>Daftarkan Kos</span>
          </button>
        </div>
      </header>

      {/* 2. Brand Sub-banner */}
      <section className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs py-2 px-6 font-medium border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              Selamat datang di KosKuMakassar.com — Platform pencarian sebaran kost yang akurat & terpercaya di Makassar.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 font-mono text-[9px] text-slate-400">
            <span>Server: Makassar, ID</span>
            <span>•</span>
            <span>Status: Terverifikasi</span>
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Layout - Geometric Split */}
      <main id="main-content" className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left column / Sidebar: Filters & Results (fixed-width, high-density scroll box) */}
        <aside className="w-full md:w-[390px] bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4">
          {/* Quick instructions indicator for distances if a landmark is activated */}
          {activeLandmark && (
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider font-sans">
                  Pencarian Terpusat Aktif
                </div>
                <p className="text-xs text-indigo-600 font-sans leading-tight">
                  Maksimal <span className="font-bold font-mono">{filters.maxDistance} km</span> dari{' '}
                  <span className="font-bold underline">{activeLandmark.name}</span>.
                </p>
              </div>
              <button
                onClick={() => setFilters((p) => ({ ...p, landmarkId: 'Semua' }))}
                className="text-[10px] font-bold text-slate-400 hover:text-red-500 cursor-pointer"
              >
                Hapus
              </button>
            </div>
          )}

          {locationError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-xl text-xs flex justify-between items-center font-sans">
              <span>{locationError}</span>
              <button onClick={() => setLocationError(null)} className="font-bold hover:underline cursor-pointer">
                Tutup
              </button>
            </div>
          )}

          <FilterPanel
            filters={filters}
            onChangeFilters={setFilters}
            landmarks={LANDMARKS}
            onResetFilters={handleResetFilters}
            onLocateUser={handleLocateUser}
            isLocatingUser={isLocatingUser}
          />

          <KosList
            kosList={filteredKosList}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            selectedKos={selectedKos}
            onSelectKos={setSelectedKos}
            activeLandmark={activeLandmark}
            distances={kosDistancesMap}
          />
        </aside>

        {/* Right Section: Interactive Map + Footers */}
        <section className="flex-1 relative bg-slate-100 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <InteractiveMap
              kosList={filteredKosList}
              selectedKos={selectedKos}
              onSelectKos={setSelectedKos}
              landmarks={LANDMARKS}
              activeLandmarkId={filters.landmarkId}
              searchRadius={filters.maxDistance}
              userLocation={userLocation}
            />

            {/* Float Overlay Info Indicator footer (from Geometric design instructions) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-5 py-2 shadow-lg flex items-center gap-4 z-[999] text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span>Makassar Raya</span>
              </div>
              <div className="h-3 w-px bg-slate-350"></div>
              <div className="flex items-center gap-1">
                <span>Update:</span>
                <span className="font-bold text-indigo-600 font-mono">Baru Saja</span>
              </div>
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, landmarkId: 'Semua' }));
                  setSelectedKos(null);
                }}
                className="text-xs font-bold text-slate-400 hover:text-indigo-600 cursor-pointer ml-1"
                title="Atur ulang posisi fokus peta"
              >
                Fokus Map
              </button>
            </div>
          </div>

          {/* Quick instructions bottom footer of details pane */}
          <div className="bg-white border-t border-slate-200 p-4 shrink-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse shrink-0" />
              <p className="text-slate-600 text-[11px] font-medium leading-relaxed max-w-2xl">
                <strong>Petunjuk Cepat:</strong> Filter kos di Makassar berdasarkan budget bulanan, tipe penghuni, dan kawasan kampus/landmark di kiri. Ketuk marker kos di peta untuk melihat kontak langsung via WhatsApp!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Deep Detail Modal Overlay */}
      {selectedKos && (
        <KosDetailModal
          kos={selectedKos}
          onClose={() => setSelectedKos(null)}
          onBookSimulate={handleBookRoomSimulate}
          onReleaseSimulate={handleReleaseRoomSimulate}
        />
      )}

      {/* 5. Form property registration modal */}
      <AddKosModal
        isOpen={isNewKosModalOpen}
        onClose={() => setIsNewKosModalOpen(false)}
        onAdd={handleAddKos}
      />
    </div>
  );
}
