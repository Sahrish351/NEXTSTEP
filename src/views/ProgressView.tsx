import React from 'react';
import { Plan } from '../types';
import { 
  BarChart3, 
  Trophy, 
  CheckCircle2, 
  CircleDashed, 
  PlusCircle
} from 'lucide-react';

interface ProgressViewProps {
  plan: Plan | null;
  onNavigate?: (view: any) => void;
  onOpenCreate: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  plan,
  onOpenCreate,
}) => {
  if (!plan) {
    return (
      <div style={{ padding: '3rem 1.25rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--surface-sage)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <BarChart3 size={26} />
          </div>
          <h2 className="serif-heading" style={{ fontSize: '1.9rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
            No Progress Data Available
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Create an active 7-day plan to monitor your real-time completion analytics.
          </p>
          <button onClick={onOpenCreate} className="btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
            <PlusCircle size={17} />
            <span>Start a 7-Day Plan</span>
          </button>
        </div>
      </div>
    );
  }

  const completedTasks = plan.tasks.filter((t) => t.completed);
  const remainingTasks = plan.tasks.filter((t) => !t.completed);
  const completedCount = completedTasks.length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* View Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.25rem',
        marginBottom: '2rem'
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Measurable Momentum
        </span>
        <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
          Progress &amp; Completion Analysis
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          Honest, transparent metrics derived directly from your completed actions.
        </p>
      </div>

      {/* 100% Celebration Milestone Banner */}
      {completedCount === 7 && (
        <div style={{
          background: 'var(--surface-sage)',
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Trophy size={30} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Milestone Achieved
            </span>
            <h3 className="serif-heading" style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginTop: '0.15rem' }}>
              Congratulations! All 7 Days Completed.
            </h3>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              You turned your ambition for <em>"{plan.goal}"</em> into seven days of steady execution. Be proud of your consistency!
            </p>
          </div>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Metric 1 */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Overall Completion
          </span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
            {progressPercent}%
          </div>
          <div style={{
            height: '6px',
            background: 'var(--surface-sage)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginTop: '0.75rem'
          }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)', borderRadius: '999px' }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Days Accomplished
          </span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            {completedCount} <span style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontWeight: 500 }}>/ 7</span>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
            {completedCount === 7 ? 'Full week complete' : `${7 - completedCount} daily actions remaining`}
          </span>
        </div>

        {/* Metric 3 */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Target Category
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: '0.5rem' }}>
            {plan.category}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
            7 structured sequential actions
          </span>
        </div>
      </div>

      {/* Completed vs Remaining Lists Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Completed Column */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
            <CheckCircle2 size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
              Completed Steps ({completedCount})
            </h3>
          </div>

          {completedTasks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {completedTasks.map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: '0.75rem 0.9rem',
                    background: 'var(--surface-sage-light)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                    Day 0{t.dayNumber}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)', textDecoration: 'line-through' }}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No tasks completed yet. Complete your Day 1 task to start your momentum!
            </div>
          )}
        </div>

        {/* Remaining Column */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
            <CircleDashed size={18} color="var(--accent-coral-dark)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text)' }}>
              Remaining Steps ({remainingTasks.length})
            </h3>
          </div>

          {remainingTasks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {remainingTasks.map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: '0.75rem 0.9rem',
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                      Day 0{t.dayNumber}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
                      {t.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--primary-dark)', fontSize: '0.9rem', fontWeight: 600 }}>
              🎉 Zero tasks remaining! All daily goals completed.
            </div>
          )}
        </div>
      </div>

      {/* Honest Scope Note */}
      <div style={{
        padding: '1.25rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.88rem',
        color: 'var(--text-muted)',
        lineHeight: 1.55
      }}>
        <strong style={{ color: 'var(--text)' }}>Honest Productivity Metrics:</strong> NextStep measures progress exclusively by the completion of your seven agreed starter steps. We do not manufacture fake productivity scores, inflated streak counters, or speculative time-saved estimates. Real momentum comes from doing the work.
      </div>
    </div>
  );
};
