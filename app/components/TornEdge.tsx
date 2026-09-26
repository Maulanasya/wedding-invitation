"use client";

interface TornEdgeProps {
  color?: string;
  height?: number;
  flip?: boolean;
}

export default function TornEdge({
  color = "#F7F4EE",
  height = 28,
  flip = false,
}: TornEdgeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        flip ? "rotate-180" : ""
      }`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="
            M0 25
            C40 20 60 30 100 24
            C140 18 160 29 200 23
            C240 17 270 28 310 22
            C350 16 380 29 420 23
            C460 17 500 28 540 22
            C580 16 610 30 650 23
            C690 16 720 28 760 22
            C800 16 830 29 870 23
            C910 17 940 28 980 22
            C1020 16 1050 30 1090 23
            C1130 17 1160 29 1200 22
            C1240 16 1270 29 1310 23
            C1350 17 1380 28 1440 21
            L1440 40
            L0 40
            Z
          "
          fill={color}
        />
      </svg>
    </div>
  );
}