import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeLoansCount: number;
  onOpenAccessibility: () => void;
  onJumpToSection: (sectionId: string) => void;
  isHighContrast: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeLoansCount,
  onOpenAccessibility,
  onJumpToSection,
  isHighContrast,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'aksesibilitas') {
      onOpenAccessibility();
      return;
    }
    onJumpToSection(id);
  };

  return (
    <>
      <a href="#konten-utama" className="skip-link">
        Langsung ke konten utama
      </a>
      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          isHighContrast
            ? 'border-yellow-400 bg-black text-white'
            : 'border-zinc-200 bg-[#FAF9F6]/95 text-zinc-900 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-100'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('beranda');
            }}
            className="font-display text-xl font-semibold tracking-tight whitespace-nowrap shrink-0"
          >
            Pustaka Aksara
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            <a
              href="#katalog"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('katalog');
              }}
              className={`whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline ${
                isHighContrast
                  ? 'text-white hover:text-yellow-300'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              Katalog
            </a>
            <a
              href="#rak-saya"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('rak-saya');
              }}
              className={`whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline ${
                isHighContrast
                  ? 'text-white hover:text-yellow-300'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              Rak Saya
            </a>
            <a
              href="#komitmen-inklusi"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('komitmen-inklusi');
              }}
              className={`whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline ${
                isHighContrast
                  ? 'text-white hover:text-yellow-300'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              Fitur Inklusif
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('aksesibilitas')}
              className={`whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline cursor-pointer ${
                isHighContrast
                  ? 'text-white hover:text-yellow-300'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              Aksesibilitas
            </button>
          </nav>

          {/* Zone 3: 1 primary action + mobile menu button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onJumpToSection('rak-saya')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                  : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
              }`}
            >
              Rak Pinjaman{' '}
              <span className="font-mono-tabular">({activeLoansCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className={`md:hidden flex h-11 w-11 items-center justify-center rounded-lg border cursor-pointer ${
                isHighContrast
                  ? 'border-yellow-400 text-yellow-300'
                  : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Navigasi seluler"
            className={`md:hidden border-t px-4 py-3 ${
              isHighContrast
                ? 'border-yellow-400 bg-black'
                : 'border-zinc-200 bg-[#FAF9F6] dark:border-zinc-800 dark:bg-zinc-950'
            }`}
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleNavClick('katalog')}
                className="min-h-[44px] w-full rounded-md px-3 text-left text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Katalog Buku
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('rak-saya')}
                className="min-h-[44px] w-full rounded-md px-3 text-left text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Rak Pinjaman Saya ({activeLoansCount})
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('komitmen-inklusi')}
                className="min-h-[44px] w-full rounded-md px-3 text-left text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Fitur Inklusif
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('aksesibilitas')}
                className="min-h-[44px] w-full rounded-md px-3 text-left text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Pengaturan Aksesibilitas
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};
