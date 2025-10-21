# Dokumen Desain Game: U2

## 1. Visi Inti

**U2** adalah game simulasi slot gacha yang dirancang sebagai alternatif etis dan 100% gratis untuk perjudian online. Fokus utama game ini adalah memberikan pengalaman audiovisual yang memuaskan (`juicy`), mekanisme yang adil, dan sistem progresi yang sehat tanpa adanya transaksi mikro. Game ini bertujuan untuk memberikan sensasi keseruan mesin slot tanpa risiko finansial.

## 2. Konsep Inti Gameplay

- **Pemain memutar mesin slot:** Pemain menggunakan mata uang dalam game (misalnya, "Koin U2") untuk memutar mesin slot.
- **Mendapatkan hadiah:** Berdasarkan kombinasi simbol yang muncul, pemain akan memenangkan lebih banyak Koin U2 atau hadiah kosmetik lainnya.
- **Tanpa uang sungguhan:** Game ini murni gratis. Koin U2 diperoleh melalui permainan, bukan dengan uang sungguhan.

## 3. Mekanisme Slot: Algoritma Sistematis & Transparan

Sistem *Pseudo-Random Number Generation* (PRNG) akan menjadi inti dari mekanisme slot.

- **Jumlah Gulungan (Reels):** 3
- **Jumlah Simbol per Gulungan:** 6 (Awal)
- **Simbol:**
  - **Umum:** Ceri, Anggur, Jeruk
  - **Langka:** Lonceng, Berlian
  - **Spesial:** Simbol "U2" (Jackpot)

### Tabel Probabilitas & Hadiah

Probabilitas akan dibuat eksplisit dan adil. Sistem tidak akan pernah "menipu" pemain.

| Kombinasi Simbol (3x) | Probabilitas | Hadiah (Pengali Taruhan) |
| --------------------- | ------------ | ------------------------ |
| 3x Ceri               | 25%          | 2x                       |
| 3x Anggur             | 20%          | 3x                       |
| 3x Jeruk              | 15%          | 5x                       |
| 3x Lonceng            | 10%          | 10x                      |
| 3x Berlian            | 5%           | 25x                      |
| 3x "U2" (Jackpot)     | 1%           | 100x                     |
| Kombinasi Lainnya     | 24%          | 0x (Kalah)               |

**Penting:** Probabilitas ini akan diimplementasikan secara lugas dalam kode dan tidak akan berubah berdasarkan riwayat kemenangan/kekalahan pemain.

## 4. Tampilan Visual & Audio

- **Visual:**
  - **Gaya:** Cerah, penuh warna, dan "juicy".
  - **Animasi:** Animasi yang memuaskan saat gulungan berputar, berhenti, dan saat hadiah dimenangkan (misalnya, koin berhamburan, kilauan cahaya).
  - **Font:** Besar, mudah dibaca, dan bergaya.
- **Audio:**
  - **Musik Latar:** Musik elektronik yang ceria dan repetitif untuk menjaga semangat pemain.
  - **Efek Suara:** Suara "klik" saat gulungan berputar, suara kemenangan yang berbeda untuk setiap level hadiah, suara saat koin ditambahkan. Audio akan memberikan *positive feedback* secara konstan.

## 5. Teknologi yang Digunakan

- **Frontend Framework:** React dengan TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules atau Styled-Components

Ini akan memastikan struktur kode yang modern, rumit, dan mudah dikelola, sesuai dengan permintaan.

## 6. Rencana Pengembangan Awal

1. **Inisialisasi Proyek:** Setup proyek React + TypeScript menggunakan Vite.
2. **Buat Komponen Inti:** `SlotMachine`, `SpinButton`, `BalanceDisplay`.
3. **Logika Inti:** Implementasikan algoritma PRNG untuk menentukan hasil putaran.
4. **Manajemen State:** Gunakan React Hooks (`useState`, `useEffect`) untuk mengelola saldo pemain dan hasil putaran.
5. **Styling Awal:** Terapkan gaya visual dasar yang penuh warna.
