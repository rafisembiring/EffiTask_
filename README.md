# EffiTask ✨

EffiTask adalah aplikasi manajemen proyek modern dengan antarmuka yang bersih dan minimalis, terinspirasi dari estetika *liquid glass* (glassmorphism) seperti pada iOS. Dibangun untuk membantu individu dan tim kecil mengelola tugas dan proyek dengan cara yang intuitif dan visual, tanpa kerumitan yang tidak perlu.

---

## 🚀 Fitur Utama

-   ✅ **Autentikasi Aman**: Login dan registrasi yang mudah menggunakan Akun Google (Firebase Authentication).
-   ✅ **Dashboard Terpusat**: Lihat, tambah, dan kelola semua proyek Anda dalam satu kartu utama yang elegan.
-   ✅ **Manajemen Proyek**: Buat proyek baru dengan nama dan tenggat waktu, serta edit detailnya kapan saja.
-   ✅ **Pelacakan Status**: Tandai proyek sebagai "In Progress" atau "Selesai" dengan sekali klik untuk visualisasi progres yang jelas.
-   ✅ **Filter Proyek**: Saring tampilan proyek berdasarkan status (Semua, Sedang Berjalan, Selesai) untuk fokus pada yang terpenting.
-   ✅ **Tema Ganda**: Pilihan antara tema Terang (Light Mode) dan Gelap (Dark Mode) yang dapat diganti secara instan dan preferensinya disimpan.
-   ✅ **Desain Responsif**: Tampilan yang optimal di berbagai perangkat, dari desktop hingga mobile.
-   ✅ **Halaman Statis**: Dilengkapi dengan Homepage informatif dan halaman Kontak.

---

## 🛠️ Teknologi yang Digunakan

Arsitektur aplikasi ini dibangun menggunakan teknologi modern berbasis JavaScript.

-   **Frontend:**
    -   [**Next.js**](https://nextjs.org/) - Framework React untuk aplikasi web yang cepat dan siap produksi.
    -   [**React**](https://reactjs.org/) - Library untuk membangun antarmuka pengguna.
    -   [**Tailwind CSS**](https://tailwindcss.com/) - Framework CSS utility-first untuk desain yang cepat dan kustom.
    -   [**React Icons**](https://react-icons.github.io/react-icons/) - Untuk ikon yang tajam dan konsisten.
    -   [**React Hot Toast**](https://react-hot-toast.com/) - Untuk notifikasi yang elegan.
-   **Backend & Database:**
    -   [**Firebase**](https://firebase.google.com/) - Platform backend-as-a-service dari Google.
        -   **Firestore** - Database NoSQL untuk menyimpan data proyek.
        -   **Firebase Authentication** - Untuk menangani login via Google.

---

## ⚙️ Panduan Instalasi & Setup Lokal

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal di komputer Anda.

#### Prasyarat
-   [Node.js](https://nodejs.org/en/) (v16 atau lebih baru)
-   [Git](https://git-scm.com/)

#### Langkah-langkah

1.  **Clone Repository**
    Buka terminal Anda dan jalankan perintah berikut:
    ```bash
    git clone [https://github.com/rafisembiring/EffiTask_.git](https://github.com/rafisembiring/EffiTask_.git)
    ```

2.  **Masuk ke Direktori Proyek**
    ```bash
    cd EffiTask_/frontend
    ```

3.  **Install Semua Dependensi**
    Gunakan `npm` untuk meng-install semua paket yang dibutuhkan.
    ```bash
    npm install
    ```

4.  **Setup Environment Variables (Sangat Penting!)**
    -   Buat sebuah file baru di dalam folder `frontend` dengan nama `.env.local`.
    -   Salin konten dari `.env.example` (jika ada) atau isi dengan format berikut menggunakan kredensial dari **Firebase Console** Anda.
    ```env
    # Firebase Config
    NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

5.  **Jalankan Aplikasi**
    Mulai server development Next.js.
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 📁 Struktur Folder

Berikut adalah gambaran singkat tentang struktur folder utama pada bagian `frontend`:
```
frontend/
├── lib/            # Logika utama: auth, firebase config, custom hooks
├── pages/          # Semua halaman dan routing aplikasi
├── public/         # Aset statis seperti gambar dan ikon
└── styles/         # File CSS global dan styling tema
```

---
## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda menemukan bug atau memiliki ide untuk fitur baru, silakan buat *Issue* atau kirimkan *Pull Request*.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE). ---
Dibuat oleh [Rafi Sembiring](https://github.com/rafisembiring)
