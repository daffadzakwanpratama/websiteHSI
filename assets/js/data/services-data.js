/**
 * Gesid Halal Center - Service Catalog Data
 * Single Source of Truth for all service catalog information.
 * Edit this file to add, modify, or delete service items.
 */

window.HSI_SERVICES_DATA = {
  lph: {
    id: 'lph',
    number: '01',
    label: 'Profil Lembaga',
    icon: 'fa-building-shield',
    accentColor: 'forest',
    breadcrumb: 'Profil LPH Gesid Halal Center',
    title: 'Profil LPH GESID HALAL CENTER',
    shortDesc: 'Lembaga pemeriksaan dan pengujian kehalalan produk resmi dengan pendekatan profesional, transparan, dan mudah dijangkau di seluruh wilayah Indonesia.',
    desc: [
      'LPH Gesid Halal Center merupakan lembaga yang menyediakan layanan pemeriksaan dan pengujian kehalalan produk sebagai bagian dari proses sertifikasi halal resmi di bawah BPJPH. Cakupan layanan pemeriksaan meliputi Makanan, Minuman, Obat, Kosmetik, Produk Kimiawi, Barang Gunaan, dan Seluruh Jasa, untuk seluruh wilayah Indonesia.',
      'Komitmen kami adalah mendukung seluruh ekosistem usaha dalam memenuhi standar kehalalan. Mulai dari usaha perorangan skala kecil, pelaku UMKM yang sedang berkembang, hingga perusahaan industri, semua dapat memperoleh layanan pemeriksaan halal dengan pendekatan profesional, transparan, dan mudah dijangkau.'
    ],
    features: [
      'Pemeriksaan dan pengujian kehalalan produk (Makanan, Minuman, Obat, Kosmetik, Produk Kimiawi, Barang Gunaan, dan Seluruh Jasa)',
      'Layanan digital terintegrasi dengan auditor profesional berstandar nasional & internasional',
      'Pendampingan halal yang bermutu, transparan, dan terjangkau untuk seluruh pelaku usaha',
      'Jaringan operasional nasional mencakup 15 provinsi dan ditargetkan beroperasi di seluruh Indonesia',
      'Kemitraan strategis nasional dan internasional untuk memperkuat ekosistem halal Indonesia'
    ],
    target: [
      'Usaha perorangan skala kecil dan pelaku UMKM yang sedang berkembang',
      'Perusahaan industri manufaktur pangan, kosmetik, kimiawi, dan farmasi nasional',
      'Pelaku usaha jasa (pengolahan, penyajian, penyimpanan, pengemasan, distribusi, penjualan, dan penyembelihan)',
      'Calon Auditor Halal dan Pendamping Proses Produk Halal (P3H) di seluruh wilayah Indonesia'
    ]
  },
  pemeriksaan: {
    id: 'pemeriksaan',
    number: '01',
    label: 'Layanan 01',
    icon: 'fa-clipboard-check',
    accentColor: 'forest',
    breadcrumb: 'Pemeriksaan & Pengujian Halal',
    title: 'Pemeriksaan & Pengujian Halal (Audit LPH)',
    shortDesc: 'Layanan audit dan pengujian kehalalan produk secara independen, profesional, dan objektif sebagai LPH resmi sesuai regulasi BPJPH.',
    desc: [
      'LPH Gesid Halal Center menyediakan layanan pemeriksaan dan pengujian kehalalan produk secara independen, profesional, dan objektif sebagai Lembaga Pemeriksa Halal (LPH) resmi yang teregistrasi di BPJPH.',
      'Proses pemeriksaan mencakup verifikasi kecukupan dokumen, pemeriksaan bahan, audit lapangan (on-site) fasilitas produksi, pengujian laboratorium (jika dipersyaratkan), hingga penerbitan Laporan Hasil Pemeriksaan (LHP) untuk penetapan fatwa di Komisi Fatwa MUI.'
    ],
    features: [
      'Pemeriksaan kecukupan dokumen bahan dan proses produk halal',
      'Audit lapangan (on-site) fasilitas produksi, dapur, gudang, dan distribusi',
      'Pengujian laboratorium bahan kritis di laboratorium terakreditasi',
      'Penyusunan dan penerbitan Laporan Hasil Pemeriksaan (LHP)',
      'Pengawalan hasil pemeriksaan menuju Sidang Fatwa MUI',
      'Pemeriksaan berkala untuk perpanjangan sertifikat halal'
    ],
    flow: {
      intro: 'Pemeriksaan oleh LPH adalah bagian dari proses sertifikasi halal. Pilih langkah untuk melihat apa yang dilakukan.',
      steps: [
        {
          title: 'Periksa dokumen dan bahan',
          icon: 'fa-file-lines',
          tone: 'blue',
          description: 'Auditor meninjau kecukupan dokumen, daftar bahan, dan proses produk yang diajukan.'
        },
        {
          title: 'Audit fasilitas produksi',
          icon: 'fa-industry',
          tone: 'indigo',
          description: 'Auditor memeriksa fasilitas dan proses secara langsung, seperti area produksi, dapur, gudang, atau distribusi sesuai lingkup usaha.'
        },
        {
          title: 'Uji laboratorium bila diperlukan',
          icon: 'fa-flask',
          tone: 'purple',
          description: 'Bahan kritis dapat diuji di laboratorium terakreditasi apabila dipersyaratkan dalam pemeriksaan.'
        },
        {
          title: 'Susun laporan hasil pemeriksaan',
          icon: 'fa-file-circle-check',
          tone: 'green',
          description: 'Hasil pemeriksaan dirangkum dalam Laporan Hasil Pemeriksaan (LHP) untuk proses penetapan fatwa di Komisi Fatwa MUI.'
        }
      ]
    },
    target: [
      'Industri Makanan & Minuman (kemasan, katering, restoran, bakery)',
      'Industri Farmasi, Obat Tradisional, & Suplemen Kesehatan',
      'Industri Kosmetik, Skincare, & Personal Care',
      'Industri Produk Kimiawi & Barang Gunaan',
      'Penyedia Jasa (penyembelihan/RPH, pengolahan, logistik, & penyimpanan)'
    ]
  },
  pendampingan: {
    id: 'pendampingan',
    number: '02',
    label: 'Layanan 02',
    icon: 'fa-handshake-angle',
    accentColor: 'forest',
    breadcrumb: 'Pendampingan Proses Produk Halal',
    title: 'Pendampingan Proses Produk Halal (PPH)',
    shortDesc: 'Pendampingan komprehensif bagi pelaku usaha dalam persiapan dokumen, registrasi SiHalal, hingga kesiapan menghadapi audit lapangan.',
    desc: [
      'Layanan pendampingan komprehensif bagi pelaku usaha (UMKM hingga korporasi besar) dalam mempersiapkan seluruh aspek proses produk halal sebelum memasuki tahapan audit resmi.',
      'Tim ahli kami memandu pendaftaran daring melalui aplikasi SiHalal BPJPH (ptsp.halal.go.id), verifikasi kelayakan bahan baku, penyiapan dokumen manual, hingga simulasi pra-audit agar proses sertifikasi berjalan lancar tanpa kendala.'
    ],
    features: [
      'Asistensi registrasi akun dan pengajuan permohonan di aplikasi SiHalal BPJPH',
      'Verifikasi kehalalan daftar bahan baku, bahan tambahan, dan bahan penolong',
      'Pre-audit assessment untuk mengidentifikasi celah ketidaksesuaian sedini mungkin',
      'Bimbingan pemenuhan persyaratan regulasi UU JPH dan standar BPJPH',
      'Asistensi perbaikan temuan sebelum dan sesudah audit lapangan LPH',
      'Konsultasi intensif bersama tim teknis dan pendamping berpengalaman'
    ],
    flow: {
      intro: 'Pendamping membantu usaha menyiapkan pengajuan dan kesiapan audit. Pilih langkah untuk melihat fokus pendampingan.',
      steps: [
        {
          title: 'Petakan kebutuhan usaha',
          icon: 'fa-comments',
          tone: 'teal',
          description: 'Diskusikan kondisi usaha, jenis produk, dan kebutuhan pengajuan bersama tim pendamping.'
        },
        {
          title: 'Siapkan bahan dan dokumen',
          icon: 'fa-boxes-stacked',
          tone: 'blue',
          description: 'Kumpulkan data produk, bahan baku, bahan tambahan, dan bahan penolong untuk diperiksa kelengkapannya.'
        },
        {
          title: 'Ajukan melalui SIHALAL',
          icon: 'fa-cloud-arrow-up',
          tone: 'purple',
          description: 'Pendamping membantu proses registrasi akun dan pengajuan permohonan melalui aplikasi SIHALAL BPJPH.'
        },
        {
          title: 'Cek kesiapan sebelum audit',
          icon: 'fa-clipboard-check',
          tone: 'amber',
          description: 'Lakukan penilaian pra-audit untuk mengetahui hal yang perlu dilengkapi atau diperbaiki sebelum audit LPH.'
        }
      ]
    },
    target: [
      'Pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) yang baru mengajukan sertifikasi',
      'Perusahaan manufaktur yang ingin memastikan kelengkapan dokumen pra-audit',
      'Pelaku usaha yang mengalami kendala teknis pada aplikasi SiHalal',
      'Perusahaan yang ingin meminimalisir risiko temuan ketidaksesuaian saat audit'
    ]
  },
  sjph: {
    id: 'sjph',
    number: '03',
    label: 'Layanan 03',
    icon: 'fa-book-bookmark',
    accentColor: 'forest',
    breadcrumb: 'Konsultasi & Manual SJPH',
    title: 'Konsultasi & Penyusunan Manual SJPH',
    shortDesc: 'Perancangan dan penerapan Sistem Jaminan Produk Halal: manual, SOP, pembentukan tim halal, dan audit internal.',
    desc: [
      'Penyusunan Sistem Jaminan Produk Halal (SJPH) secara menyeluruh sesuai Keputusan Kepala BPJPH dan kriteria standar halal nasional.',
      'Kami membantu perusahaan menyusun dokumen manual SJPH yang aplikatif, merancang Prosedur Operasional Standar (SOP) halal, membentuk Tim Manajemen Halal internal, serta membekali teknik audit internal mandiri.'
    ],
    features: [
      'Gap analysis kondisi sistem mutu dan operasional perusahaan',
      'Penyusunan dokumen Manual SJPH kustom sesuai skala dan jenis industri',
      'Pembuatan SOP penanganan bahan, proses produksi, dan penyimpanan produk halal',
      'Pembentukan dan bimbingan tugas Tim Manajemen Halal perusahaan',
      'Fasilitasi dan pembekalan pelaksanaan audit internal halal berkala',
      'Panduan penanganan dan tindak lanjut produk yang tidak memenuhi kriteria'
    ],
    flow: {
      intro: 'SJPH membantu usaha menjaga proses halal secara konsisten. Pilih langkah untuk melihat cara sistem ini disusun.',
      steps: [
        {
          title: 'Kenali kondisi saat ini',
          icon: 'fa-magnifying-glass',
          tone: 'blue',
          description: 'Tinjau sistem mutu dan operasional untuk mengetahui dokumen atau praktik yang perlu dibangun.'
        },
        {
          title: 'Susun manual dan SOP',
          icon: 'fa-file-pen',
          tone: 'purple',
          description: 'Siapkan manual SJPH dan prosedur penanganan bahan, proses produksi, serta penyimpanan sesuai kondisi usaha.'
        },
        {
          title: 'Bentuk tim halal internal',
          icon: 'fa-people-group',
          tone: 'teal',
          description: 'Tentukan tim yang bertanggung jawab dan pahami tugasnya dalam penerapan Sistem Jaminan Produk Halal.'
        },
        {
          title: 'Jalankan evaluasi internal',
          icon: 'fa-list-check',
          tone: 'green',
          description: 'Lakukan audit internal berkala dan tindak lanjuti produk atau proses yang belum memenuhi kriteria.'
        }
      ]
    },
    target: [
      'Perusahaan yang belum memiliki sistem dokumentasi SJPH mandiri',
      'Tim operasional internal yang perlu membangun SOP dan manual halal',
      'Perusahaan yang membutuhkan penyesuaian dokumen pasca-temuan audit',
      'Organisasi industri yang ingin menjaga konsistensi kepatuhan halal jangka panjang'
    ]
  },
  pelatihan: {
    id: 'pelatihan',
    number: '04',
    label: 'Layanan 04',
    icon: 'fa-user-graduate',
    accentColor: 'forest',
    breadcrumb: 'Pelatihan Penyelia Halal',
    title: 'Pelatihan & Kompetensi Penyelia Halal',
    shortDesc: 'Bimbingan teknis dan pembekalan materi SKKNI bagi personil internal yang ditunjuk sebagai Penyelia Halal perusahaan.',
    desc: [
      'Program bimbingan teknis dan pembekalan kompetensi bagi personel internal perusahaan yang ditunjuk sebagai Penyelia Halal agar mampu mengelola, mengawasi, dan memelihara SJPH secara mandiri.',
      'Materi pelatihan disusun berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) Penyelia Halal dan diperkaya studi kasus nyata industri.'
    ],
    features: [
      'Materi pelatihan berbasis SKKNI Penyelia Halal resmi',
      'Sertifikat kepesertaan pelatihan kompetensi halal resmi',
      'Modul praktis berbasis studi kasus implementasi industri nyata',
      'Teknik identifikasi titik kritis kehalalan (Critical Control Point / CCP)',
      'Simulasi dan bimbingan teknis audit internal perusahaan',
      'Pendampingan dan konsultasi pasca pelatihan'
    ],
    flow: {
      intro: 'Pelatihan ditujukan untuk membekali personel yang menjalankan peran Penyelia Halal. Pilih langkah untuk melihat gambaran kegiatannya.',
      steps: [
        {
          title: 'Tentukan peserta',
          icon: 'fa-user-check',
          tone: 'blue',
          description: 'Pilih personel internal yang akan menjalankan tugas sebagai Penyelia Halal di perusahaan.'
        },
        {
          title: 'Pelajari kompetensi penyelia',
          icon: 'fa-book-open',
          tone: 'purple',
          description: 'Peserta mempelajari materi bimbingan teknis yang mengacu pada SKKNI Penyelia Halal.'
        },
        {
          title: 'Bahas kasus dan titik kritis',
          icon: 'fa-triangle-exclamation',
          tone: 'amber',
          description: 'Pelajari studi kasus industri dan cara mengenali titik kritis kehalalan dalam kegiatan usaha.'
        },
        {
          title: 'Latih penerapan di perusahaan',
          icon: 'fa-clipboard-check',
          tone: 'teal',
          description: 'Ikuti simulasi audit internal dan konsultasi lanjutan untuk membantu penerapan SJPH.'
        }
      ]
    },
    target: [
      'Personil QA/QC, produksi, dan R&D yang ditunjuk sebagai Penyelia Halal',
      'Manajer operasional dan supervisor fasilitas produksi',
      'Staf manajemen mutu yang bertugas memelihara dokumen SJPH',
      'Perusahaan yang ingin memiliki tim ahli halal internal yang kompeten dan mandiri'
    ]
  }
};

// Aliases for backwards compatibility:
window.HSI_SERVICES_DATA.sertifikasi = window.HSI_SERVICES_DATA.pemeriksaan;
window.HSI_SERVICES_DATA.standarisasi = window.HSI_SERVICES_DATA.pendampingan;
