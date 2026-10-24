import React, { useState } from 'react';
import { Plan, Task } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Edit3, 
  CalendarCheck, 
  Trophy, 
  PlusCircle, 
  AlertCircle 
} from 'lucide-react';

interface TodayViewProps {
  plan: Plan | null;
  onToggleTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitle: string, newDescription: string) => void;
  onOpenCreate: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  plan,
  onToggleTask,
  onUpdateTask,
  onOpenCreate,
}) => {
  // Determine initial focus: first incomplete task, or Day 1
  const defaultDayIndex = plan ? plan.tasks.findIndex((t) => !t.completed) : 0;
  const initialIndex = defaultDayIndex === -1 ? 6 : defaultDayIndex;
  const [selectedDayIndex, setSelectedDayIndex] = useState(initialIndex);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [error, setError] = useState<string | null>(null);

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
            <CalendarCheck size={26} />
          </div>
          <h2 className="serif-heading" style={{ fontSize: '1.9rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
            No Goal Active Today
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Create a plan to receive your daily structured focus task.
          </p>
          <button onClick={onOpenCreate} className="btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
            <PlusCircle size={17} />
            <span>Start a 7-Day Plan</span>
          </button>
        </div>
      </div>
    );
  }

  const currentTask: Task = plan.tasks[selectedDayIndex] || plan.tasks[0];
  const formattedDay = `Day 0${currentTask.dayNumber}`;

  const handleStartEdit = () => {
    setEditTitle(currentTask.title);
    setEditDesc(currentTask.description);
    setError(null);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }
    onUpdateTask(currentTask.id, trimmedTitle, editDesc.trim());
    setIsEditing(false);
  };

  return (
    <div style={{ paddingBottom: '3.5rem', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--primary)'
        }}>
          Daily Action View
        </span>
        <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
          Today's Single Focus
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          One tangible daily action to eliminate overwhelm and maintain steady momentum.
        </p>
      </div>

      {/* Day Selector Stepper */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        marginBottom: '1.75rem',
        flexWrap: 'wrap'
      }}>
        {plan.tasks.map((t, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSelectedDayIndex(idx);
                setIsEditing(false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                background: isSelected ? 'var(--primary)' : t.completed ? 'var(--surface-sage)' : 'var(--surface)',
                color: isSelected ? '#FFFFFF' : t.completed ? 'var(--primary-dark)' : 'var(--text-muted)',
                border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {t.completed && <Check size={13} strokeWidth={3} />}
              <span>Day {t.dayNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Main Focus Card */}
      <div style={{
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.75rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative'
      }}>
        {/* Navigation Arrows Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            disabled={selectedDayIndex === 0}
            onClick={() => {
              setSelectedDayIndex((i) => Math.max(0, i - 1));
              setIsEditing(false);
            }}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
          >
            <ChevronLeft size={16} />
            <span>Previous Day</span>
          </button>

          <span style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--primary-dark)',
            background: 'var(--surface-sage)',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-pill)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {formattedDay} of 07
          </span>

          <button
            type="button"
            disabled={selectedDayIndex === 6}
            onClick={() => {
              setSelectedDayIndex((i) => Math.min(6, i + 1));
              setIsEditing(false);
            }}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
          >
            <span>Next Day</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Task Details / Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} noValidate>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="today-edit-title" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Task Title
              </label>
              <input
                id="today-edit-title"
                type="text"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
                style={{ fontSize: '1.05rem', padding: '0.75rem', borderColor: error ? 'var(--accent-coral)' : 'var(--border)' }}
              />
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-coral-dark)', fontSize: '0.82rem', marginTop: '0.35rem' }}>
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="today-edit-desc" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Instructions / Daily Guidance
              </label>
              <textarea
                id="today-edit-desc"
                rows={4}
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.45rem 1.25rem' }}>
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: currentTask.completed ? 'var(--text-muted)' : 'var(--text)',
                textDecoration: currentTask.completed ? 'line-through' : 'none',
                lineHeight: 1.3
              }}>
                {currentTask.title}
              </h2>

              <button
                type="button"
                onClick={handleStartEdit}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.3rem 0.6rem', color: 'var(--primary)' }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            </div>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '2rem'
            }}>
              {currentTask.description}
            </p>

            {/* Completion Banner / Toggle Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: currentTask.completed ? 'var(--surface-sage)' : 'var(--bg)',
              border: `1px solid ${currentTask.completed ? 'var(--primary)' : 'var(--border)'}`,
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {currentTask.completed ? (
                  <Trophy size={24} color="var(--primary)" />
                ) : (
                  <CalendarCheck size={24} color="var(--primary)" />
                )}
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'block' }}>
                    {currentTask.completed ? 'Great work! Task complete.' : 'Take action on this step today.'}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {currentTask.completed ? 'You checked this off your 7-day runway.' : 'Check off the task when you are done.'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleTask(currentTask.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: currentTask.completed ? 'var(--surface)' : 'var(--primary)',
                  color: currentTask.completed ? 'var(--primary-dark)' : '#FFFFFF',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <Check size={18} strokeWidth={2.5} />
                <span>{currentTask.completed ? 'Completed (Click to Undo)' : 'Mark Task as Done'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

