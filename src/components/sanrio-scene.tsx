import { cn } from "@/lib/utils";

function Cloud({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={cn("sanrio-float", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <ellipse cx="42" cy="42" rx="28" ry="20" fill="white" />
      <ellipse cx="70" cy="38" rx="32" ry="24" fill="white" />
      <ellipse cx="92" cy="46" rx="20" ry="16" fill="white" />
      <ellipse cx="24" cy="48" rx="16" ry="12" fill="white" />
    </svg>
  );
}

function Bow({ className, delay = "0s", color = "#ff7aa2" }: { className?: string; delay?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={cn("sanrio-wiggle", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <path d="M40 30 L12 8 Q28 28 12 52 Z" fill={color} stroke="#3a2a32" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M40 30 L68 8 Q52 28 68 52 Z" fill={color} stroke="#3a2a32" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="40" cy="30" r="8" fill="#ffd0e0" stroke="#3a2a32" strokeWidth="2.4" />
    </svg>
  );
}

function Heart({ className, delay = "0s", color = "#ff7aa2" }: { className?: string; delay?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 32 30"
      className={cn("sanrio-pulse", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <path
        d="M16 27 C16 27 3 18 3 10 A6.5 6.5 0 0 1 16 10 A6.5 6.5 0 0 1 29 10 C29 18 16 27 16 27 Z"
        fill={color}
        stroke="#3a2a32"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Star({ className, delay = "0s", color = "#f5b942" }: { className?: string; delay?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("sanrio-spin", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <path
        d="M18 2 L22 13 H34 L24 20 L28 32 L18 25 L8 32 L12 20 L2 13 H14 Z"
        fill={color}
        stroke="#3a2a32"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Strawberry({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={cn("sanrio-bounce", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <path d="M24 10 C10 10 6 24 8 36 C10 48 18 54 24 54 C30 54 38 48 40 36 C42 24 38 10 24 10 Z" fill="#ff7aa2" stroke="#3a2a32" strokeWidth="2" />
      <circle cx="16" cy="30" r="1.6" fill="#fff6b0" />
      <circle cx="26" cy="26" r="1.6" fill="#fff6b0" />
      <circle cx="32" cy="34" r="1.6" fill="#fff6b0" />
      <circle cx="20" cy="40" r="1.6" fill="#fff6b0" />
      <path d="M24 6 L16 16 H32 Z" fill="#7ec8a3" stroke="#3a2a32" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 4 V12" stroke="#3a2a32" strokeWidth="2" />
    </svg>
  );
}

function Flower({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("sanrio-spin", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <circle cx="14" cy="18" r="8" fill="#ffb3c7" stroke="#3a2a32" strokeWidth="1.8" />
      <circle cx="34" cy="18" r="8" fill="#ffb3c7" stroke="#3a2a32" strokeWidth="1.8" />
      <circle cx="14" cy="32" r="8" fill="#ffb3c7" stroke="#3a2a32" strokeWidth="1.8" />
      <circle cx="34" cy="32" r="8" fill="#ffb3c7" stroke="#3a2a32" strokeWidth="1.8" />
      <circle cx="24" cy="12" r="8" fill="#ffd0e0" stroke="#3a2a32" strokeWidth="1.8" />
      <circle cx="24" cy="25" r="7" fill="#fff6b0" stroke="#3a2a32" strokeWidth="1.8" />
    </svg>
  );
}

export function SanrioScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <Cloud className="absolute top-16 left-[-12px] w-36 opacity-90 sm:left-6 sm:w-44" delay="0s" />
      <Cloud className="absolute top-28 right-[-20px] w-40 opacity-80 sm:right-8" delay="1.2s" />
      <Cloud className="absolute bottom-24 left-[8%] w-28 opacity-70" delay="2s" />
      <Cloud className="absolute bottom-10 right-[12%] w-32 opacity-80" delay="0.6s" />
      <Bow className="absolute top-24 right-[18%] w-12 sm:w-16" delay="0.4s" />
      <Bow className="absolute bottom-32 left-[16%] w-10" delay="1.6s" color="#a78bfa" />
      <Heart className="absolute top-[22%] left-[8%] w-7" delay="0.2s" />
      <Heart className="absolute top-[40%] right-[8%] w-6" delay="1.1s" color="#ffb3c7" />
      <Heart className="absolute bottom-[18%] right-[28%] w-5" delay="2.2s" />
      <Star className="absolute top-[18%] left-[28%] w-6" delay="0.8s" />
      <Star className="absolute top-[55%] left-[6%] w-5" delay="1.8s" color="#7eb6ff" />
      <Star className="absolute bottom-[28%] right-[8%] w-7" delay="0.3s" />
      <Strawberry className="absolute top-[32%] right-[4%] w-10 sm:w-12" delay="0.5s" />
      <Strawberry className="absolute bottom-[12%] left-[4%] w-9" delay="1.4s" />
      <Flower className="absolute top-[48%] right-[22%] w-9 opacity-90" delay="1s" />
      <Flower className="absolute bottom-[36%] left-[22%] w-8" delay="2.4s" />
    </div>
  );
}
