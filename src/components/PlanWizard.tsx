import React, { useState } from 'react';
import { Category, Task } from '../types';
import { generateTasksForGoal } from '../data/templates';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Briefcase, 
  BookOpen, 
  Wrench, 
  FolderKanban, 
  Sparkles, 
  X,
  CalendarCheck
} from 'lucide-react';

interface PlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (goal: string, category: Category, tasks: Task[]) => void;
}

const CATEGORIES: { name: Category; icon: React.ReactNode; label: string; description: string }[] = [
  { 
    name: 'Career', 
    icon: <Briefcase size={18} />, 
    label: 'Career & Jobs', 
    description: 'Interviews, job searches, portfolio projects, and resume updates.' 
  },
  { 
    name: 'Study', 
    icon: <BookOpen size={18} />, 
    label: 'Study & Exams', 
    description: 'Exam revisions, course topics, certifications, and academic deadlines.' 
  },
  { 
    name: 'Skill Building', 
    icon: <Wrench size={18} />, 
    label: 'Skill Building', 
    description: 'Coding languages, design fundamentals, tools, and technical crafts.' 
  },
  { 
    name: 'Personal Project', 
    icon: <FolderKanban size={18} />, 
    label: 'Personal Project', 
    description: 'Building apps, writing blogs, organizing launches, or creative milestones.' 
  },
  { 
    name: 'Other', 
    icon: <Sparkles size={18} />, 
    label: 'Other Goal', 
    description: 'Any personal discipline, habit, or ambitious milestone you want to achieve.' 
  },
];

export const PlanWizard: React.FC<PlanWizardProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<Category>('Career');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewTasks, setPreviewTasks] = useState<Task[]>([]);

  if (!isOpen) return null;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = goal.trim();
    if (!trimmed) {
      setValidationError('Please enter a goal so we can build your plan.');
      return;
    }
    setValidationError(null);
    setStep(2);
  };

  const handleStep2Next = () => {
    // Generate preview tasks based on goal and category
    const tasks = generateTasksForGoal(goal.trim(), category);
    setPreviewTasks(tasks);
    setStep(3);
  };

  const handleFinish = () => {
    onComplete(goal.trim(), category, previewTasks);
    // Reset wizard
    setStep(1);
    setGoal('');
    setCategory('Career');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wizard-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(32, 39, 32, 0.55)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        zIndex: 100
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Wizard Header & Stepper */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg)'
        }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
            }}>
              Plan Creator • Step {step} of 3
            </span>
            <h2 id="wizard-title" className="serif-heading" style={{
              fontSize: '1.4rem',
              color: 'var(--primary-dark)',
              marginTop: '0.1rem'
            }}>
              {step === 1 && 'Define Your Goal'}
              {step === 2 && 'Select Domain Category'}
              {step === 3 && 'Review Your 7-Day Roadmap'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '0.35rem', color: 'var(--text-light)' }}
            aria-label="Close wizard"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Dots */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          padding: '0.65rem 1.75rem',
          background: 'var(--surface-sage-light)',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: s <= step ? 'var(--primary)' : 'var(--border)'
              }}
            />
          ))}
        </div>

        {/* Wizard Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          {step === 1 && (
            <form onSubmit={handleStep1Next} noValidate>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Enter the specific objective you want to achieve over the next seven days. 
                Keep it tangible and realistic.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <label htmlFor="wizard-goal-input" style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                    What goal are you tackling?
                  </label>
                  <span style={{ fontSize: '0.8rem', color: goal.length > 100 ? 'var(--accent-coral-dark)' : 'var(--text-light)' }}>
                    {goal.length}/120
                  </span>
                </div>

                <input
                  id="wizard-goal-input"
                  type="text"
                  maxLength={120}
                  placeholder="e.g. Prepare for my web development interview"
                  value={goal}
                  onChange={(e) => {
                    setGoal(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  autoFocus
                  style={{
                    fontSize: '1.05rem',
                    padding: '0.85rem 1rem',
                    borderColor: validationError ? 'var(--accent-coral)' : 'var(--border)'
                  }}
                />

                {validationError && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--accent-coral-dark)',
                    fontSize: '0.85rem',
                    marginTop: '0.45rem'
                  }}>
                    <AlertCircle size={15} />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Example Suggestions */}
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: '0.5rem' }}>
                  Quick Inspiration:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {[
                    'Prepare for my web development interview',
                    'Study Chapter 1–4 for biology midterm',
                    'Build and publish my first React portfolio',
                    'Learn Tailwind CSS fundamentals',
                  ].map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => {
                        setGoal(example);
                        if (validationError) setValidationError(null);
                      }}
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Categorizing your goal enables NextStep to sequence appropriate starter actions for your specific domain.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.name;
                  return (
                    <div
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCategory(cat.name); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.9rem 1.1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                        background: isSelected ? 'var(--surface-sage-light)' : 'var(--surface)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--primary)' : 'var(--bg)',
                        color: isSelected ? '#FFFFFF' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {cat.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text)', display: 'block' }}>
                          {cat.label}
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {cat.description}
                        </span>
                      </div>

                      {isSelected && <Check size={18} color="var(--primary)" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{
                background: 'var(--surface-sage-light)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                marginBottom: '1.25rem'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Target Goal ({category})
                </span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
                  {goal}
                </h4>
              </div>

              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
                Proposed 7-Day Sequence (editable anytime):
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                {previewTasks.map((t) => (
                  <div
                    key={t.dayNumber}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'var(--surface-sage)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      flexShrink: 0
                    }}>
                      Day 0{t.dayNumber}
                    </span>
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text)', display: 'block' }}>
                        {t.title}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {t.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg)'
        }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className="btn-secondary"
              style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={handleStep1Next}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.55rem 1.25rem' }}
            >
              <span>Next: Category</span>
              <ArrowRight size={16} />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={handleStep2Next}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.55rem 1.25rem' }}
            >
              <span>Next: Preview Plan</span>
              <ArrowRight size={16} />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleFinish}
              className="btn-primary"
              style={{ fontSize: '0.92rem', padding: '0.6rem 1.4rem' }}
            >
              <CalendarCheck size={16} />
              <span>Start My 7-Day Plan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

