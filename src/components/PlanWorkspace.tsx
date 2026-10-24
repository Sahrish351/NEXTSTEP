import React from 'react';
import { Plan } from '../types';
import { ProgressSummary } from './ProgressSummary';
import { TaskCard } from './TaskCard';
import { Trash2, Shield, Calendar } from 'lucide-react';

interface PlanWorkspaceProps {
  plan: Plan;
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitle: string, newDescription: string) => void;
  onRequestDeletePlan: () => void;
}

export const PlanWorkspace: React.FC<PlanWorkspaceProps> = ({
  plan,
  onToggleComplete,
  onUpdateTask,
  onRequestDeletePlan,
}) => {
  return (
    <main style={{ padding: '2.5rem 0 4.5rem 0' }}>
      <div className="content-wrapper">
        {/* Workspace Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{
                background: 'var(--surface-sage)',
                color: 'var(--primary-dark)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Calendar size={13} />
                <span>{plan.category}</span>
              </span>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                7-Day Action Plan
              </span>
            </div>

            <h1 className="serif-heading" style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
              color: 'var(--primary-dark)',
              lineHeight: 1.2
            }}>
              {plan.goal}
            </h1>
          </div>

          <button
            type="button"
            onClick={onRequestDeletePlan}
            className="btn-danger-ghost"
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.85rem',
              alignSelf: 'flex-start'
            }}
            aria-label="Delete plan"
          >
            <Trash2 size={16} />
            <span>Delete plan</span>
          </button>
        </div>

        {/* Progress Summary */}
        <ProgressSummary tasks={plan.tasks} />

        {/* Tasks Stream Section */}
        <section aria-label="Seven day tasks">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
              Your Daily Roadmap
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Editable starter suggestions
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem'
          }}>
            {plan.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
              />
            ))}
          </div>
        </section>

        {/* Local Storage Privacy Note */}
        <div style={{
          marginTop: '3rem',
          padding: '1.25rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.85rem',
          color: 'var(--text-muted)',
          fontSize: '0.88rem',
          lineHeight: 1.5
        }}>
          <Shield size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div>
            <strong style={{ color: 'var(--text)' }}>Saved safely in your browser:</strong>
            <p style={{ marginTop: '0.15rem' }}>
              Your goal, customized tasks, and daily checkmarks are saved automatically in your current browser's local storage. 
              You can refresh the page or return tomorrow without losing your progress. No external servers or logins required.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

