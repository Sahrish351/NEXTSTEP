import React from 'react';
import { Plan, ViewType } from '../types';
import { deriveAchievements } from '../utils/achievements';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  BookMarked, 
  Lock, 
  Unlock, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface AchievementsViewProps {
  plan: Plan | null;
  onOpenCreate: () => void;
  onNavigate: (view: ViewType) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={24} />,
  CheckCircle2: <CheckCircle2 size={24} />,
  Flame: <Flame size={24} />,
  BookMarked: <BookMarked size={24} />,
  Trophy: <Trophy size={24} />,
};

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  plan,
  onOpenCreate,
  onNavigate,
}) => {
  const achievements = deriveAchievements(plan);
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="view-fade-in" style={{ paddingBottom: '3.5rem' }}>
      {/* Editorial Header */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          <Trophy size={22} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Earned Milestones
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          color: 'var(--text-main)',
          marginBottom: '0.6rem',
          lineHeight: 1.2
        }}>
          Real Progress Milestones
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          maxWidth: '680px',
          lineHeight: 1.6,
          fontSize: '0.98rem'
        }}>
          Milestones in NextStep are derived strictly from your real progress—no artificial streaks, fabricated gamification, or algorithmic tricks. Each badge reflects an authentic action taken on your journey.
        </p>

        {/* Progress Metric Bar */}
        <div style={{
          marginTop: '1.75rem',
          background: 'var(--bg-main)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Milestone Completion: {unlockedCount} of {achievements.length} unlocked
            </span>
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--primary)' }}>
              {progressPercent}%
            </span>
          </div>
          <div style={{
            height: '8px',
            background: 'var(--border)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'var(--primary)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Milestone Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {achievements.map((ach) => {
          const icon = ICON_MAP[ach.iconName] || <Trophy size={24} />;
          return (
            <div
              key={ach.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: ach.isUnlocked ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                padding: '1.5rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: ach.isUnlocked ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                opacity: ach.isUnlocked ? 1 : 0.78,
                transition: 'all 0.2s ease'
              }}
            >
              {/* Status Pill Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: ach.isUnlocked ? 'var(--primary-light)' : 'var(--border-light)',
                  color: ach.isUnlocked ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {icon}
                </div>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  background: ach.isUnlocked ? 'var(--primary-light)' : 'var(--border-light)',
                  color: ach.isUnlocked ? 'var(--primary-dark)' : 'var(--text-muted)'
                }}>
                  {ach.isUnlocked ? (
                    <>
                      <Unlock size={12} /> Unlocked
                    </>
                  ) : (
                    <>
                      <Lock size={12} /> Locked
                    </>
                  )}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--text-main)',
                marginBottom: '0.45rem',
                lineHeight: 1.25
              }}>
                {ach.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                marginBottom: '1.1rem'
              }}>
                {ach.description}
              </p>

              {/* Requirement or Date Footer */}
              <div style={{
                marginTop: 'auto',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '0.85rem',
                fontSize: '0.82rem'
              }}>
                {ach.isUnlocked ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-dark)' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--primary)' }} />
                    <span>
                      {ach.unlockedAt 
                        ? `Achieved on ${new Date(ach.unlockedAt).toLocaleDateString()}`
                        : 'Milestone achieved!'}
                    </span>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Requirement: </strong>
                    {ach.requirement}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions & Local-First Integrity Note */}
      <div style={{
        marginTop: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '1.25rem 1.5rem',
        }}>
          <div>
            <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Keep Your Momentum Going
            </strong>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {plan ? 'Check off today\'s prioritized action to progress towards your next badge.' : 'Start your first 7-day action plan to unlock the First Step milestone.'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {plan ? (
              <button
                type="button"
                onClick={() => onNavigate('today')}
                className="btn-primary"
                style={{ fontSize: '0.86rem', padding: '0.55rem 1.1rem' }}
              >
                <span>Go to Today View</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenCreate}
                className="btn-primary"
                style={{ fontSize: '0.86rem', padding: '0.55rem 1.1rem' }}
              >
                <span>Create a Plan</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem'
        }}>
          <ShieldCheck size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-main)' }}>Honest Progress Promise:</strong> Milestones are calculated live from your browser storage. We never manufacture fake streaks, countdown timers, or vanity metrics to induce false urgency.
          </p>
        </div>
      </div>
    </div>
  );
};
