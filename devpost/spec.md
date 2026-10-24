---
doc: spec
status: approved
---

# NextStep — Technical Specification

A modular, type-safe single-page web application built with React, TypeScript, and Vite that turns goals into 7-day action plans stored resiliently in the browser.

## How This Works, In Plain Language
NextStep runs entirely in the user's browser without requiring a backend server or database:
1. **The State Engine (`usePlan`):** Holds the active plan object (goal, category, creation date, and array of 7 tasks). It exposes simple actions: `createPlan`, `updateTask`, `toggleTask`, `deletePlan`.
2. **The Storage Guard (`storage.ts`):** Whenever the plan changes, it serializes the data safely into the browser's `localStorage`. When the app loads, it reads and validates the stored JSON. If the data is corrupted or invalid, it catches the error and recovers safely.
3. **The Template Generator (`templates.ts`):** When given a goal and category (Study, Career, Skill Building, Personal Project, Other), it returns seven logically ordered starter tasks tailored to that domain.
4. **The Interface Components:**
   - `LandingPage`: Presents the product promise, interactive plan preview, benefits, and how it works.
   - `GoalForm`: Accessible input form for goal text and category buttons with instant validation.
   - `PlanWorkspace`: Displays the active goal, category badge, dynamic progress bar, and 7 task cards.
   - `TaskCard`: Handles individual task presentation, two-way completion toggle, and inline title/description editing with Save/Cancel safeguards.
   - `ConfirmModal`: Traps focus to confirm plan deletion safely before clearing storage.
   - `EmptyState`: Welcoming screen shown when no plan is active, offering a one-click return to the creator.

## The Core Journey Through the System
1. **Initial Mount:** `App` initializes. `storage.ts` checks `localStorage.getItem('nextstep_active_plan')`.
   - If a valid plan exists: App sets `plan` state and displays `PlanWorkspace` directly (`prd.md > The Core Journey: Step 7`).
   - If no plan exists: App displays `LandingPage` and `GoalForm` (`prd.md > The Core Journey: Step 1`).
2. **Plan Creation:** User submits goal text and category. `GoalForm` validates non-empty string. `templates.ts` builds 7 tasks with unique IDs. `App` saves plan to state and `localStorage`. View transitions to `PlanWorkspace` (`prd.md > The Core Journey: Step 2 & 3`).
3. **Inline Editing:** User clicks "Edit" on a `TaskCard`. Card switches local state to `isEditing = true`. User edits title/description. Clicking "Save" triggers `updateTask(taskId, newTitle, newDesc)`. Clicking "Cancel" reverts local edits to original props (`prd.md > FR-05`).
4. **Completion Toggle:** User toggles checkbox. `toggleTask(taskId)` flips boolean `completed`. `PlanWorkspace` recalculates `completedCount` and `percentage = Math.round((count / 7) * 100)`. Stored immediately to `localStorage` (`prd.md > FR-06 & FR-07`).
5. **Plan Deletion:** User clicks "Delete plan". `ConfirmModal` renders with focus trap. On confirm, `deletePlan()` clears state and removes key from `localStorage`. View renders `EmptyState` (`prd.md > FR-08 & FR-09`).

## Stack
- **Runtime & Tooling:** Node.js + [Vite](https://vitejs.dev/) (fast HMR, lightweight bundle, zero server config).
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode for type-safe plan objects and tasks).
- **UI Framework:** [React 18 / 19](https://react.dev/) (declarative components and clean state hooks).
- **Icons:** [lucide-react](https://lucide.dev/) (accessible, lightweight SVG icons).
- **Styling:** Modern scoped CSS / CSS modules utilizing CSS variables for theme consistency and dark/light contrast compliance.
- **Persistence:** Native Web Storage API (`localStorage`).

## Where It Runs and How Someone Tries It
- **Runtime:** Runs entirely client-side in any modern web browser (Chrome, Edge, Firefox, Safari).
- **Local Dev Server:**
  ```bash
  npm install
  npm run dev
  ```
  Opens at `http://localhost:5173`.
- **Production Build & Verification:**
  ```bash
  npm run build
  npm run preview
  ```
- **Demo Recording:** Can be recorded directly in the browser using free OS tools (Xbox Game Bar on Windows: `Win + Alt + R`, or OBS).
- **Public Repository:** Pushed to `https://github.com/Sahrish351/NEXTSTEP.git`.

## Look and Feel
Carried forward directly from `prd.md > Look and Feel`:
- **CSS Variables:**
  - `--bg: #FAF8F3` (Warm Ivory)
  - `--primary: #246B52` (Forest Green)
  - `--primary-dark: #194C3A` (Deep Forest)
  - `--text: #202720` (Deep Charcoal)
  - `--text-muted: #556358` (Slate Muted)
  - `--sage: #DCEBE1` (Soft Sage Surface)
  - `--coral: #E98770` (Restrained Coral Accent)
  - `--card-bg: #FFFFFF` (Pure White Card Surface)
  - `--border: #E4DDD3` (Muted Warm Border)
- **Typography:**
  - Headings: `"DM Serif Display", Georgia, serif`
  - Body & UI: `"DM Sans", system-ui, sans-serif`
  - Google Fonts CDN loaded with fallback to system serifs/sans-serifs.
- **Accessibility & Motion:**
  - `@media (prefers-reduced-motion: reduce)` disables animations and smooth scrolling.
  - Visible `:focus-visible` outline rings (`2px solid var(--primary)` with `2px offset`).

## Components

### `App`
Coordinates top-level views (`LandingPage` + `GoalForm`, `PlanWorkspace`, `EmptyState`, and `ConfirmModal`).
Implements `prd.md > The Core Journey`.

### `LandingPage`
Renders navigation bar, hero section, interactive plan preview mockup, 3-pillar benefit cards, and "How it works" sequence. Includes smooth scroll trigger to `#create-plan`.
Implements `prd.md > FR-01`.

### `GoalForm`
Accessible form with text input (max 120 chars, trims whitespace), character counter, 5 category toggle buttons (`Study`, `Career`, `Skill Building`, `Personal Project`, `Other`), inline validation alert, and submit button.
Implements `prd.md > FR-02 & FR-03`.

### `PlanWorkspace`
Container for active plan. Displays active goal title, category pill, secondary "Delete plan" action, real-time progress bar with percentage, and 7 ordered `TaskCard` elements.
Implements `prd.md > FR-04 & FR-07`.

### `TaskCard`
Represents an individual day (`Day 01` to `Day 07`).
- View Mode: Shows Day badge, title, description, checkbox button, and "Edit" button. Completed state adds subtle card styling and check indicator.
- Edit Mode: Shows text input for title, textarea for description, "Save" button (validates non-empty), and "Cancel" button.
Implements `prd.md > FR-05 & FR-06`.

### `ProgressSummary`
Calculates `completedCount` and percentage. Renders accessible progress bar (`role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`) and motivating status text.
Implements `prd.md > FR-07`.

### `ConfirmModal`
Accessible modal dialog rendered via portal or fixed overlay. Focus trapped. Confirms plan deletion. ESC key or "Keep my plan" cancels. "Delete plan" confirms.
Implements `prd.md > FR-08 & FR-09`.

### `EmptyState`
Renders calm illustration/badge, *"Ready for your next step?"* headline, reassuring copy, and *"Create a new plan"* button that resets view to `GoalForm`.
Implements `prd.md > FR-09`.

## Data Model

```typescript
export type Category = 
  | 'Study'
  | 'Career'
  | 'Skill Building'
  | 'Personal Project'
  | 'Other';

export interface Task {
  id: string;           // e.g. "task-1"
  dayNumber: number;    // 1 to 7
  title: string;        // Editable task title
  description: string;  // Detailed action instructions
  completed: boolean;   // Checkmark state
}

export interface Plan {
  id: string;           // Unique timestamp/UUID
  goal: string;         // User's entered goal text
  category: Category;   // Selected category
  createdAt: string;    // ISO timestamp
  tasks: Task[];        // Exactly 7 sequential tasks
}
```

## File Structure

```
NextStep_Hackathon/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope-review.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md
│   ├── spec.html
│   ├── checklist.md
│   └── app-map.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts
│   ├── data/
│   │   └── templates.ts        # 5 sets of 7 sequential starter tasks
│   ├── utils/
│   │   └── storage.ts          # Safe localStorage CRUD and error recovery
│   └── components/
│       ├── Header.tsx          # Wordmark and nav
│       ├── LandingPage.tsx     # Hero, preview, benefits, how-it-works
│       ├── GoalForm.tsx        # Goal input, category pills, validation
│       ├── PlanWorkspace.tsx   # Workspace header, progress, task list
│       ├── TaskCard.tsx        # Card view, inline edit, checkbox
│       ├── ProgressSummary.tsx # Progress bar and calculation
│       ├── ConfirmModal.tsx    # Accessible deletion confirmation
│       └── EmptyState.tsx      # Reset empty state
```

## External Services and Dependencies
- **No external cloud APIs or databases.**
- **npm dependencies:**
  - `react`: ^18.3.1 (or 19.x)
  - `react-dom`: ^18.3.1 (or 19.x)
  - `lucide-react`: ^0.460.0 (lightweight SVG icons)
- **Dev dependencies:**
  - `typescript`, `vite`, `@vitejs/plugin-react`

## Important Failure Modes
1. **Empty / Whitespace Goal:** User clicks submit without typing a goal → Inline alert appears: *"Please enter a goal so we can build your plan."* Focus returns to input.
2. **Empty Task Title on Edit:** User deletes task title and clicks Save → Inline alert appears: *"Task title cannot be empty."* Previous title is retained if user clicks Cancel.
3. **Storage Quota / Unavailable / Corrupted JSON:**
   - Corrupted JSON in `localStorage` → `storage.ts` catches parse error, logs warning, displays safe recovery banner, and allows user to start a fresh plan without crashing the app.

## What Was Simplified and Why
- **Category Templates instead of Paid LLM API:** Eliminates latency, API billing, network failures, and token limits. Fully editable by the user and completely honest.
- **Local Browser Storage instead of Postgres/Firebase:** Zero signup friction, instant speed, total user privacy, and zero backend maintenance.

## Decisions and Open Issues
- **Decisions Agreed:** Direct workspace return on refresh; inline card editing instead of full-page modals; 5 distinct category template banks with 7 steps each; warm ivory & forest green palette.
- **One Useful Unknown & Learning Concept:**
  - *Learner's learning intention:* How plan-first development translates PRD acceptance criteria into typed component interfaces and testable state transitions before writing code.
  - *Clarification:* In this specification, we mapped every single functional requirement (`FR-01` through `FR-09`) directly to a named React component and a typed TypeScript interface (`Plan`, `Task`). This ensures that when we run `5-build`, every file we create has an exact purpose and nothing unexpected is introduced.
- **Open Issues:** None. Specification is complete, cohesive, and ready for build.

