"use client";

interface AmbientLightProps {
  className?: string;
}

export default function AmbientLight({
  className = "",
}: AmbientLightProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="ambient-light ambient-light-one" />
      <div className="ambient-light ambient-light-two" />

      <style jsx>{`
        .ambient-light {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.08;
          animation: ambientFloat 14s ease-in-out infinite alternate;
        }

        .ambient-light-one {
          top: -180px;
          left: -160px;
          background: #c5a77d;
        }

        .ambient-light-two {
          right: -180px;
          bottom: -180px;
          background: #8f9b88;
          animation-delay: -7s;
        }

        @keyframes ambientFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          100% {
            transform: translate3d(30px, 25px, 0) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-light {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}