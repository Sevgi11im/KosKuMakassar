import { Kos, Landmark } from './types';

export const LANDMARKS: Landmark[] = [
  { id: 'unhas', name: 'Kampus Tamalanrea UNHAS', lat: -5.1315, lng: 119.4883 },
  { id: 'unm', name: 'Kampus Gunungsari UNM', lat: -5.1852, lng: 119.4310 },
  { id: 'uin', name: 'Kampus 2 Samata UIN Alauddin', lat: -5.2019, lng: 119.4939 },
  { id: 'panakkukang', name: 'Mall Panakkukang (Pusat Kota)', lat: -5.1566, lng: 119.4447 },
  { id: 'pantai_losari', name: 'Pantai Losari Makassar', lat: -5.1444, lng: 119.4061 },
];

export const AREAS = [
  'Tamalanrea',
  'Rappocini',
  'Panakkukang',
  'Biringkanaya',
  'Manggala',
  'Ujung Pandang',
  'Mariso'
];

export const FACILITIES_LIST = [
  'Wi-Fi',
  'AC',
  'Kamar Mandi Dalam',
  'Kasur',
  'Lemari Pakaian',
  'Parkir Motor',
  'Dapur Bersama',
  'Listrik Gratis',
  'Akses 24 Jam',
  'Penjaga Kos',
  'Cuci Setrika'
];

export const INITIAL_KOS_DATA: Kos[] = [
  {
    id: 'kos-1',
    name: 'Pondok Madinah Syariah Tamalanrea',
    type: 'Putra',
    lat: -5.1325,
    lng: 119.4895,
    address: 'Jl. Perintis Kemerdekaan VIII, Tamalanrea (Dekat Pintu 1 UNHAS)',
    locationArea: 'Tamalanrea',
    priceMonthly: 850000,
    roomCount: 15,
    roomsAvailable: 3,
    rating: 4.6,
    reviewsCount: 18,
    description: 'Kost khusus putra nyaman dan tenang, dekat dengan gerbang utama Kampus UNHAS Tamalanrea. Kamar sudah dilengkapi dengan kasur springbed, lemari pakaian, meja belajar, dan dapur bersama yang bersih.\n\nFasilitas: Wi-Fi, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081234567890',
    ownerName: 'Daeng Ngerang',
    featured: true
  },
  {
    id: 'kos-2',
    name: 'Kost Putri Pondok Sahabat UNHAS',
    type: 'Putri',
    lat: -5.1305,
    lng: 119.4935,
    address: 'Jl. Sahabat No. 45, Tamalanrea (Dekat Fak. Kedokteran UNHAS)',
    locationArea: 'Tamalanrea',
    priceMonthly: 900000,
    roomCount: 20,
    roomsAvailable: 5,
    rating: 4.8,
    reviewsCount: 24,
    description: 'Kos putri eksklusif sangat aman dengan security gerbang satu pintu (one gate system). Hanya berjarak 5 menit jalan kaki ke Fakultas Kedokteran UNHAS dan RS Wahidin Sudirohusodo.\n\nFasilitas: Wi-Fi, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081344219088',
    ownerName: 'Hj. Syamsiah',
    featured: true
  },
  {
    id: 'kos-3',
    name: 'Kost Putra Pondok Citra Rappocini',
    type: 'Putra',
    lat: -5.1838,
    lng: 119.4312,
    address: 'Jl. Rappocini Raya Lorong 5 No. 8, Rappocini (Dekat Menara Pinisi UNM)',
    locationArea: 'Rappocini',
    priceMonthly: 700000,
    roomCount: 12,
    roomsAvailable: 2,
    rating: 4.4,
    reviewsCount: 12,
    description: 'Kos putra ekonomis yang sangat dekat dengan Menara Pinisi Kampus UNM Gunungsari. Akses mudah ke jalan raya pusat kuliner Rappocini.\n\nFasilitas: Wi-Fi, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '085299001122',
    ownerName: 'Bapak Ruslan',
    featured: false
  },
  {
    id: 'kos-4',
    name: 'Kost Eksklusif Pettarani Suite',
    type: 'Campur',
    lat: -5.1789,
    lng: 119.4350,
    address: 'Jl. A. P. Pettarani II No. 14A, Rappocini',
    locationArea: 'Rappocini',
    priceMonthly: 2100000,
    roomCount: 10,
    roomsAvailable: 2,
    rating: 4.9,
    reviewsCount: 31,
    description: 'Kos eksklusif mewah setara hotel/apartemen di pusat kota AP Pettarani Makassar. Fasilitas premium terlengkap dengan AC, WiFi kecepatan tinggi, Smart TV, kamar mandi dalam dengan water heater, cuci setrika, serta parkir terlindung.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Penjaga Kos, Cuci Setrika, Listrik Gratis, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Penjaga Kos', 'Cuci Setrika', 'Listrik Gratis', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081144002233',
    ownerName: 'Ibu Fatmawati',
    featured: true
  },
  {
    id: 'kos-5',
    name: 'Kost Putri Pondok Muslimah Samata Gowa',
    type: 'Putri',
    lat: -5.2018,
    lng: 119.4940,
    address: 'Jl. H. M. Yasin Limpo No. 22 (Dekat Pintu Gerbang UIN Samata)',
    locationArea: 'Manggala',
    priceMonthly: 550000,
    roomCount: 16,
    roomsAvailable: 4,
    rating: 4.2,
    reviewsCount: 10,
    description: 'Kos putri muslimah ekonomis di dekat kampus II UIN Alauddin Makassar Samata. Lingkungan islami, bersih, aman, sangat ideal untuk mahasiswi yang ingin fokus studi.\n\nFasilitas: Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama, Listrik Gratis',
    facilities: ['Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama', 'Listrik Gratis'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '085311445566',
    ownerName: 'Deng Sija',
    featured: false
  },
  {
    id: 'kos-6',
    name: 'Kost Pondok Hijau Tamalanrea',
    type: 'Tidak Terdeteksi',
    lat: -5.1385,
    lng: 119.4855,
    address: 'Jl. Perintis Kemerdekaan KM 10, Tamalanrea (Belakang Kampus STIMIK Dipanegara/UNHAS)',
    locationArea: 'Tamalanrea',
    priceMonthly: 600000,
    roomCount: 12,
    roomsAvailable: 1,
    rating: 4.3,
    reviewsCount: 8,
    description: 'Kost hemat di area strategis Perintis Kemerdekaan, sangat bersahabat bagi mahasiswa. Dekat dengan berbagai warung makan murah dan minimarket.\n\nFasilitas: Wi-Fi, Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama', 'Akses 24 Jam'],
    images: [], // No photo (empty) - testing google maps location listing with no photo
    contactPhone: '087844001928',
    ownerName: 'Daeng Ngitung',
    featured: false
  },
  {
    id: 'kos-7',
    name: 'Kost Eksklusif Bougenville Panakkukang',
    type: 'Campur',
    lat: -5.1545,
    lng: 119.4470,
    address: 'Jl. Bougenville No. 3, Panakkukang (Dekat Mall Panakkukang)',
    locationArea: 'Panakkukang',
    priceMonthly: 1600000,
    roomCount: 18,
    roomsAvailable: 6,
    rating: 4.7,
    reviewsCount: 14,
    description: 'Kost eksklusif campur di ruko Bougenville, hanya berjarak 5 menit dari Mall Panakkukang. Kamar luas ber-AC mewah dengan sirkulasi udara baik, meja kerja, dan WiFi dedicated super cepat.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081244558899',
    ownerName: 'Ko Handoko',
    featured: true
  },
  {
    id: 'kos-8',
    name: 'Wisma Cendrawasih Executive Mariso',
    type: 'Tidak Terdeteksi',
    lat: -5.1515,
    lng: 119.4090,
    address: 'Jl. Cendrawasih No. 120, Mariso (Dekat Pantai Losari)',
    locationArea: 'Mariso',
    priceMonthly: 1850000,
    roomCount: 14,
    roomsAvailable: 2,
    rating: 4.5,
    reviewsCount: 11,
    description: 'Kost modern berkelas di jalan Cendrawasih, dekat dengan pusat wisata Pantai Losari, Trans Studio Mall, dan Mall Ratu Indah. Kamar mandi dalam dengan air mengalir lancar, nyaman dan strategis.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [], // No photo (empty) - testing google maps location listing with no photo
    contactPhone: '081355009988',
    ownerName: 'Andi Baso',
    featured: false
  },
  {
    id: 'kos-9',
    name: 'Kost Pondok Sudiang Indah',
    type: 'Tidak Terdeteksi',
    lat: -5.1095,
    lng: 119.5120,
    address: 'Jl. Goa Ria, Sudiang, Biringkanaya (Dekat Bandara Hasanuddin)',
    locationArea: 'Biringkanaya',
    priceMonthly: 650000,
    roomCount: 10,
    roomsAvailable: 4,
    rating: 4.1,
    reviewsCount: 7,
    description: 'Kost strategis di wilayah Sudiang, sangat dekat dengan Bandara Sultan Hasanuddin dan GOR Sudiang. Lingkungan sejuk, tenang, dan memiliki halaman parkir motor terintegrasi dengan pagar ganda.\n\nFasilitas: Wi-Fi, Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama', 'Akses 24 Jam'],
    images: [], // No photo (empty) - testing google maps location listing with no photo
    contactPhone: '087812345678',
    ownerName: 'Daeng Sese',
    featured: false
  },
  {
    id: 'kos-10',
    name: 'Kost Putri Pondok Hertasning Residence',
    type: 'Putri',
    lat: -5.1685,
    lng: 119.4890,
    address: 'Jl. Hertasning Baru, Manggala (Kawasan Perumahan Elite)',
    locationArea: 'Manggala',
    priceMonthly: 950000,
    roomCount: 12,
    roomsAvailable: 2,
    rating: 4.3,
    reviewsCount: 15,
    description: 'Kost premium putri yang berlokasi di kawasan asri Hertasning Baru Makassar. Sangat sejuk, bersih, bebas banjir, dekat menuju berbagai pusat perkantoran dan pertokoan penting di kota Makassar.\n\nFasilitas: Wi-Fi, AC, Kasur, Lemari Pakaian, Parkir Motor, Dapur Bersama',
    facilities: ['Wi-Fi', 'AC', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '085213245768',
    ownerName: 'Ibu Norma',
    featured: false
  },
  {
    id: 'kos-11',
    name: 'Kost Executive Pettarani 11',
    type: 'Campur',
    lat: -5.1485,
    lng: 119.4380,
    address: 'Jl. A.P. Pettarani Ruko Flyover No. 12, Rappocini',
    locationArea: 'Rappocini',
    priceMonthly: 1900000,
    roomCount: 15,
    roomsAvailable: 3,
    rating: 4.7,
    reviewsCount: 22,
    description: 'Kost premium dengan lokasi sangat strategis tepat di pinggir Jl. A.P. Pettarani dekat Flyover. Akses bepergian sangat mudah dan cepat ke seluruh penjuru Kota Makassar.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Meja Belajar, Parkir Motor, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Parkir Motor', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081244558899',
    ownerName: 'Bapak Rahman',
    featured: true
  },
  {
    id: 'kos-12',
    name: 'Kost Pondok Muslimah Antang',
    type: 'Putri',
    lat: -5.1610,
    lng: 119.4910,
    address: 'Jl. Antang Raya No. 45, Manggala',
    locationArea: 'Manggala',
    priceMonthly: 700000,
    roomCount: 8,
    roomsAvailable: 4,
    rating: 4.2,
    reviewsCount: 6,
    description: 'Kost khusus putri muslimah dengan lingkungan aman, bersih, kondusif, nyaman dan sejuk. Sangat cocok untuk mahasiswi yang menginginkan suasana tenang.\n\nFasilitas: Kasur, Lemari Pakaian, Kipas Angin, Parkir Motor, Dapur Bersama',
    facilities: ['Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Dapur Bersama'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '085288771122',
    ownerName: 'Ibu Fatimah',
    featured: false
  },
  {
    id: 'kos-13',
    name: 'Wisma Bahtera Losari',
    type: 'Tidak Terdeteksi',
    lat: -5.1412,
    lng: 119.4055,
    address: 'Jl. Somba Opu Gang 3 No. 8, Ujung Pandang (Dekat Pantai Losari)',
    locationArea: 'Ujung Pandang',
    priceMonthly: 1200000,
    roomCount: 10,
    roomsAvailable: 1,
    rating: 4.4,
    reviewsCount: 14,
    description: 'Penginapan harian dan bulanan berlokasi sangat strategis, hanya beberapa meter berjalan kaki dari ikon pariwisata Pantai Losari Makassar.\n\nFasilitas: AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, TV, Parkir Motor, Penjaga Kos',
    facilities: ['AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Penjaga Kos'],
    images: [], // No photo (empty) - retrieved via Google Maps location listing with no photo available
    contactPhone: '081122334455',
    ownerName: 'Pak Andi',
    featured: false
  },
  {
    id: 'kos-14',
    name: 'Kost Pondok Veteran Rappocini',
    type: 'Putra',
    lat: -5.1585,
    lng: 119.4260,
    address: 'Jl. Veteran Selatan Lorong 4 No. 15, Rappocini',
    locationArea: 'Rappocini',
    priceMonthly: 800000,
    roomCount: 12,
    roomsAvailable: 2,
    rating: 4.0,
    reviewsCount: 5,
    description: 'Kost khusus putra di Jl. Veteran Selatan, dekat dengan pusat ritel, kuliner, perkantoran, dan angkutan umum.\n\nFasilitas: Kasur, Lemari Pakaian, Meja Belajar, Parkir Motor, Dapur Bersama',
    facilities: ['Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Parkir Motor', 'Dapur Bersama'],
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '089988776655',
    ownerName: 'Daeng Rewa',
    featured: false
  },
  {
    id: 'kos-15',
    name: 'Kost Putri Al-Azhar Samata',
    type: 'Putri',
    lat: -5.1885,
    lng: 119.4930,
    address: 'Jl. M. Yasin Limpo No. 22, Somba Opu (Depan Kampus II UIN)',
    locationArea: 'Somba Opu',
    priceMonthly: 750000,
    roomCount: 16,
    roomsAvailable: 5,
    rating: 4.5,
    reviewsCount: 19,
    description: 'Kost khusus mahasiswi UIN Samata yang terletak persis di depan gerbang kampus II. Lingkungan asri, islami, aman, dan sangat mendukung kegiatan akademis.\n\nFasilitas: Wi-Fi, Kasur, Lemari Pakaian, Meja Belajar, Parkir Motor, Dapur Bersama, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Parkir Motor', 'Dapur Bersama', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '082155667788',
    ownerName: 'Ibu Hajah Maryam',
    featured: true
  },
  {
    id: 'kos-16',
    name: 'Kost Ratulangi Residence',
    type: 'Tidak Terdeteksi',
    lat: -5.1610,
    lng: 119.4180,
    address: 'Jl. Dr. Ratulangi No. 88, Mamajang',
    locationArea: 'Mamajang',
    priceMonthly: 2200000,
    roomCount: 15,
    roomsAvailable: 3,
    rating: 4.8,
    reviewsCount: 30,
    description: 'Kost eksklusif modern minimalis di pusat kota dekat Mall Ratu Indah (MaRI). Keamanan terjaga dengan CCTV dan kartu akses 24 jam.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, TV, Meja Belajar, Water Heater, Cuci Setrika, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Penjaga Kos', 'Cuci Setrika', 'Akses 24 Jam'],
    images: [], // Empty - no photo available on Google Maps location
    contactPhone: '081211112222',
    ownerName: 'Vivi Wijaya',
    featured: false
  },
  {
    id: 'kos-17',
    name: 'Moncongloe Pondok Indah',
    type: 'Tidak Terdeteksi',
    lat: -5.1310,
    lng: 119.5180,
    address: 'Jl. Moncongloe Raya, Biringkanaya',
    locationArea: 'Biringkanaya',
    priceMonthly: 600000,
    roomCount: 20,
    roomsAvailable: 6,
    rating: 3.9,
    reviewsCount: 4,
    description: 'Kost ekonomis dengan lingkungan sejuk yang tenang dan asri, berlokasi di daerah Moncongloe dekat batas Gowa-Makassar.\n\nFasilitas: Kasur, Lemari, Parkir Motor Luas, Dapur Bersama',
    facilities: ['Kasur', 'Lemari', 'Parkir Motor Luas', 'Dapur Bersama'],
    images: [], // Empty
    contactPhone: '085299002211',
    ownerName: 'Pak Syamsul',
    featured: false
  },
  {
    id: 'kos-18',
    name: 'Pondok Wisata Unhas Tamalanrea',
    type: 'Campur',
    lat: -5.1315,
    lng: 119.4950,
    address: 'Jl. Sahabat No. 9A, Tamalanrea (Samping Pintu Nol UNHAS)',
    locationArea: 'Tamalanrea',
    priceMonthly: 1100000,
    roomCount: 14,
    roomsAvailable: 2,
    rating: 4.6,
    reviewsCount: 15,
    description: 'Kost sangat strategis tepat di samping Pintu Nol Universitas Hasanuddin Tamalanrea. Sangat fleksibel dan nyaman bagi mahasiswa pascasarjana, koas, maupun pekerja kantoran.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Meja Belajar, Parkir Motor, Dapur Bersama, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Parkir Motor', 'Dapur Bersama', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '087834567890',
    ownerName: 'Daeng Naba',
    featured: false
  },
  {
    id: 'kos-19',
    name: 'Kost Putra Alauddin Gunungsari',
    type: 'Putra',
    lat: -5.1780,
    lng: 119.4390,
    address: 'Jl. Sultan Alauddin Lorong 2 No. 5, Rappocini',
    locationArea: 'Rappocini',
    priceMonthly: 850000,
    roomCount: 10,
    roomsAvailable: 3,
    rating: 4.1,
    reviewsCount: 8,
    description: 'Kost khusus putra berlokasi strategis di Jl. Sultan Alauddin, berdekatan dengan Kampus UNISMUH dan Kampus UNM Gunungsari. Lingkungan ramah dan teratur.\n\nFasilitas: Kasur, Lemari Pakaian, Meja Belajar, Parkir Motor, Dapur Bersama, Akses 24 Jam',
    facilities: ['Kasur', 'Lemari Pakaian', 'Meja Belajar', 'Parkir Motor', 'Dapur Bersama', 'Akses 24 Jam'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'
    ],
    contactPhone: '081399881122',
    ownerName: 'Pak Kahar',
    featured: false
  },
  {
    id: 'kos-20',
    name: 'Wisma Panakkukang Indah',
    type: 'Tidak Terdeteksi',
    lat: -5.1565,
    lng: 119.4520,
    address: 'Jl. Pengayoman Lorong F No. 23, Panakkukang',
    locationArea: 'Panakkukang',
    priceMonthly: 1500000,
    roomCount: 12,
    roomsAvailable: 4,
    rating: 4.3,
    reviewsCount: 11,
    description: 'Penginapan harian dan kost bulanan di area bisnis Pengayoman Panakkukang Makassar. Sangat dekat dengan pusat perbelanjaan Mall Panakkukang dan pusat kuliner.\n\nFasilitas: Wi-Fi, AC, Kamar Mandi Dalam, Kasur, Lemari Pakaian, Parkir Motor, Penjaga Kos, Akses 24 Jam',
    facilities: ['Wi-Fi', 'AC', 'Kamar Mandi Dalam', 'Kasur', 'Lemari Pakaian', 'Parkir Motor', 'Penjaga Kos', 'Akses 24 Jam'],
    images: [], // Empty - no photo available on Google Maps location
    contactPhone: '085299110033',
    ownerName: 'Ibu Ratna',
    featured: false
  }
];

// Helper to calculate distance in km using Haversine formula
export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
