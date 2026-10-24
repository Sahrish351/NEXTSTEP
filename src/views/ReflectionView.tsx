import React, { useState } from 'react';
import { Plan, Reflection } from '../types';
import { IMAGES } from '../data/images';
import { 
  BookMarked, 
  Send, 
  Trash2, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';

interface ReflectionViewProps {
  plan: Plan | null;
  onSaveReflection: (reflection: Omit<Reflection, 'id' | 'date'>) => void;
  onDeleteReflection: (reflectionId: string) => void;
  onOpenCreate: () => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({
  plan,
  onSaveReflection,
  onDeleteReflection,
  onOpenCreate,
}) => {
  const [wentWell, setWentWell] = useState('');
  const [hardestPart, setHardestPart] = useState('');
  const [blockers, setBlockers] = useState('');
  const [changeNextTime, setChangeNextTime] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!plan) {
    return (
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        maxWidth: '580px',
        margin: '2rem auto'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <BookMarked size={26} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>
          No Active Plan to Reflect On
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          Weekly reflections capture honest learning and adjustments against a live 7-day goal. Build a plan first to unlock your reflection log.
        </p>
        <button
          type="button"
          onClick={onOpenCreate}
          className="btn-primary"
          style={{ padding: '0.65rem 1.4rem' }}
        >
          <Sparkles size={16} />
          <span>Create your first plan</span>
        </button>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wentWell.trim() && !hardestPart.trim() && !nextAction.trim()) {
      setValidationError('Please complete at least one reflection question before saving.');
      return;
    }

    setValidationError(null);
    onSaveReflection({
      wentWell: wentWell.trim(),
      hardestPart: hardestPart.trim(),
      blockers: blockers.trim(),
      changeNextTime: changeNextTime.trim(),
      nextAction: nextAction.trim(),
    });

    // Reset inputs
    setWentWell('');
    setHardestPart('');
    setBlockers('');
    setChangeNextTime('');
    setNextAction('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const reflectionsList = plan.reflections || [];

  return (
    <div className="view-fade-in" style={{ paddingBottom: '3.5rem' }}>
      {/* Banner with Curated Photo */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        marginBottom: '2rem',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          position: 'relative',
          height: '180px',
          background: IMAGES.reflectionJournal.fallbackGradient,
          overflow: 'hidden'
        }}>
          <img
            src={IMAGES.reflectionJournal.url}
            alt={IMAGES.reflectionJournal.alt}
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(32,39,32,0.2) 0%, rgba(32,39,32,0.75) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.75rem 2rem'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#FAF8F3',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.35rem'
              }}>
                <BookMarked size={16} /> Continuous Improvement
              </div>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                color: '#FFFFFF',
                fontSize: '1.95rem',
                margin: 0,
                lineHeight: 1.2
              }}>
                Weekly Progress Reflection
              </h1>
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem 2rem', background: 'var(--surface)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
            Active Plan: <strong style={{ color: 'var(--text-main)' }}>&quot;{plan.goal}&quot;</strong>. 
            Reflection anchors your momentum. At the end of each cycle, record what you discovered so your next 7-day iteration begins from insight rather than guilt.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Reflection Form */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            marginBottom: '0.35rem',
            color: 'var(--text-main)'
          }}>
            Record New Reflection
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Answer honestly. Short, truthful bullets are more valuable than essays.
          </p>

          {validationError && (
            <div style={{
              background: 'var(--accent-coral-light)',
              border: '1px solid var(--accent-coral)',
              color: 'var(--accent-coral-dark)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {savedSuccess && (
            <div style={{
              background: 'var(--primary-light)',
              border: '1px solid var(--primary)',
              color: 'var(--primary-dark)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={16} />
              <span>Reflection saved successfully to your plan history!</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label 
                htmlFor="refl-wentWell"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
              >
                1. What went well this week?
              </label>
              <textarea
                id="refl-wentWell"
                rows={2}
                value={wentWell}
                onChange={(e) => setWentWell(e.target.value)}
                placeholder="Tasks completed smoothly, focus periods, or milestones reached..."
                className="form-input"
                style={{ width: '100%', resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label 
                htmlFor="refl-hardest"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
              >
                2. What was the hardest task or challenge?
              </label>
              <textarea
                id="refl-hardest"
                rows={2}
                value={hardestPart}
                onChange={(e) => setHardestPart(e.target.value)}
                placeholder="Where did friction occur? Which day felt overwhelming?"
                className="form-input"
                style={{ width: '100%', resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label 
                htmlFor="refl-blockers"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
              >
                3. Were there any unexpected blockers or distractions?
              </label>
              <input
                id="refl-blockers"
                type="text"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Context switching, lack of materials, fatigue..."
                className="form-input"
                style={{ width: '100%', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label 
                htmlFor="refl-change"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}
              >
                4. What will you do differently in the next sprint?
              </label>
              <input
                id="refl-change"
                type="text"
                value={changeNextTime}
                onChange={(e) => setChangeNextTime(e.target.value)}
                placeholder="Start 30 mins earlier, break day 3 into two halves..."
                className="form-input"
                style={{ width: '100%', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label 
                htmlFor="refl-nextAction"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}
              >
                5. Single immediate next action to take:
              </label>
              <input
                id="refl-nextAction"
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g. Schedule mock interview for Tuesday 10am"
                className="form-input"
                style={{ width: '100%', fontSize: '0.9rem', borderColor: 'var(--primary)' }}
              />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.92rem', width: '100%', justifyContent: 'center' }}
              >
                <Send size={16} />
                <span>Save reflection entry</span>
              </button>
            </div>
          </form>
        </section>

        {/* Saved Reflections History */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              color: 'var(--text-main)',
              margin: 0
            }}>
              Reflection Journal ({reflectionsList.length})
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Private browser logs
            </span>
          </div>

          {reflectionsList.length === 0 ? (
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border)',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <BookMarked size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
                No weekly reflections saved yet.<br />
                Complete your first entry using the form on the left.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {reflectionsList.map((refl, idx) => {
                const dateStr = new Date(refl.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                return (
                  <div
                    key={refl.id || idx}
                    style={{
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      padding: '1.25rem 1.4rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '0.65rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <Calendar size={14} />
                        <span>Saved on {dateStr}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteReflection(refl.id)}
                        className="btn-ghost"
                        style={{ padding: '0.3rem 0.5rem', color: 'var(--accent-coral)', fontSize: '0.78rem' }}
                        title="Delete this reflection"
                        aria-label="Delete reflection"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {refl.wentWell && (
                      <div style={{ fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>
                          What went well:
                        </strong>
                        <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>{refl.wentWell}</p>
                      </div>
                    )}

                    {refl.hardestPart && (
                      <div style={{ fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--accent-coral-dark)', display: 'block', marginBottom: '0.2rem' }}>
                          Hardest challenge:
                        </strong>
                        <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>{refl.hardestPart}</p>
                      </div>
                    )}

                    {refl.blockers && (
                      <div style={{ fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                          Blockers noted:
                        </strong>
                        <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>{refl.blockers}</p>
                      </div>
                    )}

                    {refl.changeNextTime && (
                      <div style={{ fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                          Adjustments for next time:
                        </strong>
                        <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>{refl.changeNextTime}</p>
                      </div>
                    )}

                    {refl.nextAction && (
                      <div style={{
                        background: 'var(--primary-light)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.86rem',
                        borderLeft: '3px solid var(--primary)'
                      }}>
                        <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>
                          Immediate next action:
                        </strong>
                        <p style={{ color: 'var(--primary-dark)', margin: 0, fontWeight: 500 }}>{refl.nextAction}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
