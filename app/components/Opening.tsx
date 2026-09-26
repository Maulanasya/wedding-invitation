"use client";

import { useEffect, useState } from "react";
import Floral from "./Floral";

interface OpeningProps {
  onOpen: () => void;
}

export default function Opening({ onOpen }: OpeningProps) {
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#292722] text-[#f7f4ee] transition-opacity duration-900 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Latar Belakang Halus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_55%)]" />

      {/* Garis Dekoratif */}
      <div className="absolute left-6 top-6 h-20 w-20 border-l border-t border-white/15 sm:left-10 sm:top-10" />
      <div className="absolute bottom-6 right-6 h-20 w-20 border-b border-r border-white/15 sm:bottom-10 sm:right-10" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
        {/* Label Kecil */}
        <p
          className={`mb-8 text-[8px] uppercase tracking-[0.55em] text-white/45 transition-all duration-1000 ${
            closing
              ? "-translate-y-3 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Pernikahan dari
        </p>

        {/* Nama */}
        <div
          className={`transition-all delay-100 duration-1000 ${
            closing
              ? "translate-y-5 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100"
          }`}
        >
          <h1 className="font-serif text-[clamp(4.5rem,17vw,8rem)] leading-[0.72] tracking-[-0.07em]">
            Olivia
          </h1>

          <div className="my-7 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-white/25 sm:w-12" />

            <span className="font-serif text-2xl italic text-white/65">
              &
            </span>

            <span className="h-px w-8 bg-white/25 sm:w-12" />
          </div>

          <h1 className="font-serif text-[clamp(4.5rem,17vw,8rem)] leading-[0.72] tracking-[-0.07em]">
            Ralph
          </h1>
        </div>

        {/* Floral */}
        <div
          className={`my-10 transition-all delay-300 duration-1000 ${
            closing ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Floral className="h-10 w-10 text-white/45" />
        </div>

        {/* Tanggal */}
        <p
          className={`mb-10 text-[8px] uppercase tracking-[0.45em] text-white/50 transition-all delay-300 duration-1000 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          18 — 05 — 2027
        </p>

        {/* Tombol Buka Undangan */}
        <button
          type="button"
          onClick={handleOpen}
          className={`group relative inline-flex items-center gap-7 border border-white/30 px-9 py-4 text-[8px] font-medium uppercase tracking-[0.35em] text-white transition-all delay-500 duration-700 hover:border-white/70 hover:bg-white hover:text-[#292722] ${
            closing
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <span>Buka Undangan</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        <p
          className={`mt-6 text-[7px] uppercase tracking-[0.25em] text-white/25 transition-opacity delay-700 duration-1000 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          Dengan cinta, Olivia & Ralph
        </p>
      </div>
    </div>
  );
}