import React, { useState, useEffect } from 'react';
import { Plan, Category } from './types';
import { loadSavedPlan, savePlan, clearSavedPlan } from './utils/storage';
import { generateTasksForGoal } from './data/templates';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { GoalForm } from './components/GoalForm';
import { PlanWorkspace } from './components/PlanWorkspace';
import { ConfirmModal } from './components/ConfirmModal';
import { EmptyState } from './components/EmptyState';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [viewState, setViewState] = useState<'landing' | 'workspace' | 'empty'>('landing');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);

  // Initialize and load saved plan from localStorage
  useEffect(() => {
    const { plan, error } = loadSavedPlan();
    if (error) {
      setStorageError(true);
      setViewState('landing');
    } else if (plan) {
      setActivePlan(plan);
      setViewState('workspace');
    } else {
      setViewState('landing');
    }
  }, []);

  // Create a new 7-day plan
  const handleCreatePlan = (goal: string, category: Category) => {
    const newTasks = generateTasksForGoal(goal, category);
    const newPlan: Plan = {
      id: `plan-${Date.now().toString(36)}`,
      goal,
      category,
      createdAt: new Date().toISOString(),
      tasks: newTasks,
    };

    setActivePlan(newPlan);
    savePlan(newPlan);
    setViewState('workspace');

    // Scroll to top of workspace
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle task completion
  const handleToggleComplete = (taskId: string) => {
    if (!activePlan) return;

    const updatedTasks = activePlan.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const updatedPlan: Plan = {
      ...activePlan,
      tasks: updatedTasks,
    };

    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Update task title and description
  const handleUpdateTask = (taskId: string, newTitle: string, newDescription: string) => {
    if (!activePlan) return;

    const updatedTasks = activePlan.tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newTitle, description: newDescription }
        : task
    );

    const updatedPlan: Plan = {
      ...activePlan,
      tasks: updatedTasks,
    };

    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Safe plan deletion
  const handleConfirmDelete = () => {
    clearSavedPlan();
    setActivePlan(null);
    setIsDeleteModalOpen(false);
    setViewState('empty');
  };

  const scrollToGoalForm = () => {
    if (viewState === 'workspace' || viewState === 'empty') {
      setViewState('landing');
      setTimeout(() => {
        document.getElementById('create-plan')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      document.getElementById('create-plan')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetCorruptedStorage = () => {
    clearSavedPlan();
    setStorageError(false);
    setActivePlan(null);
    setViewState('landing');
  };

  return (
    <div className="app-container">
      {/* Storage Error Recovery Banner */}
      {storageError && (
        <div style={{
          background: 'var(--accent-coral-light)',
          borderBottom: '1px solid var(--accent-coral)',
          padding: '0.85rem 1.25rem',
          color: 'var(--accent-coral-dark)',
          fontSize: '0.92rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          zIndex: 50
        }}>
          <AlertCircle size={18} />
          <span>Notice: Stored plan data was corrupted or invalid.</span>
          <button
            onClick={handleResetCorruptedStorage}
            style={{
              background: 'var(--accent-coral-dark)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset storage safely</span>
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onLogoClick={() => {
          if (activePlan) {
            setViewState('workspace');
          } else {
            setViewState('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        showNewPlanButton={viewState === 'workspace'}
        onNewPlanClick={() => setViewState('landing')}
      />

      {/* Main View Router */}
      {viewState === 'workspace' && activePlan ? (
        <PlanWorkspace
          plan={activePlan}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onRequestDeletePlan={() => setIsDeleteModalOpen(true)}
        />
      ) : viewState === 'empty' ? (
        <EmptyState onCreateNewPlan={() => setViewState('landing')} />
      ) : (
        <main>
          <LandingPage onCreatePlanClick={scrollToGoalForm} />
          <GoalForm onSubmit={handleCreatePlan} />
        </main>
      )}

      {/* Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Compact Accessible Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        background: 'var(--surface)',
        color: 'var(--text-muted)',
        fontSize: '0.88rem'
      }}>
        <div className="content-wrapper" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <strong style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
              NextStep
            </strong>
            <p style={{ fontSize: '0.82rem', marginTop: '0.15rem' }}>
              Make your next step obvious • Built for Devpost Build with AI: Basics
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', fontSize: '0.85rem' }}>
            <span>Zero server tracking</span>
            <span>•</span>
            <span>MIT License</span>
            <span>•</span>
            <a href="https://github.com/Sahrish351/NEXTSTEP.git" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

