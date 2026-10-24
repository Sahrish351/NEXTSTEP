import React from 'react';

interface NextStepLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
}

export const NextStepLogo: React.FC<NextStepLogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  inverted = false 
}) => {
  const iconDimensions = {
    sm: 30,
    md: 38,
    lg: 46
  }[size];

  const titleFontSize = {
    sm: '1.25rem',
    md: '1.45rem',
    lg: '1.8rem'
  }[size];

  const textColor = inverted ? '#FAF8F3' : 'var(--primary-dark)';
  const secondaryColor = inverted ? 'rgba(250, 248, 243, 0.7)' : 'var(--text-muted)';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'sm' ? '0.55rem' : '0.75rem', textDecoration: 'none' }}>
      {/* Custom Vector Icon Mark */}
      <svg 
        width={iconDimensions} 
        height={iconDimensions} 
        viewBox="0 0 44 44" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(30, 58, 43, 0.15))' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ns-bg-grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#173123" />
            <stop offset="0.6" stopColor="#1E3A2B" />
            <stop offset="1" stopColor="#2E5A44" />
          </linearGradient>
          <linearGradient id="ns-step-grad" x1="8" y1="36" x2="36" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#81B29A" />
            <stop offset="1" stopColor="#F4F1DE" />
          </linearGradient>
          <linearGradient id="ns-accent-grad" x1="24" y1="8" x2="36" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E07A5F" />
            <stop offset="1" stopColor="#F2CC8F" />
          </linearGradient>
        </defs>

        {/* Squircle base */}
        <rect width="44" height="44" rx="12" fill="url(#ns-bg-grad)" />
        
        {/* Subtle geometric boundary ring */}
        <rect x="0.75" y="0.75" width="42.5" height="42.5" rx="11.25" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />

        {/* Ascending Steps Matrix (Represents Progression from Day 1 to Day 7) */}
        {/* Step 1: Foundation */}
        <rect x="9.5" y="26" width="6.5" height="8" rx="2" fill="#81B29A" fillOpacity="0.8" />
        
        {/* Step 2: Momentum */}
        <rect x="17.5" y="19" width="6.5" height="15" rx="2" fill="#A8D5BA" />
        
        {/* Step 3: Breakthrough Peak */}
        <rect x="25.5" y="12" width="6.5" height="22" rx="2" fill="#FFFFFF" />

        {/* Dynamic Forward Momentum Chevron (The "Obvious Next Step") */}
        <path 
          d="M10 21L21 13.5L25 16.5L34 8" 
          stroke="url(#ns-accent-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Guiding North-Star Compass Dot */}
        <circle cx="34" cy="8" r="3" fill="#E07A5F" />
        <circle cx="34" cy="8" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.05rem' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: titleFontSize,
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}>
            Next<span style={{ fontWeight: 400, color: inverted ? '#81B29A' : 'var(--primary)' }}>Step</span>
          </span>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-coral)',
            marginLeft: '2px',
            marginBottom: '2px'
          }} />
        </div>
        {showTagline && (
          <span style={{
            fontSize: '0.68rem',
            color: secondaryColor,
            fontWeight: 500,
            letterSpacing: '0.04em',
            marginTop: '0.25rem',
            textTransform: 'uppercase'
          }}>
            Make your next step obvious
          </span>
        )}
      </div>
    </div>
  );
};
