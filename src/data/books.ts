import { Book } from '../types/library';

export const HERO_LIBRARY_IMAGE =
  '/src/assets/images/hero_library_reading_1795659392471.jpg';

export const BOOKS_CATALOG: Book[] = [
  {
    id: 'buku-arsitektur-inklusif',
    accessionNumber: 'ACC. 2026.01.04',
    isbn: '978-602-8841-12-9',
    title: 'Merancang Ruang untuk Semua Indra',
    subtitle: 'Panduan Arsitektur Web dan Literasi yang Setara bagi Penyandang Disabilitas',
    author: 'Dr. Ratna Dewi Kusuma',
    authorYears: 'l. 1981',
    publisher: 'Penerbit Terbuka Nusantara',
    year: 2025,
    language: 'Bahasa Indonesia',
    pages: 248,
    category: 'Teknologi Inklusif',
    formats: ['Teks Digital', 'Pembaca Suara', 'Ramah Disleksia', 'Huruf Besar'],
    totalCopies: 6,
    initialBorrowedCopies: 1,
    coverImage: '/src/assets/images/cover_inclusive_tech_1795659393189.jpg',
    coverPalette: {
      bg: '#E8ECF2',
      fg: '#1E293B',
      accent: '#1E3A8A',
    },
    synopsis:
      'Karya komprehensif mengenai prinsip desain universal di dunia digital. Membahas bagaimana struktur HTML semantik, kontras warna WCAG AAA, navigasi papan ketik penuh, serta sintesis suara membuka akses pengetahuan bagi jutaan pembaca tunanetra, disleksia, dan lansia.',
    accessibilityNote:
      'Dilengkapi penanda semantik per paragraf, dukungan penuh pembaca layar, dan struktur kalimat lugas untuk mode ramah disleksia.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Mengapa Aksesibilitas Adalah Hak Dasar Pengetahuan',
        estimatedMinutes: 4,
        paragraphs: [
          'Setiap perpustakaan lahir dari satu gagasan sederhana: bahwa ingatan manusia harus dapat dijangkau oleh siapa pun tanpa memandang latar belakang ekonomi, usia, ataupun kondisi fisik. Ketika buku bermigrasi dari lembaran kertas ke layar kaca, kita memperoleh peluang luar biasa untuk meruntuhkan hambatan geografis—namun secara tidak sadar kita juga berisiko membangun tembok baru jika rancangan antarmukanya mengabaikan keberagaman indra manusia.',
          'Membaca bukan semata aktivitas mata menatap huruf hitam di atas latar putih. Bagi pembaca tunanetra, membaca adalah dialog antara jemari dengan baris braille atau telinga yang menyimak suara pembaca layar. Bagi penyandang disleksia, kenyamanan membaca bergantung pada bentuk huruf yang tidak saling tertukar, jarak antarbaris yang lega, dan ketiadaan teks yang berkedip atau bergeser tiba-tiba.',
          'Dalam rancangan inklusif, aksesibilitas bukanlah fitur tambahan yang ditempelkan pada akhir proyek. Ia adalah fondasi struktural sejak kalimat pertama ditulis dan tata letak pertama digambar. Menariknya, solusi yang dirancang untuk membantu kelompok rentan hampir selalu meningkatkan kenyamanan semua orang: teks berjarak lega memudahkan siapa saja yang membaca di malam hari, dan navigasi papan ketik mempercepat kerja peneliti yang sibuk.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Tipografi Hiper-Legibel dan Kenyamanan Kognitif',
        estimatedMinutes: 5,
        paragraphs: [
          'Huruf yang tampak artistik di poster belum tentu ramah untuk dibaca selama berjam-jam. Pada jarak baca panjang, huruf seperti huruf I kapital, huruf l kecil, dan angka 1 sering kali tampak nyaris identik. Kebingungan visual mikro semacam ini memaksa otak bekerja dua kali lebih keras untuk menebak konteks kata, yang berujung pada kelelahan mata dan terputusnya alur pemahaman.',
          'Tipografi hiper-legibel memecahkan persoalan ini melalui pembedaan karakter yang tegas: kait kecil pada angka satu, lengkungan jelas pada huruf l kecil, serta bukaan ruang (counter) yang lebar di dalam huruf e, a, dan c. Ditambah ukuran baris ideal sekitar enam puluh hingga tujuh puluh lima karakter per baris, mata pembaca tidak perlu melompat terlalu jauh ketika berpindah dari akhir satu baris ke awal baris berikutnya.',
          'Selain pilihan huruf, pengaturan kontras permukaan memegang peranan penting. Putih murni berpadu hitam pekat memang memenuhi standar rasio kontras tinggi, tetapi pada sebagian pembaca dengan sensitivitas cahaya atau sindrom Irlen, pantulan layar putih yang terlalu menyilaukan justru memicu silau. Oleh karena itu, perpustakaan digital yang matang selalu menyediakan pilihan latar kertas gading hangat, sepia lembut, mode malam redup, serta mode kontras ekstrem.',
        ],
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Dari Teks Tertulis Menuju Pengalaman Suara yang Alami',
        estimatedMinutes: 4,
        paragraphs: [
          'Teknologi sintesis wicara (Text-to-Speech) modern memungkinkan setiap dokumen digital beralih wujud menjadi buku audio seketika. Agar pengalaman mendengarkan tetap jernih, penulis dan penyunting perlu memperhatikan tanda baca, pemecahan paragraf, serta penulisan singkatan yang tidak ambigu.',
          'Ketika pengguna mengaktifkan pembaca suara, penyorotan visual pada paragraf yang sedang dibacakan berfungsi sebagai jembatan ganda. Pembaca dengan gangguan pemusatan perhatian dapat mengikuti alur suara sembari melihat kata demi kata di layar, sehingga daya serap informasi meningkat secara signifikan.',
        ],
      },
    ],
  },
  {
    id: 'buku-jalur-rempah-maritim',
    accessionNumber: 'ACC. 2026.01.11',
    isbn: '978-602-5510-44-2',
    title: 'Peta Angin dan Pelabuhan Rempah',
    subtitle: 'Jejak Kartografi Maritim Nusantara dari Abad Ketujuh hingga Era Modern',
    author: 'Prof. Hendra Wijaya Sasmita',
    authorYears: '1958–2024',
    publisher: 'Balai Arsip Maritim',
    year: 2024,
    language: 'Bahasa Indonesia',
    pages: 312,
    category: 'Sejarah & Budaya',
    formats: ['Teks Digital', 'Pembaca Suara', 'Huruf Besar'],
    totalCopies: 5,
    initialBorrowedCopies: 2,
    coverImage: '/src/assets/images/cover_nusantara_history_1795659393304.jpg',
    coverPalette: {
      bg: '#F2EFE9',
      fg: '#1C1917',
      accent: '#1E3A8A',
    },
    synopsis:
      'Penelusuran mendalam mengenai bagaimana para pelaut Nusantara membaca musim, arus selat, dan rasi bintang jauh sebelum kompas modern dikenal luas. Menguraikan jaringan pelabuhan dagang terbuka di Malaka, Gresik, Makassar, hingga Ternate.',
    accessibilityNote:
      'Semua istilah maritim klasik disertai penjelasan ringkas di dalam teks agar mudah diikuti oleh pembaca umum maupun pelajar.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Napas Angin Muson di Selat Nusantara',
        estimatedMinutes: 5,
        paragraphs: [
          'Jauh sebelum peta kertas dicetak dengan proyeksi garis lintang dan bujur, samudra di kepulauan Nusantara telah dipetakan melalui ingatan kolektif mengenai perubahan angin. Dua kali setahun, arah angin berbalik dengan ketepatan yang mengagumkan: angin muson barat membawa perahu-perahu dari pesisir Sumatra dan Jawa menuju kepulauan Maluku, sementara angin muson timur memulangkan kapal-kapal bermuatan cengkeh dan pala ke barat.',
          'Kota-kota pelabuhan tumbuh bukan hanya sebagai tempat bongkar muat barang, melainkan sebagai ruang perjumpaan bahasa, hukum laut, dan pengetahuan botani. Di bandar seperti Barus, Gresik, dan Makassar, nakhoda dari berbagai penjuru bertukar catatan tentang kedalaman karang, sumber air tawar di pulau-pulau kecil, serta waktu terbaik melintasi selat sempit.',
          'Arsip pelayaran menunjukkan bahwa keberhasilan perdagangan maritim bergantung pada keterbukaan informasi. Pelabuhan yang menyediakan juru pandu andal, timbangan yang adil, serta ruang aman bagi pelaut dari berbagai bangsa berkembang menjadi pusat peradaban kosmopolitan.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Aksara di Atas Lontar dan Peta Kulit',
        estimatedMinutes: 4,
        paragraphs: [
          'Di antara peninggalan berharga dari pelaut Bugis dan Makassar terdapat naskah-naskah navigasi yang mencatat jarak pelayaran dalam satuan hari layar dan arah mata angin lokal. Berbeda dengan peta Eropa awal yang menitikberatkan batas wilayah daratan, peta pelaut Nusantara berpusat pada alur perairan yang menghubungkan satu pulau dengan pulau lain.',
          'Dalam pandangan bahari ini, laut bukanlah pemisah yang mengisolasi masyarakat pulau, melainkan jalan raya alami yang menyatukan seluruh kepulauan. Cara pandang tersebut masih relevan hingga hari ini ketika kita memikirkan bagaimana jaringan informasi digital menghubungkan daerah terpencil dengan pusat literasi.',
        ],
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Merawat Ingatan Pelabuhan Terbuka',
        estimatedMinutes: 4,
        paragraphs: [
          'Digitalisasi naskah kuno di era modern memungkinkan catatan pelayaran yang dahulu tersimpan di lemari arsip tertutup kini dapat dibaca secara serentak oleh pelajar di pedalaman Kalimantan hingga peneliti di pesisir Papua.',
          'Dengan menyertakan transkripsi yang ramah pembaca layar, warisan sejarah maritim tidak lagi menjadi monopoli kalangan akademisi semata, melainkan milik bersama seluruh warga negara.',
        ],
      },
    ],
  },
  {
    id: 'buku-cerita-pesisir-timur',
    accessionNumber: 'ACC. 2026.01.19',
    isbn: '978-602-7192-08-5',
    title: 'Nyanyian Daun Bakau di Pesisir Timur',
    subtitle: 'Kumpulan Cerita Pendek tentang Persahabatan, Laut, dan Harapan',
    author: 'Nadia Larasati Putri',
    authorYears: 'l. 1990',
    publisher: 'Sastra Daun Lontar',
    year: 2025,
    language: 'Bahasa Indonesia',
    pages: 184,
    category: 'Sastra & Fiksi',
    formats: ['Teks Digital', 'Pembaca Suara', 'Ramah Disleksia', 'Huruf Besar'],
    totalCopies: 8,
    initialBorrowedCopies: 2,
    coverImage: '/src/assets/images/cover_archipelago_stories_1795659394507.jpg',
    coverPalette: {
      bg: '#EDF2EE',
      fg: '#14261C',
      accent: '#14532D',
    },
    synopsis:
      'Dua belas kisah pendek yang berlatar desa pesisir dengan hutan bakau yang tenang. Mengisahkan seorang anak penenun jaring yang belajar membaca sandi cuaca bersama neneknya yang tuli, serta perahu perpustakaan keliling yang membawa buku ke pulau-pulau karang.',
    accessibilityNote:
      'Ritme narasi tenang, alinea pendek, serta sangat nyaman dinikmati melalui fitur Pembaca Suara.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Perahu Kayu Bermuatan Kertas',
        estimatedMinutes: 5,
        paragraphs: [
          'Setiap Kamis pagi ketika air laut mulai surut perlahan meninggalkan akar-akar bakau yang basah, bunyi mesin tempel tua terdengar lembut dari balik tanjung. Bagi anak-anak di Kampung Tanjung Pasir, bunyi itu berarti satu hal: Perahu Pustaka milik Pak Idris telah tiba membawa peti-peti kayu berisi buku baru.',
          'Rani berlari kecil di atas jembatan papan sambil menggandeng adiknya, Bagas. Sejak tahun lalu, perpustakaan apung itu bukan hanya membawa buku bergambar biasa, tetapi juga buku berhuruf timbul dan perangkat pemutar cerita suara. Pak Idris percaya bahwa laut tidak boleh menghalangi siapa pun di kampung pesisir untuk mengenal dunia.',
          'Di beranda balai nelayan yang menghadap teluk, anak-anak duduk melingkar. Sebagian membaca dalam diam, sebagian lain menyimak cerita dari pelantang suara kecil di bawah teduh pohon ketapang. Angin laut membalik halaman demi halaman seolah ikut membaca bersama mereka.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Bahasa Isyarat di Balik Ombak',
        estimatedMinutes: 4,
        paragraphs: [
          'Nenek Sari tidak pernah mendengar gemuruh ombak dengan telinganya, namun tidak ada seorang pun di kampung yang memahami watak laut sebaik dirinya. Dengan gerakan tangan yang luwes dan tatapan mata yang tajam, ia mengajarkan Rani cara membaca warna awan di cakrawala dan perubahan arus di muara sungai.',
          'Ketika Rani membacakan buku dongeng tentang burung laut untuk neneknya, mereka menciptakan cara baru: Rani bercerita dengan gerak tangan dan ekspresi wajah yang hidup, sementara sang nenek sesekali tersenyum dan menambahkan kisah rakyat lama yang belum pernah tertulis di buku mana pun.',
        ],
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Peta Bintang di Langit Tanjung',
        estimatedMinutes: 4,
        paragraphs: [
          'Malam itu listrik padam di seluruh tanjung, menyisakan ribuan bintang yang terpantul di permukaan air tenang. Tanpa lampu neon, langit terasa jauh lebih dekat daripada biasanya.',
          'Rani membuka buku catatan bersampul biru pemberian Pak Idris dan mulai menulis kisah tentang neneknya, hutan bakau, dan perahu pustaka—berharap suatu hari kelak ada anak di pulau lain yang membaca kisahnya dan merasa ditemani.',
        ],
      },
    ],
  },
  {
    id: 'buku-atlas-langit-selatan',
    accessionNumber: 'ACC. 2026.02.02',
    isbn: '978-602-4401-99-4',
    title: 'Atlas Langit Belahan Selatan',
    subtitle: 'Pengantar Astronomi Observasional dan Navigasi Rasi Bintang Khatulistiwa',
    author: 'Dr. Bagus Pradipta',
    authorYears: 'l. 1976',
    publisher: 'Observatorium Publik Bandung',
    year: 2025,
    language: 'Bahasa Indonesia',
    pages: 276,
    category: 'Sains & Astronomi',
    formats: ['Teks Digital', 'Pembaca Suara', 'Huruf Besar'],
    totalCopies: 4,
    initialBorrowedCopies: 1,
    coverImage: '/src/assets/images/cover_astronomy_sky_1795659393612.jpg',
    coverPalette: {
      bg: '#162038',
      fg: '#F8FAFC',
      accent: '#D4AF37',
    },
    synopsis:
      'Panduan mengamati benda langit dari wilayah ekuator tanpa memerlukan teleskop mahal. Menjelaskan siklus gerhana, orientasi rasi Layang-Layang Selatan (Crux), serta sejarah observatorium astronomi terbuka bagi masyarakat umum.',
    accessibilityNote:
      'Deskripsi visual benda langit ditulis secara naratif detail sehingga tetap terbayang jelas oleh pembaca dengan hambatan penglihatan.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Keistimewaan Langit Khatulistiwa',
        estimatedMinutes: 5,
        paragraphs: [
          'Berdiri di garis khatulistiwa memberi pengamat langit sebuah keistimewaan yang tidak dimiliki penduduk lintang tinggi. Sepanjang satu tahun penuh, hampir seluruh rasi bintang di belahan langit utara maupun belahan langit selatan melintas bergantian di atas kepala kita.',
          'Di Indonesia, rasi Crux atau yang dikenal oleh para pelaut dan petani sebagai Bintang Pari atau Gubuk Penceng menjadi penunjuk arah selatan yang sangat andal. Empat bintang utamanya membentuk siluet layang-layang miring yang mudah dikenali bahkan dari halaman rumah di pinggiran kota.',
          'Mengenal langit malam tidak menuntut peralatan canggih. Modal utamanya hanyalah kesabaran membiarkan mata beradaptasi dengan gelap selama lima belas menit dan rasa ingin tahu untuk bertanya ke mana bumi sedang berputar.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Membaca Ritme Bulan dan Pasang Surut',
        estimatedMinutes: 4,
        paragraphs: [
          'Setiap malam, Bulan bergeser ke arah timur sekitar dua belas derajat relatif terhadap bintang-bintang latar belakangnya. Pergeseran perlahan ini memengaruhi ritme pasang surut samudra di seluruh planet kita melalui gaya tarik gravitasi.',
          'Para peneliti kebumian dan nelayan tradisional sama-sama mencatat hubungan antara fase bulan purnama, bulan baru, dan ketinggian pasang air laut. Ilmu pengetahuan modern hanya menerjemahkan pengamatan ribuan tahun tersebut ke dalam persamaan matematika yang lebih presisi.',
        ],
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Astronomi untuk Semua Warga',
        estimatedMinutes: 4,
        paragraphs: [
          'Belakangan ini, gerakan astronomi inklusif berkembang pesat melalui model tata surya tiga dimensi yang dapat diraba serta sonifikasi data bintang—di mana tingkat kecerahan dan suhu bintang diubah menjadi nada musik yang merdu.',
          'Dengan memadukan sains dan empati desain, semesta yang luas bukan hanya milik mereka yang dapat memandang melalui lensa okuler, melainkan milik setiap manusia yang ingin memahami tempatnya di alam semesta.',
        ],
      },
    ],
  },
  {
    id: 'buku-literasi-kritis',
    accessionNumber: 'ACC. 2026.02.15',
    isbn: '978-602-9102-33-1',
    title: 'Membaca Jernih di Era Banjir Informasi',
    subtitle: 'Metode Literasi Kritis, Verifikasi Fakta, dan Kebiasaan Berpikir Lambat',
    author: 'Siti Aminah Nurhaliza, M.Hum.',
    authorYears: 'l. 1985',
    publisher: 'Pustaka Warga Merdeka',
    year: 2026,
    language: 'Bahasa Indonesia',
    pages: 210,
    category: 'Pendidikan & Literasi',
    formats: ['Teks Digital', 'Pembaca Suara', 'Ramah Disleksia', 'Huruf Besar'],
    totalCopies: 7,
    initialBorrowedCopies: 1,
    coverPalette: {
      bg: '#F1F4F8',
      fg: '#0F172A',
      accent: '#1E3A8A',
    },
    synopsis:
      'Buku pegangan praktis bagi pelajar, pendidik, dan masyarakat umum untuk memilah berita valid dari disinformasi. Mengajarkan teknik membaca lateral, menilai kredibilitas sumber primer, dan membangun ruang diskusi warga yang sehat.',
    accessibilityNote:
      'Disusun dengan daftar langkah bernomor, rangkuman di akhir bab, dan bahasa Indonesia baku yang mudah dipahami.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Jebakan Kecepatan dan Pentingnya Jeda Berpikir',
        estimatedMinutes: 4,
        paragraphs: [
          'Setiap hari, jemari kita menggulir ribuan judul berita singkat di layar ponsel. Algoritma media sosial dirancang untuk memancing reaksi emosional instan—kagum, marah, atau takut—sebelum pikiran rasional sempat memeriksa apakah kabar tersebut benar adanya.',
          'Literasi kritis dimulai dari keberanian mengambil jeda sepuluh detik sebelum membagikan sebuah informasi. Dalam jeda singkat itu, kita mengajukan tiga pertanyaan sederhana: siapa yang menerbitkan kabar ini, bukti primer apa yang disertakan, dan apakah ada media independen lain yang mengonfirmasinya.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Teknik Membaca Lateral ala Pemeriksa Fakta',
        estimatedMinutes: 5,
        paragraphs: [
          'Ketika membaca artikel daring yang meragukan, kebanyakan orang hanya menggulir ke bawah untuk menilai tampilan situs tersebut. Padahal, pembacaan vertikal mudah tertipu oleh desain web yang tampak meyakinkan.',
          'Sebaliknya, pemeriksa fakta profesional menerapkan pembacaan lateral: mereka segera membuka tab baru dan menelusuri reputasi lembaga penerbit, penulis, serta sumber data yang dikutip sebelum menamatkan isi artikelnya. Kebiasaan sederhana ini terbukti jauh lebih efektif menangkal kabar bohong.',
        ],
      },
      {
        id: 'bab-3',
        number: 3,
        title: 'Perpustakaan sebagai Jangkar Kebenaran Publik',
        estimatedMinutes: 4,
        paragraphs: [
          'Di tengah arus informasi yang serba cepat dan kerap menghilang, perpustakaan digital memainkan peran sebagai jangkar rujukan yang terkurasi. Buku dan terbitan ilmiah melalui proses penyuntingan berjenjang sehingga kualitas argumennya dapat dipertanggungjawabkan.',
          'Mengembalikan kebiasaan membaca karya utuh—bukan sekadar potongan kutipan—melatih daya konsentrasi sekaligus menumbuhkan empati terhadap kompleksitas persoalan masyarakat.',
        ],
      },
    ],
  },
  {
    id: 'buku-bahasa-ibu-nusantara',
    accessionNumber: 'ACC. 2026.02.27',
    isbn: '978-602-3318-71-0',
    title: 'Menjaga Nyala Bahasa-Bahasa Daerah',
    subtitle: 'Dokumentasi Lisan, Kamus Terbuka, dan Revitalisasi Bahasa Ibu di Sekolah',
    author: 'Dr. Yohanes Pati',
    authorYears: 'l. 1972',
    publisher: 'Balai Bahasa Inklusif',
    year: 2024,
    language: 'Bahasa Indonesia',
    pages: 264,
    category: 'Sejarah & Budaya',
    formats: ['Teks Digital', 'Pembaca Suara', 'Huruf Besar'],
    totalCopies: 3,
    initialBorrowedCopies: 3, // Semua salinan sedang dipinjam -> untuk demo alur Antrean + Pratinjau!
    coverPalette: {
      bg: '#F4F1EA',
      fg: '#292524',
      accent: '#78350F',
    },
    synopsis:
      'Catatan lapangan tentang upaya komunitas guru, tetua adat, dan relawan teknologi dalam merekam kosakata serta dongeng dalam berbagai bahasa daerah di Indonesia agar tidak punah ditelan generasi.',
    accessibilityNote:
      'Menyertakan transkripsi fonetik sederhana agar pembaca dapat melafalkan kosakata daerah secara tepat.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Ketika Sebuah Kata Menghilang dari Percakapan',
        estimatedMinutes: 5,
        paragraphs: [
          'Indonesia merupakan rumah bagi lebih dari tujuh ratus bahasa daerah yang hidup. Di balik setiap bahasa tersimpan cara pandang unik mengenai alam: nama-nama jenis hujan, istilah kekerabatan yang hangat, hingga pengetahuan obat-obatan hutan yang diwariskan turun-temurun.',
          'Ketika generasi muda tidak lagi menggunakan bahasa ibunya di rumah maupun di sekolah, yang hilang bukan hanya bunyi kata, melainkan seluruh perpustakaan pengetahuan lisan yang tidak tergantikan oleh bahasa lain.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Kamus Audio Terbuka Buatan Komunitas',
        estimatedMinutes: 4,
        paragraphs: [
          'Di sejumlah desa di Flores, Toraja, dan Kalimantan Tengah, para pelajar bekerja sama dengan kakek-nenek mereka merekam cerita rakyat menggunakan alat perekam sederhana. Rekaman tersebut kemudian disunting menjadi buku digital dwibahasa yang dilengkapi suara penutur asli.',
          'Pendekatan partisipatif ini membuktikan bahwa teknologi digital tidak selalu menggerus budaya lokal; sebaliknya, jika dikelola secara terbuka, ia menjadi perahu penyelamat bagi bahasa ibu.',
        ],
      },
    ],
  },
  {
    id: 'buku-ekologi-kota-hijau',
    accessionNumber: 'ACC. 2026.03.05',
    isbn: '978-602-6210-15-6',
    title: 'Kota yang Bernapas Bersama Pohon',
    subtitle: 'Perencanaan Ruang Terbuka Publik, Trotoar Ramah Kursi Roda, dan Iklim Mikro',
    author: 'Ar. Dimas Pratama, IAI',
    authorYears: 'l. 1983',
    publisher: 'Studio Tata Kota Berkelanjutan',
    year: 2025,
    language: 'Bahasa Indonesia',
    pages: 228,
    category: 'Teknologi Inklusif',
    formats: ['Teks Digital', 'Pembaca Suara', 'Ramah Disleksia'],
    totalCopies: 5,
    initialBorrowedCopies: 0,
    coverPalette: {
      bg: '#ECF2EF',
      fg: '#14291F',
      accent: '#14532D',
    },
    synopsis:
      'Kajian tata kota yang menggabungkan ekologi perkotaan dengan aksesibilitas pejalan kaki. Mengupas desain taman kota tanpa anak tangga berlebih, jalur pemandu tunanetra yang konsisten, serta kanopi pohon peneduh untuk menurunkan suhu jalanan tropis.',
    accessibilityNote:
      'Struktur bab terorganisasi rapi per topik studi kasus dengan paragraf pendek yang nyaman dibaca di perangkat mobile maupun desktop.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Mengukur Kualitas Kota dari Lebar Trotoarnya',
        estimatedMinutes: 4,
        paragraphs: [
          'Wajah sejati sebuah kota tidak diukur dari tinggi gedung pencakar langitnya, melainkan dari seberapa nyaman seorang lansia, anak kecil, atau pengguna kursi roda melintasi trotoarnya tanpa rasa cemas.',
          'Trotoar yang rata, memiliki kelandaian lembut di setiap persimpangan, serta bebas dari tiang penghalang di tengah jalur pemandu tunanetra adalah wujud nyata keadilan ruang publik. Ketika warga dapat berjalan kaki dengan aman menuju taman dan perpustakaan kota, ikatan sosial antarwarga tumbuh secara alami.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Peneduh Alami dan Taman Sensorik',
        estimatedMinutes: 4,
        paragraphs: [
          'Di kota-kota beriklim tropis, pepohonan berdaun rindang bukan sekadar hiasan estetika. Kanopi pohon mampu menurunkan suhu permukaan aspal hingga beberapa derajat Celsius sekaligus menyerap air hujan ke dalam tanah.',
          'Beberapa taman kota modern kini juga menghadirkan kebun sensorik—area hijau dengan tanaman beraroma harum seperti serai wangi dan melati, gemericik kolam dangkal, serta papan informasi berhuruf besar dan braille sehingga semua pengunjung dapat merasakan kesegaran alam dengan seluruh indranya.',
        ],
      },
    ],
  },
  {
    id: 'buku-matematika-kehidupan',
    accessionNumber: 'ACC. 2026.03.14',
    isbn: '978-602-8812-54-7',
    title: 'Pola Tersembunyi di Balik Alam',
    subtitle: 'Simetri Bunga, Deret Fibonacci, dan Keindahan Logika untuk Pembaca Umum',
    author: 'Dr. Kartika Wulandari',
    authorYears: 'l. 1987',
    publisher: 'Cakrawala Sains Terbuka',
    year: 2026,
    language: 'Bahasa Indonesia',
    pages: 196,
    category: 'Sains & Astronomi',
    formats: ['Teks Digital', 'Pembaca Suara', 'Ramah Disleksia', 'Huruf Besar'],
    totalCopies: 6,
    initialBorrowedCopies: 1,
    coverPalette: {
      bg: '#F3F3F5',
      fg: '#18181B',
      accent: '#1E3A8A',
    },
    synopsis:
      'Mengajak pembaca melihat matematika bukan sebagai deretan rumus menakutkan, melainkan sebagai bahasa puitis alam semesta—dari spiral biji bunga matahari, cabang ranting pohon, hingga harmoni nada musik gamelan.',
    accessibilityNote:
      'Penjelasan konsep matematika disampaikan sepenuhnya melalui analogi visual-naratif tanpa simbol rumit yang sulit dibaca oleh pembaca layar.',
    chapters: [
      {
        id: 'bab-1',
        number: 1,
        title: 'Spiral Bunga Matahari dan Efisiensi Alam',
        estimatedMinutes: 4,
        paragraphs: [
          'Pernahkah Anda memperhatikan susunan biji di tengah sekuntum bunga matahari atau sisik buah nanas? Jika dihitung searah jarum jam dan berlawanan arah jarum jam, jumlah spiralnya hampir selalu jatuh pada pasangan angka yang sama: dua puluh satu dan tiga puluh empat, atau tiga puluh empat dan lima puluh lima.',
          'Angka-angka tersebut berasal dari barisan bilangan sederhana di mana setiap angka baru adalah hasil penjumlahan dua angka sebelumnya. Alam memilih pola ini bukan untuk pamer keindahan, melainkan karena susunan sudutnya memungkinkan setiap biji dan daun menerima cahaya matahari paling optimal tanpa saling menutupi.',
        ],
      },
      {
        id: 'bab-2',
        number: 2,
        title: 'Matematika dalam Alunan Gamelan dan Tenun',
        estimatedMinutes: 5,
        paragraphs: [
          'Jauh sebelum istilah geometri fraktal populer di jurnal ilmiah, para perajin tenun ikat dan pembuat motif batik telah menerapkan prinsip simetri, pencerminan, dan pengulangan skala secara intuitif di atas selembar kain.',
          'Demikian pula dalam musik tradisional, perbandingan panjang bilah logam dan ketukan siklus tabuhan mengikuti rasio bilangan bulat yang menghasilkan resonansi menenangkan telinga. Sains dan seni pada dasarnya adalah dua cermin dari rasa ingin tahu manusia yang sama.',
        ],
      },
    ],
  },
];
