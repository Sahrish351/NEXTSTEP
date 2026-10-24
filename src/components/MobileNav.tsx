import React from 'react';
import { ViewType } from '../types';
import { 
  LayoutDashboard, 
  Layers, 
  CalendarCheck, 
  Compass, 
  Settings 
} from 'lucide-react';

interface MobileNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const navItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'overview', label: 'Overview', icon: <LayoutDashboard size={19} /> },
    { view: 'plans', label: 'Plans', icon: <Layers size={19} /> },
    { view: 'today', label: 'Today', icon: <CalendarCheck size={19} /> },
    { view: 'explore', label: 'Explore', icon: <Compass size={19} /> },
    { view: 'settings', label: 'Settings', icon: <Settings size={19} /> },
  ];

  return (
    <nav 
      className="mobile-bottom-nav" 
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.45rem 0.25rem',
        zIndex: 50,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.04)'
      }}
    >
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            type="button"
            onClick={() => onNavigate(item.view)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.72rem',
              fontWeight: isActive ? 700 : 500,
              minWidth: '54px',
              minHeight: '44px',
              justifyContent: 'center',
              transition: 'var(--transition)'
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
