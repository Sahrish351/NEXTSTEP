import { Plan } from '../types';

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
      return { plan: parsed as Plan, error: false };
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

