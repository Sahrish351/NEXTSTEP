import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface EditGoalModalProps {
  isOpen: boolean;
  currentGoal: string;
  onClose: () => void;
  onSave: (newGoal: string) => void;
}

export const EditGoalModal: React.FC<EditGoalModalProps> = ({
  isOpen,
  currentGoal,
  onClose,
  onSave,
}) => {
  const [goalText, setGoalText] = useState(currentGoal);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = goalText.trim();
    if (!trimmed) {
      setError('Goal cannot be empty.');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-goal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(32, 39, 32, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
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
        maxWidth: '500px',
        width: '100%',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 id="edit-goal-title" className="serif-heading" style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>
            Edit Plan Goal
          </h3>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.25rem' }} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="modal-goal-input" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Goal Title
            </label>
            <input
              id="modal-goal-input"
              type="text"
              maxLength={120}
              value={goalText}
              onChange={(e) => {
                setGoalText(e.target.value);
                if (error) setError(null);
              }}
              autoFocus
              style={{ fontSize: '1rem', padding: '0.8rem', borderColor: error ? 'var(--accent-coral)' : 'var(--border)' }}
            />
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-coral-dark)', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}>
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

