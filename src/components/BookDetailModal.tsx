import React, { useEffect, useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Accessibility,
} from 'lucide-react';
import { Book, LoanRecord } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  loan: LoanRecord | undefined;
  inWaitlist: boolean;
  onClose: () => void;
  onBorrow: (book: Book, durationDays: number, openAfter: boolean) => void;
  onReturn: (bookId: string) => void;
  onToggleWaitlist: (book: Book) => void;
  onOpenReader: (book: Book, previewOnly: boolean) => void;
  isHighContrast: boolean;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  loan,
  inWaitlist,
  onClose,
  onBorrow,
  onReturn,
  onToggleWaitlist,
  onOpenReader,
  isHighContrast,
}) => {
  const [durationDays, setDurationDays] = useState(14);

  useEffect(() => {
    if (!book) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [book, onClose]);

  if (!book) return null;

  const availableCopies = Math.max(
    0,
    book.totalCopies - book.initialBorrowedCopies - (loan ? 1 : 0)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8 ${
          isHighContrast
            ? 'border-yellow-400 bg-black text-white'
            : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <p
            className={`font-mono-tabular text-xs uppercase tracking-widest ${
              isHighContrast
                ? 'text-yellow-300'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            {book.accessionNumber} · {book.category}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela rincian buku"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border cursor-pointer ${
              isHighContrast
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <BookCover
              book={book}
              className="aspect-[3/4] w-full rounded-xl border border-zinc-200 dark:border-zinc-800"
            />
          </div>

          <div className="sm:col-span-8">
            <h2
              id="detail-book-title"
              className="font-display text-2xl font-semibold leading-tight sm:text-3xl"
            >
              {book.title}
            </h2>
            <p
              className={`mt-1.5 text-sm sm:text-base ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {book.subtitle}
            </p>

            {/* Museum Accession Metadata Grid */}
            <dl
              className={`mt-5 divide-y border-y text-sm ${
                isHighContrast
                  ? 'divide-yellow-400/40 border-yellow-400/40'
                  : 'divide-zinc-200 border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800'
              }`}
            >
              <div className="flex justify-between gap-4 py-2">
                <dt
                  className={
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  Penulis
                </dt>
                <dd className="text-right font-medium">
                  {book.author}{' '}
                  {book.authorYears ? (
                    <span className="font-normal opacity-75">
                      ({book.authorYears})
                    </span>
                  ) : null}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt
                  className={
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  Penerbit & Tahun
                </dt>
                <dd className="text-right">
                  {book.publisher},{' '}
                  <span className="font-mono-tabular">{book.year}</span>
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt
                  className={
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  ISBN & Tebal
                </dt>
                <dd className="font-mono-tabular text-right">
                  {book.isbn} · {book.pages} halaman
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt
                  className={
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  Format Inklusif
                </dt>
                <dd className="text-right">{book.formats.join(' · ')}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt
                  className={
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }
                >
                  Status Salinan
                </dt>
                <dd className="font-mono-tabular text-right font-semibold">
                  {loan
                    ? 'Sedang Anda Pinjam'
                    : availableCopies > 0
                      ? `${availableCopies} dari ${book.totalCopies} salinan tersedia`
                      : `0 dari ${book.totalCopies} tersedia (Antrean terbuka)`}
                </dd>
              </div>
            </dl>

            {/* Borrow & Read Controls */}
            <div className="mt-5">
              {loan ? (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenReader(book, false)}
                    className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer ${
                      isHighContrast
                        ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                        : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Buka Pembaca Online
                  </button>
                  <button
                    type="button"
                    onClick={() => onReturn(book.id)}
                    className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium cursor-pointer ${
                      isHighContrast
                        ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                        : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Kembalikan Buku
                  </button>
                </div>
              ) : availableCopies > 0 ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold">
                      Pilih durasi peminjaman:
                    </span>
                    {[7, 14, 21].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setDurationDays(days)}
                        aria-pressed={durationDays === days}
                        className={`min-h-[38px] rounded-md border px-3 py-1 text-xs font-semibold font-mono-tabular cursor-pointer ${
                          durationDays === days
                            ? isHighContrast
                              ? 'border-yellow-300 bg-yellow-300 text-black'
                              : 'border-[#1E3A8A] bg-[#1E3A8A] text-white dark:border-blue-500 dark:bg-blue-600'
                            : isHighContrast
                              ? 'border-yellow-400 text-white'
                              : 'border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                        }`}
                      >
                        {days} Hari
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onBorrow(book, durationDays, true)}
                      className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer ${
                        isHighContrast
                          ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                          : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Pinjam & Baca Sekarang
                    </button>
                    <button
                      type="button"
                      onClick={() => onBorrow(book, durationDays, false)}
                      className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium cursor-pointer ${
                        isHighContrast
                          ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
                      }`}
                    >
                      Simpan ke Rak Pinjaman
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleWaitlist(book)}
                    className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer ${
                      isHighContrast
                        ? 'bg-yellow-300 text-black'
                        : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600'
                    }`}
                  >
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {inWaitlist ? 'Keluar dari Antrean' : 'Gabung Antrean Pinjam'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenReader(book, true)}
                    className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium cursor-pointer ${
                      isHighContrast
                        ? 'border-yellow-400 text-yellow-300'
                        : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Baca Pratinjau Bab 1
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Synopsis & Accessibility Note */}
        <div className="mt-7 space-y-5 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-semibold">Sinopsis Koleksi</h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {book.synopsis}
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 ${
              isHighContrast
                ? 'border-yellow-400 bg-black'
                : 'border-zinc-200 bg-[#FAF9F6] dark:border-zinc-800 dark:bg-zinc-900'
            }`}
          >
            <p className="flex items-center gap-2 text-xs font-semibold">
              <Accessibility className="h-4 w-4" aria-hidden="true" />
              Catatan Aksesibilitas Edisi Ini
            </p>
            <p
              className={`mt-1.5 text-xs leading-relaxed ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {book.accessibilityNote}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Daftar Bab ({book.chapters.length} Bagian)
            </h3>
            <ol className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {book.chapters.map((ch) => (
                <li
                  key={ch.id}
                  className="flex items-center justify-between gap-4 py-2.5 text-sm"
                >
                  <span>
                    <span className="font-mono-tabular mr-2 opacity-60">
                      0{ch.number}.
                    </span>
                    {ch.title}
                  </span>
                  <span
                    className={`font-mono-tabular text-xs shrink-0 ${
                      isHighContrast
                        ? 'text-yellow-300'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    ~{ch.estimatedMinutes} mnt
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
