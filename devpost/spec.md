---
doc: spec
status: approved
---

# NextStep — Technical Specification (Transformed Product Architecture)

A multi-view React + TypeScript + Vite web application utilizing client-side view routing, browser storage persistence, and native JSON import/export.

## How This Works, In Plain Language
1. **The Navigation & View Router (`App.tsx`):** Coordinates views (`landing`, `overview`, `plans`, `today`, `progress`, `settings`, `wizard`).
2. **The Layout System (`Sidebar.tsx`, `MobileNav.tsx`):** Provides a responsive sidebar on desktop and accessible navigation on mobile.
3. **The Data Engine (`storage.ts`):** Handles `localStorage` CRUD, JSON schema validation, JSON export downloads, JSON file imports with overwrite safeguards, and error recovery.
4. **Activity Logger:** Logs real user actions (`created`, `completed`, `uncompleted`, `edited`, `goal_updated`) into the plan payload.
5. **View Modules:**
   - `OverviewView`: Today's focus, progress summary, timeline dots, upcoming tasks, activity feed.
   - `MyPlansView`: Goal header, edit goal modal, 7 task cards with inline editing, delete trigger.
   - `TodayView`: Deep focus on current day with Day 1–7 stepper, task details, toggle, and congratulations.
   - `ProgressView`: Visual 7-day progress tracker, stats, remaining tasks list, 100% milestone badge.
   - `SettingsView`: App info, JSON export, JSON import, reset plan.
   - `PlanWizard`: 4-step guided creation modal/flow (Goal → Category → Plan Preview → Launch).
   - `LandingPage`: Marketing presentation with use cases, benefits, preview, and CTA.

## Stack
- **Framework:** React 18 / 19
- **Language:** TypeScript (Strict mode)
- **Tooling:** Vite
- **Icons:** `lucide-react`
- **Styling:** Scoped CSS & CSS custom variables (`#FAF8F3`, `#246B52`, `#DCEBE1`, `#E98770`, `#202720`)
- **Persistence:** Web Storage API (`localStorage`) + HTML5 File API (JSON import/export)

## Data Model

```typescript
export type Category = 
  | 'Study'
  | 'Career'
  | 'Skill Building'
  | 'Personal Project'
  | 'Other';

export interface Task {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'created' | 'completed' | 'uncompleted' | 'edited' | 'goal_updated';
  message: string;
}

export interface Plan {
  id: string;
  goal: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  activities: ActivityLog[];
}
```

## File Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types.ts
├── data/
│   └── templates.ts        # 5 domain template banks (7 steps each)
├── utils/
│   └── storage.ts          # localStorage, JSON export, JSON import validator
├── components/
│   ├── Header.tsx          # Universal mobile/desktop header
│   ├── Sidebar.tsx         # Desktop responsive sidebar
│   ├── MobileNav.tsx       # Mobile bottom navigation bar
│   ├── LandingPage.tsx     # Public landing page with use cases
│   ├── PlanWizard.tsx      # Multi-step creation wizard
│   ├── TaskCard.tsx        # Card view, inline edit, checkbox
│   ├── ConfirmModal.tsx    # Accessible deletion confirmation
│   ├── EditGoalModal.tsx   # Goal title editor modal
│   └── EmptyState.tsx      # View-aware empty states
└── views/
    ├── OverviewView.tsx    # Today focus, timeline, activity
    ├── MyPlansView.tsx     # Full 7-day roadmap & plan summary
    ├── TodayView.tsx       # Dedicated daily action view
    ├── ProgressView.tsx    # Progress analytics & milestone
    └── SettingsView.tsx    # JSON export/import & data safety
```

## Important Failure Modes
1. **Invalid JSON Import:** Handled by `validatePlanJSON`. Rejects files missing required fields and shows an alert.
2. **Corrupted LocalStorage:** Caught by `loadSavedPlan`, rendering a recovery banner without crashing.
3. **Empty Goal or Task Title:** Inline validation prevents submission; previous values are preserved.
