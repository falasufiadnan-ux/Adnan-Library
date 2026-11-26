import React from 'react';
import {
  BookOpen,
  RotateCcw,
  CalendarPlus,
  Bookmark,
  Trash2,
  Clock,
} from 'lucide-react';
import { Book, BookmarkNote, LoanRecord } from '../types/library';
import { BookCover } from './BookCover';

interface MyShelfSectionProps {
  books: Book[];
  loans: Record<string, LoanRecord>;
  waitlistIds: string[];
  bookmarks: BookmarkNote[];
  onOpenReader: (book: Book, previewOnly?: boolean, chapterId?: string) => void;
  onRenewLoan: (bookId: string) => void;
  onReturnBook: (bookId: string) => void;
  onRemoveBookmark: (id: string) => void;
  onToggleWaitlist: (book: Book) => void;
  onJumpToCatalog: () => void;
  isHighContrast: boolean;
}

export const MyShelfSection: React.FC<MyShelfSectionProps> = ({
  books,
  loans,
  waitlistIds,
  bookmarks,
  onOpenReader,
  onRenewLoan,
  onReturnBook,
  onRemoveBookmark,
  onToggleWaitlist,
  onJumpToCatalog,
  isHighContrast,
}) => {
  const loanList = Object.values(loans);
  const waitlistBooks = books.filter((b) => waitlistIds.includes(b.id));

  const getDaysRemaining = (dueIso: string) => {
    const diffMs = new Date(dueIso).getTime() - Date.now();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  return (
    <section
      id="rak-saya"
      aria-labelledby="rak-saya-heading"
      className={`border-b py-12 sm:py-16 ${
        isHighContrast
          ? 'border-yellow-400 bg-black text-white'
          : 'border-zinc-200 bg-[#FAF9F6] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="rak-saya-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Rak Pinjaman & Catatan Saya
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Semua buku yang sedang Anda pinjam, progres membaca, penanda
              halaman, dan daftar antrean tersimpan otomatis di peramban Anda.
            </p>
          </div>
          <p
            className={`font-mono-tabular text-xs sm:text-sm ${
              isHighContrast
                ? 'text-yellow-300'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            {loanList.length} Pinjaman Aktif · {bookmarks.length} Penanda
          </p>
        </div>

        {/* Active Loans */}
        {loanList.length === 0 ? (
          <div
            className={`mt-8 rounded-xl border p-8 sm:p-10 ${
              isHighContrast
                ? 'border-yellow-400 bg-black'
                : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'
            }`}
          >
            <h3 className="font-display text-xl font-semibold">
              Rak pinjaman Anda masih kosong
            </h3>
            <p
              className={`mt-2 max-w-xl text-sm ${
                isHighContrast
                  ? 'text-zinc-300'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Pilih buku apa saja di katalog untuk meminjam secara instan dan
              mulai membaca daring dengan pembaca suara atau mode kontras
              sesuai kebutuhan Anda.
            </p>
            <button
              type="button"
              onClick={onJumpToCatalog}
              className={`mt-5 min-h-[44px] rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-300 text-black'
                  : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600'
              }`}
            >
              Pilih Buku di Katalog
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {loanList.map((loan) => {
              const book = books.find((b) => b.id === loan.bookId);
              if (!book) return null;

              const daysLeft = getDaysRemaining(loan.dueAt);
              const totalChapters = book.chapters.length;
              const readCount = Math.max(
                1,
                loan.readChapterIds.length || loan.currentChapterIndex + 1
              );
              const progressPct = Math.min(
                100,
                Math.round((readCount / totalChapters) * 100)
              );

              return (
                <article
                  key={book.id}
                  className={`flex flex-col gap-4 rounded-xl border p-5 sm:flex-row ${
                    isHighContrast
                      ? 'border-yellow-400 bg-black'
                      : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'
                  }`}
                >
                  <BookCover
                    book={book}
                    className="aspect-[3/4] w-28 shrink-0 rounded-lg border border-zinc-200 dark:border-zinc-800 sm:w-32"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p
                        className={`font-mono-tabular text-xs ${
                          isHighContrast
                            ? 'text-yellow-300'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        Sisa masa pinjam: {daysLeft} hari · Jatuh tempo{' '}
                        {new Date(loan.dueAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>

                      <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug">
                        {book.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isHighContrast
                            ? 'text-zinc-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {book.author}
                      </p>

                      {/* Reading Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs">
                          <span>
                            Progres Baca: Bab {loan.currentChapterIndex + 1}{' '}
                            dari {totalChapters}
                          </span>
                          <span className="font-mono-tabular font-semibold">
                            {progressPct}%
                          </span>
                        </div>
                        <div
                          className={`mt-1.5 h-2 w-full overflow-hidden rounded-full ${
                            isHighContrast
                              ? 'bg-zinc-800'
                              : 'bg-zinc-200 dark:bg-zinc-800'
                          }`}
                          role="progressbar"
                          aria-valuenow={progressPct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progres membaca ${book.title}`}
                        >
                          <div
                            className={`h-full transition-all ${
                              isHighContrast
                                ? 'bg-yellow-300'
                                : 'bg-[#1E3A8A] dark:bg-blue-500'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenReader(book, false)}
                        className={`min-h-[42px] inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
                          isHighContrast
                            ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                            : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        Lanjutkan Membaca
                      </button>

                      <button
                        type="button"
                        onClick={() => onRenewLoan(book.id)}
                        disabled={loan.renewedCount >= 2}
                        className={`min-h-[42px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          isHighContrast
                            ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                            : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <CalendarPlus
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        {loan.renewedCount >= 2
                          ? 'Maks. Perpanjangan'
                          : 'Perpanjang +7 Hari'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onReturnBook(book.id)}
                        className={`min-h-[42px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap cursor-pointer ${
                          isHighContrast
                            ? 'border-yellow-400 text-white hover:bg-zinc-900'
                            : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        Kembalikan
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Saved Bookmarks & Waitlist Sub-Grid */}
        {(bookmarks.length > 0 || waitlistBooks.length > 0) && (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bookmarks */}
            {bookmarks.length > 0 && (
              <div
                className={`rounded-xl border p-5 ${
                  isHighContrast
                    ? 'border-yellow-400 bg-black'
                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'
                }`}
              >
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                  Penanda & Catatan Pembaca
                </h3>
                <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {bookmarks.map((bm) => {
                    const book = books.find((b) => b.id === bm.bookId);
                    if (!book) return null;
                    return (
                      <li
                        key={bm.id}
                        className="flex items-start justify-between gap-3 py-3"
                      >
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenReader(book, !loans[book.id], bm.chapterId)
                            }
                            className="text-left text-sm font-semibold hover:underline underline-offset-4 cursor-pointer"
                          >
                            {book.title} — {bm.chapterTitle}
                          </button>
                          {bm.note && (
                            <p
                              className={`mt-1 text-xs ${
                                isHighContrast
                                  ? 'text-zinc-300'
                                  : 'text-zinc-600 dark:text-zinc-400'
                              }`}
                            >
                              “{bm.note}”
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveBookmark(bm.id)}
                          aria-label={`Hapus penanda ${book.title}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Waitlist */}
            {waitlistBooks.length > 0 && (
              <div
                className={`rounded-xl border p-5 ${
                  isHighContrast
                    ? 'border-yellow-400 bg-black'
                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'
                }`}
              >
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Daftar Antrean Pinjam
                </h3>
                <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {waitlistBooks.map((book) => (
                    <li
                      key={book.id}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{book.title}</p>
                        <p
                          className={`text-xs ${
                            isHighContrast
                              ? 'text-zinc-300'
                              : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          Antrean posisi #1 · Pratinjau Bab 1 tetap dapat
                          dibaca
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onOpenReader(book, true)}
                          className={`min-h-[38px] rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                            isHighContrast
                              ? 'border-yellow-400 text-yellow-300'
                              : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200'
                          }`}
                        >
                          Pratinjau
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleWaitlist(book)}
                          className={`min-h-[38px] rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                            isHighContrast
                              ? 'border-yellow-400 text-white'
                              : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200'
                          }`}
                        >
                          Batalkan
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
