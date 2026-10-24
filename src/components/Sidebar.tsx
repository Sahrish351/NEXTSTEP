import React from 'react';
import { ViewType, Plan } from '../types';
import { 
  LayoutDashboard, 
  Layers, 
  CalendarCheck, 
  BarChart3, 
  Settings, 
  PlusCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  activePlan: Plan | null;
  onOpenCreate: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  activePlan,
  onOpenCreate,
}) => {
  const completedCount = activePlan ? activePlan.tasks.filter(t => t.completed).length : 0;
  const progressPercent = activePlan ? Math.round((completedCount / 7) * 100) : 0;

  const navItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { view: 'plans', label: 'My Plans', icon: <Layers size={18} /> },
    { view: 'today', label: 'Today', icon: <CalendarCheck size={18} /> },
    { view: 'progress', label: 'Progress', icon: <BarChart3 size={18} /> },
    { view: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="app-sidebar" aria-label="Main Navigation">
      {/* Brand Header */}
      <div 
        onClick={() => onNavigate('landing')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '1.25rem 1.25rem 1.5rem 1.25rem',
          borderBottom: '1px solid var(--border-light)',
          cursor: 'pointer'
        }}
        title="Go to Landing Page"
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
          <Sparkles size={16} />
        </div>
        <div>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            color: 'var(--primary-dark)',
            letterSpacing: '-0.02em',
            display: 'block',
            lineHeight: 1
          }}>
            NextStep
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 500 }}>
            Goal Execution Workspace
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
        <div style={{
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-light)',
          fontWeight: 700,
          padding: '0 0.5rem 0.5rem 0.5rem'
        }}>
          Workspace
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <li key={item.view}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.view)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.92rem',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'var(--surface-sage)' : 'transparent',
                    color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)',
                    textAlign: 'left',
                    transition: 'var(--transition)'
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-light)' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Active Plan Widget / CTA */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(255, 255, 255, 0.6)'
      }}>
        {activePlan ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textTransform: 'uppercase'
              }}>
                Active Plan
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                {progressPercent}%
              </span>
            </div>

            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '0.5rem'
            }} title={activePlan.goal}>
              {activePlan.goal}
            </div>

            <div style={{
              height: '5px',
              background: 'var(--surface-sage)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '0.65rem'
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'var(--primary)',
                borderRadius: '999px'
              }} />
            </div>

            <button
              type="button"
              onClick={() => onNavigate('today')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--primary)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-sage-light)'
              }}
            >
              <span>Today's Focus</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCreate}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <PlusCircle size={16} />
            <span>Create Plan</span>
          </button>
        )}
      </div>
    </aside>
  );
};

