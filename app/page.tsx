"use client";

import { useEffect, useRef, useState } from "react";

import AmbientLight from "./components/AmbientLight";
import Floral from "./components/Floral";
import FloatingPetals from "./components/FloatingPetals";
import LuxuryCursor from "./components/LuxuryCursor";
import MusicPlayer from "./components/MusicPlayer";
import Opening from "./components/Opening";
import Reveal from "./components/Reveal";
import RsvpModal from "./components/RsvpModal";
import TornEdge from "./components/TornEdge";
import Wishes from "./components/Wishes";

const WEDDING_DATE = new Date("2027-05-18T14:00:00+07:00");

const program = [
  {
    time: "14:00",
    title: "Akad Nikah",
    description:
      "Momen sakral ketika dua hati dipertemukan dalam satu janji suci.",
  },
  {
    time: "16:00",
    title: "Resepsi Pernikahan",
    description:
      "Sebuah sore yang hangat untuk merayakan awal perjalanan baru.",
  },
  {
    time: "18:00",
    title: "Makan Malam & Perayaan",
    description:
      "Menikmati hidangan, cerita, dan kebahagiaan bersama orang-orang terkasih.",
  },
];

const story = [
  {
    number: "01",
    year: "Awal Mula",
    title: "Sebuah awal yang tenang.",
    text: "Terkadang kisah paling indah dimulai tanpa kedua insan tahu ke mana arahnya akan membawa mereka.",
  },
  {
    number: "02",
    year: "Tumbuh Bersama",
    title: "Dua kehidupan, satu tujuan.",
    text: "Melalui hari-hari biasa, percakapan kecil, dan kenangan tak terhitung, perlahan kami merajut masa depan bersama.",
  },
  {
    number: "03",
    year: "Selamanya",
    title: "Dan kini, selamanya.",
    text: "Hari ini kami kembali memilih satu sama lain — kali ini, dengan janji untuk melangkah di setiap babak kehidupan berdampingan.",
  },
];

const entourage = {
  bride: [
    "Sophia",
    "Amelia",
    "Charlotte",
    "Isabella",
  ],
  groom: [
    "William",
    "Alexander",
    "Benjamin",
    "Lucas",
  ],
};

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    alt: "Pasangan pengantin",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
    alt: "Detail pernikahan",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    alt: "Perayaan pernikahan",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85",
    alt: "Bunga pernikahan",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
    alt: "Meja pernikahan",
    className: "",
  },
];

function calculateCountdown() {
  const now = Date.now();
  const distance = WEDDING_DATE.getTime() - now;

  if (distance <= 0) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };
  }

  return {
    d: Math.floor(distance / (1000 * 60 * 60 * 24)),
    h: Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    ),
    m: Math.floor(
      (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    ),
    s: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [cd, setCd] = useState(calculateCountdown());
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer hitung mundur
  useEffect(() => {
    setMounted(true);
    const timer = window.setInterval(() => {
      setCd(calculateCountdown());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // Handler buka undangan dan putar audio
  const handleOpenInvitation = async () => {
    const audio = audioRef.current;

    try {
      if (audio) {
        audio.volume = 0.35;
        audio.loop = true;
        await audio.play();
      }
    } catch (error) {
      console.error("Audio gagal diputar:", error);
    }

    setIsOpened(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ee] text-[#292722]">
      {/* Opening Screen */}
      {!isOpened && (
        <Opening onOpen={handleOpenInvitation} />
      )}

      {/* Global Elements */}
      <AmbientLight />
      <FloatingPetals />
      <LuxuryCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-[#292722] text-[#f7f4ee]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-[1.04] animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div className="absolute inset-0 bg-[#171613]/45" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#171613]/70 via-transparent to-[#171613]/90" />
        </div>

        {/* Top Navigation */}
        <div className="relative z-10 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/70">
            O & R
          </p>

          <p className="text-[8px] uppercase tracking-[0.35em] text-white/60">
            18 — 05 — 2027
          </p>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-6 pb-20 text-center sm:px-10">
          <div className="w-full max-w-6xl">
            <Reveal direction="up" duration={1200}>
              <p className="mb-8 text-[9px] uppercase tracking-[0.55em] text-white/65 sm:text-[10px]">
                Bersama dengan keluarga besar
              </p>
            </Reveal>

            <Reveal delay={150} duration={1400}>
              <div className="relative mx-auto max-w-5xl">
                <h1 className="font-serif text-[clamp(5rem,16vw,13rem)] leading-[0.7] tracking-[-0.07em]">
                  Olivia
                </h1>

                <div className="my-7 flex items-center justify-center gap-5 sm:my-10">
                  <span className="h-px w-10 bg-white/35 sm:w-20" />

                  <span className="font-serif text-2xl italic text-white/70 sm:text-3xl">
                    &
                  </span>

                  <span className="h-px w-10 bg-white/35 sm:w-20" />
                </div>

                <h1 className="font-serif text-[clamp(5rem,16vw,13rem)] leading-[0.7] tracking-[-0.07em]">
                  Ralph
                </h1>
              </div>
            </Reveal>

            <Reveal delay={350} duration={1000}>
              <div className="mx-auto mt-14 max-w-xl">
                <p className="font-serif text-lg italic leading-relaxed text-white/75 sm:text-xl">
                  Awal yang indah menuju babak baru hidup kami.
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-white/30" />

                  <Floral className="h-8 w-8 text-white/55" />

                  <div className="h-px w-8 bg-white/30" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[7px] uppercase tracking-[0.4em] text-white/45">
            Gulir untuk melihat
          </span>

          <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative overflow-hidden bg-[#f7f4ee] px-6 py-28 sm:px-10 sm:py-36 lg:px-20 lg:py-44">
        <div className="pointer-events-none absolute -left-24 top-20 opacity-[0.035]">
          <Floral className="h-[420px] w-[420px]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="mb-8 text-[9px] uppercase tracking-[0.5em] text-[#82796d]">
              Perayaan Cinta Kasih
            </p>

            <blockquote className="mx-auto max-w-4xl font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.045em] text-[#302d28]">
              “Dan seketika kamu tahu:
              <br />
              <span className="italic text-[#83786a]">
                di sinilah tempatku berlabuh.”
              </span>
            </blockquote>

            <div className="mx-auto mt-10 h-px w-12 bg-[#b7aa98]" />

            <p className="mx-auto mt-7 max-w-md text-[10px] leading-[2] text-[#756e64] sm:text-[11px]">
              Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari yang dipenuhi cinta, tawa, dan kenangan abadi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Program / Schedule Section */}
      <section className="relative overflow-hidden bg-[#eee9df] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-20">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-[#82796d]">
                  Catat Tanggalnya
                </p>

                <h2 className="font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[0.8] tracking-[-0.06em]">
                  Hari
                  <br />
                  <span className="italic text-[#83786a]">
                    Bahagia.
                  </span>
                </h2>
              </div>

              <div className="max-w-xs text-left sm:text-right">
                <p className="font-serif text-2xl text-[#403b34]">
                  18 Mei 2027
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#938a7d]">
                  Selasa · Jakarta
                </p>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-[#d3cbc0]">
            {program.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 100}
              >
                <div className="grid gap-7 border-b border-[#d3cbc0] py-10 md:grid-cols-[120px_1fr_2fr] md:items-center md:gap-12">
                  <p className="font-serif text-2xl text-[#83786a]">
                    {item.time}
                  </p>

                  <h3 className="font-serif text-3xl tracking-[-0.03em] text-[#302d28] sm:text-4xl">
                    {item.title}
                  </h3>

                  <p className="max-w-md text-[10px] leading-[2] text-[#756e64] sm:text-[11px]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative overflow-hidden bg-[#f7f4ee] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid overflow-hidden md:grid-cols-2">
              <div className="relative min-h-[500px] overflow-hidden bg-[#292722]">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"
                  alt="Lokasi Pernikahan"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[2s] hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#292722]/25" />

                <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-10 sm:left-10">
                  <p className="mb-3 text-[8px] uppercase tracking-[0.4em] text-white/60">
                    Lokasi
                  </p>

                  <p className="font-serif text-4xl italic">
                    The Glass House
                  </p>
                </div>
              </div>

              <div className="flex min-h-[500px] flex-col justify-center bg-[#eee9df] px-8 py-14 sm:px-12 lg:px-16">
                <p className="mb-5 text-[9px] uppercase tracking-[0.4em] text-[#82796d]">
                  Tempat Perayaan
                </p>

                <h2 className="font-serif text-5xl leading-[0.9] tracking-[-0.05em] text-[#302d28] sm:text-6xl">
                  The Glass
                  <br />
                  <span className="italic text-[#83786a]">
                    House.
                  </span>
                </h2>

                <p className="mt-8 max-w-sm text-[10px] leading-[2] text-[#756e64] sm:text-[11px]">
                  Suasana yang hangat dan intim dikelilingi oleh cahaya lembut, detail elegan, serta orang-orang terkasih.
                </p>

                <div className="mt-10">
                  <p className="font-serif text-lg text-[#403b34]">
                    Jl. Contoh No. 18
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#938a7d]">
                    Jakarta Selatan
                  </p>
                </div>

                <button className="group mt-10 flex w-fit items-center gap-6 border-b border-[#938a7d] pb-2 text-[8px] uppercase tracking-[0.3em] text-[#403b34] transition-all hover:gap-8">
                  <span>Lihat Lokasi</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="relative overflow-hidden bg-[#f7f4ee] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-44">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-20">
            <div className="flex items-end justify-between gap-10">
              <div>
                <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-[#82796d]">
                  Kisah Kami
                </p>

                <h2 className="font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[0.8] tracking-[-0.06em]">
                  Suatu
                  <br />
                  <span className="italic text-[#83786a]">
                    masa.
                  </span>
                </h2>
              </div>

              <Floral className="hidden h-20 w-20 text-[#9b8e7e] opacity-50 sm:block" />
            </div>
          </Reveal>

          <div className="space-y-px bg-[#d5cec3]">
            {story.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 120}
                direction={
                  index % 2 === 0
                    ? "left"
                    : "right"
                }
              >
                <article className="grid gap-8 bg-[#f7f4ee] px-7 py-12 sm:px-12 md:grid-cols-[100px_1fr_1.4fr] md:items-center md:gap-14 lg:px-16">
                  <p className="font-serif text-sm italic text-[#9b8e7e]">
                    {item.number}
                  </p>

                  <div>
                    <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-[#938a7d]">
                      {item.year}
                    </p>

                    <h3 className="font-serif text-3xl leading-[0.95] tracking-[-0.035em] text-[#302d28] sm:text-4xl">
                      {item.title}
                    </h3>
                  </div>

                  <p className="max-w-md text-[10px] leading-[2] text-[#756e64] sm:text-[11px]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#292722] px-6 py-24 text-[#f7f4ee] sm:px-10 sm:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16">
            <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-white/40">
              Beberapa Kenangan
            </p>

            <div className="flex items-end justify-between gap-8">
              <h2 className="font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[0.8] tracking-[-0.06em]">
                Momen
                <br />
                <span className="italic text-white/50">
                  terindah.
                </span>
              </h2>

              <p className="hidden max-w-[180px] text-right text-[9px] leading-[1.8] text-white/40 sm:block">
                Potongan kisah kecil yang menuntun kami ke sini.
              </p>
            </div>
          </Reveal>

          <div className="grid auto-rows-[260px] grid-cols-2 gap-2 md:auto-rows-[320px] md:grid-cols-4">
            {gallery.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 80}
                className={image.className}
              >
                <div className="group relative h-full w-full overflow-hidden bg-[#403d37]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover opacity-90 transition duration-[1.2s] group-hover:scale-105 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Entourage Section */}
      <section className="bg-[#292722] px-6 pb-28 pt-20 text-[#f7f4ee] sm:px-10 sm:pb-36 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-white/40">
              Bersama Orang Tercinta
            </p>

            <h2 className="font-serif text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.85] tracking-[-0.055em]">
              Pendamping
              <br />
              <span className="italic text-white/50">
                Acara.
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid border-y border-white/10 md:grid-cols-2">
            <Reveal direction="left">
              <div className="border-b border-white/10 px-5 py-12 md:border-b-0 md:border-r md:px-12">
                <p className="mb-8 text-[8px] uppercase tracking-[0.4em] text-white/35">
                  Pendamping Pengantin Wanita
                </p>

                <div className="space-y-5">
                  {entourage.bride.map((name, index) => (
                    <div
                      key={name}
                      className="flex items-center justify-between border-b border-white/10 pb-4"
                    >
                      <p className="font-serif text-xl text-white/80">
                        {name}
                      </p>

                      <span className="font-serif text-xs italic text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="px-5 py-12 md:px-12">
                <p className="mb-8 text-[8px] uppercase tracking-[0.4em] text-white/35">
                  Pendamping Pengantin Pria
                </p>

                <div className="space-y-5">
                  {entourage.groom.map((name, index) => (
                    <div
                      key={name}
                      className="flex items-center justify-between border-b border-white/10 pb-4"
                    >
                      <p className="font-serif text-xl text-white/80">
                        {name}
                      </p>

                      <span className="font-serif text-xs italic text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <Wishes />

      {/* RSVP & Countdown Section */}
      <section className="relative overflow-hidden bg-[#f7f4ee] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40">
        <div className="absolute left-1/2 top-16 hidden h-px w-16 -translate-x-1/2 bg-[#b7aa98] sm:block" />

        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mb-7 text-[9px] uppercase tracking-[0.45em] text-[#82796d]">
              Kehadiran Anda Sangat Berarti
            </p>

            <h2 className="font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[0.8] tracking-[-0.055em] text-[#292722]">
              Maukah Anda
              <br />
              <span className="italic text-[#83786a]">
                hadir?
              </span>
            </h2>

            <p className="mx-auto mt-10 max-w-md text-[10px] leading-[2] text-[#756e64] sm:text-[11px]">
              Kami akan dengan senang hati menyiapkan tempat untuk Anda hingga tanggal 10 Mei 2027. Mohon konfirmasikan kehadiran Anda pada hari istimewa ini.
            </p>
          </Reveal>

          {/* Countdown timer */}
          <Reveal delay={150}>
            <div className="mx-auto mt-14 grid max-w-lg grid-cols-4 border-y border-[#d3cbc0]">
              {[
                { v: mounted ? cd.d : 0, l: "Hari" },
                { v: mounted ? cd.h : 0, l: "Jam" },
                { v: mounted ? cd.m : 0, l: "Menit" },
                { v: mounted ? cd.s : 0, l: "Detik" },
              ].map((item, index) => (
                <div
                  key={item.l}
                  className={`py-6 ${
                    index !== 3
                      ? "border-r border-[#d3cbc0]"
                      : ""
                  }`}
                >
                  <p className="font-serif text-2xl tabular-nums text-[#302d28] sm:text-3xl">
                    {String(item.v).padStart(2, "0")}
                  </p>

                  <p className="mt-2 text-[7px] uppercase tracking-[0.25em] text-[#938a7d] sm:text-[8px]">
                    {item.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* RSVP Button */}
          <Reveal delay={300}>
            <button
              type="button"
              onClick={() => setIsRsvpOpen(true)}
              className="group mt-12 inline-flex items-center gap-8 border border-[#3a3732] px-8 py-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#302d28] transition-all duration-500 hover:bg-[#292722] hover:text-[#f7f4ee] sm:px-10"
            >
              <span>Konfirmasi Kehadiran</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Reveal>

          {/* Closing note */}
          <Reveal delay={450}>
            <div className="mt-20 flex flex-col items-center">
              <Floral className="mb-7 h-10 w-10 text-[#9b8e7e]" />

              <p className="font-serif text-xl italic text-[#575046]">
                Olivia & Ralph
              </p>

              <p className="mt-3 text-[8px] uppercase tracking-[0.4em] text-[#92897b]">
                18 Mei 2027
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d7d0c5] bg-[#eee9df] px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[8px] uppercase tracking-[0.3em] text-[#898073]">
            O & R
          </p>

          <p className="text-center font-serif text-xs italic text-[#898073]">
            Dengan cinta, selamanya.
          </p>

          <p className="text-[8px] uppercase tracking-[0.3em] text-[#898073]">
            18 — 05 — 2027
          </p>
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />

      {/* Music Player */}
      <MusicPlayer
        src="/music/wedding.mp3"
        title="Olivia & Ralph"
        audioRef={audioRef}
      />

      {/* Global CSS / Animations */}
      <style jsx global>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1.04);
          }

          100% {
            transform: scale(1.1);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #292722;
          color: #f7f4ee;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}