---
doc: checklist
status: approved
---

# Build Checklist (Transformed Product Architecture)

Build mode: fast

## Slices

- [x] **1. Project scaffold, landing page, goal input, and 7-day starter plan generation**
  Becomes usable: A running web app where the user can view the landing page, enter a goal, choose from 5 categories, click "Build my 7-day plan", and see seven logical, sequential starter tasks render immediately in the workspace.
  Why now: Boots the project and proves the core end-to-end flow from landing page to generated 7-day plan on the very first slice.
  PRD ref: `prd.md > The Core Journey` (steps 1–4), `prd.md > FR-01`, `prd.md > FR-02`, `prd.md > FR-03`, `prd.md > FR-04`
  Spec ref: `spec.md > Components`, `spec.md > File Structure`, `spec.md > Look and Feel`
  Build: Initialize Vite + React + TypeScript, install dependencies, configure typography and CSS variables (`#FAF8F3`, `#246B52`, `#DCEBE1`, `#E98770`), build `LandingPage`, `GoalForm`, `templates.ts`, and initial `PlanWorkspace`.
  Verify (mechanical): Run dev server, verify Vite starts with code 0 on local port; run production build `npm run build` to verify clean TypeScript compilation; test goal validation and category plan generation.
  Learner check: Open `http://localhost:5173`, read the landing page, enter a goal ("Prepare for my web development interview"), choose Career, click "Build my 7-day plan", and verify seven sequential tasks appear.
  Commit: `feat: scaffold app with landing page and 7-day plan generator`

- [x] **2. Completion toggling and real-time accurate progress calculation**
  Becomes usable: Users can check and uncheck tasks with immediate visual feedback (subtle card styling and checkmark, not relying on color alone), while the progress bar and summary update accurately.
  Why now: The progress feedback loop is essential to the core experience and provides instant reward for daily actions.
  PRD ref: `prd.md > FR-06`, `prd.md > FR-07`
  Spec ref: `spec.md > Components > ProgressSummary`, `spec.md > Components > TaskCard`
  Build: Implement two-way completion toggle in `App.tsx` and `TaskCard.tsx`, wire `ProgressSummary.tsx` to calculate `completedCount` and `percentage = Math.round((completedCount / 7) * 100)` with accessible ARIA progressbar attributes.
  Verify (mechanical): Run `npm run build` to confirm type-check passes; check that checking 2 tasks computes exactly 29% (`2 / 7`).
  Learner check: Check off Day 1 and Day 2; confirm the counter displays "2 of 7 completed (29%)" and unchecking returns to 14%.
  Commit: `feat: add task completion toggling and dynamic progress tracking`

- [x] **3. Inline task editing with Save and Cancel safeguards**
  Becomes usable: Users can edit any task's title and description directly inside the card, save changes safely, or cancel to restore previous text without data loss. Empty titles are prevented.
  Why now: Makes the starter suggestions truly customizable for the user's specific circumstances.
  PRD ref: `prd.md > FR-05`
  Spec ref: `spec.md > Components > TaskCard`
  Build: Add inline edit mode to `TaskCard.tsx` with title input, description textarea, Save button (with non-empty validation and whitespace trimming), and Cancel button (reverting changes).
  Verify (mechanical): Run `npm run build`; verify empty title validation prevents submission; verify cancel reverts state to previous title.
  Learner check: Click Edit on Day 3, change the title to a custom task, click Save; then edit Day 4, change text, click Cancel and verify it restores cleanly.
  Commit: `feat: implement inline task editing with save and cancel safeguards`

- [x] **4. Browser localStorage persistence and refresh recovery**
  Becomes usable: The user's active plan, customized tasks, and completion states are automatically saved to `localStorage` and restored immediately when reopening or refreshing the page.
  Why now: Persistence turns an ephemeral toy into a reliable tool that users can rely on across days.
  PRD ref: `prd.md > FR-08`, `prd.md > States and Boundaries > Active Plan`
  Spec ref: `spec.md > Components > storage.ts`, `spec.md > Important Failure Modes`
  Build: Implement `src/utils/storage.ts` with safe JSON serialization, schema validation, exception catching for corrupted storage, and automated state synchronization on every plan mutation.
  Verify (mechanical): Run `npm run build`; test storage save/read/corrupt-recovery in storage utility; verify reload preserves state.
  Learner check: Refresh the browser with an active plan and verify the plan, task edits, and completed checks reload seamlessly.
  Commit: `feat: add local storage persistence and error-safe refresh recovery`

- [x] **5. Multi-View Workspace, Guided Creation Wizard & Data Portability**
  Becomes usable: A complete multi-screen personal goal workspace with Overview, My Plans, Today, Progress, and Settings views, desktop sidebar and mobile bottom navigation, 3-step creation wizard with pre-launch plan preview, JSON export, and safe JSON import.
  Why now: Transforms NextStep from a single page into an authentic, feature-rich productivity web application.
  PRD ref: `prd.md > Surfaces and Layout`, `prd.md > FR-02` through `FR-08`
  Spec ref: `spec.md > The Navigation & View Router`, `spec.md > View Modules`
  Build: Implement `Sidebar.tsx`, `MobileNav.tsx`, `PlanWizard.tsx`, `EditGoalModal.tsx`, `OverviewView.tsx`, `MyPlansView.tsx`, `TodayView.tsx`, `ProgressView.tsx`, and `SettingsView.tsx` with activity logging and JSON file import/export.
  Verify (mechanical): Run `npm run build` and `node tests-acceptance.mjs` verifying clean compilation and 100% test pass across all 8 acceptance categories.
  Learner check: Navigate across Overview, My Plans, Today, Progress, and Settings. Test Today's focus toggle, test JSON export, and verify responsive layout on mobile.
  Commit: `feat: complete multi-view workspace transformation`

- [x] **6. 12-View Art-Directed Architecture, Curated Photography System & Weekly Reflection Engine**
  Becomes usable: A 12-destination goal platform including Explore Goals, Inspiration Library, Weekly Reflection Journal, Real Milestone Badges, and About Page, enriched with curated Unsplash photography, responsive navigation, prefilled wizard launches, and automated acceptance suite.
  Why now: Elevates the application to a distinctive, hackathon-winning product with authentic reflection and milestone mechanics without fake data.
  PRD ref: `prd.md > The 12-Page View Architecture`, `prd.md > FR-09` through `FR-12`
  Spec ref: `spec.md > View Modules`, `spec.md > Creative & Visual System`
  Build: Implement `ExploreGoalsView.tsx`, `ReflectionView.tsx`, `InspirationLibraryView.tsx`, `AchievementsView.tsx`, `AboutView.tsx`, `images.ts`, `goalLibrary.ts`, and `achievements.ts`. Update `LandingPage.tsx` with photo compositions, wire prefill in `PlanWizard.tsx`, and assemble all 12 views in `App.tsx`.
  Verify (mechanical): Run `npm run build` (compiled clean in 5.5s) and `node tests-acceptance.mjs` (11/11 acceptance tests passing).
  Learner check: Browse Explore Goals, click "Start with this goal" to prefill wizard, save a weekly reflection, inspect Milestones unlocking in real time, and view About NextStep page.
  Commit: `feat: implement 12-view photo-enriched architecture and reflection engine`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Multi-step wizard, category selection, and 7-day starter plan generation verified
- [x] Final kick-the-tires exploration and feedback completed — Multi-view navigation (Overview, Plans, Today, Progress, Settings), JSON export/import, inline editing, and deletion tested

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Verified end-to-end multi-view architecture across all 5 workspace views (`OverviewView`, `MyPlansView`, `TodayView`, `ProgressView`, `SettingsView`), wizard flow (`PlanWizard`), responsive navigation (`Sidebar`, `MobileNav`, `Header`), and data engine (`storage.ts`).
Route and stops: `src/App.tsx` (view coordinator) → `src/components/PlanWizard.tsx` (3-step creator) → `src/views/OverviewView.tsx` (today focus & activity) → `src/views/TodayView.tsx` (daily action mode) → `src/views/SettingsView.tsx` (JSON export/import).
Edit outcome: Production build verified cleanly in 5.8s with zero errors (`npm run build`).
Reflection: Practiced evolving a proof of concept from a single-screen prototype into a modular, multi-surface application while preserving core boundaries and zero-server privacy.
Activity mode: Live application, headless automated test suite (`tests-acceptance.mjs`), and comprehensive interactive app map (`devpost/app-map.html`).

## Revisions

- Added multi-view workspace architecture (`overview`, `plans`, `today`, `progress`, `settings`) to transform single-page prototype into a complete personal goal workspace.
- Added 3-step creation wizard with plan preview to allow users to review the 7-day sequence before committing.
- Added native JSON export and validated JSON import with overwrite safeguards for cross-browser data portability.
- Added real activity logging (`activities` in `Plan`) to supply authentic recent history on the Overview dashboard without fake analytics.
