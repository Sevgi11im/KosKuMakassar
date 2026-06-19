import { useState, FormEvent } from 'react';
import { Kos, KosType } from '../types';
import { AREAS } from '../data';
import { X, MapPin, DollarSign, Home, Phone, User, Compass } from 'lucide-react';

interface AddKosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newKos: Kos) => void;
}

export default function AddKosModal({ isOpen, onClose, onAdd }: AddKosModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<KosType>('Putra');
  const [locationArea, setLocationArea] = useState(AREAS[0]);
  const [priceMonthly, setPriceMonthly] = useState(800000);
  const [roomCount, setRoomCount] = useState(10);
  const [roomsAvailable, setRoomsAvailable] = useState(4);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(-5.15); // Makassar center preset
  const [lng, setLng] = useState(119.45);
  const [contactPhone, setContactPhone] = useState('081234567890');
  const [ownerName, setOwnerName] = useState('');
  const [description, setDescription] = useState('');

  // Simple coordinate preset helper
  const handlePresetCoordinates = (area: string) => {
    // Return realistic coords near different Makassar areas
    switch (area) {
      case 'Tamalanrea':
        setLat(-5.132 + Math.random() * 0.01 - 0.005);
        setLng(119.489 + Math.random() * 0.01 - 0.005);
        break;
      case 'Rappocini':
        setLat(-5.181 + Math.random() * 0.01 - 0.005);
        setLng(119.432 + Math.random() * 0.01 - 0.005);
        break;
      case 'Panakkukang':
        setLat(-5.155 + Math.random() * 0.01 - 0.005);
        setLng(119.443 + Math.random() * 0.01 - 0.005);
        break;
      case 'Samata':
        setLat(-5.201 + Math.random() * 0.01 - 0.005);
        setLng(119.493 + Math.random() * 0.01 - 0.005);
        break;
      default:
        setLat(-5.147 + Math.random() * 0.02 - 0.01);
        setLng(119.432 + Math.random() * 0.02 - 0.01);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !address || !ownerName || !description) {
      alert('Mohon lengkapi semua kolom wajib!');
      return;
    }

    // Semi-stochastic images
    const sampleImages = [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'
    ];

    const newKos: Kos = {
      id: `kos-custom-${Date.now()}`,
      name,
      type,
      lat,
      lng,
      address,
      locationArea,
      priceMonthly,
      roomCount,
      roomsAvailable: Math.min(roomsAvailable, roomCount),
      rating: 4.5,
      reviewsCount: 1,
      description,
      facilities: [],
      images: sampleImages,
      contactPhone,
      ownerName,
    };

    onAdd(newKos);
    onClose();

    // Reset fields
    setName('');
    setAddress('');
    setOwnerName('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-[9999] animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-100 animate-slide-up"
      >
        {/* Header */}
        <div className="px-5 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5 font-sans">
            <Home className="w-5 h-5 text-indigo-600" />
            Daftarkan Kos Baru di Makassar
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 px-1.5 hover:bg-slate-150 text-slate-500 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Form Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {/* Main Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Nama Kos-kosan *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Pondok Nurul Hasanah, Kos Eksklusif Pettarani"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-800 font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Tipe */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Tipe Penghuni *</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as KosType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 cursor-pointer"
              >
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
                <option value="Tidak Terdeteksi">Tidak Terdeteksi</option>
              </select>
            </div>

            {/* Wilayah */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Wilayah Makassar *</label>
              <select
                value={locationArea}
                onChange={e => {
                  setLocationArea(e.target.value);
                  handlePresetCoordinates(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 cursor-pointer"
              >
                {AREAS.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Harga Bulanan (Rp) *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-semibold text-xs">Rp</span>
                <input
                  type="number"
                  required
                  placeholder="800000"
                  min="300000"
                  max="10000000"
                  value={priceMonthly}
                  onChange={e => setPriceMonthly(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono text-slate-800"
                />
              </div>
            </div>

            {/* Rooms Info */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Total & Sedia Kamar *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  title="Total Kamar"
                  placeholder="Total"
                  min="1"
                  max="100"
                  value={roomCount}
                  onChange={e => setRoomCount(parseInt(e.target.value) || 1)}
                  className="w-1/2 px-2.5 py-2 border border-slate-200 rounded-lg text-center font-mono placeholder-slate-400"
                />
                <input
                  type="number"
                  required
                  title="Kamar Kosong Sedia"
                  placeholder="Kosong"
                  min="0"
                  max={roomCount}
                  value={roomsAvailable}
                  onChange={e => setRoomsAvailable(parseInt(e.target.value) || 0)}
                  className="w-1/2 px-2.5 py-2 border border-slate-200 rounded-lg text-center font-mono placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Coordinates adjustment */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                Koordinat Peta Makassar
              </span>
              <button
                type="button"
                onClick={() => handlePresetCoordinates(locationArea)}
                className="text-[9px] font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Gunakan Preset Koordinat Wilayah
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold font-mono">Lat:</span>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={lat}
                  onChange={e => setLat(parseFloat(e.target.value) || -5.15)}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded font-mono text-slate-700"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold font-mono">Lng:</span>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={lng}
                  onChange={e => setLng(parseFloat(e.target.value) || 119.45)}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded font-mono text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Address & Owner name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Alamat Lengkap *</label>
            <input
              type="text"
              required
              placeholder="Nama jalan, nomor rumah, lorong, detail lokasi..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Owner name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nama Pengelola *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Daeng Beddu"
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">No. WhatsApp / HP *</label>
              <input
                type="text"
                required
                placeholder="0812XXXXXXXX"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Deskripsi Kos *</label>
            <textarea
              required
              rows={3}
              placeholder="Ceritakan detail fasilitas kos, kenyamanan, jarak ke tempat makan, air bersih, keamanan..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-800 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Footer Submit */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 hover:bg-slate-200 bg-slate-150 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-all"
          >
            Batalkan
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
          >
            Simpan & Tambahkan Peta
          </button>
        </div>
      </form>
    </div>
  );
}
