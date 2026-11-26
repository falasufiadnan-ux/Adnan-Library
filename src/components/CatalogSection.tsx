import React from 'react';
import {
  Search,
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  Volume2,
  BookmarkCheck,
} from 'lucide-react';
import {
  Book,
  BookCategory,
  InclusiveFormat,
  LoanRecord,
} from '../types/library';
import { BookCover } from './BookCover';

interface CatalogSectionProps {
  books: Book[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: 'Semua' | BookCategory;
  onSelectCategory: (cat: 'Semua' | BookCategory) => void;
  selectedFormat: 'Semua' | InclusiveFormat;
  onSelectFormat: (fmt: 'Semua' | InclusiveFormat) => void;
  onlyAvailable: boolean;
  onToggleOnlyAvailable: (v: boolean) => void;
  loans: Record<string, LoanRecord>;
  waitlistIds: string[];
  onBorrowAndRead: (book: Book) => void;
  onOpenReader: (book: Book, previewOnly?: boolean) => void;
  onSelectBookDetail: (book: Book) => void;
  onToggleWaitlist: (book: Book) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  isHighContrast: boolean;
}

const CATEGORIES: Array<'Semua' | BookCategory> = [
  'Semua',
  'Teknologi Inklusif',
  'Sastra & Fiksi',
  'Sejarah & Budaya',
  'Sains & Astronomi',
  'Pendidikan & Literasi',
];

const FORMATS: Array<'Semua' | InclusiveFormat> = [
  'Semua',
  'Teks Digital',
  'Pembaca Suara',
  'Ramah Disleksia',
  'Huruf Besar',
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  books,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedFormat,
  onSelectFormat,
  onlyAvailable,
  onToggleOnlyAvailable,
  loans,
  waitlistIds,
  onBorrowAndRead,
  onOpenReader,
  onSelectBookDetail,
  onToggleWaitlist,
  searchInputRef,
  isHighContrast,
}) => {
  const getAvailableCopies = (book: Book) => {
    const userBorrowed = loans[book.id] ? 1 : 0;
    return Math.max(
      0,
      book.totalCopies - book.initialBorrowedCopies - userBorrowed
    );
  };

  const filteredBooks = books.filter((book) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.subtitle.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.synopsis.toLowerCase().includes(q) ||
      book.accessionNumber.toLowerCase().includes(q) ||
      book.isbn.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;

    const matchesFormat =
      selectedFormat === 'Semua' || book.formats.includes(selectedFormat);

    const availableCopies = getAvailableCopies(book);
    const isBorrowedByUser = Boolean(loans[book.id]);
    const matchesAvailability =
      !onlyAvailable || availableCopies > 0 || isBorrowedByUser;

    return (
      matchesQuery && matchesCategory && matchesFormat && matchesAvailability
    );
  });

  const resetFilters = () => {
    onSearchChange('');
    onSelectCategory('Semua');
    onSelectFormat('Semua');
    onToggleOnlyAvailable(false);
  };

  return (
    <section
      id="katalog"
      aria-labelledby="katalog-heading"
      className={`border-b py-12 sm:py-16 ${
        isHighContrast
          ? 'border-yellow-400 bg-black text-white'
          : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="katalog-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Katalog Koleksi Digital
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Telusuri buku berdasarkan topik, penulis, atau dukungan format
              inklusif. Setiap buku dapat dipinjam dan dibaca langsung di
              peramban.
            </p>
          </div>
          <p
            className={`font-mono-tabular text-xs sm:text-sm ${
              isHighContrast
                ? 'text-yellow-300'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
            aria-live="polite"
          >
            Menampilkan {filteredBooks.length} dari {books.length} judul
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          className={`mt-7 rounded-xl border p-4 sm:p-5 ${
            isHighContrast
              ? 'border-yellow-400 bg-black'
              : 'border-zinc-200 bg-[#FAF9F6] dark:border-zinc-800 dark:bg-zinc-900'
          }`}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            {/* Search Input */}
            <div className="md:col-span-6">
              <label htmlFor="catalog-search-input" className="sr-only">
                Cari di katalog perpustakaan
              </label>
              <div className="relative">
                <Search
                  className={`pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 ${
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  id="catalog-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari judul, penulis, ISBN, atau kata kunci... (tekan /)"
                  className={`min-h-[44px] w-full rounded-lg border py-2 pr-10 pl-10 text-sm transition-colors ${
                    isHighContrast
                      ? 'border-yellow-400 bg-black text-white placeholder:text-zinc-400'
                      : 'border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    aria-label="Hapus kata kunci pencarian"
                    className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md hover:bg-zinc-200/70 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Format Filter */}
            <div className="md:col-span-3">
              <label htmlFor="format-filter-select" className="sr-only">
                Filter berdasarkan format inklusif
              </label>
              <select
                id="format-filter-select"
                value={selectedFormat}
                onChange={(e) =>
                  onSelectFormat(e.target.value as 'Semua' | InclusiveFormat)
                }
                className={`min-h-[44px] w-full rounded-lg border px-3 py-2 text-sm cursor-pointer ${
                  isHighContrast
                    ? 'border-yellow-400 bg-black text-white'
                    : 'border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
                }`}
              >
                {FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt === 'Semua' ? 'Semua Format Inklusif' : `Format: ${fmt}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Toggle */}
            <div className="md:col-span-3">
              <button
                type="button"
                aria-pressed={onlyAvailable}
                onClick={() => onToggleOnlyAvailable(!onlyAvailable)}
                className={`min-h-[44px] flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  onlyAvailable
                    ? isHighContrast
                      ? 'border-yellow-300 bg-yellow-300 text-black'
                      : 'border-[#1E3A8A] bg-[#1E3A8A] text-white dark:border-blue-500 dark:bg-blue-600'
                    : isHighContrast
                      ? 'border-yellow-400 bg-black text-white'
                      : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Tersedia Sekarang</span>
              </button>
            </div>
          </div>

          {/* Interactive Category Segmented Buttons */}
          <div
            role="group"
            aria-label="Filter kategori buku"
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelectCategory(category)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? isHighContrast
                        ? 'bg-yellow-300 text-black'
                        : 'bg-[#1E3A8A] text-white dark:bg-blue-600'
                      : isHighContrast
                        ? 'border border-yellow-400/70 bg-black text-white hover:bg-zinc-900'
                        : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Book Grid or Empty State */}
        {filteredBooks.length === 0 ? (
          <div
            className={`mt-8 rounded-xl border p-10 text-center ${
              isHighContrast
                ? 'border-yellow-400 bg-black'
                : 'border-zinc-200 bg-[#FAF9F6] dark:border-zinc-800 dark:bg-zinc-900'
            }`}
          >
            <p className="font-display text-xl font-semibold">
              Tidak ada koleksi yang sesuai dengan pencarian Anda
            </p>
            <p
              className={`mt-2 text-sm ${
                isHighContrast
                  ? 'text-zinc-300'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Coba ubah kata kunci, pilih kategori lain, atau tampilkan seluruh
              format bacaan.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className={`mt-5 min-h-[44px] rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-300 text-black'
                  : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600'
              }`}
            >
              Atur Ulang Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => {
              const userLoan = loans[book.id];
              const availableCopies = getAvailableCopies(book);
              const inWaitlist = waitlistIds.includes(book.id);

              return (
                <article
                  key={book.id}
                  className={`group flex flex-col justify-between overflow-hidden rounded-xl border transition-colors ${
                    isHighContrast
                      ? 'border-yellow-400 bg-black text-white'
                      : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Clickable Cover Area */}
                    <button
                      type="button"
                      onClick={() => onSelectBookDetail(book)}
                      className="block w-full text-left cursor-pointer focus-visible:outline-offset-[-3px]"
                      aria-label={`Lihat rincian buku ${book.title}`}
                    >
                      <BookCover
                        book={book}
                        className="aspect-[3/4] w-full border-b border-zinc-200 dark:border-zinc-800"
                      />
                    </button>

                    <div className="p-5">
                      {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                      <p
                        className={`text-xs ${
                          isHighContrast
                            ? 'text-yellow-300'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        <span>{book.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono-tabular">{book.year}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono-tabular">
                          {book.pages} hlm
                        </span>
                      </p>

                      {/* Title */}
                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectBookDetail(book)}
                          className="text-left hover:underline underline-offset-4 cursor-pointer"
                        >
                          {book.title}
                        </button>
                      </h3>

                      <p
                        className={`mt-1 text-sm font-medium ${
                          isHighContrast
                            ? 'text-zinc-200'
                            : 'text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {book.author}
                      </p>

                      <p
                        className={`mt-2.5 text-xs leading-relaxed line-clamp-2 ${
                          isHighContrast
                            ? 'text-zinc-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {book.synopsis}
                      </p>

                      {/* Inclusive Format Text Metadata + Explicit Status */}
                      <div
                        className={`mt-3.5 flex items-center gap-1.5 text-xs ${
                          isHighContrast
                            ? 'text-zinc-200'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        <Volume2
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {book.formats.join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Explicit Availability Status + Actions */}
                  <div
                    className={`border-t px-5 py-4 ${
                      isHighContrast
                        ? 'border-yellow-400/50 bg-black'
                        : 'border-zinc-100 bg-[#FAF9F6]/60 dark:border-zinc-800 dark:bg-zinc-900/60'
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold">
                      {userLoan ? (
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            isHighContrast
                              ? 'text-yellow-300'
                              : 'text-[#1E3A8A] dark:text-blue-400'
                          }`}
                        >
                          <BookmarkCheck
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          Sedang Anda Pinjam
                        </span>
                      ) : availableCopies > 0 ? (
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            isHighContrast
                              ? 'text-yellow-300'
                              : 'text-emerald-800 dark:text-emerald-400'
                          }`}
                        >
                          <CheckCircle2
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-mono-tabular">
                            Tersedia ({availableCopies}/{book.totalCopies})
                          </span>
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            isHighContrast
                              ? 'text-zinc-300'
                              : 'text-amber-800 dark:text-amber-400'
                          }`}
                        >
                          <Clock
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {inWaitlist
                              ? 'Anda di Antrean'
                              : 'Semua Salinan Dipinjam'}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {userLoan ? (
                        <button
                          type="button"
                          onClick={() => onOpenReader(book, false)}
                          className={`min-h-[42px] flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            isHighContrast
                              ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                              : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                          }`}
                        >
                          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          Baca Sekarang
                        </button>
                      ) : availableCopies > 0 ? (
                        <button
                          type="button"
                          onClick={() => onBorrowAndRead(book)}
                          className={`min-h-[42px] flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            isHighContrast
                              ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                              : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                          }`}
                        >
                          Pinjam & Baca
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToggleWaitlist(book)}
                          className={`min-h-[42px] flex-1 inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            isHighContrast
                              ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                              : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
                          }`}
                        >
                          {inWaitlist ? 'Keluar Antrean' : 'Masuk Antrean'}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectBookDetail(book)}
                        className={`min-h-[42px] rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isHighContrast
                            ? 'border-yellow-400 text-white hover:bg-zinc-900'
                            : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800'
                        }`}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
