---
doc: scope
status: approved
---

# NextStep — Make your next step obvious

A focused, responsive web application that turns any overwhelming personal or professional goal into an immediate, editable seven-day action plan with browser-persisted progress tracking.

## The Unique Kernel
Instant cognitive relief: instead of confronting a blank to-do list and freezing on "where do I begin?", the user is immediately handed an organized, sequenced 7-day starter plan. The experience delivers one clear feeling: *"I know what to do next, and I can actually start."*

## Who It's For
- A job seeker feeling paralyzed by the breadth of interview preparation.
- A student facing an upcoming exam who doesn't know how to divide the material.
- A beginner learning a new skill (like coding or design) wanting structured daily momentum.
- A busy person with an ambitious personal project who needs a bite-sized runway.

Today, they either stare at an intimidating empty notes app, purchase complex project management tools they abandon after two days, or endlessly browse advice online instead of starting.

## The Core Loop
1. **Enter:** User opens NextStep, types one tangible goal, and selects a relevant category (Study, Career, Skill Building, Personal Project, Other).
2. **Scaffold:** The app instantly generates seven progressive, daily starter actions tailored to that category and relevant to the entered goal, clearly framed as editable suggestions without false promises of guaranteed outcomes.
3. **Customize:** The user personalizes any task title or description to match their specific situation.
4. **Execute & Track:** The user checks off tasks day by day, watching their progress bar and completion count update in real-time.
5. **Resume:** The user returns the next day or refreshes the tab—their edits and completed checks remain intact.

## Inspiration & Identity
- **Aesthetic:** Warm, editorial, calm, and encouraging. A thoughtful balance between a premium stationery planner and modern software.
- **Color Palette:**
  - Background: Warm ivory (`#FAF8F3`)
  - Primary / Brand: Forest green (`#246B52`)
  - Typography / High Contrast: Deep charcoal (`#202720`)
  - Surfaces / Accents: Soft sage (`#DCEBE1`)
  - Accent Callouts: Restrained coral (`#E98770`)
- **Typography:** DM Serif Display for warm, literary headings paired with DM Sans for crisp, accessible UI copy.
- **Tone:** Practical, honest, encouraging, and clear without childish cheerleading or artificial hype.

## Why This Matters to the Learner
Mastering the discipline of plan-first development: using structured scope, PRD, and technical specifications to build a genuine, accessible, and polished web application for the Devpost Build with AI: Basics hackathon, while keeping the implementation transparent, honest, and achievable.

## What "Working" Looks Like
A self-contained, working web app demonstrable in under 90 seconds:
1. User lands on a clean homepage explaining the 7-day philosophy with a working "Create my plan" call to action.
2. User enters a real goal (e.g., *"Prepare for my web development interview"*), selects *Career*, and clicks generate.
3. A polished plan workspace renders immediately with 7 distinct sequential tasks.
4. User edits Day 3's task to be specific and saves the change cleanly.
5. User checks off Day 1 and Day 2; the progress counter updates accurately to `2 of 7 completed (29%)`.
6. User refreshes the browser; the saved goal, customized tasks, and completion checkmarks reload seamlessly from `localStorage`.
7. User tests the delete action, sees a confirmation safeguard, confirms, and transitions cleanly to an inviting empty state ready for a new goal.

## The POC Boundary
- Responsive Single Page Application (desktop, tablet, mobile down to 360px).
- Input validation: trims whitespace, rejects blank goals, max length safeguards.
- 5 categorized starter sequences (7 sequential tasks per category: Study, Career, Skill Building, Personal Project, Other).
- Inline task editing (title and description) with Save and Cancel safety.
- Two-way completion toggling with clear visual states (not relying on color alone).
- Dynamic progress summary (active count and percentage derived directly from state).
- Resilient browser `localStorage` integration with error recovery for corrupted data.
- Safe deletion with explicit confirmation modal/dialog and empty state fallback.

## Later
- Exporting the 7-day plan as Markdown or a printable PDF.
- Calendar export (.ics file) to schedule tasks into Google Calendar or Apple Calendar.
- Multi-week goals or creating multiple concurrent plans.
- Optional real AI-powered task expansion via an external model API (clearly labeled if added).

## Explicitly Cut
- **User Accounts and Login:** Unnecessary friction for a 7-day starter tool; local storage is private and immediate.
- **Cloud Backend / Database:** Adds server hosting, latency, and security surface without adding value to the core proof of concept.
- **Paid AI APIs in MVP:** Avoids fragility, cost, and latency; category templates are transparent and fully editable.
- **Fake Social Proof / Fake Metrics:** No fabricated user counts, fake star ratings, or invented testimonials.
- **Social Sharing & Feeds:** Distracts from personal execution and focus.

