const AnimatedBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <radialGradient id="nightGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#4c51bf", stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: "#000033", stopOpacity: 0 }} />
      </radialGradient>

      <radialGradient id="softGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: "#000033", stopOpacity: 0 }} />
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="#000033" />
    <circle cx="50%" cy="50%" r="35%" fill="url(#nightGlow)" />
    <circle cx="50%" cy="50%" r="25%" fill="url(#softGlow)" />

    <g opacity="0.1">
      <circle cx="25%" cy="33%" r="10%" fill="#4f46e5">
        <animate
          attributeName="opacity"
          values="0.1;0.2;0.1"
          dur="7s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="75%" cy="66%" r="12%" fill="#6366f1">
        <animate
          attributeName="opacity"
          values="0.1;0.2;0.1"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
    </g>

    <g>
      <circle
        cx="50%"
        cy="50%"
        r="20%"
        fill="none"
        stroke="#4c51bf"
        strokeWidth="2"
        opacity="0.2"
        filter="url(#glow)"
      >
        <animate
          attributeName="r"
          values="20%;22%;20%"
          dur="8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.1;0.2"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);