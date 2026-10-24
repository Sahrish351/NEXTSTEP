# MASTER PROMPT — NextStep

I am a beginner and I want you to guide me step by step. I want a real, polished, visually impressive, fully responsive web application, but we must follow the official Build with AI: Basics hackathon workflow exactly.

## First: hackathon compliance (do not skip)
1. Inspect this new project folder. Do not copy code from any existing project.
2. Check that the Devpost Learn Skill Pack is installed and that you can read its actual SKILL.md files.
3. If it is installed, run `1-start` first and follow the official interview. Do not skip learner questions or invent my preferences.
4. Then follow `2-scope`, `3-prd`, `4-spec`, `5-build`, and `6-ship` in order. Invoke each skill by name as the official README instructs.
5. The official Skill Pack must generate substantive planning documents in the `devpost/` folder: `scope.md`, `prd.md`, and `spec.md`, plus its other workflow artifacts. Do not pretend this prompt or the reference docs satisfy that requirement.
6. If Anti-Gravity cannot discover or run the installed skills, stop the skill workflow and tell me clearly to open the same fresh folder in a compatible agent such as Cursor or GitHub Copilot. Do not falsely claim compliance.
7. Help me understand important decisions in simple English. Ask one clear question at a time when the official workflow asks for decisions. Do not silently invent important requirements.
8. Do not begin full implementation before the official scope, PRD, and technical spec workflow is completed/approved.

## Product idea: NextStep
NextStep helps students, job seekers, beginners, and busy people turn one real-world goal into seven manageable daily actions. The user enters a goal, selects a category, gets a seven-day plan, edits tasks, marks tasks complete, and tracks progress. The MVP uses transparent category-based templates; do not claim that the product uses generative AI unless a real model integration is added and disclosed.

Read:
- `docs/PROJECT_BRIEF.md`
- `docs/DESIGN_BRIEF.md`
- `docs/ACCEPTANCE_TESTS.md`

## Design expectations
Create an exceptionally polished but usable product:
- Warm ivory #FAF8F3, forest green #246B52, dark text #202720, sage #DCEBE1, restrained coral #E98770.
- Editorial typography, excellent spacing, refined cards, intentional composition, subtle transitions, strong hierarchy.
- Landing page with hero, clear CTA, preview of a real sample plan, three benefits, and privacy note.
- Beautiful workspace with seven daily tasks, editable content, progress, saved plans, delete action, and useful empty/error states.
- Mobile-first and genuinely responsive at 360px, tablet, and desktop. No horizontal overflow.
- Accessible labels, keyboard support, visible focus, sufficient contrast, and reduced-motion support.
- Avoid generic AI dashboards, dark generic cards, fake analytics, fake user counts, placeholder content, dead buttons, and duplicate headings.
- Every visible interactive control must work.

## MVP features (do not add more without asking)
1. Goal input and category selector (Study, Career, Skill Building, Personal Project, Other).
2. Create exactly seven tasks from transparent category-based templates.
3. Edit task title and description.
4. Mark task complete/incomplete.
5. Accurate completed count and progress bar.
6. Persist plans in browser localStorage; restore after refresh.
7. Delete plan and show empty state.
8. Input validation and defensive storage error handling.
9. Demo scenario described in `docs/PROJECT_BRIEF.md`.

## Technical guidance
Use React + TypeScript + Vite if approved by the official spec workflow and supported by the installed environment. Keep dependencies small. No authentication, server, cloud database, paid API, or external AI integration for the MVP. Do not put secrets in the repo.

## Verification
- Implement in small, reviewable slices.
- Test every item in `docs/ACCEPTANCE_TESTS.md`.
- Run the production build and fix errors.
- Verify the full core flow and mobile layout.
- Do not claim a test passed unless you actually ran it.
- Keep README setup commands accurate.
- Add an open-source LICENSE and make it visible on the public repository; ask me to confirm the license if necessary.
- Before shipping, inspect files and Git history for secrets/private information.
- Prepare the demo-video outline and repository checklist, but make me write my own Devpost submission description and required Skill Pack/exit-survey answers as the official workflow requires.

At the end, tell me in simple English: what works, how to run it, tests actually performed, known limitations, and what remains before submission. Prioritize a working end-to-end app over extra features.
