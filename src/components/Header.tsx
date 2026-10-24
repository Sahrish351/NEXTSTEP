import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
  showNewPlanButton?: boolean;
  onNewPlanClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLogoClick,
  showNewPlanButton,
  onNewPlanClick,
}) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'rgba(250, 248, 243, 0.92)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '0.9rem 0'
    }}>
      <div className="content-wrapper" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div 
          onClick={onLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onLogoClick?.(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          aria-label="NextStep Home"
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              color: 'var(--primary-dark)',
              fontWeight: 'normal',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              NextStep
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {showNewPlanButton && (
            <button
              onClick={onNewPlanClick}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              + Create New Plan
            </button>
          )}
          <a
            href="#how-it-works"
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              textDecoration: 'none'
            }}
          >
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
};

