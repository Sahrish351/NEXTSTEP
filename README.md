# NextStep — Make your next step obvious

> A focused, responsive web application that turns any overwhelming personal or professional goal into an immediate, editable seven-day action plan with browser-persisted progress tracking.

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

## ✨ Features That Actually Work

- **Responsive Landing Page:** Clear value proposition, interactive visual preview of a real 7-day plan, 3-pillar benefit breakdown, and a smooth-scrolling call to action.
- **Goal Input with Validation:** Validates goal text (up to 120 characters), trims whitespace, and rejects blank submissions with friendly inline alerts.
- **5 Domain Categories:** Instant starter task mapping for:
  - *Career & Jobs*
  - *Study & Exams*
  - *Skill Building*
  - *Personal Project*
  - *Other Goal*
- **7-Day Sequential Starter Tasks:** Generates seven distinct, logically progressive starter tasks guiding the user from initial orientation through focused execution to synthesis and review.
- **Inline Task Editing:** Edit any task's title and description directly inside its card with Save and Cancel safeguards. Empty titles are prevented and whitespace is trimmed automatically.
- **Two-Way Completion Toggling:** Mark tasks complete and incomplete with clear visual checkmark states and card styling that does not rely on color alone.
- **Accurate Real-Time Progress:** Dynamic progress bar and counter calculated directly from state (e.g., `2 of 7 completed (29%)`).
- **Browser LocalStorage Persistence:** Plans, custom edits, and completed states are automatically preserved in `localStorage`. Refreshing or reopening the app restores your plan immediately.
- **Safe Plan Deletion & Empty State:** A dedicated "Delete plan" action protected by an accessible confirmation dialog. Deleting clears local storage and reveals a welcoming empty state with a "Create a new plan" button.
- **Graceful Error Recovery:** Detects and handles corrupted browser storage without crashing, offering a safe one-click reset.

---

## 💡 How the 7-Day Plan Works & Starter Template Transparency

NextStep's MVP uses transparent, editable, category-based starter templates. 

- **Honesty Note:** The application's plan generation is powered by structured domain templates—it does **not** make hidden calls to paid AI APIs or make unverified claims of machine intelligence. Using AI coding agents to architect and build this application is separate from the application's runtime functionality.
- Every task is an editable suggestion, not a guaranteed outcome. Users have full control to adapt each day's task to their exact goals.

---

## 🔒 Privacy & Local Storage Limitation

NextStep stores your goals, customized tasks, and completion checkmarks exclusively in your current browser's `localStorage`:
- **Private:** No passwords, accounts, or tracking cookies. No data ever leaves your device.
- **Limitation:** Because data is stored in the local browser, your plan will not automatically sync across different browsers or devices. Clearing your browser's site data will delete your saved plan.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Persistence:** Browser Web Storage API (`localStorage`)
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

4. **Build and test for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧪 Manual Testing & Verification Guide

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| **1. Empty Goal Validation** | Submit empty goal in creator form | Form alerts *"Please enter a goal so we can build your plan"* and prevents creation. |
| **2. 7-Day Generation** | Enter *"Prepare for my web development interview"*, select *Career*, click build | Renders workspace with active goal, *Career* badge, 0% progress, and 7 sequential tasks. |
| **3. Inline Edit & Save** | Click *Edit* on Day 3, change title, click *Save* | Card updates immediately with new text. |
| **4. Inline Edit & Cancel** | Click *Edit* on Day 4, change text, click *Cancel* | Previous text is preserved without changes. |
| **5. Task Completion** | Click checkbox on Day 1 and Day 2 | Cards show checked state; progress bar updates to `2 of 7 completed (29%)`. |
| **6. Persistence on Refresh** | Refresh the browser (`F5` or `Ctrl+R`) | Saved plan, edited Day 3, and checked Day 1 & 2 reload immediately. |
| **7. Delete Confirmation** | Click *Delete plan*, click *Keep my plan* | Modal closes; plan remains completely intact. |
| **8. Confirmed Deletion** | Click *Delete plan*, click *Delete plan* button | Modal closes; workspace resets to empty state with *"Ready for your next step?"*. |
| **9. New Plan Flow** | Click *Create a new plan* in empty state | Reopens creator form ready for a new goal. |

---

## 📋 Devpost Learn Planning Documents

As required by the official Devpost Learn curriculum, all approved planning artifacts are maintained directly in the `devpost/` folder:
- [`devpost/scope.md`](./devpost/scope.md) & [`devpost/scope-review.html`](./devpost/scope-review.html) — Approved project scope, core kernel, and proof-of-concept boundaries.
- [`devpost/prd.md`](./devpost/prd.md) & [`devpost/prd.html`](./devpost/prd.html) — Approved product requirements, core journey, and UX specifications.
- [`devpost/spec.md`](./devpost/spec.md) & [`devpost/spec.html`](./devpost/spec.html) — Approved technical architecture, data model, component mapping, and failure modes.
- [`devpost/checklist.md`](./devpost/checklist.md) — Ordered build slices with mechanical verifications and commits.
- [`devpost/app-map.html`](./devpost/app-map.html) — Interactive architecture map and code tour.

---

## 🎨 Design & Attribution

- **Color Palette:** Warm Ivory (`#FAF8F3`), Forest Green (`#246B52`), Deep Forest (`#194C3A`), Deep Charcoal (`#202720`), Soft Sage (`#DCEBE1`), Restrained Coral (`#E98770`).
- **Typography:** [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) and [DM Sans](https://fonts.google.com/specimen/DM+Sans) designed by Colophon Foundry (Open Font License).
- **Icons:** [Lucide Icons](https://lucide.dev/) (ISC License).

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

