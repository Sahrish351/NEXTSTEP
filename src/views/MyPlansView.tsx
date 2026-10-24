import React, { useState } from 'react';
import { Plan } from '../types';
import { TaskCard } from '../components/TaskCard';
import { ProgressSummary } from '../components/ProgressSummary';
import { EditGoalModal } from '../components/EditGoalModal';
import { 
  Edit3, 
  Trash2, 
  Calendar, 
  PlusCircle, 
  FolderKanban, 
  Shield 
} from 'lucide-react';

interface MyPlansViewProps {
  plan: Plan | null;
  onToggleTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitle: string, newDescription: string) => void;
  onUpdateGoal: (newGoal: string) => void;
  onRequestDelete: () => void;
  onOpenCreate: () => void;
}

export const MyPlansView: React.FC<MyPlansViewProps> = ({
  plan,
  onToggleTask,
  onUpdateTask,
  onUpdateGoal,
  onRequestDelete,
  onOpenCreate,
}) => {
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);

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
            <FolderKanban size={26} />
          </div>
          <h2 className="serif-heading" style={{ fontSize: '1.9rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
            No Active Plan Found
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            NextStep is designed around focused execution of one 7-day plan at a time.
          </p>
          <button onClick={onOpenCreate} className="btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
            <PlusCircle size={17} />
            <span>Create a 7-Day Plan</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* Plan Header Card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span style={{
                background: 'var(--surface-sage)',
                color: 'var(--primary-dark)',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Calendar size={13} />
                <span>{plan.category}</span>
              </span>

              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                Started {new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 className="serif-heading" style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: 'var(--primary-dark)',
                lineHeight: 1.2
              }}>
                {plan.goal}
              </h1>

              <button
                type="button"
                onClick={() => setIsEditGoalOpen(true)}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.3rem 0.6rem', color: 'var(--primary)' }}
                aria-label="Edit goal title"
              >
                <Edit3 size={15} />
                <span>Edit Goal</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onRequestDelete}
            className="btn-danger-ghost"
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            <Trash2 size={16} />
            <span>Delete Plan</span>
          </button>
        </div>

        {/* Progress Summary Component */}
        <ProgressSummary tasks={plan.tasks} />
      </div>

      {/* 7-Day Task Stream */}
      <section aria-label="Seven day tasks list">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
              7-Day Execution Schedule
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Editable starter steps. Click "Edit" on any task to customize title or instructions.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {plan.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      </section>

      {/* Privacy Callout */}
      <div style={{
        marginTop: '2.5rem',
        padding: '1.25rem',
        background: 'var(--surface-sage-light)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--primary-dark)',
        fontSize: '0.88rem'
      }}>
        <Shield size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span>
          Your plan is preserved in browser storage. Refreshing or reopening this tab restores your customized tasks and completion states instantly.
        </span>
      </div>

      {/* Edit Goal Modal */}
      <EditGoalModal
        isOpen={isEditGoalOpen}
        currentGoal={plan.goal}
        onClose={() => setIsEditGoalOpen(false)}
        onSave={onUpdateGoal}
      />
    </div>
  );
};

