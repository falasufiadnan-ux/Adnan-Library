import React from 'react';
import { Volume2, Eye, Keyboard, BookOpenCheck } from 'lucide-react';

interface InclusiveCommitmentSectionProps {
  onOpenAccessibility: () => void;
  isHighContrast: boolean;
}

export const InclusiveCommitmentSection: React.FC<
  InclusiveCommitmentSectionProps
> = ({ onOpenAccessibility, isHighContrast }) => {
  const pillars = [
    {
      icon: Volume2,
      title: '01. Pembaca Suara Bahasa Indonesia',
      description:
        'Setiap paragraf di seluruh buku dapat didengarkan langsung melalui sintesis wicara dengan pengaturan kecepatan baca dan penyorotan teks otomatis.',
    },
    {
      icon: Eye,
      title: '02. Kontras Tinggi WCAG AAA & Sepia',
      description:
        'Empat mode latar baca—Kertas, Sepia, Malam, dan Kontras Tinggi—melindungi mata dari silau dan menjaga rasio keterbacaan bagi pembaca low-vision.',
    },
    {
      icon: BookOpenCheck,
      title: '03. Tipografi Ramah Disleksia',
      description:
        'Pilihan huruf hiper-legibel yang membedakan karakter serupa dengan jelas, disertai kontrol ukuran huruf dan jarak baris yang dapat disesuaikan.',
    },
    {
      icon: Keyboard,
      title: '04. Navigasi Papan Ketik & Pembaca Layar',
      description:
        'Struktur semantik HTML, pintasan papan ketik penuh, target sentuh minimal 44 piksel, dan pengumuman status langsung bagi pengguna screen reader.',
    },
  ];

  return (
    <section
      id="komitmen-inklusi"
      aria-labelledby="inklusi-heading"
      className={`border-b py-12 sm:py-16 ${
        isHighContrast
          ? 'border-yellow-400 bg-black text-white'
          : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="inklusi-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Dirancang untuk Akses Universal
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base ${
                isHighContrast
                  ? 'text-zinc-200'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Membaca adalah hak setiap warga. Pustaka Aksara menghilangkan
              hambatan pendaftaran berbayar dan membekali setiap halaman dengan
              alat bantu adaptif.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAccessibility}
            className={`min-h-[44px] self-start rounded-lg border px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
              isHighContrast
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black'
                : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Buka Panel Aksesibilitas
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`rounded-xl border p-5 ${
                  isHighContrast
                    ? 'border-yellow-400 bg-black'
                    : 'border-zinc-200 bg-[#FAF9F6] dark:border-zinc-800 dark:bg-zinc-900'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isHighContrast
                      ? 'text-yellow-300'
                      : 'text-[#1E3A8A] dark:text-blue-400'
                  }`}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-base font-semibold">{pillar.title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isHighContrast
                      ? 'text-zinc-200'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
