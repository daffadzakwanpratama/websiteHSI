# Gesid Halal Center (LPH Gesid Halal Center) — Website Documentation & Architecture Guide

Dokumentasi arsitektur kode dan panduan *maintenance* website resmi **Gesid Halal Center (PT Gesid Halal Center)**.  
Dibuat agar terstruktur, mudah dirawat oleh developer, dan mudah dipahami oleh sistem AI coding assistant.

---

## 📁 1. Struktur Direktori Proyek

```text
gesid-web/
├── index.html                    # Halaman Utama (Hero Slider, Berita, Layanan, Alur, Countdown, FAQ)
├── tentang-kami.html             # Halaman Ikhtisar Tentang Kami (Hub ke Sub-Halaman Kelembagaan)
├── profil-visi-misi.html         # Halaman Profil LPH, Visi-Misi, Nilai Perusahaan & Legalitas
├── struktur-tim.html             # Halaman Struktur Kepengurusan & Jajaran Tim Auditor
├── galeri.html                   # Halaman Galeri Kantor Operasional & Aktivitas Lapangan
├── layanan.html                  # Halaman Katalog Layanan Lengkap
├── detail-layanan.html           # Halaman Detail Layanan (Dinamis via Query Param: ?service=...)
├── berita.html                   # Halaman Katalog Berita & Artikel Edukasi Halal
├── detail-berita.html            # Halaman Baca Artikel Berita (Dinamis via Query Param: ?id=...)
├── kontak.html                   # Halaman Kontak, Peta Lokasi (Jakarta Barat), & Form Konsultasi
├── 404.html                      # Halaman Error Not Found Kustom
├── 403.html                      # Halaman Error Forbidden Kustom
├── .htaccess                     # Konfigurasi Server Apache & Security Headers
├── sitemap.xml                   # Sitemap SEO XML
├── robots.txt                    # Konfigurasi Crawling Mesin Pencari
├── PRD.md                        # Product Requirement Document Resmi
├── README.md                     # Panduan Arsitektur & Maintenance (File ini)
│
└── assets/
    ├── css/
    │   ├── custom.css            # Stylesheet utama (Terstruktur per Section & Token)
    │   ├── tailwind.css          # Hasil build Tailwind CSS
    │   └── site.min.css          # Bundled & Minified CSS untuk Production
    │
    ├── js/
    │   ├── data/
    │   │   ├── services-data.js  # [DATA] Single Source of Truth untuk katalog layanan
    │   │   └── news-data.js      # [DATA] Single Source of Truth untuk artikel berita
    │   │
    │   ├── modules/
    │   │   ├── navigation.js     # [LOGIC] Mobile Drawer & Active Link Detector
    │   │   ├── hero-slider.js    # [LOGIC] Hero Image Carousel (Auto, Swipe, Drag, Dots)
    │   │   ├── carousel.js       # [LOGIC] Generic Horizontal Carousel Engine
    │   │   ├── countdown.js      # [LOGIC] Countdown Timer Wajib Halal Oktober 2026
    │   │   ├── counter.js        # [LOGIC] Smooth Counter Animation (Ease-Out Quartic)
    │   │   ├── accordion.js      # [LOGIC] FAQ & Collapsible Toggle
    │   │   ├── forms.js          # [LOGIC] Form Submission, Validation & WhatsApp Redirect
    │   │   ├── service-detail.js # [LOGIC] Renderer DOM Halaman Detail Layanan
    │   │   ├── news-detail.js    # [LOGIC] Renderer DOM Halaman Berita & Detail Berita
    │   │   ├── scroll-animations.js # [LOGIC] IntersectionObserver Scroll Animations
    │   │   └── security.js       # [LOGIC] Client-side Security & Form Anti-Spam Helpers
    │   │
    │   └── main.js               # [ENTRY POINT] Inisialisasi seluruh modul saat DOM ready
    │
    └── images/
        ├── hero/                 # Gambar WebP untuk Hero Banner
        ├── berita/               # Gambar WebP khusus Artikel Berita
        ├── photos/               # Gambar Ilustrasi & Dokumentasi Responsive WebP
        └── logo-emblem.webp      # Asset logo resmi Gesid Halal Center
```

---

## ⚙️ 2. Arsitektur Kode JavaScript (Pemisahan Data & Logika)

Kode JavaScript dipisahkan menjadi 3 layer yang terisolasi:

| Layer | Lokasi | Fungsi |
|---|---|---|
| **Data Layer** | `assets/js/data/services-data.js` & `assets/js/data/news-data.js` | Berisi data murni (`window.HSI_SERVICES_DATA` & data berita). Jika ingin mengubah teks, fitur, layanan, atau menambah berita, **hanya edit file ini** tanpa menyentuh file logika. |
| **Logic Layer (Modules)** | `assets/js/modules/*.js` | Setiap fitur UI (Nav, Slider, Counter, Form, Detail Renderer, dll) memiliki file terpisah yang independen dan modular. |
| **Entry Point** | `assets/js/main.js` | Memanggil fungsi inisialisasi (`initNavigation()`, `initHeroSlider()`, dll) secara aman ketika DOM sudah siap. |

---

## 🛠️ 3. Panduan Maintenance / Cara Menambah & Mengubah Konten

### A. Mengubah / Menambah Data Layanan
Buka file `assets/js/data/services-data.js`. Tambahkan objek baru atau modifikasi yang sudah ada (`lph`, `pemeriksaan`, `pendampingan`, `sjph`, `pelatihan`):
```javascript
window.HSI_SERVICES_DATA = {
  pemeriksaan: {
    id: 'pemeriksaan',
    number: '01',
    label: 'Layanan 01',
    icon: 'fa-clipboard-check',
    accentColor: 'forest',
    breadcrumb: 'Pemeriksaan & Pengujian Halal',
    title: 'Pemeriksaan & Pengujian Halal (Audit LPH)',
    shortDesc: '...',
    desc: ['Paragraf 1...', 'Paragraf 2...'],
    features: ['Fitur 1', 'Fitur 2'],
    flow: { intro: '...', steps: [...] },
    target: ['Target 1', 'Target 2']
  },
  // ... layanan lainnya
};
```
Halaman `detail-layanan.html?service=<id_layanan>` akan otomatis menampilkan data tersebut tanpa perlu mengubah HTML!

### B. Mengubah Desain & Warna (Design Tokens)
Buka file `assets/css/custom.css` dan `tailwind.config.js`. Seluruh token warna utama (Rich Gold & Clean White/Slate) serta font didefinisikan pada `:root`:
```css
:root {
  /* Brand Colors (Gold Primary & Forest Secondary Tokens) */
  --color-gold-400: #e8a317;   /* Bright Gold Accent */
  --color-gold-500: #c89020;   /* Primary Gold (--color-primary) */
  --color-gold-600: #b57f18;   /* Primary Dark Gold (--color-primary-dark) */
  --color-gold-700: #946310;   /* Deep Gold Text/Brand */
  --color-forest-700: #155f3a; /* Secondary Forest Green */
  --color-forest-950: #061a10; /* Deep Dark Green */

  /* Typography Hierarchy (Slate) */
  --color-text-heading: #0f172a;
  --color-text-primary: #1e293b;
  --color-text-body:    #334155;
  --color-text-secondary: #475569;
  --color-text-muted:   #64748b;

  /* Typography Families */
  --font-serif: 'DM Serif Display', Georgia, 'Times New Roman', serif;
  --font-sans:  'Inter', system-ui, -apple-system, sans-serif;
}
```
Google Fonts (`DM Serif Display` & `Inter`) dimuat langsung dari `<head>` setiap halaman dengan `preconnect` agar permintaan font dapat dimulai lebih awal; jangan mengembalikannya ke `@import` CSS karena itu menambah satu tahap permintaan jaringan.

---

## 📑 4. Standardisasi Halaman HTML & SEO

Setiap halaman HTML mengikuti standar:
1. **Semantic HTML5** (`<header>`, `<main>`, `<section>`, `<footer>`).
2. **Schema.org Structured Data (JSON-LD)** di `<head>`:
   - `index.html` → `Organization`
   - `tentang-kami.html` → `AboutPage`
   - `layanan.html` → `Service`
   - `detail-layanan.html` → `Service`
   - `kontak.html` → `ContactPage` / `LocalBusiness`
3. **Pemuatan Script Modular** sebelum penutup `</body>`:
   ```html
   <!-- Core & Feature Modules -->
   <script src="assets/js/modules/navigation.js"></script>
   <script src="assets/js/modules/..."></script>
   <!-- Main Entry Point -->
   <script src="assets/js/main.js"></script>
   ```

---

## 🤖 5. Petunjuk Khusus untuk AI Assistant
- **Ketika diminta mengedit konten layanan:** Langsung rujuk ke `assets/js/data/services-data.js`.
- **Ketika diminta memodifikasi slider/carousel:** Langsung rujuk ke `assets/js/modules/hero-slider.js` atau `assets/js/modules/carousel.js`.
- **Ketika diminta merapikan style:** Gunakan token yang sudah ada di `assets/css/custom.css` dan kelas Tailwind standar.
- **Ketika menambah halaman baru:** Selalu sertakan `<header>` dan `<footer>` standar, sertakan JSON-LD Schema di `<head>`, dan muat `navigation.js` + `main.js`.
