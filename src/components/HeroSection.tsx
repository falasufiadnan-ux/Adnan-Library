import React, { useState } from 'react';
import { Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { HERO_LIBRARY_IMAGE } from '../data/books';

interface HeroSectionProps {
  totalBooks: number;
  availableBooksCount: number;
  onQuickSearch: (query: string) => void;
  onOpenAccessibility: () => void;
  onExploreCatalog: () => void;
  isHighContrast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalBooks,
  availableBooksCount,
  onQuickSearch,
  onOpenAccessibility,
  onExploreCatalog,
  isHighContrast,
}) => {
  const [heroQuery, setHeroQuery] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(heroQuery);
  };

  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className={`border-b ${
        isHighContrast
          ? 'border-yellow-400 bg-black text-white'
          : 'border-zinc-200 bg-[#FAF9F6] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left Column: Editorial Headline + Direct Search */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p
                className={`text-xs font-medium tracking-widest uppercase ${
                  isHighContrast
                    ? 'text-yellow-300'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                Perpustakaan Terbuka Nasional · Akses Universal
              </p>

              <h1
                id="hero-heading"
                className="font-display mt-4 text-4xl font-semibold tracking-tight leading-[1.12] sm:text-5xl text-balance"
              >
                Pengetahuan Terbuka untuk Semua Pembaca
              </h1>

              <p
                className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
                  isHighContrast
                    ? 'text-zinc-100'
                    : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                Cari koleksi terkurasi, pinjam secara instan tanpa syarat masuk
                akun yang rumit, dan baca daring dengan pembaca suara, mode
                kontras tinggi, serta tipografi ramah disleksia.
              </p>

              {/* Direct Quick Search Form */}
              <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Pencarian cepat koleksi buku"
                className="mt-7"
              >
                <label htmlFor="hero-search-input" className="sr-only">
                  Cari judul buku, penulis, atau topik
                </label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      className={`pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 ${
                        isHighContrast
                          ? 'text-yellow-300'
                          : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                      aria-hidden="true"
                    />
                    <input
                      id="hero-search-input"
                      type="search"
                      value={heroQuery}
                      onChange={(e) => setHeroQuery(e.target.value)}
                      placeholder="Cari judul, penulis, atau topik..."
                      className={`min-h-[46px] w-full rounded-lg border py-2.5 pr-4 pl-11 text-sm sm:text-base transition-colors ${
                        isHighContrast
                          ? 'border-yellow-400 bg-black text-white placeholder:text-zinc-400'
                          : 'border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`min-h-[46px] inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isHighContrast
                        ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                        : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                    }`}
                  >
                    Cari Buku
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>

            {/* Secondary action links */}
            <div className="mt-7 flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className={`min-h-[42px] inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isHighContrast
                    ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                Jelajahi Semua Koleksi
              </button>
              <button
                type="button"
                onClick={onOpenAccessibility}
                className={`min-h-[42px] inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium underline-offset-4 hover:underline whitespace-nowrap cursor-pointer ${
                  isHighContrast
                    ? 'text-yellow-300'
                    : 'text-[#1E3A8A] dark:text-blue-400'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Sesuaikan Tampilan & Aksesibilitas
              </button>
            </div>
          </div>

          {/* Right Column: Full-height Editorial Library Photograph */}
          <figure className="flex flex-col lg:col-span-6">
            <div
              className={`relative flex-1 overflow-hidden rounded-xl border min-h-[260px] lg:min-h-[380px] ${
                isHighContrast
                  ? 'border-yellow-400 bg-zinc-950'
                  : 'border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
              {!imgError ? (
                <img
                  src={HERO_LIBRARY_IMAGE}
                  alt="Pengunjung dari berbagai usia dan pengguna kursi roda membaca dengan nyaman di ruang baca terbuka yang terang dan inklusif"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover lg:h-full"
                />
              ) : (
                <div className="flex h-full min-h-[300px] items-center justify-center p-8 text-center">
                  <p className="font-display text-xl">
                    Ruang Baca Terbuka Pustaka Aksara
                  </p>
                </div>
              )}
            </div>
            <figcaption
              className={`mt-2.5 text-xs italic ${
                isHighContrast
                  ? 'text-zinc-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Fig. 1 — Ruang baca inklusif dengan akses kursi roda, pencahayaan
              alami, dan perangkat bantu baca digital.
            </figcaption>
          </figure>
        </div>

        {/* Full-Width 4-Column Operational & Collection Strip below Hero Split */}
        <dl
          className={`mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4 ${
            isHighContrast
              ? 'border-yellow-400 bg-yellow-400'
              : 'border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800'
          }`}
        >
          <div
            className={`p-4 sm:p-5 ${
              isHighContrast
                ? 'bg-black text-white'
                : 'bg-white dark:bg-zinc-900'
            }`}
          >
            <dt
              className={`text-xs font-medium ${
                isHighContrast
                  ? 'text-yellow-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Koleksi Terkurasi
            </dt>
            <dd className="font-mono-tabular mt-1 text-lg font-semibold sm:text-xl">
              {totalBooks} Judul Utama
            </dd>
          </div>

          <div
            className={`p-4 sm:p-5 ${
              isHighContrast
                ? 'bg-black text-white'
                : 'bg-white dark:bg-zinc-900'
            }`}
          >
            <dt
              className={`text-xs font-medium ${
                isHighContrast
                  ? 'text-yellow-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Siap Dipinjam Hari Ini
            </dt>
            <dd className="font-mono-tabular mt-1 text-lg font-semibold sm:text-xl">
              {availableBooksCount} Judul Tersedia
            </dd>
          </div>

          <div
            className={`p-4 sm:p-5 ${
              isHighContrast
                ? 'bg-black text-white'
                : 'bg-white dark:bg-zinc-900'
            }`}
          >
            <dt
              className={`text-xs font-medium ${
                isHighContrast
                  ? 'text-yellow-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Keanggotaan & Biaya
            </dt>
            <dd className="mt-1 text-lg font-semibold sm:text-xl">
              Terbuka & Gratis
            </dd>
          </div>

          <div
            className={`p-4 sm:p-5 ${
              isHighContrast
                ? 'bg-black text-white'
                : 'bg-white dark:bg-zinc-900'
            }`}
          >
            <dt
              className={`text-xs font-medium ${
                isHighContrast
                  ? 'text-yellow-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Dukungan Pembaca
            </dt>
            <dd className="mt-1 text-lg font-semibold sm:text-xl">
              Suara, Disleksia & AAA
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
