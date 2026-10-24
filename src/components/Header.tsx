import React from 'react';
import { ViewType, Plan } from '../types';
import { Sparkles, Plus, Home } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  activePlan: Plan | null;
  onOpenCreate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activePlan,
  onOpenCreate,
}) => {
  const isHome = currentView === 'home';

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'rgba(250, 248, 243, 0.95)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '0.75rem 0'
    }}>
      <div className="content-wrapper" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand */}
        <div 
          onClick={() => onNavigate(activePlan ? 'overview' : 'home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate(activePlan ? 'overview' : 'home'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          aria-label="NextStep Home"
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={17} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              color: 'var(--primary-dark)',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              NextStep
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isHome ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="btn-ghost"
                style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
              >
                Explore Goals
              </button>
              {activePlan && (
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
                >
                  Go to Workspace →
                </button>
              )}
              <button
                type="button"
                onClick={onOpenCreate}
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}
              >
                Create my plan
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="btn-ghost"
                style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
                title="View Home Page"
              >
                <Home size={15} />
                <span className="desktop-only-text">Home</span>
              </button>

              <button
                type="button"
                onClick={onOpenCreate}
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              >
                <Plus size={16} />
                <span>New Plan</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
