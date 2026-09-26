"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function FloatingPetals({
  count = 12,
}: {
  count?: number;
}) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from(
      { length: count },
      (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 12,
        size: 5 + Math.random() * 7,
        rotation: Math.random() * 360,
      })
    );

    setPetals(generated);
  }, [count]);

  if (!petals.length) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="floating-petal"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.45}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `rotate(${petal.rotation}deg)`,
            } as React.CSSProperties
          }
        />
      ))}

      <style jsx>{`
        .floating-petal {
          position: absolute;
          top: -30px;
          display: block;
          border-radius: 100% 0 100% 0;
          background: rgba(174, 150, 119, 0.32);
          animation-name: fallingPetal;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fallingPetal {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
            opacity: 0;
          }

          10% {
            opacity: 0.5;
          }

          50% {
            transform: translate3d(35px, 50vh, 0) rotate(160deg);
          }

          100% {
            transform: translate3d(-30px, 110vh, 0) rotate(320deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-petal {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}