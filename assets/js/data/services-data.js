/**
 * Gesid Halal Center - Service Catalog Data
 * Ringkas, visual, dan akurat sesuai Pedoman Mutu & SOP LPH GESID Halal Center (116 hlm)
 * serta Dokumen Profil Resmi LPH GESID Halal Center (8 hlm).
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
    shortDesc: 'Lembaga Pemeriksa Halal (LPH) di bawah naungan Yayasan GESID Indonesia Emas untuk pemeriksaan dan pengujian kehalalan produk sesuai SNI ISO/IEC 17065:2012.',
    desc: [
      'LPH GESID Halal Center (Akte Yayasan Nomor AHU-0015928.AH.01.04.Tahun 2026 & SK LPH Nomor 03/GIE/IX/2026) melaksanakan pemeriksaan dan/atau pengujian kehalalan produk sebagai dasar penetapan fatwa halal oleh MUI dan penerbitan Sertifikat Halal oleh BPJPH.'
    ],
    features: [
      'Audit kecukupan dokumen (Tahap 1) & pemeriksaan lapangan (Tahap 2)',
      'Pengujian laboratorium mitra terakreditasi SNI ISO/IEC 17025',
      'Cakupan 15 kategori produk & jasa sesuai KMA No. 748 Tahun 2021',
      'Jaringan nasional 85 Anggota P3H di 15 Provinsi'
    ],
    deliverables: [
      'Berita Acara Pemeriksaan Lapangan resmi',
      'Hasil uji laboratorium terakreditasi SNI ISO/IEC 17025 (bila diperlukan)',
      'Laporan Hasil Pemeriksaan (LHP) untuk Sidang Fatwa MUI & SIHALAL'
    ],
    target: [
      'UMKM hingga perusahaan industri yang mengajukan Sertifikat Halal Reguler',
      'Pelaku usaha Makanan, Minuman, Obat, Kosmetik, Kimiawi, Biologi, & Barang Gunaan',
      'Penyedia jasa Penyembelihan (RPH/RPU), Logistik, Pengolahan, & Penyajian'
    ],
    impartialityNote: 'Prinsip Ketidakberpihakan (SNI ISO/IEC 17065:2012 — Pedoman Mutu Hal. 112): Pemeriksaan halal dilaksanakan secara objektif dan independen, tidak dicampuradukkan dengan jasa konsultasi yang menimbulkan konflik kepentingan.'
  },

  pemeriksaan: {
    id: 'pemeriksaan',
    number: '01',
    label: 'Layanan Utama LPH',
    icon: 'fa-clipboard-check',
    accentColor: 'forest',
    breadcrumb: 'Pemeriksaan Kehalalan Produk & Jasa',
    title: 'Pemeriksaan Kehalalan Produk & Jasa (Audit LPH)',
    shortDesc: 'Audit kecukupan dokumen (Tahap 1) dan pemeriksaan lokasi produksi (Tahap 2) oleh Auditor Halal LPH GESID sebagai dasar penetapan fatwa halal MUI.',
    desc: [
      'Mandat utama LPH GESID Halal Center (Pedoman Mutu Hal. 12 & 41–78) bagi pelaku usaha yang telah menyiapkan berkas persyaratan dan mendaftar melalui portal resmi SIHALAL (ptsp.halal.go.id).'
    ],
    features: [
      'Verifikasi kecukupan dokumen permohonan di SIHALAL (Audit Tahap 1)',
      'Perhitungan biaya transparan sesuai tarif resmi BPJPH (mandays × unit cost)',
      'Pemeriksaan lokasi produksi, bahan baku, fasilitas, & SJPH (Audit Tahap 2)',
      'Telaah teknis & SDM Syariah serta pengiriman Laporan Audit ke Komisi Fatwa MUI'
    ],
    deliverables: [
      'Hasil verifikasi kecukupan dokumen & rincian biaya resmi di SIHALAL',
      'Berita Acara Pemeriksaan Lapangan oleh Auditor Halal teregistrasi',
      'Laporan Hasil Pemeriksaan (LHP) resmi untuk Sidang Fatwa MUI'
    ],
    flow: {
      intro: 'Estimasi keseluruhan alur proses berdasarkan Bagan Alir SOP (Pedoman Mutu Hal. 78) adalah 35 hari kerja:',
      steps: [
        {
          title: 'Audit Tahap 1 (Dokumen)',
          icon: 'fa-file-circle-check',
          description: 'LPH memeriksa kelengkapan berkas (NIB, Manual SJPH, Penyelia Halal, matriks bahan, & alur proses) di SIHALAL.'
        },
        {
          title: 'Biaya & Penugasan Auditor',
          icon: 'fa-user-tie',
          description: 'Penetapan biaya sesuai regulasi BPJPH dan penunjukan Auditor Halal sesuai bidang produk.'
        },
        {
          title: 'Audit Tahap 2 (Lapangan)',
          icon: 'fa-industry',
          description: 'Pemeriksaan langsung fasilitas produksi di lokasi usaha serta pengambilan sampel uji lab bila diperlukan.'
        },
        {
          title: 'Laporan ke Fatwa MUI & BPJPH',
          icon: 'fa-award',
          description: 'LPH menyerahkan Laporan Hasil Pemeriksaan ke Komisi Fatwa MUI untuk penetapan halal dan penerbitan SH oleh BPJPH.'
        }
      ]
    },
    target: [
      'Usaha Makanan, Minuman, Restoran, Katering, & Dapur Pusat',
      'Industri Obat, Kosmetik, Produk Kimiawi, Biologi, & Barang Gunaan',
      'Jasa Penyembelihan (RPH/RPU), Logistik, Penyimpanan, & Pengemasan'
    ],
    impartialityNote: 'Batas Kewenangan: LPH GESID berwenang memeriksa dan menyusun Laporan Hasil Pemeriksaan. Ketetapan Halal diputuskan oleh Komisi Fatwa MUI, sedangkan Sertifikat Halal diterbitkan oleh BPJPH.'
  },

  pengujian: {
    id: 'pengujian',
    number: '02',
    label: 'Layanan Utama LPH · Lab ISO 17025',
    icon: 'fa-flask-vial',
    accentColor: 'forest',
    breadcrumb: 'Pengujian Laboratorium Bahan Kritis',
    title: 'Pengujian Laboratorium Bahan & Produk Kritis',
    shortDesc: 'Pengujian ilmiah terhadap sampel produk dan bahan titik kritis melalui laboratorium mitra terakreditasi SNI ISO/IEC 17025.',
    desc: [
      'Sesuai Pedoman Mutu LPH GESID (Hal. 50, 53, 106, & 109), pengujian laboratorium dilakukan apabila dalam pemeriksaan ditemukan bahan atau produk dengan titik kritis kehalalan tinggi yang membutuhkan pembuktian ilmiah.'
    ],
    features: [
      'Pengambilan sampel produk/bahan kritis oleh Auditor Halal saat audit lapangan',
      'Uji autentikasi Real-Time PCR / deteksi DNA porcine (babi) pada turunan hewani',
      'Uji kandungan logam dan parameter keamanan/kehalalan sesuai skema produk',
      'Analisis pada laboratorium mitra yang terakreditasi SNI ISO/IEC 17025'
    ],
    deliverables: [
      'Berita acara pengambilan sampel pemeriksaan resmi',
      'Sertifikat / Laporan Hasil Uji (LHU) laboratorium terakreditasi SNI ISO/IEC 17025',
      'Bukti ilmiah pendukung di dalam Laporan Hasil Pemeriksaan LPH'
    ],
    flow: {
      intro: 'Pengujian dilakukan secara terintegrasi di dalam tahapan pemeriksaan LPH:',
      steps: [
        {
          title: 'Identifikasi Titik Kritis',
          icon: 'fa-magnifying-glass',
          description: 'Auditor mengidentifikasi bahan/produk yang wajib diuji lab berdasarkan skema pemeriksaan.'
        },
        {
          title: 'Pengambilan Sampel',
          icon: 'fa-vial',
          description: 'Pengambilan dan penyegelan sampel di lokasi usaha sesuai prosedur baku bebas kontaminasi.'
        },
        {
          title: 'Analisis Lab ISO 17025',
          icon: 'fa-microscope',
          description: 'Pengujian PCR/DNA porcine atau kandungan logam di laboratorium mitra terakreditasi.'
        },
        {
          title: 'Lampiran Laporan Audit',
          icon: 'fa-file-shield',
          description: 'Hasil uji dilampirkan ke dalam Laporan Hasil Pemeriksaan LPH untuk Sidang Fatwa MUI.'
        }
      ]
    },
    target: [
      'Produk olahan daging, sosis, bakso, & unit Rumah Potong Hewan (RPH/RPU)',
      'Produk dengan bahan turunan hewani kritis (gelatin, kolagen, enzim, lemak)',
      'Produk kosmetik, obat-obatan, kimiawi, & barang gunaan'
    ],
    impartialityNote: 'Transparansi Biaya (Pedoman Mutu Hal. 107 & 109): Biaya uji laboratorium hanya dikenakan apabila produk memang memerlukan pengujian laboratorium berdasarkan skema pemeriksaan.'
  },

  pendampingan: {
    id: 'pendampingan',
    number: '03',
    label: 'Jaringan 85 P3H · 15 Provinsi',
    icon: 'fa-handshake-angle',
    accentColor: 'forest',
    breadcrumb: 'Pendampingan Proses Produk Halal',
    title: 'Pendampingan Proses Produk Halal (P3H) & Informasi Pengajuan',
    shortDesc: 'Panduan pemenuhan 8 berkas persyaratan awal, penjelasan alur portal SIHALAL, dan dukungan jaringan 85 Anggota P3H di 15 Provinsi.',
    desc: [
      'Berdasarkan Dokumen Profil Resmi (Hal. 2) dan Pedoman Mutu (Hal. 105 & 108), GESID didukung jaringan 85 Anggota P3H di 15 Provinsi untuk membantu pelaku usaha memahami persyaratan berkas dan alur pendaftaran SIHALAL.'
    ],
    features: [
      'Penjelasan daftar 8 dokumen syarat sertifikasi halal yang disiapkan pemohon',
      'Panduan pembuatan akun dan unggah berkas di portal SIHALAL (ptsp.halal.go.id)',
      'Dukungan jaringan 85 Anggota P3H GESID di 15 Provinsi untuk pelaku usaha daerah',
      'Informasi pemilihan skema pengajuan sesuai kategori produk dan skala usaha'
    ],
    deliverables: [
      'Checklist kesiapan 8 dokumen persyaratan sertifikasi halal',
      'Panduan langkah pendaftaran akun dan pemilihan LPH di SIHALAL',
      'Pendampingan proses produk halal oleh anggota P3H terdaftar'
    ],
    flow: {
      intro: 'Langkah mudah bagi pelaku usaha yang baru memulai pengurusan sertifikasi halal:',
      steps: [
        {
          title: 'Cek Kategori Usaha',
          icon: 'fa-store',
          description: 'Sampaikan jenis produk dan skala usaha Anda untuk mengetahui skema persyaratan yang tepat.'
        },
        {
          title: 'Siapkan 8 Berkas',
          icon: 'fa-folder-open',
          description: 'Pelaku usaha menyiapkan NIB, Penyelia Halal, Manual SJPH, daftar bahan, & alur proses.'
        },
        {
          title: 'Panduan Akun SIHALAL',
          icon: 'fa-laptop',
          description: 'Asistensi tata cara registrasi di ptsp.halal.go.id atau pendampingan P3H daerah.'
        },
        {
          title: 'Lanjut ke Audit LPH',
          icon: 'fa-arrow-right-to-bracket',
          description: 'Setelah berkas diverifikasi BPJPH, permohonan diproses secara independen oleh Auditor LPH.'
        }
      ]
    },
    target: [
      'UMKM yang baru pertama kali mengurus sertifikasi halal',
      'Pelaku usaha yang ingin memastikan kelengkapan 8 dokumen syarat sebelum mendaftar',
      'Pelaku usaha di daerah yang membutuhkan panduan aplikasi SIHALAL'
    ],
    impartialityNote: 'Prinsip Ketidakberpihakan (Pedoman Mutu Hal. 112): Pemeriksaan/audit oleh Auditor Halal LPH bersifat independen dan terpisah dari kegiatan pendampingan awal. [Perlu Konfirmasi Pihak GESID terkait batas cakupan pendampingan P3H untuk UMK vs jalur Reguler].'
  },

  bimtek: {
    id: 'bimtek',
    number: '04',
    label: 'Layanan Kegiatan & Edukasi',
    icon: 'fa-chalkboard-user',
    accentColor: 'forest',
    breadcrumb: 'Sosialisasi & Bimbingan Teknis SJPH',
    title: 'Sosialisasi & Bimbingan Teknis (Bimtek) Persyaratan SJPH',
    shortDesc: 'Edukasi regulasi Jaminan Produk Halal, bimbingan teknis pemahaman 5 kriteria Manual SJPH, dan pembekalan peran Penyelia Halal.',
    desc: [
      'Sesuai Pedoman Mutu (Hal. 38, 105, & 108), GESID menyelenggarakan kegiatan sosialisasi dan bimbingan teknis agar tim internal perusahaan mampu menyusun dokumen Manual SJPH secara mandiri tanpa melanggar ketidakberpihakan audit LPH (Hal. 112).'
    ],
    features: [
      'Sosialisasi regulasi halal (UU 33/2014, PP 39/2021, & KMA 748/2021)',
      'Bimbingan teknis 5 kriteria Sistem Jaminan Produk Halal (SJPH)',
      'Edukasi tugas Penyelia Halal dan cara mengidentifikasi titik kritis bahan',
      'Kerja sama literasi & seminar halal bersama asosiasi industri, UMKM, dan kampus'
    ],
    deliverables: [
      'Materi pedoman pemahaman kriteria Sistem Jaminan Produk Halal (SJPH)',
      'Kesiapan tim internal perusahaan dalam menyusun dokumen syarat secara mandiri',
      'Dokumentasi pelaksanaan kegiatan sosialisasi / bimbingan teknis'
    ],
    flow: {
      intro: 'Kegiatan edukasi diselenggarakan oleh Divisi Pelatihan dan Pengembangan secara terpisah dari proses audit:',
      steps: [
        {
          title: 'Pilih Topik Edukasi',
          icon: 'fa-comments',
          description: 'Tentukan kebutuhan sosialisasi regulasi halal atau bimbingan teknis kriteria SJPH.'
        },
        {
          title: 'Penjadwalan Bimtek',
          icon: 'fa-calendar-check',
          description: 'Penyesuaian jadwal dan materi sesuai sektor produk atau jasa peserta.'
        },
        {
          title: 'Pelaksanaan Materi',
          icon: 'fa-chalkboard-user',
          description: 'Pembahasan 5 kriteria SJPH, titik kritis bahan, dan peran Penyelia Halal.'
        },
        {
          title: 'Penerapan Mandiri',
          icon: 'fa-file-signature',
          description: 'Tim internal perusahaan menyusun dan menerapkan dokumen SJPH untuk diajukan di SIHALAL.'
        }
      ]
    },
    target: [
      'Tim internal perusahaan yang akan menyusun dokumen Manual SJPH',
      'Calon Penyelia Halal dan staf QA/QC/Produksi',
      'Asosiasi industri, komunitas UMKM, instansi, dan lembaga pendidikan'
    ],
    impartialityNote: 'Kepatuhan Ketidakberpihakan (Pedoman Mutu Hal. 112): LPH GESID tidak mencampuradukkan pemeriksaan halal dengan jasa konsultasi pembuatan dokumen. [Perlu Konfirmasi Pihak GESID terkait status program pelatihan Penyelia Halal apakah bersifat Bimtek edukasi atau bekerja sama dengan LPK resmi].'
  }
};

// Aliases for backwards compatibility:
window.HSI_SERVICES_DATA.sjph = window.HSI_SERVICES_DATA.bimtek;
window.HSI_SERVICES_DATA.pelatihan = window.HSI_SERVICES_DATA.bimtek;
window.HSI_SERVICES_DATA.sertifikasi = window.HSI_SERVICES_DATA.pemeriksaan;
window.HSI_SERVICES_DATA.standarisasi = window.HSI_SERVICES_DATA.pendampingan;
