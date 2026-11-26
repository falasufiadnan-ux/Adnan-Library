/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { BOOKS_CATALOG } from './data/books';
import {
  Book,
  BookCategory,
  BookmarkNote,
  GlobalA11ySettings,
  InclusiveFormat,
  LoanRecord,
  ReaderSettings,
} from './types/library';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { MyShelfSection } from './components/MyShelfSection';
import { InclusiveCommitmentSection } from './components/InclusiveCommitmentSection';
import { Footer } from './components/Footer';
import { AccessibilityDrawer } from './components/AccessibilityDrawer';
import { BookDetailModal } from './components/BookDetailModal';
import { OnlineReaderModal } from './components/OnlineReaderModal';
import { CheckCircle2, X } from 'lucide-react';

const STORAGE_KEYS = {
  a11y: 'pustaka_aksara_a11y_v1',
  reader: 'pustaka_aksara_reader_v1',
  loans: 'pustaka_aksara_loans_v1',
  waitlist: 'pustaka_aksara_waitlist_v1',
  bookmarks: 'pustaka_aksara_bookmarks_v1',
};

const DEFAULT_A11Y: GlobalA11ySettings = {
  theme: 'light',
  textScale: 'normal',
  dyslexiaMode: false,
  reducedMotion: false,
};

const DEFAULT_READER_SETTINGS: ReaderSettings = {
  theme: 'paper',
  font: 'serif',
  fontSizePx: 18,
  lineHeight: 1.8,
  speechRate: 1,
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [a11y, setA11y] = useState<GlobalA11ySettings>(() =>
    readStorage(STORAGE_KEYS.a11y, DEFAULT_A11Y)
  );
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() =>
    readStorage(STORAGE_KEYS.reader, DEFAULT_READER_SETTINGS)
  );
  const [loans, setLoans] = useState<Record<string, LoanRecord>>(() =>
    readStorage(STORAGE_KEYS.loans, {})
  );
  const [waitlistIds, setWaitlistIds] = useState<string[]>(() =>
    readStorage(STORAGE_KEYS.waitlist, [])
  );
  const [bookmarks, setBookmarks] = useState<BookmarkNote[]>(() =>
    readStorage(STORAGE_KEYS.bookmarks, [])
  );

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'Semua' | BookCategory
  >('Semua');
  const [selectedFormat, setSelectedFormat] = useState<
    'Semua' | InclusiveFormat
  >('Semua');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modals & Drawers
  const [a11yDrawerOpen, setA11yDrawerOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [readerState, setReaderState] = useState<{
    book: Book;
    previewOnly: boolean;
    chapterIndex: number;
  } | null>(null);

  // Accessible Feedback Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const announce = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.a11y, JSON.stringify(a11y));
    } catch {
      // ignore storage quota errors
    }
  }, [a11y]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.reader, JSON.stringify(readerSettings));
    } catch {
      // ignore
    }
  }, [readerSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.loans, JSON.stringify(loans));
    } catch {
      // ignore
    }
  }, [loans]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.waitlist, JSON.stringify(waitlistIds));
    } catch {
      // ignore
    }
  }, [waitlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  // Apply global accessibility classes onto <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', a11y.theme === 'dark');
    root.classList.toggle(
      'a11y-high-contrast',
      a11y.theme === 'high-contrast'
    );
    root.classList.toggle('a11y-text-lg', a11y.textScale === 'lg');
    root.classList.toggle('a11y-text-xl', a11y.textScale === 'xl');
    root.classList.toggle('a11y-dyslexia', a11y.dyslexiaMode);
    root.classList.toggle('a11y-reduced-motion', a11y.reducedMotion);
  }, [a11y]);

  // Global keyboard shortcut: '/' focuses catalog search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || readerState || detailBook || a11yDrawerOpen) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }
      e.preventDefault();
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({
        behavior: a11y.reducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [readerState, detailBook, a11yDrawerOpen, a11y.reducedMotion]);

  const isHighContrast = a11y.theme === 'high-contrast';

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: a11y.reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    jumpToSection('katalog');
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 250);
  };

  const handleBorrowBook = (
    book: Book,
    durationDays = 14,
    openAfter = true
  ) => {
    if (!loans[book.id]) {
      const now = new Date();
      const due = new Date(
        now.getTime() + durationDays * 24 * 60 * 60 * 1000
      );
      const newLoan: LoanRecord = {
        bookId: book.id,
        borrowedAt: now.toISOString(),
        dueAt: due.toISOString(),
        durationDays,
        currentChapterIndex: 0,
        readChapterIds: book.chapters[0] ? [book.chapters[0].id] : [],
        renewedCount: 0,
      };
      setLoans((prev) => ({ ...prev, [book.id]: newLoan }));
      announce(
        `Berhasil meminjam "${book.title}" selama ${durationDays} hari.`
      );
    }

    if (openAfter) {
      setDetailBook(null);
      setReaderState({
        book,
        previewOnly: false,
        chapterIndex: loans[book.id]?.currentChapterIndex ?? 0,
      });
    }
  };

  const handleRenewLoan = (bookId: string) => {
    const existing = loans[bookId];
    if (!existing || existing.renewedCount >= 2) return;
    const nextDue = new Date(
      new Date(existing.dueAt).getTime() + 7 * 24 * 60 * 60 * 1000
    );
    setLoans((prev) => ({
      ...prev,
      [bookId]: {
        ...existing,
        dueAt: nextDue.toISOString(),
        durationDays: existing.durationDays + 7,
        renewedCount: existing.renewedCount + 1,
      },
    }));
    const book = BOOKS_CATALOG.find((b) => b.id === bookId);
    announce(`Masa pinjam "${book?.title ?? 'buku'}" diperpanjang 7 hari.`);
  };

  const handleReturnBook = (bookId: string) => {
    const book = BOOKS_CATALOG.find((b) => b.id === bookId);
    setLoans((prev) => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });
    if (readerState?.book.id === bookId && !readerState.previewOnly) {
      setReaderState(null);
    }
    announce(`"${book?.title ?? 'Buku'}" telah dikembalikan ke koleksi.`);
  };

  const handleToggleWaitlist = (book: Book) => {
    const exists = waitlistIds.includes(book.id);
    if (exists) {
      setWaitlistIds((prev) => prev.filter((id) => id !== book.id));
      announce(`Anda keluar dari antrean "${book.title}".`);
    } else {
      setWaitlistIds((prev) => [...prev, book.id]);
      announce(`Anda masuk daftar antrean untuk "${book.title}".`);
    }
  };

  const handleOpenReader = (
    book: Book,
    previewOnly = false,
    chapterId?: string
  ) => {
    setDetailBook(null);
    const loan = loans[book.id];
    let idx = loan?.currentChapterIndex ?? 0;
    if (chapterId) {
      const found = book.chapters.findIndex((c) => c.id === chapterId);
      if (found >= 0) idx = found;
    }
    setReaderState({
      book,
      previewOnly,
      chapterIndex: previewOnly ? 0 : idx,
    });
  };

  const handleChapterProgress = (
    bookId: string,
    chapterIndex: number,
    chapterId: string
  ) => {
    setLoans((prev) => {
      const existing = prev[bookId];
      if (!existing) return prev;
      const seen = existing.readChapterIds.includes(chapterId)
        ? existing.readChapterIds
        : [...existing.readChapterIds, chapterId];
      if (
        existing.currentChapterIndex === chapterIndex &&
        seen.length === existing.readChapterIds.length
      ) {
        return prev;
      }
      return {
        ...prev,
        [bookId]: {
          ...existing,
          currentChapterIndex: chapterIndex,
          readChapterIds: seen,
        },
      };
    });
  };

  const handleAddBookmark = (
    book: Book,
    chapterId: string,
    chapterTitle: string,
    note: string
  ) => {
    const item: BookmarkNote = {
      id: `${book.id}-${chapterId}-${Date.now()}`,
      bookId: book.id,
      chapterId,
      chapterTitle,
      note,
      createdAt: new Date().toISOString(),
    };
    setBookmarks((prev) => [item, ...prev]);
    announce(`Penanda disimpan pada ${book.title} (${chapterTitle}).`);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    announce('Penanda halaman dihapus.');
  };

  const handleUpdateA11y = (next: GlobalA11ySettings) => {
    setA11y(next);
    // Sync reader theme cleanly if user switches global high-contrast or dark mode
    if (next.theme === 'high-contrast') {
      setReaderSettings((prev) => ({ ...prev, theme: 'high-contrast' }));
    } else if (next.theme === 'dark' && readerSettings.theme === 'paper') {
      setReaderSettings((prev) => ({ ...prev, theme: 'night' }));
    } else if (next.theme === 'light' && readerSettings.theme === 'high-contrast') {
      setReaderSettings((prev) => ({ ...prev, theme: 'paper' }));
    }
    if (next.dyslexiaMode) {
      setReaderSettings((prev) => ({ ...prev, font: 'hyperlegible' }));
    }
  };

  const availableBooksCount = BOOKS_CATALOG.filter((b) => {
    const used = b.initialBorrowedCopies + (loans[b.id] ? 1 : 0);
    return b.totalCopies - used > 0;
  }).length;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isHighContrast
          ? 'bg-black text-white'
          : 'bg-[#FAF9F6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'
      }`}
    >
      <Header
        activeLoansCount={Object.keys(loans).length}
        onOpenAccessibility={() => setA11yDrawerOpen(true)}
        onJumpToSection={jumpToSection}
        isHighContrast={isHighContrast}
      />

      <main id="konten-utama" className="flex-1">
        <HeroSection
          totalBooks={BOOKS_CATALOG.length}
          availableBooksCount={availableBooksCount}
          onQuickSearch={handleQuickSearch}
          onOpenAccessibility={() => setA11yDrawerOpen(true)}
          onExploreCatalog={() => jumpToSection('katalog')}
          isHighContrast={isHighContrast}
        />

        <CatalogSection
          books={BOOKS_CATALOG}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
          onlyAvailable={onlyAvailable}
          onToggleOnlyAvailable={setOnlyAvailable}
          loans={loans}
          waitlistIds={waitlistIds}
          onBorrowAndRead={(book) => handleBorrowBook(book, 14, true)}
          onOpenReader={handleOpenReader}
          onSelectBookDetail={setDetailBook}
          onToggleWaitlist={handleToggleWaitlist}
          searchInputRef={searchInputRef}
          isHighContrast={isHighContrast}
        />

        <MyShelfSection
          books={BOOKS_CATALOG}
          loans={loans}
          waitlistIds={waitlistIds}
          bookmarks={bookmarks}
          onOpenReader={handleOpenReader}
          onRenewLoan={handleRenewLoan}
          onReturnBook={handleReturnBook}
          onRemoveBookmark={handleRemoveBookmark}
          onToggleWaitlist={handleToggleWaitlist}
          onJumpToCatalog={() => jumpToSection('katalog')}
          isHighContrast={isHighContrast}
        />

        <InclusiveCommitmentSection
          onOpenAccessibility={() => setA11yDrawerOpen(true)}
          isHighContrast={isHighContrast}
        />
      </main>

      <Footer
        onOpenAccessibility={() => setA11yDrawerOpen(true)}
        onJumpToSection={jumpToSection}
        isHighContrast={isHighContrast}
      />

      <AccessibilityDrawer
        isOpen={a11yDrawerOpen}
        onClose={() => setA11yDrawerOpen(false)}
        settings={a11y}
        onUpdate={handleUpdateA11y}
        onReset={() => {
          setA11y(DEFAULT_A11Y);
          setReaderSettings(DEFAULT_READER_SETTINGS);
          announce('Pengaturan aksesibilitas dikembalikan ke standar awal.');
        }}
      />

      <BookDetailModal
        book={detailBook}
        loan={detailBook ? loans[detailBook.id] : undefined}
        inWaitlist={detailBook ? waitlistIds.includes(detailBook.id) : false}
        onClose={() => setDetailBook(null)}
        onBorrow={handleBorrowBook}
        onReturn={handleReturnBook}
        onToggleWaitlist={handleToggleWaitlist}
        onOpenReader={handleOpenReader}
        isHighContrast={isHighContrast}
      />

      <OnlineReaderModal
        book={readerState?.book ?? null}
        previewOnly={readerState?.previewOnly ?? false}
        initialChapterIndex={readerState?.chapterIndex ?? 0}
        readerSettings={readerSettings}
        onUpdateReaderSettings={setReaderSettings}
        onChapterProgress={handleChapterProgress}
        bookmarks={bookmarks}
        onAddBookmark={handleAddBookmark}
        onClose={() => setReaderState(null)}
      />

      {/* Live Accessible Status Notification */}
      <div aria-live="polite" className="fixed right-4 bottom-4 z-50 max-w-sm">
        {toastMessage && (
          <div
            role="status"
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
              isHighContrast
                ? 'border-yellow-300 bg-black text-yellow-300'
                : 'border-zinc-200 bg-zinc-900 text-white dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950'
            }`}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Tutup notifikasi"
              className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md opacity-80 hover:opacity-100 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
