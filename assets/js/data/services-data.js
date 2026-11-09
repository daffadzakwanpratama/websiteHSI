/**
 * Gesid Halal Center - Service Catalog Data
 * Bahasa natural, ringkas, dan mudah dipahami oleh pelaku usaha.
 */

window.HSI_SERVICES_DATA = {
  lph: {
    id: 'lph',
    number: '01',
    label: 'Profil Lembaga Pemeriksa Halal',
    icon: 'fa-building-shield',
    accentColor: 'forest',
    breadcrumb: 'Profil LPH Gesid Halal Center',
    title: 'Profil LPH GESID Halal Center',
    shortDesc: 'Lembaga Pemeriksa Halal (LPH) resmi yang melayani pemeriksaan dan pengujian kehalalan produk untuk pelaku usaha di seluruh Indonesia.',
    desc: [
      'LPH GESID Halal Center bernaung di bawah Yayasan GESID Indonesia Emas. Kami bertugas memeriksa dan menguji kehalalan produk usaha Anda sebagai syarat penetapan fatwa halal oleh MUI dan penerbitan Sertifikat Halal oleh BPJPH.'
    ],
    features: [
      'Pemeriksaan kelengkapan dokumen & peninjauan langsung ke lokasi produksi',
      'Pengujian sampel bahan di laboratorium terakreditasi (jika diperlukan)',
      'Melayani 15 kategori produk barang dan jasa',
      'Didukung jaringan 85 pendamping halal (P3H) di 15 provinsi'
    ],
    deliverables: [
      'Berita Acara Pemeriksaan lokasi produksi',
      'Hasil uji laboratorium resmi (jika produk memerlukan uji lab)',
      'Laporan Hasil Pemeriksaan untuk proses Sidang Fatwa MUI'
    ],
    target: [
      'UMKM hingga perusahaan besar yang mengajukan Sertifikat Halal Reguler',
      'Usaha Makanan, Minuman, Obat, Kosmetik, Bahan Kimia, & Barang Gunaan',
      'Usaha Jasa Penyembelihan (RPH/RPU), Pengolahan, Gudang, Logistik, & Katering'
    ],
    impartialityNote: 'Komitmen Layanan: Seluruh pemeriksaan dilakukan secara jujur, objektif, dan transparan sesuai ketentuan resmi BPJPH dan MUI.'
  },

  pemeriksaan: {
    id: 'pemeriksaan',
    number: '01',
    label: 'Layanan Utama LPH',
    icon: 'fa-clipboard-check',
    accentColor: 'forest',
    breadcrumb: 'Pemeriksaan Kehalalan Produk & Jasa',
    title: 'Pemeriksaan Kehalalan Produk & Jasa',
    shortDesc: 'Pemeriksaan dokumen dan peninjauan lokasi produksi oleh Auditor Halal LPH GESID untuk pengajuan Sertifikat Halal resmi.',
    desc: [
      'Layanan utama bagi pelaku usaha yang mengajukan Sertifikat Halal jalur Reguler melalui aplikasi SIHALAL (ptsp.halal.go.id). Tim auditor kami akan memeriksa kesesuaian bahan baku dan proses produksi usaha Anda secara menyeluruh.'
    ],
    features: [
      'Pengecekan kelengkapan dokumen persyaratan di aplikasi SIHALAL',
      'Rincian biaya resmi dan transparan sesuai ketentuan BPJPH',
      'Kunjungan pemeriksaan langsung ke tempat produksi dan gudang bahan',
      'Penyusunan laporan hasil pemeriksaan untuk diajukan ke Sidang Fatwa MUI'
    ],
    deliverables: [
      'Konfirmasi kelengkapan dokumen & rincian biaya resmi di SIHALAL',
      'Berita Acara Pemeriksaan lokasi oleh Auditor Halal resmi',
      'Laporan Hasil Pemeriksaan untuk penetapan fatwa halal MUI'
    ],
    flow: {
      intro: 'Proses pemeriksaan berlangsung rata-rata 3–5 minggu melalui 4 tahapan berikut:',
      steps: [
        {
          title: 'Cek Dokumen',
          icon: 'fa-file-circle-check',
          description: 'Tim kami memeriksa kelengkapan dokumen usaha, daftar bahan, dan alur produksi yang Anda unggah di SIHALAL.'
        },
        {
          title: 'Penjadwalan Auditor',
          icon: 'fa-user-tie',
          description: 'Penetapan biaya resmi BPJPH dan penugasan Auditor Halal yang sesuai dengan jenis produk Anda.'
        },
        {
          title: 'Pemeriksaan Lokasi',
          icon: 'fa-industry',
          description: 'Auditor mengunjungi tempat produksi untuk mencocokkan bahan baku, proses pembuatan, dan kebersihan fasilitas.'
        },
        {
          title: 'Sidang Fatwa & Sertifikat',
          icon: 'fa-award',
          description: 'Laporan pemeriksaan diserahkan ke MUI untuk penetapan halal, lalu BPJPH menerbitkan Sertifikat Halal Anda.'
        }
      ]
    },
    target: [
      'Usaha Makanan, Minuman, Restoran, Katering, & Dapur Pusat',
      'Industri Obat, Kosmetik, Bahan Kimia, Produk Biologi, & Barang Gunaan',
      'Jasa Penyembelihan (RPH/RPU), Gudang, Logistik, & Pengemasan'
    ],
    impartialityNote: 'Informasi Penting: LPH GESID bertugas melakukan pemeriksaan produk. Penetapan status halal dilakukan oleh MUI, dan Sertifikat Halal diterbitkan oleh BPJPH.'
  },

  pengujian: {
    id: 'pengujian',
    number: '02',
    label: 'Layanan Utama LPH · Uji Laboratorium',
    icon: 'fa-flask-vial',
    accentColor: 'forest',
    breadcrumb: 'Pengujian Laboratorium',
    title: 'Pengujian Laboratorium Bahan & Produk',
    shortDesc: 'Pengujian sampel bahan atau produk di laboratorium terakreditasi untuk memastikan bebas dari kandungan non-halal.',
    desc: [
      'Pengujian laboratorium dilakukan apabila produk menggunakan bahan yang masih perlu dipastikan kehalalannya secara ilmiah—seperti olahan daging, gelatin, atau bahan campuran tertentu.'
    ],
    features: [
      'Pengambilan sampel secara higienis oleh Auditor Halal saat kunjungan lokasi',
      'Uji deteksi kandungan babi (DNA porcine) pada olahan daging dan turunan hewani',
      'Uji kemurnian dan keamanan bahan sesuai standar pemeriksaan halal',
      'Pengujian dikerjakan di laboratorium mitra yang telah terakreditasi resmi'
    ],
    deliverables: [
      'Berita acara resmi pengambilan sampel produk',
      'Sertifikat / Laporan Hasil Uji (LHU) dari laboratorium terakreditasi',
      'Lampiran bukti hasil uji untuk memperlancar Sidang Fatwa MUI'
    ],
    flow: {
      intro: 'Tahapan pengujian sampel dilakukan bersamaan dengan proses pemeriksaan:',
      steps: [
        {
          title: 'Pengecekan Bahan',
          icon: 'fa-magnifying-glass',
          description: 'Auditor menentukan apakah ada bahan atau produk yang memerlukan uji laboratorium.'
        },
        {
          title: 'Pengambilan Sampel',
          icon: 'fa-vial',
          description: 'Sampel diambil dan disegel langsung di lokasi usaha agar tetap steril dan terjaga.'
        },
        {
          title: 'Proses Uji Lab',
          icon: 'fa-microscope',
          description: 'Sampel diuji di laboratorium terakreditasi menggunakan peralatan analisis modern.'
        },
        {
          title: 'Hasil Uji Resmi',
          icon: 'fa-file-shield',
          description: 'Hasil laboratorium dilampirkan ke dalam laporan pemeriksaan untuk Sidang Fatwa MUI.'
        }
      ]
    },
    target: [
      'Produk olahan daging, sosis, bakso, & Rumah Potong Hewan/Unggas (RPH/RPU)',
      'Produk yang memakai bahan turunan hewani (gelatin, kolagen, enzim, lemak)',
      'Produk kosmetik, obat-obatan, suplemen, & bahan kimia tertentu'
    ],
    impartialityNote: 'Biaya Transparan: Biaya uji laboratorium hanya dikenakan jika produk Anda memang memerlukan pengujian lab.'
  },

  pendampingan: {
    id: 'pendampingan',
    number: '03',
    label: 'Jaringan 85 P3H · 15 Provinsi',
    icon: 'fa-handshake-angle',
    accentColor: 'forest',
    breadcrumb: 'Pendampingan Pendaftaran Halal (P3H)',
    title: 'Pendampingan Pendaftaran Halal (P3H)',
    shortDesc: 'Bantuan persiapan 8 dokumen persyaratan awal dan panduan langkah demi langkah mendaftar di aplikasi SIHALAL.',
    desc: [
      'Bagi pelaku usaha yang baru pertama kali mengurus sertifikasi halal, jaringan 85 Pendamping Proses Produk Halal (P3H) kami di 15 provinsi siap memandu Anda menyiapkan berkas dan mendaftar di sistem SIHALAL dengan mudah.'
    ],
    features: [
      'Panduan menyiapkan 8 dokumen syarat sertifikasi halal dari awal',
      'Bantuan cara membuat akun dan mengunggah berkas di SIHALAL (ptsp.halal.go.id)',
      'Didukung 85 pendamping P3H di 15 provinsi untuk membantu pelaku usaha daerah',
      'Konsultasi pemilihan jalur pendaftaran yang tepat sesuai jenis usaha Anda'
    ],
    deliverables: [
      'Daftar periksa (checklist) kelengkapan 8 dokumen syarat halal',
      'Panduan praktis pendaftaran akun dan pemilihan LPH di SIHALAL',
      'Pendampingan langsung oleh petugas P3H resmi hingga berkas siap diajukan'
    ],
    flow: {
      intro: '4 langkah mudah bagi usaha yang baru memulai pengurusan sertifikasi halal:',
      steps: [
        {
          title: 'Konsultasi Usaha',
          icon: 'fa-store',
          description: 'Ceritakan jenis produk dan skala usaha Anda untuk mengetahui syarat yang dibutuhkan.'
        },
        {
          title: 'Siapkan 8 Dokumen',
          icon: 'fa-folder-open',
          description: 'Tim pendamping membantu Anda mengecek kelengkapan NIB, daftar bahan, alur produksi, dan dokumen SJPH.'
        },
        {
          title: 'Daftar di SIHALAL',
          icon: 'fa-laptop',
          description: 'Panduan membuat akun dan mengunggah berkas permohonan di portal ptsp.halal.go.id.'
        },
        {
          title: 'Proses Pemeriksaan',
          icon: 'fa-arrow-right-to-bracket',
          description: 'Setelah berkas masuk di SIHALAL, tim Auditor LPH akan melanjutkan proses pemeriksaan resmi.'
        }
      ]
    },
    target: [
      'UMKM yang baru pertama kali mengurus sertifikasi halal',
      'Pelaku usaha yang masih bingung menyiapkan 8 dokumen persyaratan',
      'Pelaku usaha di berbagai daerah yang butuh panduan aplikasi SIHALAL'
    ],
    impartialityNote: 'Komitmen Layanan: Pendampingan awal bertujuan memudahkan persiapan berkas Anda, sedangkan pemeriksaan resmi tetap dilakukan secara objektif oleh tim Auditor Halal.'
  },

  bimtek: {
    id: 'bimtek',
    number: '04',
    label: 'Layanan Edukasi & Pelatihan',
    icon: 'fa-chalkboard-user',
    accentColor: 'forest',
    breadcrumb: 'Sosialisasi & Pelatihan Halal (SJPH)',
    title: 'Sosialisasi & Pelatihan Sistem Jaminan Produk Halal (SJPH)',
    shortDesc: 'Pelatihan praktis bagi tim perusahaan dan UMKM untuk memahami aturan halal, menyusun dokumen SJPH, serta menjalankan tugas Penyelia Halal.',
    desc: [
      'Kami menyelenggarakan kegiatan sosialisasi dan pelatihan praktis agar tim usaha Anda memahami cara menjaga kehalalan produk sehari-hari serta mampu menyusun dokumen Sistem Jaminan Produk Halal (SJPH) dengan benar.'
    ],
    features: [
      'Penjelasan aturan sertifikasi halal terbaru dengan bahasa yang mudah dipahami',
      'Panduan praktis menyusun dokumen Manual SJPH untuk usaha Anda',
      'Pembekalan tugas Penyelia Halal dan cara mengecek kehalalan bahan baku',
      'Program seminar & pelatihan bersama komunitas UMKM, perusahaan, dan kampus'
    ],
    deliverables: [
      'Materi panduan praktis penyusunan dokumen SJPH',
      'Kesiapan tim internal usaha dalam menerapkan standar halal sehari-hari',
      'Dokumentasi kegiatan sosialisasi dan pelatihan'
    ],
    flow: {
      intro: 'Pelaksanaan kegiatan pelatihan dan sosialisasi dibagi menjadi 4 tahap:',
      steps: [
        {
          title: 'Pilih Topik',
          icon: 'fa-comments',
          description: 'Tentukan materi pelatihan sesuai kebutuhan tim atau jenis usaha Anda.'
        },
        {
          title: 'Atur Jadwal',
          icon: 'fa-calendar-check',
          description: 'Sesuaikan waktu pelaksanaan, baik secara tatap muka maupun online.'
        },
        {
          title: 'Sesi Pelatihan',
          icon: 'fa-chalkboard-user',
          description: 'Pembahasan praktis dokumen SJPH, cara cek bahan, dan tugas Penyelia Halal.'
        },
        {
          title: 'Siap Diterapkan',
          icon: 'fa-file-signature',
          description: 'Tim Anda siap menyusun dokumen syarat dan menjaga standar halal di tempat produksi.'
        }
      ]
    },
    target: [
      'Pemilik usaha dan tim internal yang ingin menyusun dokumen SJPH',
      'Calon Penyelia Halal serta staf produksi atau gudang',
      'Komunitas UMKM, asosiasi pengusaha, instansi, dan perguruan tinggi'
    ],
    impartialityNote: 'Catatan Layanan: Kegiatan pelatihan ini berfokus pada edukasi agar tim usaha Anda mandiri dan siap sebelum mengikuti proses pemeriksaan resmi.'
  }
};

// Aliases for backwards compatibility:
window.HSI_SERVICES_DATA.sjph = window.HSI_SERVICES_DATA.bimtek;
window.HSI_SERVICES_DATA.pelatihan = window.HSI_SERVICES_DATA.bimtek;
window.HSI_SERVICES_DATA.sertifikasi = window.HSI_SERVICES_DATA.pemeriksaan;
window.HSI_SERVICES_DATA.standarisasi = window.HSI_SERVICES_DATA.pendampingan;
