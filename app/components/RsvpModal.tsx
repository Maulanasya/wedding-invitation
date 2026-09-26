"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown ketika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mengirim RSVP (id bertipe int8 dihandle otomatis oleh database jika menggunakan auto-increment)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("rsvp").insert([
      {
        name,
        status,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Gagal mengirim RSVP: " + error.message);
    } else {
      setSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171613]/75 p-4 backdrop-blur-[4px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] overflow-visible bg-[#f7f4ee] text-[#292722] shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
      >
        {/* Garis Dekorasi Atas */}
        <div className="absolute left-6 right-6 top-6 h-px bg-[#d4cdc1] sm:left-8 sm:right-8" />

        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="group absolute right-5 top-5 z-30 flex h-8 w-8 items-center justify-center text-[#81796d] transition-colors duration-300 hover:text-[#292722]"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>

        {/* Konten */}
        <div className="px-7 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-16">
          {!success ? (
            <>
              {/* Kepala Modal */}
              <div className="mb-10 text-center">
                <p className="mb-5 text-[8px] font-medium uppercase tracking-[0.45em] text-[#81796d]">
                  Olivia & Ralph
                </p>
                <h3 className="font-serif text-[clamp(2.4rem,7vw,3.5rem)] font-normal leading-[0.9] tracking-[-0.045em] text-[#292722]">
                  Bergabunglah
                </h3>
                <p className="mt-4 font-serif text-sm italic text-[#918879]">
                  Kami akan sangat senang kehadiran Anda di sana.
                </p>
              </div>

              {/* Pemisah Dekoratif */}
              <div className="mb-8 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#b8ab98]" />
                <span className="font-serif text-[9px] italic text-[#9b9081]">O & R</span>
                <span className="h-px w-8 bg-[#b8ab98]" />
              </div>

              {/* Formulir */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Nama */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="mb-2 block text-[8px] font-medium uppercase tracking-[0.3em] text-[#756d62]"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full border-0 border-b border-[#cfc7ba] bg-transparent px-0 py-3 font-serif text-[15px] text-[#302d28] outline-none placeholder:text-[#aaa194] focus:border-[#4b463f] focus:ring-0"
                  />
                </div>

                {/* Dropdown Kehadiran Kustom */}
                <div ref={statusRef} className="relative">
                  <label className="mb-2 block text-[8px] font-medium uppercase tracking-[0.3em] text-[#756d62]">
                    Kehadiran
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsStatusOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isStatusOpen}
                    className="flex w-full items-center justify-between border-0 border-b border-[#cfc7ba] bg-transparent px-0 py-3 text-left outline-none transition-colors duration-300 hover:border-[#81796d] focus:border-[#4b463f]"
                  >
                    <span className="font-serif text-[15px] text-[#302d28]">{status}</span>
                    <span
                      className={`text-[11px] text-[#8d8477] transition-transform duration-300 ${
                        isStatusOpen ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  {/* Menu Dropdown */}
                  {isStatusOpen && (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 z-40 mt-2 overflow-hidden border border-[#d1c9bd] bg-[#f7f4ee] shadow-[0_15px_40px_rgba(35,31,26,0.12)]"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={status === "Hadir"}
                        onClick={() => {
                          setStatus("Hadir");
                          setIsStatusOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors duration-200 hover:bg-[#eee9df]"
                      >
                        <span className="font-serif text-[14px] text-[#302d28]">Hadir</span>
                        {status === "Hadir" && <span className="text-[11px] text-[#81796d]">✓</span>}
                      </button>

                      <button
                        type="button"
                        role="option"
                        aria-selected={status === "Tidak Hadir"}
                        onClick={() => {
                          setStatus("Tidak Hadir");
                          setIsStatusOpen(false);
                        }}
                        className="flex w-full items-center justify-between border-t border-[#ded7cc] px-4 py-3.5 text-left transition-colors duration-200 hover:bg-[#eee9df]"
                      >
                        <span className="font-serif text-[14px] text-[#302d28]">Tidak Hadir</span>
                        {status === "Tidak Hadir" && <span className="text-[11px] text-[#81796d]">✓</span>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Ucapan & Doa */}
                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="mb-2 block text-[8px] font-medium uppercase tracking-[0.3em] text-[#756d62]"
                  >
                    Ucapan & Doa
                  </label>
                  <textarea
                    id="rsvp-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan ucapan untuk kedua mempelai"
                    className="w-full resize-none border-0 border-b border-[#cfc7ba] bg-transparent px-0 py-3 font-serif text-[15px] leading-relaxed text-[#302d28] outline-none placeholder:text-[#aaa194] focus:border-[#4b463f] focus:ring-0"
                  />
                </div>

                {/* Tombol Kirim */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-3 flex w-full items-center justify-center gap-7 border border-[#37332d] bg-[#292722] px-6 py-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#f7f4ee] transition-all duration-500 hover:bg-[#3a3731] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{loading ? "Mengirim..." : "Kirim Konfirmasi"}</span>
                  {!loading && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </form>

              {/* Tanggal di Bagian Bawah */}
              <div className="mt-8 text-center">
                <p className="text-[8px] uppercase tracking-[0.25em] text-[#a0988c]">18 Mei 2027</p>
              </div>
            </>
          ) : (
            /* Status Sukses */
            <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#b8ab98]">
                <span className="font-serif text-xl text-[#5e574d]">✓</span>
              </div>

              <p className="mb-4 text-[8px] font-medium uppercase tracking-[0.45em] text-[#81796d]">
                Terima Kasih
              </p>

              <h3 className="font-serif text-[clamp(2.3rem,7vw,3.4rem)] leading-[0.9] tracking-[-0.045em] text-[#292722]">
                Sampai jumpa <br />
                <span className="italic text-[#81796d]">di sana.</span>
              </h3>

              <p className="mt-6 max-w-xs text-[10px] leading-[1.9] text-[#756e64]">
                Terima kasih atas konfirmasi dan ucapan baik yang telah diberikan untuk Olivia & Ralph.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="group mt-10 inline-flex items-center gap-6 border border-[#3a3732] px-8 py-3.5 text-[8px] font-medium uppercase tracking-[0.3em] text-[#302d28] transition-all duration-500 hover:bg-[#292722] hover:text-[#f7f4ee]"
              >
                <span>Tutup</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}