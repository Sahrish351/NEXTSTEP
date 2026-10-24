import { Plan, ActivityLog } from '../types';

const STORAGE_KEY = 'nextstep_active_plan';

export function loadSavedPlan(): { plan: Plan | null; error: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { plan: null, error: false };
    }
    const parsed = JSON.parse(raw);
    
    // Schema validation
    if (
      parsed &&
      typeof parsed.id === 'string' &&
      typeof parsed.goal === 'string' &&
      typeof parsed.category === 'string' &&
      Array.isArray(parsed.tasks) &&
      parsed.tasks.length === 7
    ) {
      // Ensure activities array exists for backwards compatibility
      const plan: Plan = {
        ...parsed,
        activities: Array.isArray(parsed.activities) ? parsed.activities : [
          {
            id: 'act-init',
            timestamp: parsed.createdAt || new Date().toISOString(),
            type: 'created',
            message: `Plan created for "${parsed.goal}"`
          }
        ],
        updatedAt: parsed.updatedAt || parsed.createdAt || new Date().toISOString()
      };
      return { plan, error: false };
    } else {
      console.warn('NextStep: Invalid plan schema detected in localStorage.');
      return { plan: null, error: true };
    }
  } catch (err) {
    console.error('NextStep: Failed to parse localStorage plan:', err);
    return { plan: null, error: true };
  }
}

export function savePlan(plan: Plan): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    return true;
  } catch (err) {
    console.error('NextStep: Failed to save plan to localStorage:', err);
    return false;
  }
}

export function clearSavedPlan(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('NextStep: Failed to clear localStorage:', err);
    return false;
  }
}

export function exportPlanAsJSON(plan: Plan): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plan, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  const sanitizedGoal = plan.goal.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
  downloadAnchor.setAttribute('download', `nextstep_plan_${sanitizedGoal}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function validatePlanJSON(jsonString: string): { valid: boolean; plan?: Plan; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'File is not a valid JSON object.' };
    }
    if (typeof parsed.goal !== 'string' || !parsed.goal.trim()) {
      return { valid: false, error: 'Plan is missing a valid "goal" property.' };
    }
    if (typeof parsed.category !== 'string') {
      return { valid: false, error: 'Plan is missing a "category" property.' };
    }
    if (!Array.isArray(parsed.tasks) || parsed.tasks.length !== 7) {
      return { valid: false, error: 'Plan must contain exactly 7 tasks.' };
    }
    for (let i = 0; i < parsed.tasks.length; i++) {
      const t = parsed.tasks[i];
      if (typeof t.title !== 'string' || !t.title.trim() || typeof t.completed !== 'boolean') {
        return { valid: false, error: `Task Day ${i + 1} has invalid format.` };
      }
    }

    const plan: Plan = {
      id: typeof parsed.id === 'string' ? parsed.id : `plan-${Date.now().toString(36)}`,
      goal: parsed.goal.trim(),
      category: parsed.category,
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: parsed.tasks.map((t: any, idx: number) => ({
        id: t.id || `task-${idx + 1}-${Date.now().toString(36)}`,
        dayNumber: idx + 1,
        title: t.title.trim(),
        description: t.description || '',
        completed: Boolean(t.completed)
      })),
      activities: Array.isArray(parsed.activities) ? parsed.activities : [
        {
          id: `act-import-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'created',
          message: `Plan imported for "${parsed.goal}"`
        }
      ]
    };

    return { valid: true, plan };
  } catch (e: any) {
    return { valid: false, error: `Invalid JSON syntax: ${e.message}` };
  }
}

export function logActivity(plan: Plan, type: ActivityLog['type'], message: string): Plan {
  const newActivity: ActivityLog = {
    id: `act-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    type,
    message
  };

  return {
    ...plan,
    updatedAt: new Date().toISOString(),
    activities: [newActivity, ...(plan.activities || [])].slice(0, 15) // Keep last 15 actions
  };
}
