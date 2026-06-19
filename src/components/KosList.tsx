import { Kos, Landmark } from '../types';
import { Star, Heart, MapPin, User, ChevronRight, Activity } from 'lucide-react';

interface KosListProps {
  kosList: Kos[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  selectedKos: Kos | null;
  onSelectKos: (kos: Kos) => void;
  activeLandmark: Landmark | null;
  distances: Record<string, number>; // distance of each kos in km
}

export default function KosList({
  kosList,
  bookmarks,
  onToggleBookmark,
  selectedKos,
  onSelectKos,
  activeLandmark,
  distances,
}: KosListProps) {
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 font-sans">
          Ditemukan <span className="text-indigo-600 font-mono font-bold">{kosList.length}</span> kos di Makassar
        </p>
      </div>

      {kosList.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6 text-slate-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-700 text-sm font-sans">Kamar Kos Tidak Ditemukan</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto font-sans leading-relaxed">
              Coba atur ulang filter pencarian Anda, turunkan anggaran, atau ubah lokasi pencarian Anda.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {kosList.map((kos) => {
            const isSelected = selectedKos?.id === kos.id;
            const isBookmarked = bookmarks.includes(kos.id);
            const isFull = kos.roomsAvailable === 0;
            const distance = distances[kos.id];

            // Badges
            let genderBadgeStyles = 'bg-blue-50 text-blue-700 border-blue-100';
            if (kos.type === 'Putri') {
              genderBadgeStyles = 'bg-pink-50 text-pink-700 border-pink-100';
            } else if (kos.type === 'Campur') {
              genderBadgeStyles = 'bg-purple-50 text-purple-700 border-purple-100';
            }

            return (
              <div
                key={kos.id}
                onClick={() => onSelectKos(kos)}
                className={`relative bg-white rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:shadow-md ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/15 shadow-sm translate-x-1.5'
                    : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                {/* Info Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Top badging and bookmark line */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${genderBadgeStyles}`}>
                        {kos.type === 'Tidak Terdeteksi' ? 'Belum Tahu' : kos.type}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(kos.id);
                        }}
                        className={`p-1.5 rounded-full transition-transform active:scale-90 border ${
                          isBookmarked
                            ? 'bg-red-500/10 border-red-200 text-red-500'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-150 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Title & Rating */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 hover:text-indigo-600 transition-colors">
                        {kos.name}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center gap-0.5 text-orange-500 flex-shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-bold font-mono">{kos.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Address / Location */}
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-sans">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{kos.locationArea} • {kos.address}</span>
                    </div>

                    {/* Distance indicator (real-time distance) */}
                    {distance !== undefined && (
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold border border-slate-200">
                        <Activity className="w-2.5 h-2.5 text-indigo-500" />
                        <span>
                          {distance.toFixed(2)} km dari {activeLandmark ? activeLandmark.name : 'Lokasi Anda'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Availability */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-sans text-slate-400 block leading-none">Harga Bulanan</span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-600 font-mono">
                        {formatPrice(kos.priceMonthly)}
                      </span>
                    </div>

                    {/* Room Availability with urgency levels */}
                    <div>
                      {isFull ? (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          Kamar Penuh
                        </span>
                      ) : kos.roomsAvailable === 1 ? (
                        <div className="flex flex-col items-end">
                          <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Sisa 1 Kamar!
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 select-none">
                          {kos.roomsAvailable} Kamar Sedia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
