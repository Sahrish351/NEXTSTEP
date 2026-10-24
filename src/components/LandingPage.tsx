import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Sliders, CalendarDays } from 'lucide-react';

interface LandingPageProps {
  onCreatePlanClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCreatePlanClick }) => {
  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section style={{
        padding: '3.5rem 0 3rem 0',
        textAlign: 'center',
      }}>
        <div className="content-wrapper">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'var(--surface-sage)',
            color: 'var(--primary-dark)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <CalendarDays size={15} />
            <span>7-Day Structured Action Plans</span>
          </div>

          <h1 className="serif-heading" style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: 'var(--primary-dark)',
            maxWidth: '820px',
            margin: '0 auto 1.25rem auto',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Make your next step obvious.
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '640px',
            margin: '0 auto 2.25rem auto',
            lineHeight: 1.6
          }}>
            Turn one overwhelming goal into seven manageable daily actions. 
            No blank screens, no complicated tools—just an organized, editable starting path to get you moving.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onCreatePlanClick}
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}
            >
              <span>Create my plan</span>
              <ArrowDown size={18} />
            </button>
            <a
              href="#preview"
              className="btn-secondary"
              style={{ fontSize: '1rem', padding: '0.9rem 1.6rem' }}
            >
              See an example
            </a>
          </div>
        </div>
      </section>

      {/* Product Preview Mockup */}
      <section id="preview" style={{ padding: '2rem 0 3.5rem 0' }}>
        <div className="content-wrapper">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  Interactive Preview • Career Goal
                </span>
                <h3 className="serif-heading" style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
                  Prepare for my web development interview
                </h3>
              </div>
              <span style={{
                background: 'var(--surface-sage)',
                color: 'var(--primary-dark)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                Career
              </span>
            </div>

            {/* Preview Progress Bar */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>2 of 7 completed (29%)</span>
                <span style={{ color: 'var(--text-muted)' }}>5 days remaining</span>
              </div>
              <div style={{
                height: '8px',
                background: 'var(--surface-sage)',
                borderRadius: 'var(--radius-pill)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '29%',
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-pill)'
                }} />
              </div>
            </div>

            {/* Preview Tasks (3 items shown) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem 1.1rem',
                background: 'var(--surface-sage-light)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)'
              }}>
                <CheckCircle2 size={20} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Day 01</span>
                    <strong style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                      Analyze role requirements & target skills
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem 1.1rem',
                background: 'var(--surface-sage-light)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)'
              }}>
                <CheckCircle2 size={20} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Day 02</span>
                    <strong style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                      Master one foundational technical concept
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem 1.1rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: '2px solid var(--border)',
                  background: 'var(--surface)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Day 03</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
                      Solve one targeted hands-on challenge
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Complete one code challenge or technical scenario relevant to the job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Benefits */}
      <section style={{ padding: '3rem 0', background: 'rgba(220, 235, 225, 0.35)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '2.1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Why a 7-day starting path works
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto' }}>
              NextStep is engineered to defeat procrastination through immediate, practical structure.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--surface-sage)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                Instant Cognitive Relief
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                Instead of staring at a blank screen wondering what to do first, receive seven logically sequenced daily actions the moment you type your goal.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--surface-sage)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Sliders size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                Editable Starter Scaffolding
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                Our templates provide honest, realistic momentum. Customize any task title or description to match your exact circumstances anytime.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--surface-sage)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                Private &amp; Zero Friction
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                No sign-ups, no passwords, and no server tracking. Your plans stay safely stored in your browser so you can refresh or return whenever you wish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '3.5rem 0' }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '2.1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              How it works
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto' }}>
              Three straightforward steps from initial ambition to tangible daily accomplishment.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text)' }}>1. Name your goal</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Enter what you want to achieve and choose a category (Study, Career, Skill Building, Personal Project, or Other).
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text)' }}>2. Review 7 sequential steps</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Receive an immediate progression from foundational research to active practice and review. Edit any task to fit.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text)' }}>3. Check off daily momentum</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Check off tasks as you finish them each day. Watch your progress percentage rise and return anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

