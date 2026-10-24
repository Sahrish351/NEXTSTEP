import React from 'react';
import { Sparkles, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onCreateNewPlan: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNewPlan }) => {
  return (
    <section style={{
      padding: '4rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(2rem, 5vw, 3rem)',
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
          <Sparkles size={28} />
        </div>

        <h2 className="serif-heading" style={{
          fontSize: '1.9rem',
          color: 'var(--primary-dark)',
          marginBottom: '0.65rem'
        }}>
          Ready for your next step?
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          You don't currently have an active seven-day plan. Choose a new goal and get seven manageable daily actions to guide your week.
        </p>

        <button
          onClick={onCreateNewPlan}
          className="btn-primary"
          style={{
            fontSize: '1rem',
            padding: '0.85rem 1.8rem',
            margin: '0 auto'
          }}
        >
          <PlusCircle size={18} />
          <span>Create a new plan</span>
        </button>
      </div>
    </section>
  );
};

