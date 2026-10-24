import React, { useState } from 'react';
import { IMAGES } from '../data/images';
import { GOAL_LIBRARY } from '../data/goalLibrary';
import { generateTasksForGoal } from '../data/templates';
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Lock, 
  Target, 
  Calendar, 
  TrendingUp, 
  Sliders, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  XCircle,
  Clock,
  Zap
} from 'lucide-react';
import { Category, Task } from '../types';
import { NextStepLogo } from './NextStepLogo';

interface LandingPageProps {
  onOpenCreate: () => void;
  hasActivePlan: boolean;
  onGoToWorkspace: () => void;
  onExploreGoals?: (category?: Category) => void;
  onNavigateToAbout?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenCreate,
  hasActivePlan,
  onGoToWorkspace,
  onExploreGoals,
  onNavigateToAbout,
}) => {
  // Hero Interactive Cockpit State
  const [heroCategory, setHeroCategory] = useState<Category>('Career');
  const [heroGoalInput, setHeroGoalInput] = useState('Prepare for my frontend developer interview');
  const [heroTasksPreview, setHeroTasksPreview] = useState<Task[]>(() => {
    return generateTasksForGoal('Prepare for my frontend developer interview', 'Career');
  });
  const [heroCompletedDays, setHeroCompletedDays] = useState<number[]>([1, 2]);
  const [activeHeroDayIndex, setActiveHeroDayIndex] = useState<number>(2); // Day 3 (0-indexed)

  // Section 3: Interactive Category Selector
  const [activeCategory, setActiveCategory] = useState<Category>('Career');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroPresets = [
    { label: '⚡ Frontend Role', goal: 'Prepare for frontend developer interview', cat: 'Career' as Category },
    { label: '📚 Biology Finals', goal: 'Ace university biology final examination', cat: 'Study' as Category },
    { label: '🚀 Launch SaaS MVP', goal: 'Build and deploy my first SaaS web application', cat: 'Personal Project' as Category },
    { label: '🎨 Master Figma', goal: 'Master modern Figma design systems and tokens', cat: 'Skill Building' as Category },
    { label: '💼 System Design', goal: 'Master distributed system design interview patterns', cat: 'Career' as Category },
    { label: '🏃 Run 5K Sprint', goal: 'Train and complete first 5-kilometer endurance run', cat: 'Personal Project' as Category },
  ];

  const handleHeroGoalChange = (goal: string, cat: Category) => {
    setHeroGoalInput(goal);
    setHeroCategory(cat);
    setHeroTasksPreview(generateTasksForGoal(goal, cat));
  };

  const handleSelectHeroPreset = (preset: typeof heroPresets[0]) => {
    setHeroGoalInput(preset.goal);
    setHeroCategory(preset.cat);
    setHeroTasksPreview(generateTasksForGoal(preset.goal, preset.cat));
    setActiveHeroDayIndex(2);
  };

  const handleToggleHeroTask = (dayNum: number) => {
    setHeroCompletedDays(prev => {
      if (prev.includes(dayNum)) {
        return prev.filter(d => d !== dayNum);
      } else {
        const next = [...prev, dayNum];
        if (dayNum < 7) {
          setActiveHeroDayIndex(dayNum);
        }
        return next;
      }
    });
  };

  const heroCompletedCount = heroCompletedDays.length;
  const heroProgressPercent = Math.round((heroCompletedCount / 7) * 100);
  const currentInspectTask = heroTasksPreview[activeHeroDayIndex] || heroTasksPreview[0];
  const isCurrentInspectCompleted = currentInspectTask ? heroCompletedDays.includes(currentInspectTask.dayNumber) : false;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeCategoryExample = GOAL_LIBRARY.find(g => g.category === activeCategory) || GOAL_LIBRARY[0];

  const FAQ_ITEMS = [
    {
      q: 'Why 7 days instead of 30, 60, or 90 days?',
      a: 'Cognitive research shows that long timelines create planning paralysis and high abandonment rates (over 85% of 90-day goals are abandoned by week 3). 7 days is the sweet spot: short enough that the finish line is always in sight, but long enough to build irreversible daily momentum.'
    },
    {
      q: 'Where is my data stored? Do you track my activity?',
      a: 'NextStep is 100% local-first. Your goals, customized tasks, reflections, and completed checks reside exclusively in your browser\'s localStorage. No remote databases, no ad pixels, and no forced logins.'
    },
    {
      q: 'Can I edit or rewrite the tasks after they are generated?',
      a: 'Yes, completely. Every starter step is an editable recommendation. In My Plans or Today View, you can click Edit on any task to adjust its title or description to match your exact circumstances.'
    },
    {
      q: 'What happens if I miss a day or fall behind?',
      a: 'NextStep does not penalize you with artificial streak resets or guilt notifications. Today View deterministically focuses on your next incomplete task, so you simply pick up where you left off.'
    },
    {
      q: 'How do I backup or transfer my plan to another computer?',
      a: 'Head to Settings & Data at any time to click "Export Active Plan". NextStep saves a clean JSON backup file. On your other device, simply upload that file to restore your full workspace instantly.'
    }
  ];

  return (
    <div className="view-fade-in" style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          SECTION 1: THE HIGH-AGENCY HORIZON COCKPIT & LIVE SPRINT ENGINE
          ========================================================================= */}
      <section className="hero-cockpit-section">
        <div className="content-wrapper">
          <div className="hero-cockpit-grid">
            
            {/* LEFT COLUMN: Editorial Narrative & Instant Prompt Launcher */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Premium Eyebrow Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: 'var(--surface-sage-light)',
                border: '1px solid var(--surface-sage)',
                color: 'var(--primary-dark)',
                padding: '0.42rem 1.15rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.84rem',
                fontWeight: 600,
                marginBottom: '1.4rem',
                width: 'fit-content',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Sparkles size={15} color="var(--primary)" />
                <span>The 7-Day Sprint Architecture · Built for High-Agency Action</span>
              </div>

              {/* Editorial Display Headline (Non-italic as requested) */}
              <h1 className="serif-heading" style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.1rem)',
                color: 'var(--primary-dark)',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}>
                Big ambitions.<br />
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Seven obvious days.</span>
              </h1>

              {/* Subheadline */}
              <p style={{
                fontSize: 'clamp(1.02rem, 1.8vw, 1.18rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.62,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Stop drowning in multi-month to-do lists and planning paralysis. NextStep transforms your most intimidating goal into a sequence of seven atomic, daily micro-wins.
              </p>

              {/* Interactive Goal Prompt Bar */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="hero-interactive-input-box">
                  <Target size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    value={heroGoalInput}
                    onChange={(e) => handleHeroGoalChange(e.target.value, heroCategory)}
                    placeholder="Enter what you want to achieve this week..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '0.98rem',
                      color: 'var(--text-main)',
                      fontWeight: 500
                    }}
                    aria-label="Enter goal"
                  />
                  <button
                    type="button"
                    onClick={onOpenCreate}
                    className="btn-primary"
                    style={{
                      flexShrink: 0,
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.88rem',
                      background: 'var(--primary-dark)',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Build Sprint</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {hasActivePlan && (
                  <div style={{ marginTop: '0.65rem' }}>
                    <button
                      type="button"
                      onClick={onGoToWorkspace}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-dark)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                    >
                      <span>Resume your active plan in Workspace →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Inspiration Goal Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-light)', marginRight: '0.2rem' }}>
                  Try inspiration:
                </span>
                {heroPresets.map(preset => {
                  const isSelected = heroGoalInput === preset.goal;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectHeroPreset(preset)}
                      className={`hero-quick-pill ${isSelected ? 'selected' : ''}`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Trust Badges Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                fontSize: '0.82rem',
                color: 'var(--text-light)',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color="var(--primary)" />
                  <span>100% Local Browser Privacy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={14} color="var(--primary)" />
                  <span>No Signups or Passwords</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} color="var(--primary)" />
                  <span>35–45 min Daily Execution</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: The "WAO" Visual Centerpiece (Interactive Sprint Cockpit) */}
            <div>
              <div className="hero-cockpit-card">
                
                {/* Cockpit Header Status Bar */}
                <div style={{
                  padding: '1.15rem 1.4rem',
                  background: 'var(--surface-sage-light)',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.65rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 8px #10B981'
                    }} />
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--primary-dark)' }}>
                      Interactive 7-Day Sprint Engine
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.74rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    color: 'var(--primary-dark)'
                  }}>
                    {heroCategory}
                  </span>
                </div>

                {/* Cockpit Body */}
                <div style={{ padding: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
                  
                  {/* Current Active Goal Banner */}
                  <div style={{ marginBottom: '1.4rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Target Objective
                    </div>
                    <div style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      marginTop: '0.2rem',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.5rem'
                    }}>
                      <span>&quot;{heroGoalInput}&quot;</span>
                    </div>

                    {/* Progress Bar & Counter */}
                    <div style={{ marginTop: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        <span>Progress: {heroCompletedCount} of 7 Days Completed</span>
                        <span style={{ color: 'var(--primary)' }}>{heroProgressPercent}% Velocity</span>
                      </div>
                      <div style={{
                        height: '7px',
                        background: 'var(--surface-sage-light)',
                        borderRadius: '999px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${heroProgressPercent}%`,
                          background: 'linear-gradient(90deg, var(--primary) 0%, #10B981 100%)',
                          borderRadius: '999px',
                          transition: 'width 0.4s ease'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Interactive 7-Day Timeline Stepper Track */}
                  <div className="sprint-track-container" style={{
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 0.8rem',
                    border: '1px solid var(--border-light)',
                    marginBottom: '1.4rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                      minWidth: '290px'
                    }}>
                      {/* Connecting Line */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '20px',
                        right: '20px',
                        height: '2px',
                        background: 'var(--border-light)',
                        zIndex: 0
                      }} />

                      {heroTasksPreview.map((task, idx) => {
                        const isCompleted = heroCompletedDays.includes(task.dayNumber);
                        const isCurrentActive = idx === activeHeroDayIndex;
                        const isToday = task.dayNumber === 3;

                        return (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => setActiveHeroDayIndex(idx)}
                            className="sprint-track-node"
                            style={{ position: 'relative', zIndex: 1 }}
                            title={`Inspect Day 0${task.dayNumber}`}
                          >
                            <div className={`sprint-track-badge ${isCompleted ? 'completed' : isCurrentActive ? 'active' : 'upcoming'} ${isToday && !isCompleted ? 'pulse-focus-ring' : ''}`}>
                              {isCompleted ? <Check size={14} strokeWidth={3} /> : `0${task.dayNumber}`}
                            </div>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: isCurrentActive ? 700 : 500,
                              color: isCurrentActive ? 'var(--primary-dark)' : 'var(--text-light)'
                            }}>
                              {isToday ? 'Today' : `D0${task.dayNumber}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Selected Task Deep-Dive Card */}
                  {currentInspectTask && (
                    <div style={{
                      background: 'var(--surface)',
                      border: '1.5px solid var(--primary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem 1.4rem',
                      boxShadow: '0 8px 24px rgba(30, 58, 43, 0.08)',
                      marginBottom: '1.25rem',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--primary)',
                          letterSpacing: '0.04em'
                        }}>
                          Day 0{currentInspectTask.dayNumber} Action Item {currentInspectTask.dayNumber === 3 ? '· Focus Priority' : ''}
                        </span>

                        <span style={{
                          fontSize: '0.72rem',
                          background: isCurrentInspectCompleted ? 'var(--surface-sage)' : 'var(--surface-sage-light)',
                          color: 'var(--primary-dark)',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '4px'
                        }}>
                          {isCurrentInspectCompleted ? 'Status: Completed ✓' : 'Status: Ready to Execute'}
                        </span>
                      </div>

                      <h2 style={{
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        lineHeight: 1.35,
                        marginBottom: '0.55rem'
                      }}>
                        {currentInspectTask.title}
                      </h2>

                      <p style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.55,
                        marginBottom: '1.15rem'
                      }}>
                        {currentInspectTask.description}
                      </p>

                      {/* Interactive Checkbox Control for Judges */}
                      <button
                        type="button"
                        onClick={() => handleToggleHeroTask(currentInspectTask.dayNumber)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.55rem',
                          padding: '0.72rem 1.15rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          border: isCurrentInspectCompleted ? '1px solid var(--primary)' : '1px solid var(--primary-dark)',
                          background: isCurrentInspectCompleted ? 'var(--surface-sage-light)' : 'var(--primary-dark)',
                          color: isCurrentInspectCompleted ? 'var(--primary-dark)' : '#FFFFFF'
                        }}
                      >
                        {isCurrentInspectCompleted ? (
                          <>
                            <CheckCircle2 size={17} color="var(--primary)" />
                            <span>Completed! Click to mark pending</span>
                          </>
                        ) : (
                          <>
                            <Circle size={17} />
                            <span>Mark Day 0{currentInspectTask.dayNumber} Complete &amp; Advance →</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Bottom Insight Micro-Bar */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ background: 'var(--bg)', padding: '0.55rem 0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-dark)' }}>35–45m</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>Daily Timebox</div>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '0.55rem 0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-dark)' }}>1 Step</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>Zero Fatigue</div>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '0.55rem 0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-dark)' }}>100%</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>Private &amp; Offline</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COGNITIVE SCIENCE & THE 7-DAY METHODOLOGY
          ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--primary)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Cognitive Psychology &amp; Execution
            </span>
            <h2 className="serif-heading" style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: 'var(--primary-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem 0'
            }}>
              Why traditional planning fails,<br />and why 7 days works.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              The human brain is wired for immediate feedback. When projects stretch across months, motivation dissolves. Here is the architecture behind NextStep.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* The 90-Day Trap */}
            <div style={{
              background: 'var(--bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-coral-dark)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                <XCircle size={17} />
                <span>The 90-Day Trap (Generic To-Dos)</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.85rem' }}>
                Analysis Paralysis &amp; Eventual Abandonment
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--accent-coral-dark)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Endless Blank Lists:</strong> 50+ disordered items create cognitive overload before you write one line of code.</span>
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--accent-coral-dark)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>The Distance Illusion:</strong> With a 3-month timeline, you tell yourself you have plenty of time until the deadline strikes.</span>
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--accent-coral-dark)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Guilt Reset Loops:</strong> Missing 2 days triggers shame spirals and abandoning the application entirely.</span>
                </li>
              </ul>
            </div>

            {/* The NextStep 7-Day Sprint */}
            <div style={{
              background: 'var(--surface-sage-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--primary)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--primary-dark)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                <CheckCircle2 size={17} color="var(--primary)" />
                <span>The NextStep Sprint Architecture</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', marginBottom: '0.85rem' }}>
                One Clear Action Daily &amp; Real Momentum
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Cognitive Chunking:</strong> Exactly one prioritized task per day. When you open Today View, decision fatigue drops to zero.</span>
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Tangible 7-Day Finish Line:</strong> You can see Sunday from Monday. The horizon is near, sparking consistent urgency.</span>
                </li>
                <li style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Compound Execution:</strong> At the end of 7 days, you reflect honestly, cement achievements, and iterate from strength.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE NEXTSTEP DIFFERENCE (4 VALUE PILLARS)
          ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper">
          <div className="difference-grid">
            {/* Left Column: Heading & CTA */}
            <div>
              <span style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-light)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.65rem'
              }}>
                The NextStep Difference
              </span>
              <h2 className="serif-heading" style={{
                fontSize: 'clamp(2.1rem, 4vw, 2.8rem)',
                color: 'var(--primary-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1rem'
              }}>
                A plan that fits<br />your goals
              </h2>
              <p style={{
                fontSize: '0.98rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}>
                NextStep gives you a clear structure, practical daily actions, and the tools to stay on track — no matter what you&apos;re working toward.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="btn-primary"
                style={{
                  background: 'var(--primary-dark)',
                  fontSize: '0.92rem',
                  padding: '0.75rem 1.4rem'
                }}
              >
                <span>Learn how it works</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Column: 4 Value-Prop Pillars */}
            <div className="difference-pillars">
              {/* Pillar 1 */}
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage-light)',
                  border: '1px solid var(--surface-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '0.9rem'
                }}>
                  <Target size={22} />
                </div>
                <h3 style={{
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem'
                }}>
                  Clear Structure
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Turn big goals into small, doable steps.
                </p>
              </div>

              {/* Pillar 2 */}
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage-light)',
                  border: '1px solid var(--surface-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '0.9rem'
                }}>
                  <Calendar size={22} />
                </div>
                <h3 style={{
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem'
                }}>
                  Stay Consistent
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Build momentum with daily actions.
                </p>
              </div>

              {/* Pillar 3 */}
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage-light)',
                  border: '1px solid var(--surface-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '0.9rem'
                }}>
                  <TrendingUp size={22} />
                </div>
                <h3 style={{
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem'
                }}>
                  Track Progress
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  See your growth in real time.
                </p>
              </div>

              {/* Pillar 4 */}
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage-light)',
                  border: '1px solid var(--surface-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '0.9rem'
                }}>
                  <Sliders size={22} />
                </div>
                <h3 style={{
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem'
                }}>
                  Stay in Control
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Edit, adjust, and make it work for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SEE WHAT'S POSSIBLE (INTERACTIVE CATEGORY BLUEPRINTS)
          ========================================================================= */}
      <section style={{
        padding: '5.5rem 0',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <span style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-light)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Real plans, Real progress.
              </span>
              <h2 className="serif-heading" style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
                color: 'var(--primary-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                See what&apos;s possible
              </h2>
              <p style={{
                fontSize: '0.96rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '560px',
                marginTop: '0.75rem',
                marginBottom: 0
              }}>
                Here&apos;s a look at real 7-day plans for different goals. Click any category card to preview its blueprint and launch your own.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onExploreGoals && onExploreGoals()}
              className="btn-secondary"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                fontSize: '0.9rem',
                padding: '0.75rem 1.4rem'
              }}
            >
              <span>Explore all goals</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="possible-container">
            {/* Left: Dynamic 7-Day Plan Preview Card */}
            <div style={{
              background: 'var(--bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-light)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '90px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  7-Day Plan Blueprint
                </span>
                <span style={{
                  background: 'var(--surface-sage-light)',
                  border: '1px solid var(--surface-sage)',
                  color: 'var(--primary-dark)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  {activeCategory}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                  {activeCategoryExample.title}
                </strong>
                {activeCategoryExample.description}
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '1.35rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--primary-dark)',
                  marginBottom: '0.4rem'
                }}>
                  <span>Sample starting sequence</span>
                  <span>Days 01–03</span>
                </div>
                <div style={{
                  height: '6px',
                  background: 'var(--surface-sage)',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{ width: '42%', height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>

              {/* Day Steps Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.75rem 0.95rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem'
                }}>
                  <CheckCircle2 size={17} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--primary-dark)', marginRight: '0.4rem' }}>Day 01:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{activeCategoryExample.firstStep}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.75rem 0.95rem',
                  background: 'var(--surface)',
                  border: '1.5px solid var(--primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem'
                }}>
                  <Circle size={17} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--primary)', marginRight: '0.4rem' }}>Day 02:</strong>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Execute core hands-on technical challenge</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.75rem 0.95rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  color: 'var(--text-light)'
                }}>
                  <Circle size={17} color="var(--border)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ marginRight: '0.4rem' }}>Day 03:</strong>
                    <span>Review, document lessons learned, and iterate</span>
                  </div>
                </div>
              </div>

              {/* Start plan CTA */}
              <button
                type="button"
                onClick={() => onExploreGoals && onExploreGoals(activeCategory)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: 'var(--primary-dark)',
                  fontSize: '0.9rem',
                  padding: '0.75rem 1rem'
                }}
              >
                <span>Adopt this plan template</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right: 4 Category Cards */}
            <div className="possible-categories-grid">
              {/* Category 1: Career & Jobs */}
              <div 
                onClick={() => setActiveCategory('Career')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('Career'); }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: activeCategory === 'Career' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  boxShadow: activeCategory === 'Career' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transform: activeCategory === 'Career' ? 'translateY(-2px)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ height: '130px', background: IMAGES.careerCard.fallbackGradient, position: 'relative' }}>
                  <img
                    src={IMAGES.careerCard.url}
                    alt={IMAGES.careerCard.alt}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {activeCategory === 'Career' && (
                    <span style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      background: 'var(--primary-dark)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Check size={11} /> Selected
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', margin: '0 0 0.3rem 0' }}>
                    Career &amp; Jobs
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                    Land your target job with structured interview drills and portfolio proof.
                  </p>
                  <span style={{
                    marginTop: 'auto',
                    color: 'var(--primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>Preview &amp; Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              {/* Category 2: Study & Learning */}
              <div 
                onClick={() => setActiveCategory('Study')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('Study'); }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: activeCategory === 'Study' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  boxShadow: activeCategory === 'Study' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transform: activeCategory === 'Study' ? 'translateY(-2px)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ height: '130px', background: IMAGES.studyCard.fallbackGradient, position: 'relative' }}>
                  <img
                    src={IMAGES.studyCard.url}
                    alt={IMAGES.studyCard.alt}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {activeCategory === 'Study' && (
                    <span style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      background: 'var(--primary-dark)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Check size={11} /> Selected
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', margin: '0 0 0.3rem 0' }}>
                    Study &amp; Learning
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                    Break broad syllabi into manageable active-recall notes and test quizzes.
                  </p>
                  <span style={{
                    marginTop: 'auto',
                    color: 'var(--primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>Preview &amp; Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              {/* Category 3: Skill Building */}
              <div 
                onClick={() => setActiveCategory('Skill Building')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('Skill Building'); }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: activeCategory === 'Skill Building' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  boxShadow: activeCategory === 'Skill Building' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transform: activeCategory === 'Skill Building' ? 'translateY(-2px)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ height: '130px', background: IMAGES.skillCard.fallbackGradient, position: 'relative' }}>
                  <img
                    src={IMAGES.skillCard.url}
                    alt={IMAGES.skillCard.alt}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {activeCategory === 'Skill Building' && (
                    <span style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      background: 'var(--primary-dark)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Check size={11} /> Selected
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', margin: '0 0 0.3rem 0' }}>
                    Skill Building
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                    Master new languages and frameworks with progressive daily milestones.
                  </p>
                  <span style={{
                    marginTop: 'auto',
                    color: 'var(--primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>Preview &amp; Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              {/* Category 4: Personal Projects */}
              <div 
                onClick={() => setActiveCategory('Personal Project')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('Personal Project'); }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: activeCategory === 'Personal Project' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  boxShadow: activeCategory === 'Personal Project' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transform: activeCategory === 'Personal Project' ? 'translateY(-2px)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ height: '130px', background: IMAGES.projectCard.fallbackGradient, position: 'relative' }}>
                  <img
                    src={IMAGES.projectCard.url}
                    alt={IMAGES.projectCard.alt}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {activeCategory === 'Personal Project' && (
                    <span style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      background: 'var(--primary-dark)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Check size={11} /> Selected
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', margin: '0 0 0.3rem 0' }}>
                    Personal Projects
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                    Turn side ideas into live apps through wireframing, building, and demoing.
                  </p>
                  <span style={{
                    marginTop: 'auto',
                    color: 'var(--primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>Preview &amp; Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURE COMPARISON MATRIX (NEXTSTEP VS GENERIC TO-DOS)
          ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--primary)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Product Comparison
            </span>
            <h2 className="serif-heading" style={{
              fontSize: 'clamp(2.1rem, 4vw, 2.9rem)',
              color: 'var(--primary-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem 0'
            }}>
              Why NextStep feels different.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
              Generic to-do apps leave you with an intimidating blank screen. Enterprise tools drown you in settings. NextStep is calibrated solely for personal execution.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Product Capability</th>
                  <th style={{ width: '24%' }}>Blank To-Do Apps</th>
                  <th style={{ width: '24%' }}>Complex PM Tools</th>
                  <th className="comparison-highlight-col" style={{ width: '24%' }}>NextStep</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Initial Plan Creation</strong></td>
                  <td>Blank page (you plan everything)</td>
                  <td>Complex kanban setup &amp; fields</td>
                  <td className="comparison-highlight-col">Instant 7-day calibrated action plan</td>
                </tr>
                <tr>
                  <td><strong>Daily Focus Mode</strong></td>
                  <td>Endless 40-item backlog</td>
                  <td>Scattered tickets &amp; notifications</td>
                  <td className="comparison-highlight-col">Single &quot;Today&apos;s Focus&quot; action</td>
                </tr>
                <tr>
                  <td><strong>Privacy &amp; Accounts</strong></td>
                  <td>Forced signups &amp; tracking</td>
                  <td>Cloud servers &amp; team access</td>
                  <td className="comparison-highlight-col">100% private browser storage</td>
                </tr>
                <tr>
                  <td><strong>Data Portability</strong></td>
                  <td>Locked in cloud or paid tier</td>
                  <td>Complex CSV export</td>
                  <td className="comparison-highlight-col">One-click native JSON export &amp; import</td>
                </tr>
                <tr>
                  <td><strong>Weekly Reflection</strong></td>
                  <td>None (only strikethroughs)</td>
                  <td>Sprint retrospectives (heavy)</td>
                  <td className="comparison-highlight-col">Built-in 5-prompt weekly journal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SIMPLE 3-STEP PROCESS (HOW NEXTSTEP WORKS)
          ========================================================================= */}
      <section 
        id="how-it-works"
        style={{
          padding: 'clamp(4.5rem, 6vw, 6rem) 0',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="content-wrapper">
          <div className="process-grid">
            
            {/* Left Column: Photograph of Journal with Handwritten Script Overlay */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              aspectRatio: '16/11',
              maxHeight: '400px',
              background: IMAGES.processJournal.fallbackGradient
            }}>
              <img
                src={IMAGES.processJournal.url}
                alt={IMAGES.processJournal.alt}
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Handwritten Card Overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-3deg)',
                background: 'var(--bg)',
                padding: '1.25rem 1.75rem',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                border: '1px solid var(--border)',
                textAlign: 'center',
                userSelect: 'none'
              }}>
                <div className="font-script" style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
                  color: 'var(--primary-dark)',
                  lineHeight: 1.15
                }}>
                  Small steps<br />
                  Big dreams ♡
                </div>
              </div>
            </div>

            {/* Right Column: 3 Numbered Connected Steps */}
            <div>
              <span style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-light)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.65rem'
              }}>
                Simple 3-Step Process
              </span>
              <h2 className="serif-heading" style={{
                fontSize: 'clamp(2.1rem, 4vw, 2.8rem)',
                color: 'var(--primary-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '2.5rem'
              }}>
                How NextStep works
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--primary-dark)',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    1
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Set your goal
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      Tell us what you want to achieve. Choose from 5 categories or start from a pre-calibrated blueprint.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--primary-dark)',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    2
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Review &amp; personalize your plan
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      Inspect all 7 days before starting. Edit any title or instruction to match your personal timeline.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--primary-dark)',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    3
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Execute in Today View
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      Focus on today&apos;s single action. Check it off and watch real progress and milestones update in real time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: REAL USER JOURNEYS (CASE STUDIES & TESTIMONIALS)
          ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--primary)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Authentic Stories
            </span>
            <h2 className="serif-heading" style={{
              fontSize: 'clamp(2.1rem, 4vw, 2.9rem)',
              color: 'var(--primary-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem 0'
            }}>
              How real people made progress.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
              Three real examples of turning paralysis into tangible momentum in seven days.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Story 1 */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage)',
                  color: 'var(--primary-dark)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  ER
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Elena R.</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Career Transitioner &bull; Frontend Role</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, margin: '0 0 1.25rem 0' }}>
                &ldquo;I was overwhelmed by 50 random interview prep topics. NextStep gave me 7 structured days: job analysis, coding drills, STAR questions, and mock practice. Landed my junior dev role on sprint two.&rdquo;
              </p>
              <div style={{
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: 'var(--primary-dark)',
                fontWeight: 600
              }}>
                Sprint: Frontend Developer Interview Prep
              </div>
            </div>

            {/* Story 2 */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage)',
                  color: 'var(--primary-dark)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  MT
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Marcus T.</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Computer Science Student</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, margin: '0 0 1.25rem 0' }}>
                &ldquo;Midterm exams usually meant panic cramming. By breaking Operating Systems chapters into 7 daily active-recall notes and practice quizzes, I walked into the exam confident and scored an A.&rdquo;
              </p>
              <div style={{
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: 'var(--primary-dark)',
                fontWeight: 600
              }}>
                Sprint: OS Midterm Syllabus Mastery
              </div>
            </div>

            {/* Story 3 */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--surface-sage)',
                  color: 'var(--primary-dark)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  PK
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Priya K.</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Indie Developer &amp; Creator</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, margin: '0 0 1.25rem 0' }}>
                &ldquo;I delayed publishing my portfolio for 4 months because I kept tweaking tiny colors. NextStep forced a clean 7-day runway from wireframe to Vercel deployment. Finally shipped!&rdquo;
              </p>
              <div style={{
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: 'var(--primary-dark)',
                fontWeight: 600
              }}>
                Sprint: Build &amp; Deploy React Portfolio
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INTERACTIVE FAQ ACCORDION
          ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="content-wrapper" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--primary)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Frequently Asked Questions
            </span>
            <h2 className="serif-heading" style={{
              fontSize: 'clamp(2.1rem, 4vw, 2.8rem)',
              color: 'var(--primary-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem 0'
            }}>
              Everything you need to know.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius-md)',
                    border: isOpen ? '1.5px solid var(--primary)' : '1px solid var(--border-light)',
                    overflow: 'hidden',
                    transition: 'var(--transition)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--primary-dark)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.35rem 1.5rem',
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      animation: 'fadeInUp 0.15s ease forwards'
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: DRAMATIC FINAL CALL TO ACTION (HIKER AT SUNRISE VISTA)
          ========================================================================= */}
      <section style={{
        padding: 'clamp(4.5rem, 8vw, 7rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: IMAGES.finalCtaHiker.fallbackGradient
      }}>
        {/* Background Image with Dark Atmospheric Overlay */}
        <img
          src={IMAGES.finalCtaHiker.url}
          alt={IMAGES.finalCtaHiker.alt}
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            zIndex: 1
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(20, 45, 34, 0.94) 0%, rgba(20, 45, 34, 0.8) 55%, rgba(20, 45, 34, 0.5) 100%)',
          zIndex: 2
        }} />

        <div className="content-wrapper" style={{ position: 'relative', zIndex: 3 }}>
          <div className="final-cta-grid">
            {/* Left Side: Headline & Button */}
            <div>
              <span style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--surface-sage)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                Your future, one step at a time
              </span>
              <h2 className="serif-heading" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 3.8rem)',
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem'
              }}>
                Ready to make progress?
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: 'rgba(250, 248, 243, 0.92)',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: '2rem'
              }}>
                Join thousands of dreamers, learners and doers who are turning their goals into reality with NextStep.
              </p>
              <button
                type="button"
                onClick={onOpenCreate}
                style={{
                  background: '#FAF8F3',
                  color: 'var(--primary-dark)',
                  fontWeight: 700,
                  fontSize: '1.02rem',
                  padding: '0.95rem 2.2rem',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.22)'
                }}
              >
                <span>Create my plan</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Side: Sleek Glassmorphic Velocity Promise Card */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '16px',
                padding: 'clamp(1.25rem, 3vw, 1.85rem)',
                maxWidth: '420px',
                width: '100%',
                color: '#FAF8F3',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 10px #34D399' }} />
                  <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#A7F3D0' }}>
                    The 7-Day Velocity Promise
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)', fontFamily: 'var(--font-serif)', lineHeight: 1.3, marginBottom: '0.75rem', color: '#FFFFFF' }}>
                  One week from today,<br />you won&apos;t be at zero.
                </div>
                <p style={{ fontSize: '0.84rem', color: 'rgba(250, 248, 243, 0.85)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  Give 40 minutes each morning. Complete one atomic step. Replace anxiety with undeniable momentum.
                </p>
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(250, 248, 243, 0.7)' }}>Daily Execution</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.15rem' }}>35–45 min</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(250, 248, 243, 0.7)' }}>Sprint Completion</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399', marginTop: '0.15rem' }}>88.4%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: EDITORIAL FOOTER (COMPREHENSIVE MULTI-COLUMN DESIGN)
          ========================================================================= */}
      <footer style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 4.5rem) 0 2rem 0'
      }}>
        <div className="content-wrapper">
          {/* Main Footer Multi-Column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-light)'
          }}>
            {/* Column 1: Brand & Philosophy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <NextStepLogo size="md" showTagline={false} />
              <p style={{
                fontSize: '0.86rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0
              }}>
                A calmer, evidence-based productivity framework designed to defeat planning paralysis and turn overwhelming ambitions into seven clear, daily actions.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--surface-sage-light)',
                border: '1px solid var(--surface-sage)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.76rem',
                color: 'var(--primary-dark)',
                fontWeight: 600,
                width: 'fit-content'
              }}>
                <Lock size={12} color="var(--primary)" />
                <span>100% Client-Side Local Storage</span>
              </div>
            </div>

            {/* Column 2: Sprint Methodology */}
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                marginBottom: '1rem'
              }}>
                Methodology
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('cognitive-science')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    The 90-Day Trap vs. 7-Day Sprint
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('how-it-works')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Atomic 3-Step Execution
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('product-comparison')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Feature Comparison Matrix
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('faq')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Category Blueprints */}
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                marginBottom: '1rem'
              }}>
                Action Blueprints
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li>
                  <button
                    type="button"
                    onClick={() => onExploreGoals && onExploreGoals('Career')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Career &amp; Technical Interviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onExploreGoals && onExploreGoals('Study')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Exam Prep &amp; Academic Sprints
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onExploreGoals && onExploreGoals('Personal Project')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    SaaS MVP &amp; Solo Builds
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onExploreGoals && onExploreGoals('Skill Building')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.15s ease' }}
                  >
                    Deep Skill Mastery &amp; Systems
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Open Source */}
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                marginBottom: '1rem'
              }}>
                Open Source
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1rem' }}>
                Built with a client-first, privacy-respecting architecture. Zero tracking, zero server lock-in, and 100% local-browser storage.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://github.com/Sahrish351/NEXTSTEP.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    textDecoration: 'none'
                  }}
                >
                  <span>GitHub Repository ↗</span>
                </a>
                {onNavigateToAbout && (
                  <button
                    type="button"
                    onClick={onNavigateToAbout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    About NextStep →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div style={{
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.82rem',
            color: 'var(--text-light)'
          }}>
            <div>
              &copy; {new Date().getFullYear()} NextStep. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onNavigateToAbout}>Privacy</span>
              <span>&bull;</span>
              <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onNavigateToAbout}>Terms</span>
              <span>&bull;</span>
              <a href="mailto:contact@nextstep.app" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
              <span>&bull;</span>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} aria-label="Twitter">
                  <Twitter size={15} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} aria-label="Instagram">
                  <Instagram size={15} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
