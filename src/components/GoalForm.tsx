import React, { useState } from 'react';
import { Category } from '../types';
import { ArrowRight, AlertCircle, BookOpen, Briefcase, Wrench, FolderKanban, Sparkles } from 'lucide-react';

interface GoalFormProps {
  onSubmit: (goal: string, category: Category) => void;
}

const CATEGORIES: { name: Category; icon: React.ReactNode; label: string }[] = [
  { name: 'Career', icon: <Briefcase size={16} />, label: 'Career & Jobs' },
  { name: 'Study', icon: <BookOpen size={16} />, label: 'Study & Exams' },
  { name: 'Skill Building', icon: <Wrench size={16} />, label: 'Skill Building' },
  { name: 'Personal Project', icon: <FolderKanban size={16} />, label: 'Personal Project' },
  { name: 'Other', icon: <Sparkles size={16} />, label: 'Other Goal' },
];

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<Category>('Career');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = goal.trim();
    if (!trimmed) {
      setError('Please enter a goal so we can build your plan.');
      return;
    }
    setError(null);
    onSubmit(trimmed, category);
  };

  return (
    <section id="create-plan" style={{
      padding: '3rem 0',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="content-wrapper">
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(1.75rem, 4vw, 2.5rem)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
            }}>
              Start Here
            </span>
            <h2 className="serif-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.2rem)',
              color: 'var(--primary-dark)',
              marginTop: '0.25rem'
            }}>
              What is your next goal?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
              Be specific about what you want to achieve. We'll turn it into 7 daily steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Goal Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label 
                  htmlFor="goal-input" 
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}
                >
                  Your Goal
                </label>
                <span style={{
                  fontSize: '0.8rem',
                  color: goal.length > 100 ? 'var(--accent-coral-dark)' : 'var(--text-light)'
                }}>
                  {goal.length}/120
                </span>
              </div>

              <input
                id="goal-input"
                type="text"
                value={goal}
                maxLength={120}
                placeholder="e.g. Prepare for my web development interview"
                onChange={(e) => {
                  setGoal(e.target.value);
                  if (error) setError(null);
                }}
                style={{
                  fontSize: '1.05rem',
                  borderColor: error ? 'var(--accent-coral)' : 'var(--border)'
                }}
                aria-invalid={!!error}
                aria-describedby={error ? 'goal-error' : undefined}
                autoFocus={false}
              />

              {error && (
                <div 
                  id="goal-error" 
                  role="alert" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-coral-dark)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    marginTop: '0.5rem'
                  }}
                >
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Category Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--text)',
                marginBottom: '0.65rem'
              }}>
                Choose a Category
              </label>

              <div 
                role="radiogroup" 
                aria-label="Goal Category"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem'
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setCategory(cat.name)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 0.95rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.9rem',
                        fontWeight: isSelected ? 600 : 500,
                        background: isSelected ? 'var(--primary)' : 'var(--surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--text)',
                        border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                        boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <span style={{ color: isSelected ? '#FFFFFF' : 'var(--primary)' }}>
                        {cat.icon}
                      </span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '1.05rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span>Build my 7-day plan</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

