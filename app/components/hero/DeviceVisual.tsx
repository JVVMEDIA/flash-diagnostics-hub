type DeviceVisualProps = {
  className?: string;
  animated?: boolean;
};

export default function DeviceVisual({ className = "", animated = true }: DeviceVisualProps) {
  const scanClass = animated ? "hero-device-scan" : "";

  return (
    <div
      className={`hero-device-wrap ${animated ? "animate-device-float" : ""} ${className}`}
      aria-hidden
    >
      <div className={`hero-device-tilt ${animated ? "perf-hide-lite" : ""}`}>
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full drop-shadow-[0_0_32px_rgba(52,211,153,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="hero-frame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            <filter id="hero-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx="100" cy="288" rx="52" ry="8" fill="rgba(16,185,129,0.15)" />

          <rect x="42" y="18" width="116" height="252" rx="18" fill="url(#hero-frame-grad)" stroke="#52525b" strokeWidth="2" />
          <rect x="48" y="24" width="104" height="240" rx="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />

          <rect x="36" y="72" width="4" height="28" rx="2" fill="#52525b" />
          <rect x="36" y="108" width="4" height="40" rx="2" fill="#52525b" />
          <rect x="160" y="88" width="4" height="48" rx="2" fill="#52525b" />

          <rect x="54" y="38" width="92" height="212" rx="8" fill="url(#hero-screen-grad)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />

          <rect x="78" y="38" width="44" height="10" rx="5" fill="#18181b" />

          <circle cx="68" cy="58" r="3" fill="#34d399" className={animated ? "animate-pulse-dot" : ""} />
          <text x="76" y="61" fill="#6ee7b7" fontSize="7" fontFamily="monospace">
            DIAG
          </text>
          <text x="130" y="61" fill="#a1a1aa" fontSize="6" fontFamily="monospace">
            USB
          </text>

          <rect x="62" y="72" width="76" height="22" rx="4" fill="rgba(16,185,129,0.12)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
          <text x="68" y="86" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
            FASTBOOT
          </text>

          <text x="62" y="110" fill="#4ade80" fontSize="6" fontFamily="monospace" opacity="0.9">
            $ fastboot devices
          </text>
          <text x="62" y="122" fill="#a1a1aa" fontSize="6" fontFamily="monospace">
            ZX1G422B3N device
          </text>
          <text x="62" y="138" fill="#4ade80" fontSize="6" fontFamily="monospace" opacity="0.9">
            $ fastboot getvar unlocked
          </text>
          <text x="62" y="150" fill="#fbbf24" fontSize="6" fontFamily="monospace">
            unlocked: yes
          </text>

          <rect x="62" y="168" width="76" height="6" rx="3" fill="#27272a" />
          <rect x="62" y="168" width="52" height="6" rx="3" fill="#10b981" filter="url(#hero-glow)" className={animated ? "hero-device-progress" : ""} />

          <rect x="62" y="184" width="22" height="16" rx="2" fill="rgba(16,185,129,0.2)" stroke="#34d399" strokeWidth="0.5" />
          <text x="66" y="195" fill="#6ee7b7" fontSize="5" fontFamily="monospace">
            boot
          </text>
          <rect x="88" y="184" width="22" height="16" rx="2" fill="rgba(39,39,42,0.8)" stroke="#52525b" strokeWidth="0.5" />
          <text x="91" y="195" fill="#a1a1aa" fontSize="5" fontFamily="monospace">
            rec
          </text>
          <rect x="114" y="184" width="24" height="16" rx="2" fill="rgba(39,39,42,0.8)" stroke="#52525b" strokeWidth="0.5" />
          <text x="117" y="195" fill="#a1a1aa" fontSize="5" fontFamily="monospace">
            sys
          </text>

          <rect x="88" y="262" width="24" height="6" rx="2" fill="#3f3f46" stroke="#71717a" strokeWidth="0.5" />
          <rect x="94" y="264" width="12" height="2" rx="1" fill="#10b981" opacity="0.6" />

          {animated && (
            <rect x="54" y="38" width="92" height="4" rx="2" fill="rgba(52,211,153,0.25)" className={scanClass} />
          )}
        </svg>
      </div>

      <div className="hero-device-static perf-show-lite">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="42" y="18" width="116" height="252" rx="18" fill="#27272a" stroke="#52525b" strokeWidth="2" />
          <rect x="54" y="38" width="92" height="212" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1" strokeOpacity="0.35" />
          <rect x="62" y="72" width="76" height="22" rx="4" fill="rgba(16,185,129,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x="68" y="86" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
            FASTBOOT
          </text>
          <rect x="62" y="168" width="76" height="6" rx="3" fill="#27272a" />
          <rect x="62" y="168" width="48" height="6" rx="3" fill="#10b981" />
        </svg>
      </div>
    </div>
  );
}