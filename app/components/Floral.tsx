"use client";

interface FloralProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export default function Floral({
  className = "",
  color = "currentColor",
  strokeWidth = 1.1,
}: FloralProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stem */}
      <path
        d="M60 110C60 90 60 70 59 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <path
        d="M59 74C48 69 40 61 35 51"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <path
        d="M60 82C71 76 78 67 82 56"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Left leaf */}
      <path
        d="M48 69C38 71 31 67 27 59C36 58 44 61 48 69Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right leaf */}
      <path
        d="M72 75C80 76 88 72 91 64C82 63 76 67 72 75Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Flower */}
      <path
        d="M59 51C52 46 48 39 50 32C56 34 60 39 60 46"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      <path
        d="M60 50C61 41 66 34 73 32C74 40 69 47 60 51"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      <path
        d="M59 49C52 43 44 42 38 46C43 53 51 55 59 51"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      <path
        d="M61 49C69 43 77 43 82 48C77 54 68 54 61 51"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      <path
        d="M60 49C55 40 56 31 62 25C67 32 66 41 60 49Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Center */}
      <circle
        cx="60"
        cy="50"
        r="3"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Small branches */}
      <path
        d="M39 89C32 85 27 80 25 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <path
        d="M79 91C87 87 92 81 94 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}