export type BookCategory =
  | 'Sastra & Fiksi'
  | 'Sains & Astronomi'
  | 'Sejarah & Budaya'
  | 'Teknologi Inklusif'
  | 'Pendidikan & Literasi';

export type InclusiveFormat =
  | 'Teks Digital'
  | 'Pembaca Suara'
  | 'Ramah Disleksia'
  | 'Huruf Besar';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  estimatedMinutes: number;
  paragraphs: string[];
}

export interface Book {
  id: string;
  accessionNumber: string;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  authorYears?: string;
  publisher: string;
  year: number;
  language: string;
  pages: number;
  category: BookCategory;
  formats: InclusiveFormat[];
  totalCopies: number;
  initialBorrowedCopies: number;
  coverImage?: string;
  coverPalette: {
    bg: string;
    fg: string;
    accent: string;
  };
  synopsis: string;
  accessibilityNote: string;
  chapters: Chapter[];
}

export interface LoanRecord {
  bookId: string;
  borrowedAt: string; // ISO date
  dueAt: string; // ISO date
  durationDays: number;
  currentChapterIndex: number;
  readChapterIds: string[];
  renewedCount: number;
}

export interface BookmarkNote {
  id: string;
  bookId: string;
  chapterId: string;
  chapterTitle: string;
  note: string;
  createdAt: string;
}

export type GlobalThemeMode = 'light' | 'dark' | 'high-contrast';
export type GlobalTextScale = 'normal' | 'lg' | 'xl';

export interface GlobalA11ySettings {
  theme: GlobalThemeMode;
  textScale: GlobalTextScale;
  dyslexiaMode: boolean;
  reducedMotion: boolean;
}

export type ReaderTheme = 'paper' | 'sepia' | 'night' | 'high-contrast';
export type ReaderFont = 'serif' | 'sans' | 'hyperlegible';

export interface ReaderSettings {
  theme: ReaderTheme;
  font: ReaderFont;
  fontSizePx: number;
  lineHeight: number;
  speechRate: number;
}
