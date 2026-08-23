# Product Requirement Document (PRD) — Tahap 1
## Website Company Profile — PT Halal Standard Indonesia

- **Versi:** 1.0  
- **Status:** Draft / Tahap Perencanaan  
- **Fokus:** Website Company Profile & Informasi Layanan  
- **Referensi:** Website LPPOM MUI (https://halalmui.org/)  

---

## 1. Gambaran Proyek
PT Halal Standard Indonesia membutuhkan sebuah website resmi yang berfungsi sebagai media informasi dan *company profile* perusahaan.

Website tahap pertama akan mengambil referensi dari struktur dan jenis informasi yang terdapat pada website LPPOM MUI, namun menggunakan identitas, branding, konten, dan visual resmi PT Halal Standard Indonesia.

Pada tahap awal, website difokuskan pada penyampaian informasi mengenai perusahaan dan layanan yang tersedia. Fitur-fitur yang membutuhkan sistem backend kompleks seperti pendaftaran online, verifikasi/pengecekan sertifikat, dashboard klien, dan sistem pembayaran akan dikembangkan pada tahap berikutnya.

---

## 2. Tujuan Website
1. **Identitas Resmi:** Menjadi representasi digital resmi PT Halal Standard Indonesia.
2. **Edukasi & Informasi:** Memberikan informasi profil perusahaan dan katalog layanan yang mudah dipahami calon klien/pelaku usaha.
3. **Kanal Komunikasi:** Menyediakan akses kontak cepat (WhatsApp, Email, Telepon, Formulir Kontak/WeChat).
4. **Membangun Kredibilitas:** Menampilkan keunggulan, legalitas, dan profesionalisme perusahaan dalam industri sertifikasi & standardisasi halal.
5. **Fondasi Digital & SEO:** Menyiapkan arsitektur informasi yang siap dikembangkan untuk kebutuhan SEO Google, Baidu SEO (pasar Tiongkok), dan sistem terintegrasi tahap lanjut.

---

## 3. Target Pengguna
- **Primary User:**
  - Pelaku usaha, pemilik brand/produk, dan perusahaan manufaktur yang membutuhkan layanan halal.
  - Calon klien korporat domestik maupun internasional.
- **Secondary User:**
  - Masyarakat umum dan konsumen pemerhati produk halal.
  - Calon mitra bisnis dan auditor/lembaga mitra.
  - Pengguna/klien dari luar Indonesia (khususnya pasar Tiongkok/Asia).

---

## 4. Referensi & Benchmarking
- **Referensi Utama:** LPPOM MUI (https://halalmui.org/)
- **Aspek yang Diadopsi:**
  - Pola navigasi & hirarki menu.
  - Penyajian ringkas alur sertifikasi/layanan.
  - Struktur pengelompokan informasi (Tentang Kami, Layanan, Berita/Edukasi, Kontak).
- **Catatan:** Desain visual, *color palette*, *copywriting*, dan elemen grafis disesuaikan sepenuhnya dengan *brand identity* PT Halal Standard Indonesia.

---

## 5. Scope & Batasan Tahap 1

| Modul / Fitur | Status Tahap 1 | Keterangan |
|---|:---:|---|
| **Beranda (Homepage)** | ✅ Rilis | Section Hero, Profil Singkat, Layanan, Keunggulan, CTA, Footer |
| **Tentang Kami** | ✅ Rilis | Profil, Visi & Misi, Nilai Perusahaan, Legalitas |
| **Layanan (Katalog & Detail)** | ✅ Rilis | List layanan, deskripsi, manfaat, proses, CTA |
| **Kontak & Lokasi** | ✅ Rilis | Info kontak lengkap, formulir inquiry, Google Maps / WeChat ID |
| **Responsive Design** | ✅ Rilis | Optimal di Desktop, Tablet, dan Mobile Smartphone |
| **Technical SEO & Baidu Readiness** | ✅ Rilis | Semantic HTML, Meta tags, OpenGraph, `robots.txt`, `sitemap.xml` |
| **Multilingual Foundation** | ✅ Rilis | Struktur URL & layout siap untuk Bahasa Indonesia / Inggris / Mandarin |
| *Sistem Pendaftaran Online* | ⏳ Tahap 2+ | Form multi-step upload dokumen & database |
| *Cek & Verifikasi Sertifikat* | ⏳ Tahap 2+ | Database query publik nomor sertifikat |
| *Portal Klien & Auth (Login)* | ⏳ Tahap 2+ | Dashboard status audit & tracking |
| *Payment Gateway* | ⏳ Tahap 2+ | Pembayaran invoice digital |

---

## 6. Arsitektur Informasi & Sitemap

```
PT HALAL STANDARD INDONESIA (Website)
│
├── 🏠 Beranda (Home)
│
├── 🏢 Tentang Kami (About Us)
│   ├── Profil Perusahaan
│   ├── Visi & Misi
│   ├── Nilai & Keunggulan
│   └── Legalitas / Partner
│
├── 📋 Layanan (Services)
│   ├── Layanan 1 (Detail & Alur)
│   ├── Layanan 2 (Detail & Alur)
│   └── Layanan 3 (Detail & Alur)
│
├── 📰 Artikel & Informasi (Opsional/Static Foundation)
│
└── 📞 Kontak (Contact Us)
    ├── Informasi Kontak & Alamat
    ├── Formulir Pesan / Inquiry
    └── Akses Cepat (WhatsApp / WeChat)
```

---

## 7. Blueprint Struktur Halaman

### A. Beranda (Homepage)
1. **Header / Navbar:** Logo HSI, Menu Navigasi (Beranda, Tentang Kami, Layanan, Kontak), Pemilih Bahasa (ID / EN / 中文), Tombol CTA ("Hubungi Kami" / "Konsultasi").
2. **Hero Section:** Headline kuat, sub-headline penjelas kredibilitas, visual relevan, tombol aksi primer & sekunder.
3. **Sekilas Tentang Kami:** Cuplikan profil singkat dengan tautan ke halaman profil lengkap.
4. **Katalog Layanan Utama:** Kartu ringkasan layanan unggulan dengan ikon/visual dan link detail.
5. **Mengapa Memilih Kami (Value Proposition):** Poin keunggulan (Profesionalisme, Jaringan Luas, Proses Terstandar, Tim Ahli).
6. **Alur / Prosedur Singkat:** Step visual sederhana (Konsultasi → Audit/Pemeriksaan → Sertifikasi).
7. **Call to Action (CTA) Banner:** Ajakan konsultasi layanan halal dengan tombol kontak instan.
8. **Footer:** Identitas legal, deskripsi singkat, navigasi cepat, kontak, media sosial, copyright.

### B. Halaman Tentang Kami
- Profil & Latar Belakang Perusahaan.
- Visi & Misi.
- Nilai-Nilai Inti (*Core Values*).
- Tim Manajemen / Dewan Pakar (jika ada).
- Legalitas & Pengakuan Standar.

### C. Halaman Layanan & Detail Layanan
- **Daftar Layanan:** Ringkasan semua produk jasa.
- **Detail Setiap Layanan:**
  - Definisi & Ruang Lingkup.
  - Siapa yang Membutuhkan (Target Klien).
  - Manfaat & Keuntungan.
  - Tahapan Proses Kerja (Step-by-step).
  - Dokumen Persyaratan Umum.
  - CTA Khusus Layanan ("Ajukan Konsultasi Layanan Ini").

### D. Halaman Kontak
- Alamat Kantor Operasional & Peta Interaktif.
- Email Resmi & Hotline Telepon.
- Direct WhatsApp link & WeChat QR/ID (untuk klien Tiongkok/Asia).
- Formulir Pesan/Inquiry dengan validasi dasar.
- Jam Operasional Kantor.

---

## 8. Kebutuhan Teknis & Standar Kualitas

### A. Responsive & Performance
- **Breakpoints:** Mobile (375px–430px), Tablet (768px–1024px), Desktop (1366px–1920px+).
- **Performa:** Skor Google PageSpeed & Core Web Vitals optimal (gambar terkompresi WebP, lazy loading, lightweight CSS/JS).

### B. SEO & Baidu Preparation
- Struktur heading teratur (`H1`, `H2`, `H3`).
- Clean URL (misal: `/tentang-kami`, `/layanan/sertifikasi-halal`).
- Tag Meta Title, Meta Description, Open Graph (OG tags), dan Schema.org JSON-LD (Organization & WebSite).
- Penyiapan tag `lang="id"` (atau `zh-CN`/`en` pada versi bahasa terkait).
- File `robots.txt` dan `sitemap.xml` otomatis terkonfigurasi.

### C. Security & Deployment
- Wajib HTTPS / SSL aktif.
- Security Headers dasar (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options).
- Anti-spam dasar pada formulir kontak (honeypot / Cloudflare Turnstile / reCAPTCHA).

---

## 9. Data & Aset yang Diperlukan dari Klien
1. **Brand Assets:** Logo resolusi tinggi (SVG/PNG transparan), brand guideline (kode warna, font resmi jika ada).
2. **Konten Resmi:** Teks Profil, Visi, Misi, daftar resmi nama layanan beserta detail alurnya.
3. **Kontak Resmi:** Alamat fisik, nomor telepon/WhatsApp, alamat email resmi domain, akun media sosial, akun WeChat (jika relevan).
4. **Foto & Media:** Dokumentasi kantor, tim, aktivitas audit/pelatihan, atau aset foto berlisensi.

---

## 10. Roadmap Pengembangan Bertahap

```
Tahap 1: Company Profile, Katalog Layanan, SEO & Baidu Foundation
   ↓
Tahap 2: Admin Dashboard, CMS Berita/Artikel
   ↓
Tahap 3: Pendaftaran Online & Cek Sertifikat
   ↓
Tahap 4: Portal Klien, Tracking & Payment
   ↓
Tahap 5: Ekspansi Pasar Tiongkok & Optimasi Baidu Lanjutan
```

---

## 11. Definition of Done (DoD) — Tahap 1
- [ ] Seluruh halaman utama (Beranda, Tentang Kami, Layanan, Kontak) terpasang dengan layout rapi dan responsif.
- [ ] Konten dan branding resmi HSI telah diaplikasikan.
- [ ] Form kontak berfungsi mengirim pesan/inquiry.
- [ ] Pengujian responsive pada perangkat desktop, tablet, dan smartphone berhasil tanpa layout rusak/overflow.
- [ ] Metadata SEO, Open Graph, `robots.txt`, dan `sitemap.xml` siap dan valid.
- [ ] Website ter-deploy dengan koneksi aman (HTTPS).
