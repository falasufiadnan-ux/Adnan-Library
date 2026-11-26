import React, { useEffect } from 'react';
import { X, RotateCcw, Eye, Type, Sparkles, Sun, Moon, Contrast } from 'lucide-react';
import {
  GlobalA11ySettings,
  GlobalTextScale,
  GlobalThemeMode,
} from '../types/library';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GlobalA11ySettings;
  onUpdate: (next: GlobalA11ySettings) => void;
  onReset: () => void;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdate,
  onReset,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isHighContrast = settings.theme === 'high-contrast';

  const setTheme = (theme: GlobalThemeMode) => {
    onUpdate({ ...settings, theme });
  };

  const setTextScale = (textScale: GlobalTextScale) => {
    onUpdate({ ...settings, textScale });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`flex h-full w-full max-w-md flex-col overflow-y-auto border-l p-6 shadow-xl ${
          isHighContrast
            ? 'border-yellow-400 bg-black text-white'
            : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <div>
            <h2
              id="a11y-drawer-title"
              className="font-display text-2xl font-semibold"
            >
              Pengaturan Aksesibilitas
            </h2>
            <p
              className={`mt-1 text-sm ${
                isHighContrast
                  ? 'text-zinc-300'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Sesuaikan tampilan seluruh perpustakaan agar nyaman bagi mata dan
              perangkat bantu Anda.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panel aksesibilitas"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border cursor-pointer ${
              isHighContrast
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-7">
          {/* 1. Theme Mode */}
          <fieldset>
            <legend className="flex items-center gap-2 text-sm font-semibold">
              <Eye className="h-4 w-4" aria-hidden="true" />
              Tema & Kontras Warna
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={settings.theme === 'light'}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  settings.theme === 'light'
                    ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                    : isHighContrast
                      ? 'border-yellow-400 bg-black text-white hover:bg-zinc-900'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                }`}
              >
                <Sun className="h-4 w-4" aria-hidden="true" />
                Terang
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={settings.theme === 'dark'}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : isHighContrast
                      ? 'border-yellow-400 bg-black text-white hover:bg-zinc-900'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                }`}
              >
                <Moon className="h-4 w-4" aria-hidden="true" />
                Gelap
              </button>

              <button
                type="button"
                onClick={() => setTheme('high-contrast')}
                aria-pressed={settings.theme === 'high-contrast'}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  settings.theme === 'high-contrast'
                    ? 'border-yellow-300 bg-yellow-300 text-black'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                }`}
              >
                <Contrast className="h-4 w-4" aria-hidden="true" />
                Kontras AAA
              </button>
            </div>
          </fieldset>

          {/* 2. Global Text Size */}
          <fieldset>
            <legend className="flex items-center gap-2 text-sm font-semibold">
              <Type className="h-4 w-4" aria-hidden="true" />
              Ukuran Teks Antarmuka
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'normal', label: 'Normal (100%)' },
                  { id: 'lg', label: 'Besar (112%)' },
                  { id: 'xl', label: 'Ekstra (125%)' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTextScale(opt.id)}
                  aria-pressed={settings.textScale === opt.id}
                  className={`min-h-[44px] rounded-lg border px-2 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    settings.textScale === opt.id
                      ? isHighContrast
                        ? 'border-yellow-300 bg-yellow-300 text-black'
                        : 'border-[#1E3A8A] bg-[#1E3A8A] text-white dark:border-blue-500 dark:bg-blue-600'
                      : isHighContrast
                        ? 'border-yellow-400 bg-black text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 3. Dyslexia & Reduced Motion toggles */}
          <div className="space-y-3">
            <div
              className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
                isHighContrast
                  ? 'border-yellow-400 bg-black'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
              <div>
                <p className="text-sm font-semibold">
                  Tipografi Ramah Disleksia
                </p>
                <p
                  className={`mt-0.5 text-xs ${
                    isHighContrast
                      ? 'text-zinc-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  Mengaktifkan huruf hiper-legibel dengan spasi antarhuruf dan
                  antarbaris lebih lega.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.dyslexiaMode}
                aria-label="Aktifkan tipografi ramah disleksia"
                onClick={() =>
                  onUpdate({
                    ...settings,
                    dyslexiaMode: !settings.dyslexiaMode,
                  })
                }
                className={`min-h-[40px] min-w-[68px] shrink-0 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer ${
                  settings.dyslexiaMode
                    ? isHighContrast
                      ? 'bg-yellow-300 text-black'
                      : 'bg-[#1E3A8A] text-white dark:bg-blue-600'
                    : isHighContrast
                      ? 'border border-yellow-400 bg-black text-yellow-300'
                      : 'border border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                }`}
              >
                {settings.dyslexiaMode ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>

            <div
              className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
                isHighContrast
                  ? 'border-yellow-400 bg-black'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
              <div>
                <p className="text-sm font-semibold">Kurangi Animasi Gerak</p>
                <p
                  className={`mt-0.5 text-xs ${
                    isHighContrast
                      ? 'text-zinc-300'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  Menghilangkan efek transisi dan gulir halus bagi pembaca yang
                  sensitif terhadap gerakan.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label="Aktifkan pengurangan animasi gerak"
                onClick={() =>
                  onUpdate({
                    ...settings,
                    reducedMotion: !settings.reducedMotion,
                  })
                }
                className={`min-h-[40px] min-w-[68px] shrink-0 rounded-lg px-3 text-xs font-semibold transition-colors cursor-pointer ${
                  settings.reducedMotion
                    ? isHighContrast
                      ? 'bg-yellow-300 text-black'
                      : 'bg-[#1E3A8A] text-white dark:bg-blue-600'
                    : isHighContrast
                      ? 'border border-yellow-400 bg-black text-yellow-300'
                      : 'border border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                }`}
              >
                {settings.reducedMotion ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 text-xs leading-relaxed ${
              isHighContrast
                ? 'border-yellow-400 text-zinc-200'
                : 'border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400'
            }`}
          >
            <p className="font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Pintasan Papan Ketik
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                Tekan <kbd className="font-mono-tabular font-semibold">/</kbd>{' '}
                untuk langsung mengetik di kolom pencarian katalog.
              </li>
              <li>
                Tekan{' '}
                <kbd className="font-mono-tabular font-semibold">Esc</kbd> untuk
                menutup jendela pembaca atau dialog.
              </li>
              <li>
                Di dalam Pembaca Daring, gunakan{' '}
                <kbd className="font-mono-tabular font-semibold">←</kbd> dan{' '}
                <kbd className="font-mono-tabular font-semibold">→</kbd> untuk
                berpindah bab.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={onReset}
            className={`min-h-[44px] inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium cursor-pointer ${
              isHighContrast
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Atur Ulang
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`min-h-[44px] rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer ${
              isHighContrast
                ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                : 'bg-[#1E3A8A] text-white hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500'
            }`}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
