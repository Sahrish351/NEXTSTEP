import React, { useState } from 'react';
import { ViewType, Plan } from '../types';
import { ArrowRight, Plus, Menu, X, Home, Compass, Info, CheckCircle2 } from 'lucide-react';
import { NextStepLogo } from './NextStepLogo';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = currentView === 'home';

  const handleHowItWorksClick = () => {
    setMobileMenuOpen(false);
    if (!isHome) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (view: ViewType) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--border-light)',
      background: 'rgba(250, 248, 243, 0.98)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 60,
      padding: '0.85rem 0'
    }}>
      <div className="content-wrapper" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavClick('home'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          aria-label="NextStep Home"
        >
          <NextStepLogo size="sm" showTagline={false} />
        </div>

        {/* Center Desktop Navigation Links */}
        <nav 
          style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}
          className="desktop-only-text"
          aria-label="Primary Desktop Navigation"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            style={{
              fontSize: '0.92rem',
              fontWeight: isHome ? 600 : 500,
              color: isHome ? 'var(--primary-dark)' : 'var(--text-muted)',
              borderBottom: isHome ? '2px solid var(--primary-dark)' : '2px solid transparent',
              paddingBottom: '0.2rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('explore')}
            style={{
              fontSize: '0.92rem',
              fontWeight: currentView === 'explore' ? 600 : 500,
              color: currentView === 'explore' ? 'var(--primary-dark)' : 'var(--text-muted)',
              borderBottom: currentView === 'explore' ? '2px solid var(--primary-dark)' : '2px solid transparent',
              paddingBottom: '0.2rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Explore Goals
          </button>

          <button
            type="button"
            onClick={handleHowItWorksClick}
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              borderBottom: '2px solid transparent',
              paddingBottom: '0.2rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            How It Works
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('about')}
            style={{
              fontSize: '0.92rem',
              fontWeight: currentView === 'about' ? 600 : 500,
              color: currentView === 'about' ? 'var(--primary-dark)' : 'var(--text-muted)',
              borderBottom: currentView === 'about' ? '2px solid var(--primary-dark)' : '2px solid transparent',
              paddingBottom: '0.2rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            About
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Go to Workspace / New Plan Button (Desktop & Mobile) */}
          {activePlan ? (
            <button
              type="button"
              onClick={() => handleNavClick('overview')}
              className="btn-primary"
              style={{
                fontSize: '0.86rem',
                padding: '0.52rem 1.15rem',
                background: 'var(--primary-dark)',
                gap: '0.45rem'
              }}
            >
              <span className="desktop-only-text">Go to </span>
              <span>Workspace</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenCreate(); }}
              className="btn-primary"
              style={{
                fontSize: '0.86rem',
                padding: '0.52rem 1.15rem',
                background: 'var(--primary-dark)',
                gap: '0.45rem'
              }}
            >
              <span>Create my plan</span>
              <Plus size={15} />
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              color: 'var(--primary-dark)',
              background: mobileMenuOpen ? 'var(--surface-sage)' : 'transparent',
              border: '1px solid var(--border-light)'
            }}
            className="mobile-hamburger"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#FAF8F3',
          borderBottom: '2px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          zIndex: 65,
          animation: 'fadeInUp 0.2s ease forwards'
        }}>
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: isHome ? 700 : 500,
              color: isHome ? 'var(--primary-dark)' : 'var(--text-main)',
              padding: '0.65rem 0.5rem',
              borderBottom: '1px solid var(--border-light)',
              textAlign: 'left'
            }}
          >
            <Home size={18} color={isHome ? 'var(--primary)' : 'var(--text-muted)'} />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: currentView === 'explore' ? 700 : 500,
              color: currentView === 'explore' ? 'var(--primary-dark)' : 'var(--text-main)',
              padding: '0.65rem 0.5rem',
              borderBottom: '1px solid var(--border-light)',
              textAlign: 'left'
            }}
          >
            <Compass size={18} color="var(--primary)" />
            <span>Explore Goals</span>
          </button>

          <button
            type="button"
            onClick={handleHowItWorksClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-main)',
              padding: '0.65rem 0.5rem',
              borderBottom: '1px solid var(--border-light)',
              textAlign: 'left'
            }}
          >
            <CheckCircle2 size={18} color="var(--primary)" />
            <span>How It Works</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: currentView === 'about' ? 700 : 500,
              color: currentView === 'about' ? 'var(--primary-dark)' : 'var(--text-main)',
              padding: '0.65rem 0.5rem',
              borderBottom: '1px solid var(--border-light)',
              textAlign: 'left'
            }}
          >
            <Info size={18} color="var(--primary)" />
            <span>About NextStep</span>
          </button>

          {activePlan && (
            <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={() => handleNavClick('overview')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1rem' }}
              >
                <span>Go to Workspace Overview</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
