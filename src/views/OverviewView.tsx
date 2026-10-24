import React from 'react';
import { Plan } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  PlusCircle, 
  Activity,
  Flame,
  Check
} from 'lucide-react';

interface OverviewViewProps {
  plan: Plan | null;
  onNavigate: (view: any) => void;
  onToggleTask: (taskId: string) => void;
  onOpenCreate: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  plan,
  onNavigate,
  onToggleTask,
  onOpenCreate,
}) => {
  if (!plan) {
    return (
      <div style={{ padding: '2.5rem 1.25rem', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--surface-sage)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <Flame size={28} />
          </div>
          <h2 className="serif-heading" style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
            Welcome to NextStep
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 1.75rem auto' }}>
            Turn one real-world goal into seven manageable daily actions and track your momentum.
          </p>
          <button
            onClick={onOpenCreate}
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '0.85rem 1.8rem' }}
          >
            <PlusCircle size={18} />
            <span>Create your first 7-day plan</span>
          </button>
        </div>
      </div>
    );
  }

  const completedCount = plan.tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  // Deterministic rule for Today's Focus: the first incomplete task, or Day 7 if all are complete
  const todayTask = plan.tasks.find((t) => !t.completed) || plan.tasks[6];
  const upcomingTasks = plan.tasks.filter((t) => !t.completed && t.id !== todayTask.id).slice(0, 2);

  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* Top Contextual Greeting */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Overview Dashboard
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
            {plan.goal}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--surface-sage)',
              color: 'var(--primary-dark)',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <Calendar size={13} />
              <span>{plan.category}</span>
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
              Created on {new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('plans')}
          className="btn-secondary"
          style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}
        >
          <span>View Full 7-Day Plan</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Grid: Main Column + Side Column */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Left Column: Today's Focus & Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Focus Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.6rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span style={{
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-pill)'
              }}>
                🎯 Today's Focus • Day 0{todayTask.dayNumber}
              </span>

              <button
                type="button"
                onClick={() => onNavigate('today')}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.25rem 0.5rem', color: 'var(--primary)' }}
              >
                <span>Open in Today View →</span>
              </button>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
              {todayTask.title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              {todayTask.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.9rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Status: <strong>{todayTask.completed ? 'Completed' : 'Pending action'}</strong>
              </span>

              <button
                type="button"
                onClick={() => onToggleTask(todayTask.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: todayTask.completed ? 'var(--surface-sage)' : 'var(--primary)',
                  color: todayTask.completed ? 'var(--primary-dark)' : '#FFFFFF',
                  transition: 'var(--transition)'
                }}
              >
                <Check size={16} />
                <span>{todayTask.completed ? 'Mark Incomplete' : 'Mark as Done Today'}</span>
              </button>
            </div>
          </div>

          {/* 7-Day Completion Timeline */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.4rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                7-Day Progress Track
              </h3>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                {completedCount} of 7 ({progressPercent}%)
              </span>
            </div>

            {/* Visual Dots */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '0.5rem',
              textAlign: 'center'
            }}>
              {plan.tasks.map((t) => (
                <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => onToggleTask(t.id)}
                    title={`Day 0${t.dayNumber}: ${t.title} (${t.completed ? 'Done' : 'Pending'})`}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: t.completed ? 'var(--primary)' : 'var(--surface-sage-light)',
                      border: `2px solid ${t.completed ? 'var(--primary)' : 'var(--border)'}`,
                      color: t.completed ? '#FFFFFF' : 'var(--text-light)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {t.completed ? <Check size={16} /> : `D${t.dayNumber}`}
                  </button>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Day {t.dayNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming & Real Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Upcoming Tasks */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.4rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>
                Next on Deck
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sequential order
              </span>
            </div>

            {upcomingTasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      padding: '0.85rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem'
                    }}
                  >
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'var(--surface-sage)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      flexShrink: 0
                    }}>
                      Day 0{task.dayNumber}
                    </span>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'block' }}>
                        {task.title}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {task.description.slice(0, 80)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '1.25rem',
                textAlign: 'center',
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary-dark)',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 0.35rem auto' }} />
                <span>All upcoming tasks are complete! Outstanding effort.</span>
              </div>
            )}
          </div>

          {/* Genuine Recent Activity */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.4rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
              <Activity size={17} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>
                Recent Plan Activity
              </h3>
            </div>

            {plan.activities && plan.activities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.activities.slice(0, 5).map((act) => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      paddingBottom: '0.45rem',
                      borderBottom: '1px solid var(--border-light)'
                    }}
                  >
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                      {act.message}
                    </span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Clock size={11} />
                      <span>{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No recent activity recorded yet.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

