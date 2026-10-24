import React, { useState, useEffect } from 'react';
import { Plan, Category, ViewType, Task } from './types';
import { 
  loadSavedPlan, 
  savePlan, 
  clearSavedPlan, 
  logActivity 
} from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LandingPage } from './components/LandingPage';
import { PlanWizard } from './components/PlanWizard';
import { ConfirmModal } from './components/ConfirmModal';
import { OverviewView } from './views/OverviewView';
import { MyPlansView } from './views/MyPlansView';
import { TodayView } from './views/TodayView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);

  // Initialize and load saved plan
  useEffect(() => {
    const { plan, error } = loadSavedPlan();
    if (error) {
      setStorageError(true);
      setCurrentView('landing');
    } else if (plan) {
      setActivePlan(plan);
      setCurrentView('overview');
    } else {
      setCurrentView('landing');
    }
  }, []);

  // Handler: Complete Plan Creation from Wizard
  const handleCompleteWizard = (goal: string, category: Category, tasks: Task[]) => {
    const newPlan: Plan = {
      id: `plan-${Date.now().toString(36)}`,
      goal,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks,
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'created',
          message: `Created 7-day plan for "${goal}"`
        }
      ]
    };

    setActivePlan(newPlan);
    savePlan(newPlan);
    setIsWizardOpen(false);
    setCurrentView('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Toggle Task Completion
  const handleToggleTask = (taskId: string) => {
    if (!activePlan) return;

    let targetTaskTitle = '';
    let willBeCompleted = false;

    const updatedTasks = activePlan.tasks.map((task) => {
      if (task.id === taskId) {
        targetTaskTitle = task.title;
        willBeCompleted = !task.completed;
        return { ...task, completed: willBeCompleted };
      }
      return task;
    });

    const actionType = willBeCompleted ? 'completed' : 'uncompleted';
    const actionMsg = willBeCompleted
      ? `Completed: "${targetTaskTitle}"`
      : `Reopened: "${targetTaskTitle}"`;

    let updatedPlan: Plan = {
      ...activePlan,
      tasks: updatedTasks
    };

    updatedPlan = logActivity(updatedPlan, actionType, actionMsg);
    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Handler: Update Task Title / Description
  const handleUpdateTask = (taskId: string, newTitle: string, newDescription: string) => {
    if (!activePlan) return;

    const updatedTasks = activePlan.tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
    );

    let updatedPlan: Plan = {
      ...activePlan,
      tasks: updatedTasks
    };

    updatedPlan = logActivity(updatedPlan, 'edited', `Updated task: "${newTitle}"`);
    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Handler: Update Goal Title
  const handleUpdateGoal = (newGoal: string) => {
    if (!activePlan) return;

    let updatedPlan: Plan = {
      ...activePlan,
      goal: newGoal
    };

    updatedPlan = logActivity(updatedPlan, 'goal_updated', `Goal title updated to "${newGoal}"`);
    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Handler: Safe Plan Deletion
  const handleConfirmDelete = () => {
    clearSavedPlan();
    setActivePlan(null);
    setIsDeleteModalOpen(false);
    setCurrentView('landing');
  };

  // Handler: Import Plan from JSON
  const handleImportPlan = (importedPlan: Plan) => {
    setActivePlan(importedPlan);
    savePlan(importedPlan);
    setCurrentView('overview');
  };

  // Handler: Corrupted Storage Reset
  const handleResetStorage = () => {
    clearSavedPlan();
    setStorageError(false);
    setActivePlan(null);
    setCurrentView('landing');
  };

  return (
    <div className="app-container">
      {/* Storage Error Warning */}
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
            onClick={handleResetStorage}
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

      {/* Public vs Workspace Rendering */}
      {currentView === 'landing' ? (
        <>
          <Header
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            activePlan={activePlan}
            onOpenCreate={() => setIsWizardOpen(true)}
          />
          <main>
            <LandingPage
              onOpenCreate={() => setIsWizardOpen(true)}
              hasActivePlan={!!activePlan}
              onGoToWorkspace={() => setCurrentView('overview')}
            />
          </main>
        </>
      ) : (
        <div className="workspace-layout">
          {/* Desktop Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            activePlan={activePlan}
            onOpenCreate={() => setIsWizardOpen(true)}
          />

          {/* Main Content Viewport */}
          <div className="workspace-main">
            <div className="content-wrapper">
              {currentView === 'overview' && (
                <OverviewView
                  plan={activePlan}
                  onNavigate={(view) => setCurrentView(view)}
                  onToggleTask={handleToggleTask}
                  onOpenCreate={() => setIsWizardOpen(true)}
                />
              )}

              {currentView === 'plans' && (
                <MyPlansView
                  plan={activePlan}
                  onToggleTask={handleToggleTask}
                  onUpdateTask={handleUpdateTask}
                  onUpdateGoal={handleUpdateGoal}
                  onRequestDelete={() => setIsDeleteModalOpen(true)}
                  onOpenCreate={() => setIsWizardOpen(true)}
                />
              )}

              {currentView === 'today' && (
                <TodayView
                  plan={activePlan}
                  onToggleTask={handleToggleTask}
                  onUpdateTask={handleUpdateTask}
                  onOpenCreate={() => setIsWizardOpen(true)}
                />
              )}

              {currentView === 'progress' && (
                <ProgressView
                  plan={activePlan}
                  onNavigate={(view) => setCurrentView(view)}
                  onOpenCreate={() => setIsWizardOpen(true)}
                />
              )}

              {currentView === 'settings' && (
                <SettingsView
                  plan={activePlan}
                  onImportPlan={handleImportPlan}
                  onRequestReset={() => setIsDeleteModalOpen(true)}
                  onNavigate={(view) => setCurrentView(view)}
                />
              )}
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileNav
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
          />
        </div>
      )}

      {/* Creation Wizard Modal */}
      <PlanWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleCompleteWizard}
      />

      {/* Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Compact Universal Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 0',
        background: 'var(--surface)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div className="content-wrapper" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <strong style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>
              NextStep
            </strong>
            <span style={{ fontSize: '0.82rem', marginLeft: '0.5rem' }}>
              • Make your next step obvious
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.82rem' }}>
            <span>Private browser storage</span>
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
