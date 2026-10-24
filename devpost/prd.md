---
doc: prd
status: approved
---

# NextStep — Product Requirements Document (PRD)

A focused, responsive web application that turns any overwhelming personal or professional goal into an immediate, editable seven-day action plan with browser-persisted progress tracking.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, and `scope.md > The POC Boundary`.

## The Core Journey
1. **Arrival:** User arrives at the NextStep landing page. They see a calm, premium headline, a clear explanation of how NextStep eliminates "where do I start?" paralysis, a visual preview of a real 7-day plan, and a prominent "Create my plan" call-to-action.
2. **Goal Entry & Categorization:** Clicking "Create my plan" smoothly scrolls the user down to the creation form. The user enters their goal (e.g., *"Prepare for my web development interview"*) and selects one of five categories: *Study, Career, Skill Building, Personal Project, or Other*.
3. **Plan Generation:** The user clicks "Build my 7-day plan". Input is validated (whitespace trimmed, empty values rejected). The application instantly maps the category to seven sequential, meaningful starter actions.
4. **Workspace Immersion:** The interface transitions cleanly to the Plan Workspace, showing the user's goal, category tag, progress summary (0 of 7 completed • 0%), and seven connected daily task cards (Day 01 to Day 07).
5. **Personalization (Inline Editing):** The user clicks "Edit" on any task. The card transforms inline into editable title and description fields with Save and Cancel buttons. The user refines the task to fit their exact needs, saves, and the card updates immediately. If they cancel, previous text is restored without data loss. Empty titles are prevented with friendly inline feedback.
6. **Execution & Progress Tracking:** As the user accomplishes tasks, they click the completion toggle. The card displays a distinct checked state (subtle background shift and checkmark indicator without relying solely on color). The progress summary updates immediately (e.g., *2 of 7 completed • 29%*). Users can uncheck tasks if needed.
7. **Session Persistence:** The user closes or refreshes their browser. Upon reopening, the app detects their active plan in `localStorage` and immediately restores their customized workspace, task edits, and completion checkmarks.
8. **Plan Reset & Empty State:** When finished or ready for a new focus, the user clicks the secondary "Delete plan" action in the workspace header. A modal dialog asks: *"Delete your seven-day plan? This will permanently remove your saved goal, tasks, and progress from this browser."* Choosing "Keep my plan" preserves everything. Choosing "Delete plan" clears local storage and displays an inviting empty state with a "Create a new plan" action.

## Screens and Layout

### Surface 1: Landing Page & Goal Creator
- **Navigation Header:** Distinctive NextStep brand wordmark and unobtrusive links.
- **Hero Section:** Editorial headline (*"Make your next step obvious"*), reassuring subhead, primary CTA (*"Create my plan"*), and an authentic interactive-styled preview of a 7-day plan card.
- **Benefits Section:** Three tangible value propositions:
  - *Instant Momentum:* Never face a blank to-do list again.
  - *Editable Scaffolding:* Real starter steps, not rigid formulas.
  - *Private & Zero-Friction:* Saved directly in your browser—no passwords, no accounts.
- **How It Works:** 3-step visual guide (1. Name your goal → 2. Get 7 sequential steps → 3. Check off daily progress).
- **Goal Creation Form:** Clearly labeled text input with character limit counter, 5 accessible category pills, friendly inline validation alerts, and the primary submission button (*"Build my 7-day plan"*).
- **Footer:** Privacy note explaining browser storage, project credits, and open-source license reference.

### Surface 2: Plan Workspace
- **Workspace Header:**
  - Active goal displayed prominently in editorial serif typography.
  - Category badge (e.g., *Career*, *Study*).
  - Subtle secondary "Delete plan" button positioned away from task completion controls.
- **Progress Summary Banner:**
  - Accessible progress bar reflecting completion ratio.
  - Text summary: e.g., *"2 of 7 completed (29%)"*.
  - Encouraging, realistic feedback message (e.g., *"Great start! Day 1 and Day 2 are done."*).
- **7-Day Task Stream:**
  - Seven ordered cards visually linked as a cohesive journey.
  - Day badges (`Day 01` through `Day 07`).
  - Clear typography for task titles and descriptive guidance.
  - Accessible completion checkbox with clear hover/focus and checked states.
  - Inline edit trigger button.
- **Empty State Surface:**
  - Shown after plan deletion or when storage is cleared.
  - Warm headline: *"Ready for your next step?"*
  - Reassuring subtext and a functional *"Create a new plan"* button that transitions back to the goal creation form.
- **Delete Confirmation Modal:**
  - Accessible dialog overlay with focus trap.
  - Explanatory warning text regarding local browser deletion.
  - Two clear options: *"Keep my plan"* (safe dismiss) and *"Delete plan"* (destructive confirmation).

## Look and Feel
- **Color Palette:**
  - Warm Ivory (`#FAF8F3`): Canvas background, soft and readable.
  - Forest Green (`#246B52`): Brand primary, buttons, active borders, progress fill.
  - Deep Forest Green (`#194C3A`): High contrast heading accents and active states.
  - Deep Charcoal (`#202720`): High-contrast primary text, meeting WCAG AA standards.
  - Soft Sage (`#DCEBE1`): Surface containers, badges, subtle highlights.
  - Restrained Coral (`#E98770`): Accent callouts, warnings, delete confirmations.
  - Clean White (`#FFFFFF`): Card backgrounds and input surfaces.
- **Typography:**
  - Display & Headings: `DM Serif Display`, Georgia, serif fallback.
  - Interface & Body: `DM Sans`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
- **Motion & Accessibility:**
  - Transitions: Quick, restrained 150ms–200ms ease-out transitions for toggles, hover, and modal appearance.
  - `prefers-reduced-motion`: Disables non-essential movement and smooth scrolling for users who prefer reduced motion.
  - Touch Targets: Minimum 44x44px touch targets on mobile viewports.
  - No Horizontal Overflow: Fluid typography and responsive card padding at 360px, 390px, 768px, 1024px, and 1440px.

## Features and Behavior

### FR-01: Landing Page & Smooth Navigation
- Landing page renders hero, benefits, preview, and creation form cleanly.
- "Create my plan" button smoothly scrolls down to the creation form.

### FR-02: Goal Input Validation
- Accepts input up to 120 characters.
- Trims leading and trailing whitespace.
- If submitted empty or whitespace-only, prevents generation and displays an accessible alert: *"Please enter a goal so we can build your plan."*

### FR-03: Category Selection
- Categories: *Study, Career, Skill Building, Personal Project, Other*.
- Keyboard selectable with visible focus indicators and `aria-pressed` or radio semantics.
- Defaults gracefully to the chosen category or prompts selection.

### FR-04: 7-Day Plan Generation
- Maps the entered goal and category into exactly seven distinct, logically ordered starter tasks.
- Sequence flows from understanding/orientation → small execution → deeper practice → review and synthesis.
- Tasks are clearly marked as starter suggestions, never falsely claiming guaranteed outcomes or AI generation when powered by templates.

### FR-05: Task Card Inline Editing
- Clicking "Edit" replaces static title and description with input and textarea.
- "Save" updates state, trims whitespace, and closes edit mode.
- Empty title triggers inline warning and prevents saving.
- "Cancel" restores original title and description without changes.
- Pressing `Escape` cancels edit mode; pressing `Enter` in the title input saves.

### FR-06: Task Completion Toggling
- Clicking checkbox or pressing `Space`/`Enter` toggles complete / incomplete state.
- Completed task renders checked box, subtle card tint, and optional strikethrough styling while keeping text readable.
- State is reversible at any time.

### FR-07: Real-Time Dynamic Progress Calculation
- Computes `completedCount = tasks.filter(t => t.completed).length`.
- Computes `percentage = Math.round((completedCount / 7) * 100)`.
- Accessible `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` on the progress element.

### FR-08: Browser Local Storage Persistence
- Saves plan payload: `{ id, goal, category, createdAt, tasks: [...] }` to key `nextstep_active_plan`.
- Automatically restores plan on page load.
- Validates JSON schema on read. If corrupted, offers recovery without crashing.

### FR-09: Safe Plan Deletion & Empty State
- "Delete plan" triggers an accessible confirmation dialog.
- Dismissing modal keeps the plan untouched.
- Confirming deletes `nextstep_active_plan` from storage and presents the empty state.
- Empty state includes a working "Create a new plan" button that reopens the creator form.

## States and Boundaries
- **First Use:** No saved plan in storage → Landing page with hero and creation form visible.
- **Active Plan:** Valid plan in storage → User lands directly in the Plan Workspace.
- **Editing Mode:** Active on one task card at a time → Inline inputs, Save & Cancel buttons visible.
- **Completed State:** 7 of 7 tasks checked → Congratulatory banner celebrating completion of the 7-day runway.
- **Delete Confirmation:** Dialog open → Background dimmed, focus trapped inside modal, `Escape` key dismisses.
- **Empty State:** Plan deleted → Welcoming card with prompt to start a fresh plan.
- **Corrupted Storage:** Corrupted JSON detected → Graceful error card with option to reset storage safely.

## Product Decisions
1. **Direct Workspace Landing for Returning Users:** Returning users with an active plan go straight to their workspace to minimize friction and keep daily momentum high.
2. **Inline Task Editing Over Modals:** Keeps the user grounded in the 7-day context rather than disorienting them with full-screen overlays.
3. **Transparent Category Templates:** Honest, reliable, zero-latency starter scaffolding that does not depend on paid external APIs or make false claims of AI autonomy.
4. **Local Browser Storage:** Eliminates account creation and server costs while ensuring complete user privacy.

## What We're Building
- Single Page Application with Landing Page, Goal Form, 7-Day Plan Workspace, Inline Editor, Real-Time Progress, Storage Persistence, and Delete Modal.
- 5 comprehensive sets of 7-step starter templates for Study, Career, Skill Building, Personal Project, and Other.
- Full keyboard accessibility, visible focus rings, ARIA labels, and WCAG AA contrast compliance.
- Responsive design tested from 360px to 1440px.

## Deferred From the POC
- Exporting to PDF or Markdown summary.
- Calendar integration (.ics file export).
- Multi-week plan expansion beyond 7 days.
- Real external LLM API generation toggle.

## Non-Goals
- No user accounts or authentication.
- No backend database or server syncing.
- No fake social proof, fake user counts, or fake reviews.
- No paid subscriptions or paywalls.

## Open Questions
- None. All product behaviors, validation rules, layout surfaces, and boundaries are resolved and approved.

