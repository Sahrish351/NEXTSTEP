import React, { useState, useEffect } from 'react';
import { Plan, Category, ViewType, Task, Reflection } from './types';
import { 
  loadSavedPlan, 
  savePlan, 
  clearSavedPlan, 
  logActivity,
  addReflectionToPlan,
  deleteReflectionFromPlan
} from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { PlanWizard } from './components/PlanWizard';
import { ConfirmModal } from './components/ConfirmModal';
import { OverviewView } from './views/OverviewView';
import { MyPlansView } from './views/MyPlansView';
import { TodayView } from './views/TodayView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import { ExploreGoalsView } from './views/ExploreGoalsView';
import { ReflectionView } from './views/ReflectionView';
import { InspirationLibraryView } from './views/InspirationLibraryView';
import { AchievementsView } from './views/AchievementsView';
import { AboutView } from './views/AboutView';
import { GOAL_LIBRARY } from './data/goalLibrary';
import { AlertCircle, RotateCcw, Menu } from 'lucide-react';

export const App: React.FC = () => {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardPrefill, setWizardPrefill] = useState<{ goal: string; category: Category } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [workspaceMobileSidebarOpen, setWorkspaceMobileSidebarOpen] = useState(false);

  // Initialize and load saved plan (Always start on Homepage 'home', never auto-redirect to dashboard)
  useEffect(() => {
    const { plan, error } = loadSavedPlan();
    if (error) {
      setStorageError(true);
      setCurrentView('home');
    } else if (plan) {
      setActivePlan(plan);
      setCurrentView('home'); // Respect user intent: always open home page first
    } else {
      setCurrentView('home');
    }
  }, []);

  // Handler: Open creation wizard without prefill
  const handleOpenNewWizard = () => {
    setWizardPrefill(null);
    setIsWizardOpen(true);
  };

  // Handler: Open creation wizard with goal/category prefill
  const handleStartGoalWithPrefill = (goal: string, category: Category) => {
    setWizardPrefill({ goal, category });
    setIsWizardOpen(true);
  };

  // Handler: Landing page category exploration
  const handleLandingExplore = (category?: Category) => {
    if (category) {
      const example = GOAL_LIBRARY.find((g) => g.category === category);
      if (example) {
        handleStartGoalWithPrefill(example.title, example.category);
        return;
      }
    }
    setCurrentView('explore');
  };

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
      ],
      reflections: []
    };

    setActivePlan(newPlan);
    savePlan(newPlan);
    setIsWizardOpen(false);
    setWizardPrefill(null);
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

  // Handler: Save Weekly Reflection
  const handleSaveReflection = (reflection: Omit<Reflection, 'id' | 'date'>) => {
    if (!activePlan) return;
    const updatedPlan = addReflectionToPlan(activePlan, reflection);
    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Handler: Delete Weekly Reflection
  const handleDeleteReflection = (reflectionId: string) => {
    if (!activePlan) return;
    const updatedPlan = deleteReflectionFromPlan(activePlan, reflectionId);
    setActivePlan(updatedPlan);
    savePlan(updatedPlan);
  };

  // Handler: Safe Plan Deletion
  const handleConfirmDelete = () => {
    clearSavedPlan();
    setActivePlan(null);
    setIsDeleteModalOpen(false);
    setCurrentView('home');
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
    setCurrentView('home');
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

      {/* Public Home vs Workspace Rendering */}
      {currentView === 'home' ? (
        <>
          <Header
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            activePlan={activePlan}
            onOpenCreate={handleOpenNewWizard}
          />
          <main>
            <LandingPage
              onOpenCreate={handleOpenNewWizard}
              hasActivePlan={!!activePlan}
              onGoToWorkspace={() => setCurrentView('overview')}
              onExploreGoals={handleLandingExplore}
              onNavigateToAbout={() => setCurrentView('about')}
            />
          </main>
        </>
      ) : (
        <div className="workspace-layout">
          {/* Mobile Backdrop Overlay */}
          <div 
            className={`sidebar-backdrop ${workspaceMobileSidebarOpen ? 'active' : ''}`}
            onClick={() => setWorkspaceMobileSidebarOpen(false)}
          />

          {/* Desktop/Mobile Fixed Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              setWorkspaceMobileSidebarOpen(false);
            }}
            activePlan={activePlan}
            onOpenCreate={handleOpenNewWizard}
            mobileOpen={workspaceMobileSidebarOpen}
            onCloseMobile={() => setWorkspaceMobileSidebarOpen(false)}
          />

          {/* Main Content Viewport */}
          <div className="workspace-main">
            {/* Mobile Workspace Top Navigation */}
            <div className="workspace-mobile-header">
              <button
                type="button"
                onClick={() => setWorkspaceMobileSidebarOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--primary-dark)',
                  cursor: 'pointer',
                  padding: '0.2rem 0.4rem'
                }}
              >
                <Menu size={18} />
                <span>Dashboard Menu</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('home')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Exit to Home
              </button>
            </div>

            <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
              {currentView === 'overview' && (
                <OverviewView
                  plan={activePlan}
                  onNavigate={(view) => setCurrentView(view)}
                  onToggleTask={handleToggleTask}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'plans' && (
                <MyPlansView
                  plan={activePlan}
                  onToggleTask={handleToggleTask}
                  onUpdateTask={handleUpdateTask}
                  onUpdateGoal={handleUpdateGoal}
                  onRequestDelete={() => setIsDeleteModalOpen(true)}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'today' && (
                <TodayView
                  plan={activePlan}
                  onToggleTask={handleToggleTask}
                  onUpdateTask={handleUpdateTask}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'progress' && (
                <ProgressView
                  plan={activePlan}
                  onNavigate={(view) => setCurrentView(view)}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'explore' && (
                <ExploreGoalsView
                  onSelectGoal={handleStartGoalWithPrefill}
                  onOpenCustomCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'builder' && (
                <ExploreGoalsView
                  onSelectGoal={handleStartGoalWithPrefill}
                  onOpenCustomCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'reflection' && (
                <ReflectionView
                  plan={activePlan}
                  onSaveReflection={handleSaveReflection}
                  onDeleteReflection={handleDeleteReflection}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'inspiration' && (
                <InspirationLibraryView
                  onSelectGoal={handleStartGoalWithPrefill}
                  onOpenCreate={handleOpenNewWizard}
                />
              )}

              {currentView === 'achievements' && (
                <AchievementsView
                  plan={activePlan}
                  onOpenCreate={handleOpenNewWizard}
                  onNavigate={(view) => setCurrentView(view)}
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

              {currentView === 'about' && (
                <AboutView />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Creation Wizard Modal */}
      <PlanWizard
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setWizardPrefill(null);
        }}
        onComplete={handleCompleteWizard}
        initialGoal={wizardPrefill?.goal}
        initialCategory={wizardPrefill?.category}
      />

      {/* Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default App;
