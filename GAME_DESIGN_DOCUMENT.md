# Game Design Document: Gacha Slot

## 1. Sistem Algoritma Inti: Keadilan & Transparansi

Tujuan utama dari sistem algoritma Gacha Slot adalah untuk memastikan keadilan mutlak dan transparansi kepada pemain. Ini adalah pilar utama yang membedakan game kita dari aplikasi judi online (judol).

### a. Pseudo-Random Number Generation (PRNG) yang Canggih

Kita akan menggunakan algoritma **Mersenne Twister (MT19937)** sebagai dasar dari PRNG kita. Alasan pemilihan:
- **Periode yang Sangat Panjang:** Memiliki periode `2^19937-1`, yang berarti urutan angka acak tidak akan berulang dalam waktu yang sangat lama, memastikan hasil yang tidak dapat diprediksi.
- **Distribusi Seragam:** Menghasilkan angka dengan distribusi yang sangat seragam di seluruh rentangnya, penting untuk probabilitas yang adil.
- **Teruji dan Terbukti:** Merupakan standar industri dalam banyak aplikasi simulasi dan game.

### b. Inisialisasi Seed (Benih) yang Aman

Untuk mencegah manipulasi, `seed` untuk PRNG akan diinisialisasi menggunakan sumber entropi yang kuat dan tidak dapat diprediksi oleh pemain:
- **Waktu Server + Noise:** Menggabungkan timestamp server dengan presisi tinggi (nanodetik) dengan sumber noise acak dari sistem untuk menciptakan seed awal yang unik.
- **Re-seeding Periodik:** Server akan secara otomatis melakukan re-seed secara berkala (misalnya, setiap jam) untuk memastikan tidak ada pola jangka panjang yang bisa dieksploitasi.

### c. Transparansi Probabilitas: "Provably Fair" yang Disederhanakan

Kita tidak hanya akan *mengatakan* game ini adil, kita akan *menunjukkannya*.
- **Tabel Probabilitas Terbuka:** Setiap mesin slot akan memiliki tombol "Info" (i) yang jelas terlihat. Menekan tombol ini akan menampilkan tabel probabilitas yang mudah dibaca untuk setiap simbol dan kombinasi kemenangan.
- **Riwayat Putaran (Spin History):** Pemain dapat melihat riwayat 100 putaran terakhir mereka. Ini membangun kepercayaan dengan menunjukkan bahwa kemenangan dan kekalahan terjadi secara alami.
- **Verifikasi Hasil (Opsional Lanjutan):** Sebelum memutar, server menghasilkan hash dari hasil putaran ditambah salt rahasia. Hash ini ditampilkan ke pemain *sebelum* putaran. Setelah putaran selesai, hasilnya dan salt diungkapkan, memungkinkan pemain memverifikasi secara independen bahwa hasilnya tidak dimanipulasi.

### d. Anti-Manipulasi: Garis Tegas Etika Desain

Dokumen ini secara eksplisit melarang praktik-praktik manipulatif berikut:
- **Tidak Ada "Saklar" Dinamis:** Sistem tidak akan pernah menyesuaikan probabilitas berdasarkan status pemain (baru/lama, menang/kalah).
- **Tidak Ada "Hampir Menang" Palsu:** Algoritma tidak akan sengaja menampilkan hasil "hampir menang" untuk memancing pemain.
- **Tidak Ada Pembedaan Pemain:** Semua pemain tunduk pada set probabilitas yang sama.

## 2. Estetika Visual: Ledakan Warna & Kepuasan "Juicy"

Tampilan game harus terasa seperti perayaan visual yang konstan. Tujuannya adalah membuat setiap putaran terasa memuaskan, terlepas dari hasilnya.

### a. Palet Warna & Gaya Seni

- **Gaya:** Kartunis, cerah, dan sangat hidup. Mirip dengan game seperti *Candy Crush Saga* atau *Genshin Impact* dalam hal saturasi warna yang tinggi.
- **Palet:** Menggunakan warna-warna primer dan sekunder yang tajam (biru elektrik, magenta, kuning cerah, hijau limau) dengan latar belakang yang lebih gelap untuk membuat elemen-elemen di depan "meletup".
- **Tema:** Setiap mesin slot akan memiliki tema visual yang unik (misalnya, "Harta Karun Laut Dalam", "Festival Luar Angkasa", "Manisan Ajaib") dengan aset visual yang konsisten.

### b. Animasi Kemenangan yang Eksplosif

Kunci dari kepuasan visual adalah umpan balik.
- **Kemenangan Kecil:** Animasi singkat tapi memuaskan. Contoh: simbol yang menang sedikit membesar dan memancarkan kilau, koin-koin kecil melompat dari garis kemenangan.
- **Kemenangan Sedang:** Lebih heboh. Contoh: Garis kemenangan menyala terang, simbol meledak menjadi partikel berkilauan, dan koin dalam jumlah sedang mengalir ke penghitung pemain.
- **Kemenangan Besar (Jackpot):** Pesta visual di seluruh layar. Contoh: Seluruh layar bergetar, kilatan cahaya, animasi karakter maskot muncul dan menari, dan "hujan koin" virtual yang dramatis memenuhi layar selama beberapa detik.

### c. Desain Antarmuka (UI) yang Intuitif & "Juicy"

- **Tombol Spin:** Tombol terbesar dan paling menarik di layar. Saat ditekan, tombol ini akan sedikit "tertekan" dan membesar kembali dengan efek suara yang memuaskan.
- **Penghitung Koin:** Angka akan "melompat" dan beranimasi saat koin ditambahkan, memberikan rasa pencapaian yang nyata.
- **Partikel & Efek Tambahan:** Antarmuka akan dihiasi dengan partikel mengambang yang halus dan efek kilau halus untuk membuatnya terasa hidup dan dinamis setiap saat.

## 3. Desain Audio: Soundscape yang Ritmis & Memuaskan

Audio adalah separuh dari pengalaman "juicy". Suara harus dirancang untuk membuat aksi paling dasar—memutar slot—terasa menyenangkan dan berharga.

### a. Suara Inti (Core Sounds)

- **Suara Putaran (Spin):** Bukan sekadar suara mekanis. Ini harus menjadi suara ritmis yang membangun antisipasi. Mungkin dimulai dengan suara "tarikan" yang memuaskan, diikuti oleh serangkaian "klik" ritmis saat gulungan berputar, dan diakhiri dengan "dentang" lembut saat berhenti.
- **Suara Berhenti (Reel Stop):** Setiap gulungan akan berhenti dengan suara "thump" atau "click" yang solid dan memuaskan.
- **Suara Tombol UI:** Semua tombol akan memiliki suara klik yang renyah dan responsif.

### b. Jingle Kemenangan Berlapis

Mirip dengan visual, jingle kemenangan akan bervariasi berdasarkan besarnya kemenangan.
- **Kemenangan Kecil:** Jingle pendek 1-2 detik yang ceria, seperti suara "koin" singkat atau lonceng yang berbunyi.
- **Kemenangan Sedang:** Jingle yang lebih panjang (3-4 detik) dengan melodi sederhana yang menarik dan mudah diingat.
- **Kemenangan Besar (Jackpot):** Musik kemenangan penuh (10-15 detik) yang megah dan penuh semangat, diiringi oleh efek suara seperti terompet dan drum. Musik ini harus membuat pemain merasa seperti baru saja mencapai sesuatu yang luar biasa.

### c. Musik Latar (Background Music)

- **Musik Lobi/Menu:** Musik yang tenang, positif, dan *catchy* yang tidak mengganggu saat pemain menavigasi menu.
- **Musik Dalam Game:** Setiap tema mesin slot akan memiliki trek musik latarnya sendiri yang sesuai dengan temanya (misalnya, musik bertema petualangan untuk "Harta Karun Laut Dalam", musik elektronik ceria untuk "Festival Luar Angkasa").
- **Dinamis:** Musik akan sedikit lebih tenang saat gulungan berputar untuk memberikan ruang bagi efek suara inti.

## 4. Game Loop & Progresi: Pengganti Kecanduan yang Sehat

Fokus kita adalah retensi pemain melalui pencapaian dan kustomisasi, bukan melalui mekanisme manipulatif.

### a. Mata Uang Dalam Game (In-Game Currency)

- **Nama:** "Koin Emas" (atau nama sejenis yang mudah dipahami).
- **Sumber:** Murni dari aktivitas dalam game. **Tidak ada opsi pembelian dengan uang sungguhan.**
- **Cara Mendapatkan:**
    - **Bonus Login Harian:** Pemain mendapatkan sejumlah Koin Emas setiap hari saat mereka login. Bonus meningkat jika login beruntun.
    - **Bonus Per Jam:** Tombol "Klaim Bonus" muncul setiap jam, memberikan sejumlah kecil Koin Emas.
    - **Misi Harian:** Tugas sederhana seperti "Putar 50 kali", "Menangkan 1000 koin", atau "Coba 3 mesin slot berbeda". Menyelesaikan misi memberikan hadiah koin yang signifikan.
    - **Pencapaian (Achievements):** Tujuan jangka panjang seperti "Mencapai Level 10", "Memenangkan Jackpot pertama kali", dll.

### b. Game Loop Inti

Siklus permainan yang sederhana dan memuaskan:
1. **Dapatkan Koin:** Pemain login dan mengklaim bonus harian/per jam mereka, atau menyelesaikan misi.
2. **Mainkan Slot:** Pemain menggunakan Koin Emas untuk memutar mesin slot pilihan mereka.
3. **Menangkan Koin & XP:** Setiap putaran, menang atau kalah, memberikan sejumlah kecil **Poin Pengalaman (XP)**. Kemenangan memberikan Koin Emas dan XP lebih banyak.
4. **Naik Level (Level Up):** Mengumpulkan XP akan meningkatkan level pemain.
5. **Buka Konten Baru:** Setiap kali naik level, pemain membuka konten baru (lihat di bawah).
6. **Ulangi:** Pemain menggunakan koin yang mereka menangkan untuk terus bermain dan membuka lebih banyak konten.

### c. Sistem Progresi & Level-Up

Naik level adalah cara utama untuk membuat pemain merasa maju.
- **Membuka Tema Mesin Slot:** Di Level 1, hanya ada satu tema mesin slot yang tersedia. Tema baru dengan visual, suara, dan tabel probabilitas yang sedikit berbeda akan terbuka di Level 5, 10, 15, dan seterusnya.
- **Membuka Kustomisasi Visual:** Pemain dapat membuka efek visual baru untuk kemenangan mereka (misalnya, ledakan partikel yang berbeda), atau skin baru untuk antarmuka game.
- **Meningkatkan Bonus:** Level yang lebih tinggi dapat memberikan bonus login harian atau bonus per jam yang sedikit lebih besar.
- **Papan Peringkat (Leaderboard):** Papan peringkat mingguan (berdasarkan total koin yang dimenangkan) memberikan pemain tujuan sosial dan hak untuk menyombongkan diri, dengan hadiah koin untuk peringkat teratas.

## 5. Kesimpulan: Sintesis Konsep untuk Alternatif yang Etis

Bagaimana semua elemen ini bekerja sama untuk mencapai tujuan utama kita?

- **Keadilan Sebagai Fondasi:** Dengan menggunakan PRNG yang canggih dan transparan, kita membangun kepercayaan. Pemain tidak akan merasa dicurangi, yang merupakan keluhan umum dalam aplikasi judol. Ini adalah fondasi dari retensi jangka panjang yang etis.
- **Visual & Audio Sebagai Hadiah:** Estetika visual yang "juicy" dan audio yang memuaskan berfungsi sebagai hadiah langsung. Setiap putaran memberikan semburan umpan balik positif, membuat proses bermain itu sendiri menyenangkan, bukan hanya hasil menangnya. Ini mengalihkan fokus dari "menang/kalah" menjadi "pengalaman yang menyenangkan".
- **Progresi Sebagai Tujuan:** Sistem level-up dan pembukaan konten baru memberikan pemain tujuan jangka panjang yang jelas. Alih-alih mengejar kemenangan finansial yang mustahil, mereka mengejar pencapaian yang nyata dan dapat diraih di dalam game (membuka semua tema slot, mencapai level tinggi). Ini menggantikan "kecanduan" dengan "motivasi".
- **Lingkaran Setan Positif:** Game loop yang dirancang dengan baik menciptakan lingkaran setan yang positif. Pemain mendapatkan koin gratis -> mereka bermain dan menikmati pengalaman sensoris -> mereka mendapatkan XP dan naik level -> mereka membuka konten baru yang membuat mereka ingin bermain lagi. Siklus ini sepenuhnya mandiri dan tidak memerlukan input finansial, menjadikannya alternatif yang aman dan berkelanjutan dari judol.

Dengan menggabungkan keempat pilar ini, **Gacha Slot** tidak hanya menjadi "game slot gratis", tetapi sebuah pengalaman yang dirancang secara fundamental untuk menghormati pemain, memberikan kepuasan, dan menawarkan pelarian yang aman dan menyenangkan dari daya pikat judi online yang merusak.
