# NextStep — Make your next step obvious

> A comprehensive personal goal-execution workspace that turns overwhelming goals into actionable seven-day plans, providing daily focus, honest progress tracking, and complete plan management within the browser.

Built for the **Devpost Build with AI: Basics** hackathon following the official plan-first workflow (Scope, PRD, Technical Spec, Slices, and Verification).

---

## 🎯 The Problem

People often have ambitious goals—preparing for an interview, studying for an exam, picking up a technical skill, or launching a side project—but freeze before they begin because facing a blank screen or a generic to-do list requires too much upfront planning and cognitive effort. 

NextStep eliminates that initial friction. Instead of asking you to organize every detail from scratch, NextStep immediately gives you an organized, sequential 7-day starter plan so you can focus on taking action right away.

---

## 👥 Target Users

- **Job Seekers:** Preparing for challenging technical or behavioral interviews step by step.
- **Students:** Breaking down broad exam syllabi into 7 manageable daily study milestones.
- **Skill Learners:** Establishing daily practice momentum when learning programming or design.
- **Builders & Creators:** Kicking off personal side projects without feeling overwhelmed.

---

## 🧭 12-Destination Architecture & Navigation

NextStep features 12 purposeful destinations organized into workspace, discovery, and system surfaces:

1. **Home / Landing Page (`home`):** Hero photographic composition, problem breakdown, 4 photo-enriched use cases (Job Seekers, Students, Skill Learners, Builders), interactive plan preview, and direct creation CTA.
2. **Overview Dashboard (`overview`):** Answers *"What do I do next?"* with Today's Focus card, 7-day progress timeline dots, upcoming steps, and authentic activity logs.
3. **My Plans (`plans`):** Complete active plan management, full 7-day task schedule stream with inline editing, safe goal title modal editor, and plan deletion.
4. **Today View (`today`):** Dedicated single-day execution mode with Day 1–7 stepper navigation, task instructions, inline editing, and celebratory feedback.
5. **Explore Goals (`explore`):** Photo-enriched goal directory with category filter pills, real-time search, and 1-click *"Start with this goal"* button that prefills the creation wizard.
6. **Plan Builder (`builder`):** 3-step creation wizard (Goal definition with 120-char limit, Category selection across 5 domains, and pre-launch 7-day plan preview).
7. **Progress Track (`progress`):** Completion analytics, visual 7-day milestone tracker, completed vs. remaining breakdown, and celebratory completion banner.
8. **Weekly Reflection (`reflection`):** A weekly retrospective tool with 5 structured learning prompts, private browser journaling, and reflection history log.
9. **Inspiration Library (`inspiration`):** Ready-to-use goal blueprints with target audience descriptions, core problems, and immediate Day 01 starting steps.
10. **Milestones / Achievements (`achievements`):** 5 derived milestone badges (*First Step, Action Taker, Consistent Momentum, Thoughtful Learner, The Finish Line*) calculated live from authentic user actions without fake streaks.
11. **Settings & Data (`settings`):** Browser storage inspection, native JSON plan export, schema-validated JSON import with overwrite safeguards, and safe plan reset.
12. **About NextStep (`about`):** Editorial storytelling on cognitive chunking, zero-friction local privacy, technical architecture, and photographer credits.

---

## ✨ Core Features & Technical Highlights

- **3-Step Guided Plan Wizard:**
  - *Step 1: Goal Definition* with character counter (max 120 chars) and whitespace trimming.
  - *Step 2: Category Selection* across 5 structured domains (*Career, Study, Skill Building, Personal Project, Other*).
  - *Step 3: Plan Preview & Review* allowing users to inspect all 7 proposed daily actions before launching.
- **Deterministic Today Focus:** Automatically calculates the next incomplete task in the 7-day sequence and highlights it as Today's Focus.
- **Authentic Activity Logging:** Tracks genuine user actions (plan created, task completed/uncompleted, task edited, goal updated) without fake analytics.
- **Inline Task Card Editing:** Edit any task's title and description directly inside its card with Save and Cancel safeguards. Empty titles are prevented and whitespace is trimmed automatically.
- **Two-Way Completion Toggling:** Mark tasks complete and incomplete with clear visual checkmark states and card styling that does not rely on color alone.
- **Data Portability (Export & Import):**
  - *Export:* Download active plan as a clean JSON file (`nextstep-plan.json`).
  - *Import:* Upload plan files with schema validation and confirmation before replacing an active plan.
- **Browser LocalStorage Persistence:** Plans, custom edits, activity history, and completed states are automatically preserved in `localStorage`. Refreshing or reopening the app restores your workspace immediately.
- **Safe Plan Deletion & Reset:** Protected by an accessible confirmation modal with focus trapping.
- **Graceful Error Recovery:** Detects and handles corrupted browser storage without crashing, offering a safe one-click reset.

---

## 💡 Starter Template Transparency & Honesty

NextStep's MVP uses transparent, editable, category-based starter templates. 

- **Honesty Note:** The application's plan generation is powered by structured domain templates—it does **not** make hidden calls to paid AI APIs or make unverified claims of machine intelligence. Using AI coding agents to architect and build this application is separate from the application's runtime functionality.
- Every task is an editable suggestion, not a guaranteed outcome. Users have full control to adapt each day's task to their exact goals.

---

## 🔒 Privacy & Local Storage Architecture

NextStep stores your goals, customized tasks, and completion checkmarks exclusively in your current browser's `localStorage`:
- **Private:** No passwords, accounts, or tracking cookies. No data ever leaves your device.
- **Limitation:** Because data is stored in the local browser, your plan will not automatically sync across different browsers or devices. Use the **Export Plan** feature in Settings to backup or transfer your plan to another browser.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Persistence:** Browser Web Storage API (`localStorage`) + HTML5 File API
- **Typography:** DM Serif Display & DM Sans (via Google Fonts with system fallbacks)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher; tested on Node v26)
- [Git](https://git-scm.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sahrish351/NEXTSTEP.git
   cd NEXTSTEP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Run automated acceptance tests:**
   ```bash
   node tests-acceptance.mjs
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧪 Comprehensive Testing Guide

| Feature | Action | Expected Result |
| :--- | :--- | :--- |
| **1. Goal Validation** | Submit empty goal in Wizard Step 1 | Alerts *"Please enter a goal so we can build your plan"* and blocks Next. |
| **2. 3-Step Wizard** | Enter goal, choose Career, review 7 tasks | Step 3 displays all 7 tasks; clicking "Start" opens Overview. |
| **3. Overview Dashboard** | View Overview | Shows Today's Focus (Day 1), progress bar, upcoming tasks, and recent activity. |
| **4. Today View** | Navigate to Today, click "Mark Task as Done" | Card updates to completed with celebratory banner; stepper shows checkmark. |
| **5. Task Inline Edit** | Navigate to My Plans, edit Day 3 title, save | Day 3 updates immediately; activity log records edit. |
| **6. Goal Title Edit** | In My Plans, click "Edit Goal", change text, save | Goal title updates across all views and sidebar. |
| **7. Progress View** | Navigate to Progress | Displays completion percentage, 7-day tracker, and completed/remaining list. |
| **8. JSON Export** | In Settings, click "Export Active Plan" | Browser downloads `nextstep_plan_[goal].json`. |
| **9. JSON Import** | In Settings, upload plan JSON | Validates schema, prompts confirmation to overwrite, and loads imported plan. |
| **10. Persistence on Refresh** | Refresh browser (`F5`) | Preserves active plan, task edits, completion checks, and activity stream. |
| **11. Plan Deletion** | In Settings or My Plans, click "Reset / Delete" | Opens modal; confirming clears plan and returns to clean landing page. |

---

## 📋 Devpost Learn Planning Documents

All approved planning artifacts are maintained directly in the `devpost/` folder:
- [`devpost/scope.md`](./devpost/scope.md) & [`devpost/scope-review.html`](./devpost/scope-review.html) — Approved project scope, core kernel, and proof-of-concept boundaries.
- [`devpost/prd.md`](./devpost/prd.md) & [`devpost/prd.html`](./devpost/prd.html) — Approved product requirements, multi-view journey, and UX specifications.
- [`devpost/spec.md`](./devpost/spec.md) & [`devpost/spec.html`](./devpost/spec.html) — Technical architecture, TypeScript models, component hierarchy, and failure modes.
- [`devpost/checklist.md`](./devpost/checklist.md) — Ordered build slices with mechanical verifications and commits.
- [`devpost/app-map.html`](./devpost/app-map.html) — Interactive architecture map and code tour.

---

## 🎨 Design & Photography Attribution

- **Color Palette:** Warm Ivory (`#FAF8F3`), Forest Green (`#246B52`), Deep Forest (`#194C3A`), Deep Charcoal (`#202720`), Soft Sage (`#DCEBE1`), Restrained Coral (`#E98770`).
- **Typography:** [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) and [DM Sans](https://fonts.google.com/specimen/DM+Sans) designed by Colophon Foundry (Open Font License).
- **Icons:** [Lucide Icons](https://lucide.dev/) (ISC License).
- **Curated Photography:** Sourced under the [Unsplash Free License](https://unsplash.com/license) with photographer attribution:
  - Andrew Neel (`heroWorkspace`)
  - Christina @ wocintechchat.com (`careerInterview`)
  - Priscilla Du Preez (`studentStudy`)
  - John Schnobrich (`skillPractice`)
  - Christopher Gower (`creatorProject`)
  - Cathryn Lavery (`reflectionJournal`)
  - Arto Marttinen (`calmHabit`)

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).
