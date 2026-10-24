import React from 'react';
import { Plan, ViewType } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  PlusCircle, 
  Activity,
  Flame,
  Check,
  Home,
  Target,
  Zap,
  BookMarked,
  Award,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface OverviewViewProps {
  plan: Plan | null;
  onNavigate: (view: ViewType) => void;
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
      <div style={{ padding: '3rem 1.25rem', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--surface-sage)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Flame size={30} />
          </div>
          <h2 className="serif-heading" style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', marginBottom: '0.65rem' }}>
            Welcome to NextStep
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            NextStep turns overwhelming ambitions into an obvious seven-day daily sprint. Create your first plan to activate your dashboard.
          </p>
          <button
            onClick={onOpenCreate}
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '0.9rem 2rem', gap: '0.55rem' }}
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
  const upcomingTasks = plan.tasks.filter((t) => !t.completed && t.id !== todayTask.id).slice(0, 3);

  // Derive current sprint phase
  const currentPhase = todayTask.dayNumber <= 2
    ? 'Phase 1: Foundation & Setup'
    : todayTask.dayNumber <= 5
    ? 'Phase 2: Core Execution & Build'
    : 'Phase 3: Review, Polish & Synthesis';

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. TOP CONTEXTUAL HEADER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Active 7-Day Sprint Dashboard
            </span>
          </div>

          <h1 className="serif-heading" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: 'var(--primary-dark)', margin: 0, lineHeight: 1.2 }}>
            {plan.goal}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
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
              Started {new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="btn-ghost"
            style={{ fontSize: '0.86rem', padding: '0.5rem 0.9rem', gap: '0.4rem' }}
            title="Return to Public Website Homepage"
          >
            <Home size={15} />
            <span>Public Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('plans')}
            className="btn-secondary"
            style={{ fontSize: '0.86rem', padding: '0.55rem 1.15rem', gap: '0.45rem' }}
          >
            <span>Full 7-Day Plan</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={onOpenCreate}
            className="btn-primary"
            style={{ fontSize: '0.86rem', padding: '0.55rem 1.15rem', gap: '0.45rem', background: 'var(--primary-dark)' }}
          >
            <PlusCircle size={15} />
            <span>New Plan</span>
          </button>
        </div>
      </div>

      {/* 2. EXECUTIVE 4-METRIC KPI BAR (NO EMPTY SPACE) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        {/* Metric 1: Sprint Velocity */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', fontWeight: 700 }}>
              Sprint Velocity
            </span>
            <TrendingUp size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.1 }}>
            {completedCount} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ 7 days</span>
          </div>
          <div style={{ marginTop: '0.65rem' }}>
            <div style={{ height: '6px', background: 'var(--surface-sage-light)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, var(--primary) 0%, #10B981 100%)',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '0.3rem', display: 'block' }}>
              {progressPercent}% of target sprint completed
            </span>
          </div>
        </div>

        {/* Metric 2: Today's Priority */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', fontWeight: 700 }}>
              Current Mission
            </span>
            <Target size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
            Day 0{todayTask.dayNumber}
          </div>
          <div style={{ marginTop: '0.65rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              color: todayTask.completed ? '#059669' : '#D97706',
              background: todayTask.completed ? '#ECFDF5' : '#FFFBEB',
              padding: '0.2rem 0.55rem',
              borderRadius: '4px'
            }}>
              {todayTask.completed ? '✓ Action Completed Today' : '⚡ Action Item Pending'}
            </span>
          </div>
        </div>

        {/* Metric 3: Timebox Budget */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', fontWeight: 700 }}>
              Daily Timebox
            </span>
            <Clock size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
            35–45 <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>min</span>
          </div>
          <div style={{ marginTop: '0.65rem' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
              1 focused daily action · No multi-tasking
            </span>
          </div>
        </div>

        {/* Metric 4: Sprint Phase */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', fontWeight: 700 }}>
              Sprint Architecture
            </span>
            <Zap size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.25, marginTop: '0.2rem' }}>
            {currentPhase}
          </div>
          <div style={{ marginTop: '0.65rem' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
              Deterministic sequence for maximal clarity
            </span>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE 7-DAY PROGRESS TRACK (PANORAMIC STEPPER) */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.4rem clamp(1.2rem, 3vw, 1.8rem)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.08rem', color: 'var(--primary-dark)', margin: 0, fontWeight: 700 }}>
              7-Day Sprint Progression Timeline
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Click any day node to toggle completion or advance momentum
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className="btn-ghost"
            style={{ fontSize: '0.82rem', padding: '0.3rem 0.6rem', color: 'var(--primary)' }}
          >
            <span>Detailed Analytics →</span>
          </button>
        </div>

        {/* Connected Step Track */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 'clamp(0.4rem, 1.5vw, 1rem)',
          textAlign: 'center'
        }}>
          {plan.tasks.map((t) => {
            const isToday = t.id === todayTask.id;
            return (
              <div 
                key={t.id} 
                style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '0.45rem',
                  padding: '0.65rem 0.35rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isToday ? 'var(--surface-sage-light)' : 'transparent',
                  border: isToday ? '1px solid var(--surface-sage)' : '1px solid transparent'
                }}
              >
                <button
                  type="button"
                  onClick={() => onToggleTask(t.id)}
                  title={`Day 0${t.dayNumber}: ${t.title} (${t.completed ? 'Done' : 'Pending'})`}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: t.completed ? 'var(--primary)' : isToday ? 'var(--primary-dark)' : 'var(--surface)',
                    border: `2px solid ${t.completed ? 'var(--primary)' : isToday ? 'var(--primary-dark)' : 'var(--border)'}`,
                    color: t.completed || isToday ? '#FFFFFF' : 'var(--text-light)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: isToday ? '0 0 0 3px var(--surface), 0 0 0 5px var(--primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  {t.completed ? <Check size={18} strokeWidth={3} /> : `0${t.dayNumber}`}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: isToday ? 700 : 600, color: isToday ? 'var(--primary-dark)' : 'var(--text-main)' }}>
                    Day {t.dayNumber}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: isToday ? 'var(--primary)' : 'var(--text-light)', fontWeight: isToday ? 700 : 400 }}>
                    {isToday ? 'Today' : t.completed ? 'Done' : 'Upcoming'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN DASHBOARD CONTENT GRID (2 BALANCED COLUMNS) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        
        {/* LEFT COLUMN: Today's Action + Strategic Reflection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Today's Focus Action Card */}
          <div style={{
            background: 'var(--surface)',
            border: '2px solid var(--primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(30, 58, 43, 0.08)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={13} />
                <span>Today&apos;s Focus • Day 0{todayTask.dayNumber}</span>
              </span>

              <button
                type="button"
                onClick={() => onNavigate('today')}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.25rem 0.5rem', color: 'var(--primary)' }}
              >
                <span>Open Today View →</span>
              </button>
            </div>

            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.35, fontWeight: 700 }}>
              {todayTask.title}
            </h2>

            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {todayTask.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.1rem',
              borderTop: '1px solid var(--border-light)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                  Current Status
                </span>
                <strong style={{ fontSize: '0.9rem', color: todayTask.completed ? '#059669' : 'var(--text-main)' }}>
                  {todayTask.completed ? '✓ Completed' : 'Pending Action Item'}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => onToggleTask(todayTask.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: todayTask.completed ? '1px solid var(--primary)' : 'none',
                  background: todayTask.completed ? 'var(--surface-sage-light)' : 'var(--primary)',
                  color: todayTask.completed ? 'var(--primary-dark)' : '#FFFFFF',
                  boxShadow: todayTask.completed ? 'none' : '0 4px 14px rgba(36, 107, 82, 0.25)',
                  transition: 'var(--transition)'
                }}
              >
                {todayTask.completed ? (
                  <>
                    <CheckCircle2 size={17} color="var(--primary)" />
                    <span>Completed! (Click to reopen)</span>
                  </>
                ) : (
                  <>
                    <Check size={17} />
                    <span>Mark as Done Today</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Weekly Synthesis & Reflection Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <BookMarked size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.08rem', color: 'var(--primary-dark)', margin: 0, fontWeight: 700 }}>
                Weekly Reflection &amp; Synthesis
              </h3>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.15rem' }}>
              True momentum compounds when you document insights. Record what went well this week, what blocked your progress, and your takeaways for the next cycle.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)'
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>
                  Reflection Status
                </span>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                  {plan.reflections && plan.reflections.length > 0 
                    ? `${plan.reflections.length} Reflection Entry Saved` 
                    : 'Ready for your Day 7 review'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('reflection')}
                className="btn-secondary"
                style={{ fontSize: '0.84rem', padding: '0.45rem 0.95rem' }}
              >
                <span>Open Reflection →</span>
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sequential Pipeline + Activity + Guidelines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Upcoming Sequential Pipeline */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                Next on Deck
              </h3>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-light)', fontWeight: 600 }}>
                Sequential Order
              </span>
            </div>

            {upcomingTasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      padding: '0.9rem',
                      background: 'var(--bg)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'var(--surface-sage)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      flexShrink: 0
                    }}>
                      Day 0{task.dayNumber}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>
                        {task.title}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, display: 'block' }}>
                        {task.description.slice(0, 85)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '1.5rem',
                textAlign: 'center',
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary-dark)',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={26} style={{ margin: '0 auto 0.4rem auto' }} />
                <strong>All upcoming tasks completed!</strong>
                <p style={{ fontSize: '0.82rem', margin: '0.35rem 0 0 0', color: 'var(--text-muted)' }}>
                  You have cleared the sequential pipeline for this sprint.
                </p>
              </div>
            )}
          </div>

          {/* Genuine Recent Activity Audit Trail */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
              <Activity size={17} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                Recent Plan Activity
              </h3>
            </div>

            {plan.activities && plan.activities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {plan.activities.slice(0, 5).map((act) => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.84rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid var(--border-light)'
                    }}
                  >
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                      {act.message}
                    </span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
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

          {/* Sprint Execution Guidelines Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Award size={17} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                The 7-Day Sprint Rules
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>01</span>
                <span><strong>Single-Task Focus:</strong> Do not look ahead to Day 07 until Day 01 through Day 06 are completed.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>02</span>
                <span><strong>40-Minute Daily Box:</strong> Protect 40 uninterrupted minutes in the morning.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>03</span>
                <span><strong>Zero-Guilt Restarts:</strong> If you miss a day, simply resume from your next pending action.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
