---
doc: checklist
status: approved
---

# Build Checklist

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

- [x] **5. Safe plan deletion, confirmation dialog, and welcoming empty state**
  Becomes usable: Users can safely delete their plan through an accessible confirmation modal, which permanently clears storage and transitions to an inviting empty state with a working "Create a new plan" button.
  Why now: Completes the full application lifecycle and user journey boundary.
  PRD ref: `prd.md > FR-09`, `prd.md > States and Boundaries > Empty State`
  Spec ref: `spec.md > Components > ConfirmModal`, `spec.md > Components > EmptyState`
  Build: Implement `ConfirmModal.tsx` with focus trapping, `Escape` key listener, "Keep my plan" / "Delete plan" actions, and `EmptyState.tsx` with a welcoming message and reset CTA.
  Verify (mechanical): Run `npm run build`; verify modal cancel retains state; verify modal confirm clears localStorage and switches view to EmptyState.
  Learner check: Click "Delete plan", click "Keep my plan" to verify nothing was deleted, click "Delete plan" again, confirm, and verify empty state appears.
  Commit: `feat: add safe plan deletion modal and empty state`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 1 verified: landing page, goal input, 5 categories, and 7-day starter plan generation
- [x] Final kick-the-tires exploration and feedback completed — Full core journey, editing, progress, persistence, and deletion tested

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Verified end-to-end user journey across all components (`LandingPage`, `GoalForm`, `PlanWorkspace`, `TaskCard`, `ProgressSummary`, `ConfirmModal`, `EmptyState`) and storage utilities.
Route and stops: `src/App.tsx` (state coordination) → `src/components/GoalForm.tsx` (input validation) → `src/data/templates.ts` (category generation) → `src/components/TaskCard.tsx` (inline edit & toggle) → `src/utils/storage.ts` (localStorage persistence & recovery).
Edit outcome: Clean production build verified with `npm run build` producing zero TypeScript errors.
Reflection: Learner practiced translating real user needs through Scope → PRD → Technical Spec → Working Slices.
Activity mode: Live application, headless verification suite (`tests-acceptance.mjs`), and comprehensive HTML interactive app map.

## Revisions


