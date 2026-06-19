import { useState } from 'react';
import { Kos } from '../types';
import { X, Star, MapPin, Phone, User, Check, Shield, Share2, MessageSquare, Activity, Plus, Minus } from 'lucide-react';

interface KosDetailModalProps {
  kos: Kos;
  onClose: () => void;
  onBookSimulate: (id: string) => void;
  onReleaseSimulate: (id: string) => void;
}

export default function KosDetailModal({
  kos,
  onClose,
  onBookSimulate,
  onReleaseSimulate,
}: KosDetailModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleShare = () => {
    // Simulate share link copy
    navigator.clipboard.writeText(`${window.location.origin}/#kos-${kos.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // WhatsApp chat template link generators
  const getWhatsAppLink = () => {
    const text = `Halo ${kos.ownerName}, saya melihat kos "${kos.name}" Anda di Peta Kos Makassar. Apakah kamar bertipe ${kos.type} dengan harga ${formatPrice(kos.priceMonthly)} per bulan masih tersedia?`;
    return `https://wa.me/${kos.contactPhone.replace(/\s+/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const isFull = kos.roomsAvailable === 0;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-[9999] animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-100 animate-slide-up">
        {/* Modal Header */}
        <div className="px-5 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Detail Kos Makassar</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 hover:bg-slate-150 text-slate-500 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded-md tracking-wider">
                  Tipe: {kos.type === 'Tidak Terdeteksi' ? 'Belum Tahu' : kos.type}
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-150 text-slate-500 text-[10px] font-mono rounded-md">
                  ID: {kos.id}
                </span>
              </div>
              <h1 className="text-sm sm:text-lg font-bold text-slate-800 font-sans tracking-tight pt-1">
                {kos.name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{kos.address}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">
                  Kecamatan {kos.locationArea}
                </span>
                <span className="flex items-center gap-1 bg-orange-50 border border-orange-100 text-orange-700 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {kos.rating.toFixed(1)} ({kos.reviewsCount} Ulasan)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-center text-center space-y-1">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Harga Bulanan</span>
              <span className="text-md sm:text-lg font-bold text-indigo-600 font-mono">
                {formatPrice(kos.priceMonthly)}
              </span>
              <span className="text-[10px] text-slate-400 font-sans leading-none">Sudah termasuk fasilitas utama</span>
            </div>
          </div>

          <div className="border-t border-slate-1 w-full my-4"></div>

          {/* Dynamic Simulator Engine Block */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-sans">
                  Mesin Simulasi Ketersediaan Kamar
                </h3>
                <p className="text-[10px] text-emerald-600 font-sans">
                  Gunakan tombol ini untuk pura-pura memesan atau melepas kamar dan melihat perubahannya live di peta!
                </p>
              </div>
              <div className="bg-white/80 border border-emerald-200 px-2.5 py-1 rounded-md text-center">
                <div className="text-[10px] leading-none text-emerald-600 font-medium font-sans">Kamar Kosong</div>
                <div className="text-xs font-bold font-mono text-emerald-800 pt-0.5">
                  {kos.roomsAvailable} / {kos.roomCount}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1 sm:grid-cols-2">
              <button
                onClick={() => onBookSimulate(kos.id)}
                disabled={isFull}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 text-white cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Minus className="w-3.5 h-3.5" />
                Pesan Kamar (Kurangi Sedia)
              </button>
              <button
                onClick={() => onReleaseSimulate(kos.id)}
                disabled={kos.roomsAvailable >= kos.roomCount}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-white text-emerald-700 hover:bg-emerald-100 active:scale-95 disabled:opacity-50 border border-emerald-200 cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Lepas Kamar (Tambah Sedia)
              </button>
            </div>
            {isFull && (
              <p className="text-[10px] text-red-500 font-semibold text-center font-sans">
                Kamar sudah penuh! Silakan ketuk tombol "Lepas Kamar" untuk mensimulasikan ketersediaan kembali.
              </p>
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deskripsi Lengkap</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{kos.description}</p>
          </div>

          {/* Owner Profile Panel */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase leading-none">Pemilik Kos</div>
                <div className="text-xs font-bold text-slate-800">{kos.ownerName}</div>
                <div className="text-[10px] font-mono text-slate-500">{kos.contactPhone}</div>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {/* WhatsApp direct chat link */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                Hubungi via WhatsApp
              </a>
              <button
                onClick={handleShare}
                className="p-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-105 transition-colors cursor-pointer text-slate-500"
                title="Salin Tautan Kos"
              >
                {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Verifikasi legalitas dokumen kos terjamin 100%</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 hover:bg-slate-200 bg-slate-150 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
}
