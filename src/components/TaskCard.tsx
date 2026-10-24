import React, { useState } from 'react';
import { Task } from '../types';
import { Check, Edit3, X, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitle: string, newDescription: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onUpdateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [validationError, setValidationError] = useState<string | null>(null);

  const formattedDay = `Day ${task.dayNumber.toString().padStart(2, '0')}`;

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setValidationError(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setValidationError(null);
    setIsEditing(false);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setValidationError('Task title cannot be empty.');
      return;
    }
    onUpdateTask(task.id, trimmedTitle, editDescription.trim());
    setValidationError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      style={{
        background: task.completed ? 'var(--surface-sage-light)' : 'var(--surface)',
        border: `1px solid ${task.completed ? 'var(--border)' : 'var(--border)'}`,
        borderLeft: `4px solid ${task.completed ? 'var(--primary)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(1rem, 2.5vw, 1.4rem)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
        position: 'relative'
      }}
      onKeyDown={handleKeyDown}
    >
      {isEditing ? (
        /* Edit Mode */
        <form onSubmit={handleSaveEdit} noValidate>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--primary-dark)',
              background: 'var(--surface-sage)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              Editing {formattedDay}
            </span>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn-ghost"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
              aria-label="Cancel editing"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label 
              htmlFor={`edit-title-${task.id}`}
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem' }}
            >
              Task Title
            </label>
            <input
              id={`edit-title-${task.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (validationError) setValidationError(null);
              }}
              style={{
                fontSize: '0.95rem',
                borderColor: validationError ? 'var(--accent-coral)' : 'var(--border)',
                marginBottom: validationError ? '0.25rem' : '0'
              }}
              autoFocus
              aria-invalid={!!validationError}
            />
            {validationError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'var(--accent-coral-dark)',
                fontSize: '0.8rem',
                marginTop: '0.35rem'
              }}>
                <AlertCircle size={14} />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor={`edit-desc-${task.id}`}
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem' }}
            >
              Instructions / Guidance
            </label>
            <textarea
              id={`edit-desc-${task.id}`}
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{ fontSize: '0.9rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        /* View Mode */
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'clamp(0.75rem, 2vw, 1.25rem)',
        }}>
          {/* Completion Checkbox */}
          <button
            type="button"
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Mark ${formattedDay} as ${task.completed ? 'incomplete' : 'complete'}`}
            onClick={() => onToggleComplete(task.id)}
            style={{
              flexShrink: 0,
              marginTop: '0.2rem',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: `2px solid ${task.completed ? 'var(--primary)' : 'var(--border)'}`,
              background: task.completed ? 'var(--primary)' : 'var(--surface)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {task.completed && <Check size={18} strokeWidth={2.5} />}
          </button>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: task.completed ? 'var(--primary-dark)' : 'var(--primary)',
                background: task.completed ? 'var(--surface-sage)' : 'var(--bg)',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}>
                {formattedDay}
              </span>

              <button
                type="button"
                onClick={handleStartEdit}
                className="btn-ghost"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.5rem',
                  color: 'var(--text-muted)'
                }}
                aria-label={`Edit ${formattedDay}: ${task.title}`}
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
            </div>

            <h4 style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: task.completed ? 'var(--text-muted)' : 'var(--text)',
              textDecoration: task.completed ? 'line-through' : 'none',
              marginBottom: '0.35rem',
              lineHeight: 1.35
            }}>
              {task.title}
            </h4>

            {task.description && (
              <p style={{
                fontSize: '0.9rem',
                color: task.completed ? 'var(--text-light)' : 'var(--text-muted)',
                lineHeight: 1.5
              }}>
                {task.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
