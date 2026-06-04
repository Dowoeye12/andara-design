export const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(var(--bac-grid-subtle))"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Latitude lines */}
        {[20, 40, 60, 80].map((y) => (
          <line
            key={`lat-${y}`}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="hsl(var(--bac-grid-subtle))"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}
        
        {/* Longitude lines */}
        {[20, 40, 60, 80].map((x) => (
          <line
            key={`lon-${x}`}
            x1={`${x}%`}
            y1="0"
            x2={`${x}%`}
            y2="100%"
            stroke="hsl(var(--bac-grid-subtle))"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}
      </svg>
    </div>
  );
};
