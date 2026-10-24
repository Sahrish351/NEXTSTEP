# START HERE — NextStep

You do not need to understand every file before starting. Follow these steps.

## The project
**NextStep** is a responsive web app for people who feel overwhelmed by a real goal. They enter a goal (for example, “prepare for a job interview”), choose a category, and get a manageable 7-day action plan. They can edit tasks, mark tasks done, and track progress.

It is intentionally small, but the complete flow is useful and demoable. The design should feel premium, friendly, and carefully designed on mobile and desktop.

## IMPORTANT: Follow the official hackathon workflow
The Build with AI hackathon requires a new project started from an empty folder during the submission period, the Devpost Learn Skill Pack actually run in a compatible coding agent, and the resulting planning documents included in the public repository. This pack is a product/design brief. It does NOT prove that the official skills have been run.

Official pages:
- Hackathon: https://learn-ai-basics.devpost.com/
- Rules: https://learn-ai-basics.devpost.com/rules
- Skill Pack: https://github.com/challengepost/learn-ai-basics

## Step 1 — Register
Join the hackathon on its Devpost page.

## Step 2 — Create a NEW empty project folder
Do not copy source code from an old project. Open a terminal in a new empty folder and run:
```bash
git init
npx skills add challengepost/learn-ai-basics --all -y
```
Git and Node.js must be installed first.

## Step 3 — Open the folder in your coding agent
Try Anti-Gravity only if it recognizes the installed skills. The official repository lists compatible agents that use the SKILL.md standard, including Claude Code, Codex, Cursor, Copilot, Pi, and OpenCode. If Anti-Gravity does not discover the skills, use Cursor or Copilot.

## Step 4 — Run the official steps in order
Ask your agent to run `1-start`. Answer its questions. Then invoke each skill in order:
- `2-scope`
- `3-prd`
- `4-spec`
- `5-build`
- `6-ship`

Do not ask the agent to skip the interviews or invent decisions. Use this pack to explain your idea and visual preferences. The official skill process must generate the actual `devpost/scope.md`, `devpost/prd.md`, and `devpost/spec.md`.

## Step 5 — Build and test
Use `docs/ANTIGRAVITY_MASTER_PROMPT.md` after starting the official workflow. Prioritize a working flow over extra features.

## Step 6 — Submit
The official event requires a 1–3 minute screen-recorded demo and a public GitHub/GitLab/Bitbucket repository. Include the official skill-generated planning documents in the repository. Follow the current Devpost submission form, and do not claim any feature or skill use that did not happen.

The event page currently lists the deadline as October 26, 2026 at 5:00 PM EDT (October 27 at 2:00 AM Pakistan time). Check the live event page in case of changes.
