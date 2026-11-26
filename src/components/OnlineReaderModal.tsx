import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pause,
  Square,
  Bookmark,
  Type,
  List,
  Minus,
  Plus,
} from 'lucide-react';
import {
  Book,
  BookmarkNote,
  ReaderFont,
  ReaderSettings,
  ReaderTheme,
} from '../types/library';

interface OnlineReaderModalProps {
  book: Book | null;
  previewOnly: boolean;
  initialChapterIndex: number;
  readerSettings: ReaderSettings;
  onUpdateReaderSettings: (next: ReaderSettings) => void;
  onChapterProgress: (bookId: string, chapterIndex: number, chapterId: string) => void;
  bookmarks: BookmarkNote[];
  onAddBookmark: (book: Book, chapterId: string, chapterTitle: string, note: string) => void;
  onClose: () => void;
}

export const OnlineReaderModal: React.FC<OnlineReaderModalProps> = ({
  book,
  previewOnly,
  initialChapterIndex,
  readerSettings,
  onUpdateReaderSettings,
  onChapterProgress,
  bookmarks,
  onAddBookmark,
  onClose,
}) => {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [showToc, setShowToc] = useState(false);
  const [showTypographyBar, setShowTypographyBar] = useState(false);
  const [showBookmarkBox, setShowBookmarkBox] = useState(false);
  const [bookmarkNote, setBookmarkNote] = useState('');

  // Text-to-Speech State
  const [ttsStatus, setTtsStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [speakingParagraphIdx, setSpeakingParagraphIdx] = useState<number | null>(null);
  const [ttsSupported] = useState<boolean>(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const ttsActiveRef = useRef<boolean>(false);

  useEffect(() => {
    setChapterIndex(initialChapterIndex);
  }, [book?.id, initialChapterIndex]);

  const stopSpeech = () => {
    ttsActiveRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setTtsStatus('idle');
    setSpeakingParagraphIdx(null);
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    if (!book) return;
    const currentChapter = book.chapters[chapterIndex];
    if (currentChapter && !previewOnly) {
      onChapterProgress(book.id, chapterIndex, currentChapter.id);
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.id, chapterIndex]);

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        if (e.key === 'Escape') {
          setShowBookmarkBox(false);
        }
        return;
      }
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      } else if (e.key === 'ArrowRight' && !previewOnly) {
        if (chapterIndex < book.chapters.length - 1) {
          setChapterIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' && !previewOnly) {
        if (chapterIndex > 0) {
          setChapterIndex((prev) => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, chapterIndex, previewOnly, onClose]);

  if (!book) return null;

  const accessibleChapters = previewOnly ? book.chapters.slice(0, 1) : book.chapters;
  const safeIdx = Math.min(chapterIndex, accessibleChapters.length - 1);
  const currentChapter = accessibleChapters[safeIdx];

  const speakParagraphsFrom = (startIdx: number) => {
    if (!ttsSupported || !currentChapter) return;
    window.speechSynthesis.cancel();
    ttsActiveRef.current = true;
    setTtsStatus('playing');

    const speakNext = (idx: number) => {
      if (!ttsActiveRef.current || idx >= currentChapter.paragraphs.length) {
        setTtsStatus('idle');
        setSpeakingParagraphIdx(null);
        ttsActiveRef.current = false;
        return;
      }
      setSpeakingParagraphIdx(idx);
      const utterance = new SpeechSynthesisUtterance(currentChapter.paragraphs[idx]);
      utterance.lang = 'id-ID';
      utterance.rate = readerSettings.speechRate;
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
      if (idVoice) utterance.voice = idVoice;

      utterance.onend = () => {
        if (ttsActiveRef.current) {
          speakNext(idx + 1);
        }
      };
      utterance.onerror = () => {
        setTtsStatus('idle');
        setSpeakingParagraphIdx(null);
        ttsActiveRef.current = false;
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNext(startIdx);
  };

  const handleTogglePlayPause = () => {
    if (!ttsSupported) return;
    if (ttsStatus === 'idle') {
      speakParagraphsFrom(0);
    } else if (ttsStatus === 'playing') {
      window.speechSynthesis.pause();
      setTtsStatus('paused');
    } else if (ttsStatus === 'paused') {
      window.speechSynthesis.resume();
      setTtsStatus('playing');
    }
  };

  const themeClasses: Record<
    ReaderTheme,
    { surface: string; bar: string; muted: string; activeBtn: string; border: string }
  > = {
    paper: {
      surface: 'bg-[#FBF9F5] text-[#1C1917]',
      bar: 'bg-[#F4F1EA] text-[#1C1917]',
      muted: 'text-stone-600',
      activeBtn: 'bg-[#1E3A8A] text-white',
      border: 'border-stone-200',
    },
    sepia: {
      surface: 'bg-[#F3EAD3] text-[#2C2218]',
      bar: 'bg-[#EAE0C5] text-[#2C2218]',
      muted: 'text-[#6B5842]',
      activeBtn: 'bg-[#78350F] text-white',
      border: 'border-[#D9CCA9]',
    },
    night: {
      surface: 'bg-[#161615] text-[#E7E5E4]',
      bar: 'bg-[#1F1F1D] text-[#E7E5E4]',
      muted: 'text-stone-400',
      activeBtn: 'bg-blue-600 text-white',
      border: 'border-stone-800',
    },
    'high-contrast': {
      surface: 'bg-black text-white',
      bar: 'bg-black text-white',
      muted: 'text-yellow-300',
      activeBtn: 'bg-yellow-300 text-black',
      border: 'border-yellow-400',
    },
  };

  const t = themeClasses[readerSettings.theme];

  const fontClassMap: Record<ReaderFont, string> = {
    serif: 'font-serif-body',
    sans: '',
    hyperlegible: 'font-hyperlegible tracking-[0.025em] [word-spacing:0.06em]',
  };

  const progressPercentage = Math.round(
    ((safeIdx + 1) / book.chapters.length) * 100
  );

  const chapterBookmarks = bookmarks.filter(
    (b) => b.bookId === book.id && b.chapterId === currentChapter.id
  );

  const handleSaveBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBookmark(book, currentChapter.id, currentChapter.title, bookmarkNote.trim());
    setBookmarkNote('');
    setShowBookmarkBox(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${t.surface}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-book-title"
    >
      {/* Top Reader Progress Line */}
      <div className="h-1 w-full bg-black/10 dark:bg-white/10" aria-hidden="true">
        <div
          className={`h-full transition-all duration-300 ${
            readerSettings.theme === 'high-contrast'
              ? 'bg-yellow-300'
              : 'bg-[#1E3A8A] dark:bg-blue-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Reader Top Control Bar */}
      <header
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 ${t.bar} ${t.border}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            aria-label="Tutup pembaca buku"
            className={`min-h-[42px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${t.border}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Tutup Pembaca</span>
          </button>

          <div className="min-w-0">
            <h2
              id="reader-book-title"
              className="font-display text-sm font-semibold truncate sm:text-base"
            >
              {book.title}
            </h2>
            <p className={`text-xs truncate ${t.muted}`}>
              Bab {currentChapter.number} dari {book.chapters.length}
              {previewOnly ? ' · Mode Pratinjau' : ''}
            </p>
          </div>
        </div>

        {/* Accessibility & Audio Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Text-to-Speech Controls */}
          {ttsSupported && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleTogglePlayPause}
                aria-label={
                  ttsStatus === 'playing'
                    ? 'Jeda pembaca suara'
                    : 'Bacakan halaman ini dengan suara'
                }
                className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  ttsStatus !== 'idle' ? t.activeBtn : `border ${t.border}`
                }`}
              >
                {ttsStatus === 'playing' ? (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Jeda Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {ttsStatus === 'paused' ? 'Lanjut Suara' : 'Bacakan Suara'}
                    </span>
                  </>
                )}
              </button>

              {ttsStatus !== 'idle' && (
                <button
                  type="button"
                  onClick={stopSpeech}
                  aria-label="Hentikan pembaca suara"
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border cursor-pointer ${t.border}`}
                >
                  <Square className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Typography & Contrast Settings Toggle */}
          <button
            type="button"
            aria-expanded={showTypographyBar}
            onClick={() => {
              setShowTypographyBar((v) => !v);
              setShowBookmarkBox(false);
            }}
            className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
              showTypographyBar ? t.activeBtn : t.border
            }`}
          >
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Tampilan & Huruf</span>
          </button>

          {/* Bookmark Toggle */}
          <button
            type="button"
            aria-expanded={showBookmarkBox}
            onClick={() => {
              setShowBookmarkBox((v) => !v);
              setShowTypographyBar(false);
            }}
            className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
              showBookmarkBox || chapterBookmarks.length > 0
                ? t.activeBtn
                : t.border
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Penanda</span>
          </button>

          {/* Chapter List Toggle */}
          <button
            type="button"
            aria-expanded={showToc}
            onClick={() => setShowToc((v) => !v)}
            className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${
              showToc ? t.activeBtn : t.border
            }`}
          >
            <List className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Daftar Bab</span>
          </button>
        </div>
      </header>

      {/* Expandable Typography & Audio Speed Panel */}
      {showTypographyBar && (
        <div
          className={`border-b px-4 py-4 sm:px-6 ${t.bar} ${t.border}`}
          aria-label="Pengaturan tampilan pembaca"
        >
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
            {/* Reader Theme */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold">Latar:</span>
              {(
                [
                  { id: 'paper', label: 'Kertas' },
                  { id: 'sepia', label: 'Sepia' },
                  { id: 'night', label: 'Malam' },
                  { id: 'high-contrast', label: 'Kontras AAA' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={readerSettings.theme === opt.id}
                  onClick={() =>
                    onUpdateReaderSettings({ ...readerSettings, theme: opt.id })
                  }
                  className={`min-h-[36px] rounded-md border px-2.5 text-xs font-semibold cursor-pointer ${
                    readerSettings.theme === opt.id ? t.activeBtn : t.border
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Reader Font */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold">Huruf:</span>
              {(
                [
                  { id: 'serif', label: 'Serif Buku' },
                  { id: 'sans', label: 'Sans Bersih' },
                  { id: 'hyperlegible', label: 'Ramah Disleksia' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={readerSettings.font === opt.id}
                  onClick={() =>
                    onUpdateReaderSettings({ ...readerSettings, font: opt.id })
                  }
                  className={`min-h-[36px] rounded-md border px-2.5 text-xs font-semibold cursor-pointer ${
                    readerSettings.font === opt.id ? t.activeBtn : t.border
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Font Size & Speech Speed */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold">Ukuran:</span>
                <button
                  type="button"
                  aria-label="Perkecil ukuran huruf"
                  onClick={() =>
                    onUpdateReaderSettings({
                      ...readerSettings,
                      fontSizePx: Math.max(16, readerSettings.fontSizePx - 2),
                    })
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-md border cursor-pointer ${t.border}`}
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="font-mono-tabular w-11 text-center text-xs font-semibold">
                  {readerSettings.fontSizePx}px
                </span>
                <button
                  type="button"
                  aria-label="Perbesar ukuran huruf"
                  onClick={() =>
                    onUpdateReaderSettings({
                      ...readerSettings,
                      fontSizePx: Math.min(28, readerSettings.fontSizePx + 2),
                    })
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-md border cursor-pointer ${t.border}`}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold">Kecepatan Suara:</span>
                {[0.8, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    aria-pressed={readerSettings.speechRate === rate}
                    onClick={() =>
                      onUpdateReaderSettings({
                        ...readerSettings,
                        speechRate: rate,
                      })
                    }
                    className={`min-h-[36px] rounded-md border px-2 font-mono-tabular text-xs font-semibold cursor-pointer ${
                      readerSettings.speechRate === rate ? t.activeBtn : t.border
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Bookmark Box */}
      {showBookmarkBox && (
        <div className={`border-b px-4 py-4 sm:px-6 ${t.bar} ${t.border}`}>
          <form
            onSubmit={handleSaveBookmark}
            className="mx-auto flex max-w-2xl flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="bookmark-note-input" className="sr-only">
              Catatan penanda halaman
            </label>
            <input
              id="bookmark-note-input"
              type="text"
              value={bookmarkNote}
              onChange={(e) => setBookmarkNote(e.target.value)}
              placeholder={`Tambahkan catatan untuk Bab ${currentChapter.number} (opsional)...`}
              className={`min-h-[42px] flex-1 rounded-lg border px-3 py-2 text-sm bg-transparent ${t.border}`}
            />
            <button
              type="submit"
              className={`min-h-[42px] rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer ${t.activeBtn}`}
            >
              Simpan Penanda Bab Ini
            </button>
          </form>
        </div>
      )}

      {/* Main Reader Body + Optional TOC Drawer */}
      <div className="relative flex flex-1 overflow-hidden">
        {showToc && (
          <aside
            aria-label="Daftar bab buku"
            className={`w-72 shrink-0 overflow-y-auto border-r p-5 ${t.bar} ${t.border}`}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest opacity-75">
              Daftar Bab
            </h3>
            <ol className="mt-4 space-y-1.5">
              {book.chapters.map((ch, idx) => {
                const locked = previewOnly && idx > 0;
                const active = idx === safeIdx;
                return (
                  <li key={ch.id}>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => {
                        setChapterIndex(idx);
                        setShowToc(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                        active ? t.activeBtn : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="font-mono-tabular mr-2 text-xs opacity-75">
                        0{ch.number}
                      </span>
                      <span className="font-medium">{ch.title}</span>
                      {locked && (
                        <span className="block text-[11px] opacity-75 mt-0.5">
                          Terkunci di mode pratinjau
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>
        )}

        {/* Scrollable Prose Reading Canvas */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-5 py-10 sm:px-10 sm:py-14"
        >
          <article className="mx-auto max-w-[68ch]">
            <header className={`border-b pb-6 ${t.border}`}>
              <p
                className={`font-mono-tabular text-xs uppercase tracking-widest ${t.muted}`}
              >
                Bab {currentChapter.number} · Estimasi baca{' '}
                {currentChapter.estimatedMinutes} menit
              </p>
              <h1 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                {currentChapter.title}
              </h1>
              <p className={`mt-2 text-sm ${t.muted}`}>
                {book.title} — {book.author}
              </p>
            </header>

            <div
              className={`mt-8 space-y-6 ${fontClassMap[readerSettings.font]}`}
              style={{
                fontSize: `${readerSettings.fontSizePx}px`,
                lineHeight: readerSettings.lineHeight,
              }}
            >
              {currentChapter.paragraphs.map((paragraph, pIdx) => {
                const isSpeaking = speakingParagraphIdx === pIdx;
                const isFirstDropCap =
                  pIdx === 0 && readerSettings.font === 'serif';

                return (
                  <p
                    key={pIdx}
                    onClick={() => {
                      if (ttsSupported && ttsStatus !== 'idle') {
                        speakParagraphsFrom(pIdx);
                      }
                    }}
                    className={`rounded-lg transition-colors ${
                      isFirstDropCap
                        ? 'first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-semibold first-letter:leading-none'
                        : ''
                    } ${
                      isSpeaking
                        ? readerSettings.theme === 'high-contrast'
                          ? 'bg-yellow-300 text-black p-3'
                          : readerSettings.theme === 'night'
                            ? 'bg-blue-950/60 ring-1 ring-blue-500/50 p-3'
                            : 'bg-blue-50/90 ring-1 ring-[#1E3A8A]/25 p-3'
                        : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {previewOnly && (
              <div
                className={`mt-10 rounded-xl border p-5 text-sm ${t.bar} ${t.border}`}
              >
                <p className="font-semibold">
                  Akhir Pratinjau Bab 1
                </p>
                <p className={`mt-1 ${t.muted}`}>
                  Semua salinan buku ini sedang dipinjam oleh pembaca lain. Anda
                  dapat bergabung dalam daftar antrean di detail buku untuk
                  meminjam bab selanjutnya begitu salinan tersedia.
                </p>
              </div>
            )}

            {/* Chapter Footer Navigation */}
            <nav
              aria-label="Navigasi antar bab"
              className={`mt-12 flex items-center justify-between gap-4 border-t pt-6 ${t.border}`}
            >
              <button
                type="button"
                disabled={safeIdx === 0}
                onClick={() => setChapterIndex((prev) => Math.max(0, prev - 1))}
                className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${t.border}`}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Bab Sebelumnya
              </button>

              <span className={`font-mono-tabular text-xs ${t.muted}`}>
                {safeIdx + 1} / {accessibleChapters.length}
              </span>

              <button
                type="button"
                disabled={safeIdx >= accessibleChapters.length - 1}
                onClick={() =>
                  setChapterIndex((prev) =>
                    Math.min(accessibleChapters.length - 1, prev + 1)
                  )
                }
                className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${t.activeBtn}`}
              >
                Bab Berikutnya
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          </article>
        </div>
      </div>
    </div>
  );
};
