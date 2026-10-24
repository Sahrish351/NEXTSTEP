import React from 'react';
import { ViewType, Plan } from '../types';
import { 
  Home,
  LayoutDashboard, 
  Layers, 
  CalendarCheck, 
  BarChart3, 
  BookMarked, 
  Trophy, 
  Compass, 
  Lightbulb, 
  Info, 
  Settings, 
  PlusCircle, 
  ArrowRight 
} from 'lucide-react';
import { NextStepLogo } from './NextStepLogo';

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

  const workspaceLinks: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'overview', label: 'Overview', icon: <LayoutDashboard size={17} /> },
    { view: 'plans', label: 'My Plans', icon: <Layers size={17} /> },
    { view: 'today', label: 'Today View', icon: <CalendarCheck size={17} /> },
    { view: 'progress', label: 'Progress Track', icon: <BarChart3 size={17} /> },
    { view: 'reflection', label: 'Weekly Reflection', icon: <BookMarked size={17} /> },
    { view: 'achievements', label: 'Milestones', icon: <Trophy size={17} /> },
  ];

  const exploreLinks: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'explore', label: 'Explore Goals', icon: <Compass size={17} /> },
    { view: 'inspiration', label: 'Inspiration Library', icon: <Lightbulb size={17} /> },
    { view: 'about', label: 'About NextStep', icon: <Info size={17} /> },
    { view: 'settings', label: 'Settings & Data', icon: <Settings size={17} /> },
  ];

  return (
    <aside className="app-sidebar" aria-label="Main Navigation">
      {/* Brand Header */}
      <div 
        onClick={() => onNavigate('home')}
        style={{
          padding: '1.25rem 1.25rem',
          borderBottom: '1px solid var(--border-light)',
          cursor: 'pointer'
        }}
        title="Go to Home"
      >
        <NextStepLogo size="sm" showTagline={true} />
      </div>

      {/* Navigation Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.9rem 0.75rem' }}>
        {/* Dedicated Website Home Link */}
        <div style={{ marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: 'var(--surface-sage-light)',
              color: 'var(--primary-dark)',
              border: '1px solid var(--surface-sage)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            title="Return to Public Website Homepage"
          >
            <Home size={16} style={{ color: 'var(--primary)' }} />
            <span>Public Home</span>
          </button>
        </div>

        {/* Workspace Links Group */}
        <div style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-light)',
          fontWeight: 700,
          padding: '0 0.5rem 0.4rem 0.5rem'
        }}>
          Workspace
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1.25rem' }}>
          {workspaceLinks.map((item) => {
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
                    gap: '0.65rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
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

        {/* Explore & Discover Group */}
        <div style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-light)',
          fontWeight: 700,
          padding: '0 0.5rem 0.4rem 0.5rem'
        }}>
          Explore &amp; Reference
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {exploreLinks.map((item) => {
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
                    gap: '0.65rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
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
      </div>

      {/* Active Plan Widget / CTA */}
      <div style={{
        padding: '0.85rem',
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(255, 255, 255, 0.7)'
      }}>
        {activePlan ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textTransform: 'uppercase'
              }}>
                Active Plan
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                {progressPercent}%
              </span>
            </div>

            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '0.45rem'
            }} title={activePlan.goal}>
              {activePlan.goal}
            </div>

            <div style={{
              height: '4px',
              background: 'var(--surface-sage)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '0.55rem'
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
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--primary)',
                padding: '0.3rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-sage-light)'
              }}
            >
              <span>Today's Action</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCreate}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.65rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <PlusCircle size={15} />
            <span>Create 7-Day Plan</span>
          </button>
        )}
      </div>
    </aside>
  );
};
