---
doc: spec
status: approved
---

# NextStep — Technical Specification (Redesigned & Expanded Architecture)

A multi-page, photo-enriched React 18 + TypeScript + Vite web application featuring client-side view routing, browser storage persistence, image asset management, and native JSON import/export.

## How This Works, In Plain Language
NextStep is structured around 12 cohesive destinations coordinated by `App.tsx`:
- **Navigation Shell:**
  - `Sidebar.tsx`: Desktop sidebar with grouped navigation (*Workspace* vs *Explore & Learn*), active plan progress meter, and quick launch button.
  - `MobileNav.tsx`: Bottom navigation bar with accessible touch targets for mobile viewports.
  - `Header.tsx`: Universal header with brand wordmark and context-sensitive actions.
- **Data Engine (`storage.ts`):** Handles `localStorage` reads/writes, JSON export downloads, schema validation on JSON file imports, and real activity logging.
- **Reflection Engine:** Persists structured user reflection objects into the plan payload.
- **Achievements Engine:** Derives earned badges directly from plan state, completed tasks, and saved reflections.
- **Image System (`images.ts`):** Curated, optimized Unsplash photography with fallback background treatments and accessible alt text.

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
  type: 'created' | 'completed' | 'uncompleted' | 'edited' | 'goal_updated' | 'reflection_saved';
  message: string;
}

export interface Reflection {
  id: string;
  date: string;
  wentWell: string;
  hardestPart: string;
  blockers: string;
  changeNextTime: string;
  nextAction: string;
}

export interface Plan {
  id: string;
  goal: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  activities: ActivityLog[];
  reflections: Reflection[];
}

export interface GoalExample {
  id: string;
  title: string;
  category: Category;
  description: string;
  targetAudience: string;
  firstStep: string;
  imageKey: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export type ViewType = 
  | 'home'
  | 'overview'
  | 'plans'
  | 'today'
  | 'explore'
  | 'builder'
  | 'progress'
  | 'reflection'
  | 'inspiration'
  | 'achievements'
  | 'settings'
  | 'about';
```

## File Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types.ts
├── data/
│   ├── templates.ts             # 5 domain template banks (7 sequential tasks each)
│   ├── images.ts                # Curated photo asset registry with alt text & fallbacks
│   └── goalLibrary.ts           # Curated library of practical goals & use cases
├── utils/
│   ├── storage.ts               # localStorage, JSON export/import, activity logging
│   └── achievements.ts          # Deterministic achievement derivation from real state
├── components/
│   ├── Header.tsx               # Universal header
│   ├── Sidebar.tsx              # Desktop grouped sidebar
│   ├── MobileNav.tsx            # Mobile bottom navigation bar
│   ├── PlanWizard.tsx           # 4-step plan creator modal with prefill support
│   ├── TaskCard.tsx             # Card view, inline edit, checkbox
│   ├── ConfirmModal.tsx         # Accessible deletion confirmation
│   ├── EditGoalModal.tsx        # Goal title editor modal
│   └── EmptyState.tsx           # View-aware empty state component
└── views/
    ├── HomeView.tsx             # Page 1: Public landing page with real photography
    ├── OverviewView.tsx         # Page 2: Workspace cockpit & Today's Focus
    ├── MyPlansView.tsx          # Page 3: Full 7-day schedule & goal editor
    ├── TodayView.tsx            # Page 4: Single-day execution view
    ├── ExploreGoalsView.tsx     # Page 5: Visual image-led discovery gallery
    ├── ProgressView.tsx         # Page 7: Real-time progress analytics & 100% milestone
    ├── ReflectionView.tsx       # Page 8: Weekly reflection workflow & history
    ├── InspirationLibraryView.tsx # Page 9: Deep browsable goal directory
    ├── AchievementsView.tsx     # Page 10: Real milestone badges
    ├── SettingsView.tsx         # Page 11: JSON export/import & safe reset
    └── AboutView.tsx            # Page 12: Editorial storytelling & design philosophy
```

## Image Assets & Fallback Strategy
- Curated photography URLs point to verified Unsplash photos optimized with `auto=format&fit=crop&w=800&q=80`.
- All `<img>` tags implement `onError` fallbacks to render stylized CSS gradients if offline or if network access is restricted.
- All meaningful images carry descriptive alt text.
