---
doc: prd
status: approved
---

# NextStep — Product Requirements Document (PRD)

An art-directed, photo-enriched goal-execution and personal-growth platform that turns overwhelming ambitions into clear seven-day action plans, guiding users through daily execution, honest progress tracking, weekly reflection, and practical inspiration.
Source: `scope.md > The Unique Kernel` and `scope.md > The 12 Distinct Destinations`.

## The 12 Destination Pages & Core Journeys

### Page 1: Public Home (`home`)
- **Hero & Editorial Photography:** Large serif headline (*"Make your next step obvious"*), curated sunlit lifestyle imagery, primary CTA (*"Create my plan"*), secondary CTA (*"Explore goals"*).
- **Interactive Plan Preview:** Interactive card showcasing Day 1–7 with real progress feedback.
- **Problem & Solution:** Clear breakdown of how a 7-day starter sequence overcomes the intimidation of blank to-do lists.
- **4 Visual Use Cases:** Highlighting *Study*, *Career*, *Skill Building*, and *Personal Projects* with real photography.
- **Benefits & 3-Step Workflow:** Clean presentation of momentum, editable scaffolding, and zero-friction privacy.

### Page 2: Overview Dashboard (`overview`)
- **Contextual Greeting & Active Goal Banner:** Overview of current objective.
- **Today's Focus:** Identifies the first incomplete day with full instructions and direct completion toggle.
- **7-Day Progress Strip:** Visual interactive day dots.
- **Upcoming Tasks:** Sequential preview of next 2 pending days.
- **Authentic Activity Feed:** Real event logs (creation, completion, edits).

### Page 3: My Plans (`plans`)
- **Active Plan Summary:** Goal title, category badge, start date, and progress.
- **Goal Title Editor:** Modal to update goal title with whitespace validation.
- **Full 7-Day Schedule:** All 7 task cards with inline editing (Save/Cancel) and completion toggle.
- **Safe Plan Deletion:** Confirmation dialog preventing accidental data loss.

### Page 4: Today (`today`)
- **Distraction-Free Action View:** Focuses solely on one day's task.
- **Day Stepper (Day 1 to 7):** Easy navigation between days.
- **Deep Guidance & Inline Editing:** Full instructions with option to edit.
- **Celebratory Completion State:** Distinct feedback when today's task is checked off.

### Page 5: Explore Goals (`explore`)
- **Visual Discovery Gallery:** Categorized goal cards with lifestyle photography.
- **Domain Categories:** Career, Study, Skill Building, Personal Projects, Other.
- **Goal Prefill Action:** Clicking any example pre-populates the Plan Wizard with goal title and category.
- **Search & Filter:** Functional filter bar by domain.

### Page 6: Plan Builder (`builder`)
- **4-Step Creation Flow:** 
  1. Define Goal (with character count & inspiration pills)
  2. Select Category (Career, Study, Skill Building, Personal Project, Other)
  3. Plan Preview (review 7 generated starter tasks)
  4. Launch Plan into Workspace.

### Page 7: Progress (`progress`)
- **Honest Analytics:** Exact percentage and completed vs. remaining breakdown.
- **7-Day Progress Tracker:** Visual milestone progression.
- **100% Celebration:** Special celebratory banner when all 7 tasks are complete.

### Page 8: Weekly Reflection (`reflection`)
- **Calming Writing Workflow:** Prompts for:
  - *What went well this week?*
  - *Which task was most challenging?*
  - *What friction or blockers did you encounter?*
  - *What will you adjust next time?*
  - *What is your next single step?*
- **Saved Reflection History:** Stores and displays saved reflections with timestamp.

### Page 9: Inspiration Library (`inspiration`)
- **Curated Goal Directory:** Rich library of practical goals with target audience, rationale, and suggested Day 1 first steps.
- **One-Click Launch:** Direct CTA to build a plan from any library entry.

### Page 10: Achievements (`achievements`)
- **Genuine Milestone Badges:** Unlocked exclusively by real user actions:
  - *First Step:* Create your first 7-day plan.
  - *First Milestone:* Complete your Day 1 task.
  - *Halfway There:* Complete 3 tasks.
  - *Thoughtful Learner:* Save your first weekly reflection.
  - *Finish Line:* Complete all 7 tasks.
- Locked badges clearly explain how they are earned without artificial unlocks.

### Page 11: Settings & Data (`settings`)
- **Data Portability:** Download active plan and reflections as JSON (`nextstep-plan.json`).
- **Validated JSON Import:** Validates schema and prompts confirmation before overwriting active data.
- **Safe Workspace Reset:** Confirmation modal to wipe local storage safely.

### Page 12: About NextStep (`about`)
- **Editorial Storytelling:** The cognitive psychology of overcoming goal paralysis, why 7 days works, our design principles, privacy architecture, and open-source credits.

---

## Technical & Data Requirements
- Centralized `Plan` object storing goal, category, tasks, activities, and reflections in `localStorage`.
- Strict schema validation for data import.
- Responsive across mobile (360px), tablet (768px), and desktop (1024px+).
