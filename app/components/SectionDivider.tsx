"use client";

import Floral from "./Floral";

interface SectionDividerProps {
  dark?: boolean;
  floral?: boolean;
}

export default function SectionDivider({
  dark = false,
  floral = true,
}: SectionDividerProps) {
  const lineColor = dark
    ? "bg-white/20"
    : "bg-[#b8ad9d]/50";

  const textColor = dark
    ? "text-white/50"
    : "text-[#82796d]";

  return (
    <div className="flex w-full items-center justify-center gap-5 px-8 py-8">
      <div className={`h-px w-12 ${lineColor}`} />

      {floral ? (
        <Floral
          className={`h-7 w-7 ${textColor}`}
        />
      ) : (
        <span
          className={`font-serif text-xs italic ${textColor}`}
        >
          O & R
        </span>
      )}

      <div className={`h-px w-12 ${lineColor}`} />
    </div>
  );
}