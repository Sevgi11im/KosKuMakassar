export type KosType = 'Putra' | 'Putri' | 'Campur' | 'Tidak Terdeteksi';

export interface Kos {
  id: string;
  name: string;
  type: KosType;
  lat: number;
  lng: number;
  address: string;
  locationArea: string; // e.g., 'Tamalanrea', 'Rappocini', 'Panakkukang', 'Ujung Pandang'
  priceMonthly: number;
  roomCount: number;
  roomsAvailable: number;
  rating: number;
  reviewsCount: number;
  description: string;
  facilities?: string[]; // Made optional/deprecated as we move facilities to description text
  images: string[];
  contactPhone: string;
  ownerName: string;
  featured?: boolean;
}

export interface Landmark {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface FilterState {
  searchQuery: string;
  type: KosType | 'Semua';
  minPrice: number;
  maxPrice: number;
  area: string | 'Semua';
  landmarkId: string | 'Semua';
  maxDistance: number; // in km, active only if landmarkId !== 'Semua' or user location is active
}

export interface Bookmark {
  id: string;
  createdAt: string;
}

export interface SimulationEvent {
  id: string;
  kosId: string;
  kosName: string;
  type: 'booking' | 'checkout' | 'visit';
  roomNumber: number;
  timestamp: string;
  message: string;
}
