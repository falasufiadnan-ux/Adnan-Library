import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, className = '' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (book.coverImage && !imgFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-stone-100 dark:bg-zinc-800 ${className}`}
      >
        <img
          src={book.coverImage}
          alt={`Sampul buku ${book.title} karya ${book.author}`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    );
  }

  // Archival typographic monograph fallback / custom SVG book cover
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden p-5 select-none ${className}`}
      style={{
        backgroundColor: book.coverPalette.bg,
        color: book.coverPalette.fg,
      }}
      role="img"
      aria-label={`Sampul arsip ${book.title} karya ${book.author}`}
    >
      {/* Subtle archival geometric frame */}
      <div
        className="pointer-events-none absolute inset-3 border opacity-25"
        style={{ borderColor: book.coverPalette.fg }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular tracking-wider opacity-70">
        <span>{book.accessionNumber}</span>
        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
      </div>

      <div className="relative z-10 my-auto py-3">
        <div
          className="mb-3 h-0.5 w-10"
          style={{ backgroundColor: book.coverPalette.accent }}
          aria-hidden="true"
        />
        <p className="font-display text-lg leading-snug font-semibold tracking-tight line-clamp-4">
          {book.title}
        </p>
      </div>

      <div className="relative z-10 border-t pt-2.5 text-xs opacity-80" style={{ borderColor: `${book.coverPalette.fg}22` }}>
        <p className="truncate font-medium">{book.author}</p>
        <p className="text-[11px] opacity-75">{book.year}</p>
      </div>
    </div>
  );
};
