import { Plan, Achievement } from '../types';

export function deriveAchievements(plan: Plan | null): Achievement[] {
  const hasPlan = !!plan;
  const completedCount = plan ? plan.tasks.filter((t) => t.completed).length : 0;
  const hasReflection = plan ? Array.isArray(plan.reflections) && plan.reflections.length > 0 : false;

  return [
    {
      id: 'achieve-first-plan',
      title: 'First Step',
      description: 'Created your first structured 7-day action plan.',
      iconName: 'Sparkles',
      isUnlocked: hasPlan,
      unlockedAt: plan?.createdAt,
      requirement: 'Create any 7-day plan in the wizard.',
    },
    {
      id: 'achieve-first-task',
      title: 'Action Taker',
      description: 'Checked off your very first daily action step.',
      iconName: 'CheckCircle2',
      isUnlocked: completedCount >= 1,
      requirement: 'Mark at least 1 daily task as completed.',
    },
    {
      id: 'achieve-halfway',
      title: 'Consistent Momentum',
      description: 'Accomplished 3 daily milestones on your plan.',
      iconName: 'Flame',
      isUnlocked: completedCount >= 3,
      requirement: 'Complete 3 tasks in your active plan.',
    },
    {
      id: 'achieve-reflection',
      title: 'Thoughtful Learner',
      description: 'Wrote and saved your first weekly progress reflection.',
      iconName: 'BookMarked',
      isUnlocked: hasReflection,
      unlockedAt: plan?.reflections?.[0]?.date,
      requirement: 'Save a weekly reflection in Reflection View.',
    },
    {
      id: 'achieve-all-tasks',
      title: 'The Finish Line',
      description: 'Completed all 7 days of your structured plan.',
      iconName: 'Trophy',
      isUnlocked: completedCount === 7,
      requirement: 'Mark all 7 tasks as completed.',
    },
  ];
}

