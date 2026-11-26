import React from 'react';

interface FooterProps {
  onOpenAccessibility: () => void;
  onJumpToSection: (id: string) => void;
  isHighContrast: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAccessibility,
  onJumpToSection,
  isHighContrast,
}) => {
  return (
    <footer
      className={`py-10 ${
        isHighContrast
          ? 'bg-black text-white'
          : 'bg-[#FAF9F6] text-zinc-700 dark:bg-zinc-950 dark:text-zinc-400'
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Pustaka Aksara
          </p>
          <p className="mt-1 text-xs">
            Perpustakaan Digital Terbuka & Inklusif · Kepatuhan Aksesibilitas
            WCAG 2.1 AA/AAA
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => onJumpToSection('katalog')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Katalog Buku
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('rak-saya')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Rak Pinjaman
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('komitmen-inklusi')}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Fitur Inklusif
          </button>
          <button
            type="button"
            onClick={onOpenAccessibility}
            className="hover:underline underline-offset-4 cursor-pointer"
          >
            Atur Aksesibilitas
          </button>
        </div>
      </div>
    </footer>
  );
};
