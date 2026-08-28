# PT Halal Standard Indonesia — Website Documentation & Architecture Guide

Dokumentasi arsitektur kode dan panduan *maintenance* website resmi **PT Halal Standard Indonesia**.  
Dibuat agar terstruktur, mudah dirawat oleh developer, dan mudah dipahami oleh sistem AI coding assistant.

---

## 📁 1. Struktur Direktori Proyek

```text
websitecina/
├── index.html                    # Halaman Utama (Hero Slider, Highlights, Layanan, Alur, CTA)
├── tentang-kami.html             # Halaman Profil, Visi-Misi, Nilai Perusahaan & Legalitas
├── layanan.html                  # Halaman Katalog Layanan Lengkap
├── detail-layanan.html           # Halaman Detail Layanan (Dinamis via Query Param: ?service=...)
├── kontak.html                   # Halaman Kontak, Peta Lokasi (Guangzhou), & Form Konsultasi
├── sitemap.xml                   # Sitemap SEO XML
├── robots.txt                    # Konfigurasi Crawling Mesin Pencari
├── PRD.md                        # Product Requirement Document Resmi
├── README.md                     # Panduan Arsitektur & Maintenance (File ini)
│
└── assets/
    ├── css/
    │   └── custom.css            # Stylesheet utama (Terstruktur per Section & Token)
    │
    ├── js/
    │   ├── data/
    │   │   └── services-data.js  # [DATA] Single Source of Truth untuk katalog layanan
    │   │
    │   ├── modules/
    │   │   ├── navigation.js     # [LOGIC] Mobile Drawer & Active Link Detector
    │   │   ├── hero-slider.js    # [LOGIC] Hero Image Carousel (Auto, Swipe, Drag, Dots)
    │   │   ├── carousel.js       # [LOGIC] Generic Horizontal Carousel Engine
    │   │   ├── counter.js        # [LOGIC] Smooth Counter Animation (Ease-Out Quartic)
    │   │   ├── accordion.js      # [LOGIC] FAQ & Collapsible Toggle
    │   │   ├── forms.js          # [LOGIC] Form Submission & Feedback Handler
    │   │   └── service-detail.js # [LOGIC] Renderer DOM Halaman Detail Layanan
    │   │
    │   └── main.js               # [ENTRY POINT] Inisialisasi seluruh modul saat DOM ready
    │
    └── images/
        ├── hero/                 # Gambar visual untuk Hero Banner
        │   ├── hero-1.jpg
        │   ├── hero-2.jpg
        │   ├── hero-3.jpg
        │   └── hero-4.jpg
        └── logo.svg              # Asset vektor logo resmi HSI
```

---

## ⚙️ 2. Arsitektur Kode JavaScript (Pemisahan Data & Logika)

Kode JavaScript dipisahkan menjadi 3 layer yang terisolasi:

| Layer | Lokasi | Fungsi |
|---|---|---|
| **Data Layer** | `assets/js/data/services-data.js` | Berisi data murni (`window.HSI_SERVICES_DATA`). Jika ingin mengubah teks, fitur, atau target layanan, **hanya edit file ini** tanpa menyentuh file logika. |
| **Logic Layer (Modules)** | `assets/js/modules/*.js` | Setiap fitur UI (Nav, Slider, Counter, Form, dll) memiliki file terpisah yang independen dan modular. |
| **Entry Point** | `assets/js/main.js` | Memanggil fungsi inisialisasi (`initNavigation()`, `initHeroSlider()`, dll) secara aman ketika DOM sudah siap. |

---

## 🛠️ 3. Panduan Maintenance / Cara Menambah & Mengubah Konten

### A. Mengubah / Menambah Data Layanan
Buka file `assets/js/data/services-data.js`. Tambahkan objek baru atau modifikasi yang sudah ada:
```javascript
window.HSI_SERVICES_DATA = {
  sertifikasi: {
    id: 'sertifikasi',
    number: '01',
    label: 'Layanan 01',
    icon: 'fa-certificate',
    accentColor: 'forest',
    breadcrumb: 'Sertifikasi Halal Resmi BPJPH & MUI',
    title: 'Sertifikasi Halal Resmi BPJPH & MUI',
    shortDesc: '...',
    desc: ['Paragraf 1...', 'Paragraf 2...'],
    features: ['Fitur 1', 'Fitur 2'],
    target: ['Target 1', 'Target 2']
  },
  // ... layanan lainnya
};
```
Halaman `detail-layanan.html?service=<id_layanan>` akan otomatis menampilkan data tersebut tanpa perlu mengubah HTML!

### B. Mengubah Desain & Warna (Design Tokens)
Buka file `assets/css/custom.css`. Seluruh token warna dan font didefinisikan pada `:root`:
```css
:root {
  --color-forest-700: #155f3a; /* Primary Green */
  --color-forest-950: #061a10; /* Dark Green */
  --color-gold-400:   #e8a317; /* Accent Gold */
  
  --font-serif: 'Lora', Georgia, serif;
  --font-sans:  'Plus Jakarta Sans', sans-serif;
}
```

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
