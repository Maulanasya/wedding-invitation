"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Reveal from "./Reveal";
import Floral from "./Floral";

type Rsvp = {
  id: string;
  name: string;
  status: string;
  message: string;
  created_at: string;
};

export default function Wishes() {
  const [wishes, setWishes] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("rsvp")
      .select("*")
      .not("message", "eq", "")
      .order("created_at", { ascending: false })
      .limit(4);

    if (!error && data) {
      setWishes(data as Rsvp[]);
    }

    setLoading(false);
  };

  fetchWishes();
}, []);

  if (loading) {
    return (
      <section className="w-full bg-[#eee9df] px-6 py-24 text-center">
        <div className="mx-auto h-px w-12 animate-pulse bg-[#b8ad9d]" />
      </section>
    );
  }

  if (wishes.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#eee9df] px-6 py-24 text-[#292722] sm:px-10 sm:py-28 lg:px-20 lg:py-36">
      {/* Background detail */}
      <div
        className="pointer-events-none absolute -right-20 top-20 opacity-[0.04]"
        aria-hidden="true"
      >
        <Floral className="h-80 w-80" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-[#82796d]">
            Words from our loved ones
          </p>

          <h2 className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.85] tracking-[-0.05em]">
            Wishes
            <br />
            <span className="italic text-[#82796d]">
              & prayers.
            </span>
          </h2>

          <div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-[#b8ad9d]" />

            <Floral className="h-7 w-7 text-[#8b8173]" />

            <div className="h-px w-8 bg-[#b8ad9d]" />
          </div>
        </Reveal>

        <div className="grid gap-px bg-[#d4cdc2] md:grid-cols-2">
          {wishes.map((wish, index) => (
            <Reveal
              key={wish.id}
              delay={index * 80}
              direction={
                index % 2 === 0
                  ? "left"
                  : "right"
              }
            >
              <article className="group relative h-full bg-[#eee9df] px-7 py-9 transition-colors duration-500 hover:bg-[#e8e1d5] sm:px-10 sm:py-11">
                <span className="absolute right-7 top-7 font-serif text-[10px] italic text-[#aaa092]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mb-7 text-[#9b8e7e]">
                  <span className="font-serif text-3xl">
                    “
                  </span>
                </div>

                <p className="max-w-md font-serif text-lg italic leading-[1.7] text-[#3c3832]">
                  {wish.message}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#b8ad9d]" />

                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#756e64]">
                    {wish.name}
                  </p>

                  {wish.status === "Hadir" && (
                    <>
                      <span className="text-[#aaa092]">
                        ·
                      </span>

                      <span className="text-[8px] uppercase tracking-[0.15em] text-[#aaa092]">
                        Attending
                      </span>
                    </>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-16 text-center">
          <p className="font-serif text-sm italic text-[#82796d]">
            Thank you for being part of our story.
          </p>
        </Reveal>
      </div>
    </section>
  );
}