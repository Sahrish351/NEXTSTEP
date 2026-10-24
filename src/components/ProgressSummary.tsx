import React from 'react';
import { Task } from '../types';
import { Trophy, CheckCircle } from 'lucide-react';

interface ProgressSummaryProps {
  tasks: Task[];
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length || 7;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getStatusMessage = () => {
    if (completedCount === 0) {
      return 'Ready to start Day 01? Taking the first step is the hardest part.';
    }
    if (completedCount === totalCount) {
      return 'Outstanding! You completed your full 7-day plan.';
    }
    if (completedCount >= 5) {
      return 'Almost there! The finish line is in sight.';
    }
    if (completedCount >= 3) {
      return 'Great momentum! You are over halfway through your 7-day runway.';
    }
    return `Solid progress! ${completedCount} daily step${completedCount > 1 ? 's' : ''} completed.`;
  };

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(1.2rem, 3vw, 1.6rem)',
      marginBottom: '1.75rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {completedCount === totalCount ? (
            <Trophy size={20} color="var(--primary)" />
          ) : (
            <CheckCircle size={20} color="var(--primary)" />
          )}
          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
            {completedCount} of {totalCount} completed ({percentage}%)
          </span>
        </div>

        <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontWeight: 500
        }}>
          {totalCount - completedCount} step{totalCount - completedCount === 1 ? '' : 's'} remaining
        </span>
      </div>

      {/* Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="7-day plan completion progress"
        style={{
          height: '10px',
          background: 'var(--surface-sage)',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
          marginBottom: '0.65rem'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'var(--primary)',
            borderRadius: 'var(--radius-pill)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      <p style={{
        fontSize: '0.9rem',
        color: completedCount === totalCount ? 'var(--primary-dark)' : 'var(--text-muted)',
        fontWeight: completedCount === totalCount ? 600 : 400
      }}>
        {getStatusMessage()}
      </p>
    </div>
  );
};

