---
doc: prd
status: approved
---

# NextStep — Product Requirements Document (PRD)

A multi-view personal goal-execution workspace that turns overwhelming goals into actionable seven-day plans, providing daily focus, honest progress tracking, and complete plan management within the browser.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, and `scope.md > The POC Boundary`.

## The Core Journey
1. **Public Landing Page:** Visitor sees value proposition, problem explanation, 4 domain use cases, plan preview, 3 benefits, and clicks "Create my plan".
2. **Multi-Step Plan Wizard:**
   - *Step 1: Goal Definition* — Validated input with character count, whitespace trimming.
   - *Step 2: Category Selection* — Career, Study, Skill Building, Personal Project, Other.
   - *Step 3: Plan Preview & Review* — User reviews the 7 proposed daily starter tasks before starting.
   - *Step 4: Launch* — User starts plan, transitioning into the personal workspace.
3. **Overview Dashboard:** Answers *"What do I do next?"* with:
   - Today's Focus card (the next unfinished day or chosen day).
   - Real-time progress percentage & completed ratio.
   - 7-Day completion timeline dots.
   - Upcoming tasks list.
   - Genuine recent activity log (records real user actions).
4. **My Plans View:**
   - Active plan card with goal title, category badge, and creation date.
   - Safe Goal Title Editor modal.
   - Full 7-day task schedule stream with inline editing and toggling.
   - Secondary "Delete plan" action with confirmation.
5. **Today View:**
   - Dedicated daily action view centered on one day.
   - Day switcher navigation (Day 1 through Day 7).
   - Task title, guidance description, inline edit mode, and completion toggle.
   - Milestone banner when today's task is checked off.
6. **Progress View:**
   - Detailed completion analytics calculated from actual state.
   - 7-Day interactive progress roadmap.
   - Completed vs. remaining task list.
   - 100% completion celebration banner.
7. **Settings View:**
   - Local browser data explanation.
   - Working JSON Export: downloads `nextstep-plan.json`.
   - Working JSON Import: uploads file, validates schema, asks for confirmation before replacing, and reloads.
   - Reset plan action with destructive modal safeguard.

## Surfaces and Layout
- **Desktop Navigation:** Left sidebar featuring wordmark, primary navigation links (*Overview, My Plans, Today, Progress, Settings*), active goal pill, and quick "New Plan" action.
- **Mobile Navigation:** Responsive header with view switcher or accessible bottom navigation bar with comfortable touch targets.
- **Empty States:** When no plan exists, each view displays a helpful domain-specific empty state with a working "Create a plan" button.

## Features and Functional Requirements

### FR-01: Public Landing Page
Clean presentation with hero, 4 domain use cases (Career, Study, Skill, Project), benefits, interactive preview, and smooth navigation to wizard.

### FR-02: Multi-Step Goal Creation Wizard
Step-by-step creation with back navigation, real-time input validation (1–120 characters), category selection, and proposed 7-day plan preview before starting.

### FR-03: Overview Dashboard
Displays active goal, Today's Focus card (deterministic next incomplete task), 7-day completion timeline, upcoming tasks, and genuine recent activity log.

### FR-04: Today View
Dedicated daily focus view with Day 1–7 stepper, task instructions, inline edit, completion toggle, and celebratory completion message.

### FR-05: My Plans View & Goal Editing
Comprehensive plan view with goal title editing modal, full 7-day task cards with inline editing, and deletion controls.

### FR-06: Progress & Milestones
Real-time calculated progress (0% to 100%), 7-day visual roadmap, completed/remaining breakdown, and 100% completion celebration.

### FR-07: Settings, Export & Import
Working JSON export downloading `nextstep-plan.json`. Working JSON import validating schema, prompting confirmation before overwrite, and restoring plan state. Safe plan reset.

### FR-08: Activity Logging
Tracks real user events: `Plan created`, `Task marked complete`, `Task marked incomplete`, `Task edited`, `Goal updated`. No fake activity.

### FR-09: Persistence & Safe Deletion
Browser `localStorage` persistence across all routes, refresh recovery, corrupted data recovery, and focus-trapped deletion confirmation modal.
