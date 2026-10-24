---
doc: scope
status: approved
---

# NextStep — Make your next step obvious (Product Transformation)

A comprehensive personal goal-execution workspace that turns overwhelming goals into actionable seven-day plans, providing daily focus, honest progress tracking, and complete plan management within the browser.

## The Unique Kernel
Instant cognitive relief transformed into structured daily execution. Instead of confronting a blank screen and freezing on "where do I begin?", NextStep gives the user an organized 7-day sequence, answers *"What should I focus on today?"*, and provides an honest, encouraging workspace to sustain momentum: *"I know what to do next, and I can actually start."*

## Who It's For
- **Job Seekers:** Organizing multi-step technical or behavioral interview preparation.
- **Students:** Dividing broad examination topics into 7 manageable daily study sprints.
- **Skill Learners:** Establishing an everyday hands-on practice runway.
- **Creators & Builders:** Structuring personal projects into bite-sized daily execution milestones.

## The Core Loop & Expanded Surfaces
1. **Discover & Land:** User learns about the 7-day philosophy via the public landing page with real plan previews, use-case examples, and benefits.
2. **Multi-Step Guided Creation:** User enters a goal, selects from 5 categories (*Career, Study, Skill Building, Personal Project, Other*), previews the 7 proposed tasks, and confirms creation.
3. **Overview Dashboard:** Answers *"What do I do next?"* with Today's Focus, upcoming tasks, real-time progress, and genuine recent activity logs.
4. **Today View:** A dedicated single-day focus mode with previous/next day stepping, detailed instructions, inline editing, and celebratory feedback.
5. **My Plans View:** Complete plan overview, goal editing, full 7-day schedule, and safe deletion.
6. **Progress View:** Visual 7-day tracker, completed vs. remaining breakdown, milestone celebration at 100%, and practical encouragement.
7. **Settings View:** Browser storage management, JSON plan export, validated JSON plan import with overwrite confirmation, and plan reset.

## Inspiration & Identity
- **Design System:** Warm ivory background (`#FAF8F3`), Forest green primary (`#246B52`), Deep charcoal text (`#202720`), Soft sage surfaces (`#DCEBE1`), Restrained coral accent (`#E98770`), Clean white cards (`#FFFFFF`).
- **Typography:** `DM Serif Display` for elegant headlines and `DM Sans` for accessible UI copy and dashboard data.
- **Tone:** Calm, practical, encouraging, and honest.

## The POC Boundary (Expanded)
- Responsive multi-view navigation: **Overview**, **My Plans**, **Today**, **Progress**, **Settings**, and **Public Landing Page**.
- Multi-step plan creator wizard with plan preview prior to creation.
- Daily focus engine: automatically identifies the next unfinished day with manual day-switcher.
- Real-time activity logging: logs actual user actions (plan created, task completed/uncompleted, task edited).
- Inline task card editing with Save/Cancel safeguards and non-empty validation.
- JSON plan export & safe JSON plan import with schema validation and confirmation.
- Safe plan deletion protected by confirmation modal.
- Resilient `localStorage` persistence and corrupted data recovery.

## Explicitly Cut (Preserving Honesty)
- No fake user accounts or authentication walls.
- No remote cloud databases (keeps MVP zero-latency, private, and zero-cost).
- No fake AI generation claims (templates are honest, categorized, and fully editable).
- No fake analytics or fabricated metrics.
