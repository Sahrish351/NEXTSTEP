import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  CalendarDays, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  FolderKanban
} from 'lucide-react';

interface LandingPageProps {
  onOpenCreate: () => void;
  hasActivePlan: boolean;
  onGoToWorkspace: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenCreate,
  hasActivePlan,
  onGoToWorkspace,
}) => {
  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* Hero Section */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) 0 3rem 0',
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
            <span>Structured Goal-Execution Workspace</span>
          </div>

          <h1 className="serif-heading" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            color: 'var(--primary-dark)',
            maxWidth: '860px',
            margin: '0 auto 1.25rem auto',
            lineHeight: 1.15,
            letterSpacing: '-0.025em'
          }}>
            Make your next step obvious.
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '660px',
            margin: '0 auto 2.25rem auto',
            lineHeight: 1.6
          }}>
            Turn one overwhelming goal into seven manageable daily actions. 
            No blank screens, no complicated tools—just an organized, editable starting path to get you moving and keep you consistent.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenCreate}
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}
            >
              <span>Create my plan</span>
              <ArrowRight size={18} />
            </button>
            {hasActivePlan ? (
              <button
                onClick={onGoToWorkspace}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.9rem 1.6rem' }}
              >
                Go to my workspace →
              </button>
            ) : (
              <a
                href="#how-it-works"
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.9rem 1.6rem' }}
              >
                See how it works
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Plan Preview Section */}
      <section style={{ padding: '1rem 0 3.5rem 0' }}>
        <div className="content-wrapper">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            maxWidth: '880px',
            margin: '0 auto'
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
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', fontWeight: 700 }}>
                  Interactive Workspace Preview
                </span>
                <h3 className="serif-heading" style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
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

            {/* Progress Bar Preview */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>2 of 7 completed (29%)</span>
                <span style={{ color: 'var(--text-muted)' }}>Day 03 is your next focus</span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-sage)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '29%', height: '100%', background: 'var(--primary)', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Task Row Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1rem',
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}>
                <CheckCircle2 size={20} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)', marginRight: '0.45rem' }}>Day 01</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    Analyze role requirements & target skills
                  </strong>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1rem',
                background: 'var(--surface-sage-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}>
                <CheckCircle2 size={20} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)', marginRight: '0.45rem' }}>Day 02</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    Master one foundational technical concept
                  </strong>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.95rem 1rem',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--primary)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid var(--primary)', marginTop: '0.15rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--surface-sage)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      Day 03 • Today's Focus
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
                      Solve one targeted hands-on challenge
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Complete one small code challenge or technical scenario relevant to the role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Problem & 4 Real Use Cases */}
      <section style={{ padding: '3.5rem 0', background: 'rgba(220, 235, 225, 0.35)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Built for Four Tangible Ambitions
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
              NextStep replaces the paralysis of a blank page with structured daily execution.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            {/* Use Case 1 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--surface-sage)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Briefcase size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>Job Seekers</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Break daunting interview prep into 7 sequenced days: job analysis, technical drills, STAR stories, and timed mock sessions.
              </p>
            </div>

            {/* Use Case 2 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--surface-sage)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <BookOpen size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>Students</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Conquer upcoming exams by dividing syllabus topics into daily active-recall notes, practice questions, and past paper reviews.
              </p>
            </div>

            {/* Use Case 3 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--surface-sage)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Wrench size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>Skill Learners</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Master a new tool or programming language through progressive daily milestones from setup to standalone micro-projects.
              </p>
            </div>

            {/* Use Case 4 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--surface-sage)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <FolderKanban size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>Builders &amp; Creators</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Turn ambitious side projects into realistic 7-day runways: scope definition, wireframes, core implementation, polish, and demo.
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
              How NextStep works
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
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.15rem',
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
                Enter what you want to achieve and choose a category. Preview your generated 7-day sequence before launching.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.15rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text)' }}>2. Review &amp; personalize</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Receive structured daily actions. Edit any task title or instructions to match your personal circumstances.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '1.15rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text)' }}>3. Execute day by day</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Use Today View for focused single-action clarity. Check off tasks and watch your progress update in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="content-wrapper">
          <div style={{
            background: 'var(--primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: '#FFFFFF', marginBottom: '0.85rem' }}>
              Ready to take your next step?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              No sign-ups, no passwords, and no fees. Start your 7-day action plan now and keep your momentum in your browser.
            </p>
            <button
              onClick={onOpenCreate}
              style={{
                background: 'var(--bg)',
                color: 'var(--primary-dark)',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '0.9rem 2.2rem',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              Build My 7-Day Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
