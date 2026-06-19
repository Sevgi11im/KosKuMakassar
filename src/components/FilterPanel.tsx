import { FilterState, KosType, Landmark } from '../types';
import { AREAS } from '../data';
import { Search, MapPin, ListFilter, RotateCcw, Navigation } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  landmarks: Landmark[];
  onResetFilters: () => void;
  onLocateUser: () => void;
  isLocatingUser: boolean;
}

export default function FilterPanel({
  filters,
  onChangeFilters,
  landmarks,
  onResetFilters,
  onLocateUser,
  isLocatingUser,
}: FilterPanelProps) {
  const handleQueryChange = (val: string) => {
    onChangeFilters({ ...filters, searchQuery: val });
  };

  const handleTypeChange = (type: KosType | 'Semua') => {
    onChangeFilters({ ...filters, type });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', val: number) => {
    onChangeFilters({ ...filters, [field]: val });
  };

  const handleAreaChange = (area: string) => {
    onChangeFilters({ ...filters, area });
  };

  const handleLandmarkChange = (landmarkId: string) => {
    // If selecting a landmark, reset maxDistance to standard 3 km
    onChangeFilters({
      ...filters,
      landmarkId,
      maxDistance: landmarkId === 'Semua' ? 10 : 3,
    });
  };

  const handleDistanceChange = (maxDistance: number) => {
    onChangeFilters({ ...filters, maxDistance });
  };

  const formatPriceLabel = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)} Jt`;
    return `${(val / 1000).toFixed(0)} Rb`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-indigo-600" />
          <h2 className="font-sans font-semibold text-slate-800 text-sm">Filter Pencarian Kos</h2>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Atur Ulang
        </button>
      </div>

      {/* 1. Search Query */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Nama / Kata Kunci</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari Pondok Melati, Kos UNHAS..."
            value={filters.searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 text-slate-800 transition-all font-sans"
          />
        </div>
      </div>

      {/* 2. Tipe Kos */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Tipe Penghuni</label>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-50 rounded-lg border border-slate-150">
          {(['Semua', 'Putra', 'Putri', 'Campur', 'Tidak Terdeteksi'] as const).map((t) => {
            const isActive = filters.type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`flex-1 min-w-[65px] text-center py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t === 'Tidak Terdeteksi' ? 'Belum Tahu' : t}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filter Jarak (Landmark Universitas / Kota) */}
      <div className="space-y-3 bg-indigo-50/40 border border-indigo-100/40 rounded-xl p-4.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            Cari Dekat Landmark
          </label>
          <button
            onClick={onLocateUser}
            disabled={isLocatingUser}
            className={`text-[10px] font-semibold flex items-center gap-1 px-2 py-1 rounded bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all disabled:opacity-50 cursor-pointer`}
          >
            <Navigation className={`w-3 h-3 ${isLocatingUser ? 'animate-spin' : ''}`} />
            {isLocatingUser ? 'Mendeteksi...' : 'Lokasi Saya'}
          </button>
        </div>

        <div className="space-y-3">
          <select
            value={filters.landmarkId}
            onChange={(e) => handleLandmarkChange(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-700 font-sans cursor-pointer"
          >
            <option value="Semua">-- Semua Landmark Makassar --</option>
            {landmarks.map((landmark) => (
              <option key={landmark.id} value={landmark.id}>
                {landmark.name}
              </option>
            ))}
          </select>

          {filters.landmarkId !== 'Semua' && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium font-sans">Maksimal Radius Jarak:</span>
                <span className="text-indigo-600 font-bold font-mono">{filters.maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={filters.maxDistance}
                onChange={(e) => handleDistanceChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Lokasi Wilayah Kecamatan */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Wilayah / Kec.</label>
        <select
          value={filters.area}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-sans cursor-pointer"
        >
          <option value="Semua">Semua Wilayah Makassar</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Range Harga Bulanan */}
      <div className="space-y-3.5">
        <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">
          Harga Bulanan Maksimal
        </label>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium font-sans">Anggaran Batas:</span>
            <span className="text-indigo-600 font-bold font-sans">
              Rp {formatPriceLabel(filters.maxPrice)} / bln
            </span>
          </div>
          <input
            type="range"
            min="400000"
            max="3000000"
            step="100000"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange('maxPrice', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Rp 400 Rb</span>
            <span>Rp 1.5 Jt</span>
            <span>Rp 3.0 Jt+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
