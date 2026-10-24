# Acceptance Tests — NextStep

## End-to-end
- [ ] App launches using README instructions.
- [ ] User can enter a non-empty goal and choose a category.
- [ ] Submitting a valid goal creates exactly seven tasks.
- [ ] Empty/whitespace-only goal displays validation and creates no plan.
- [ ] Tasks are clear and relevant to the chosen category.
- [ ] User can edit a task title and description.
- [ ] Empty task titles are rejected.
- [ ] User can mark a task complete and incomplete.
- [ ] Completed count and progress update accurately.
- [ ] Refresh restores the plan and completion states.
- [ ] User can delete a plan.
- [ ] Empty state appears after all plans are deleted.
- [ ] Malformed localStorage data does not crash the app.
- [ ] Local-only storage behavior is disclosed to users.

## Visual/responsive
- [ ] No horizontal overflow at 360px viewport.
- [ ] Landing, plan view, forms, dialogs, and empty states work on mobile.
- [ ] Tablet and desktop layouts are balanced.
- [ ] All controls have labels and visible keyboard focus.
- [ ] Motion respects prefers-reduced-motion.
- [ ] No fake data, fake charts, dead buttons, or placeholder sections.

## Release
- [ ] Production build succeeds.
- [ ] README contains accurate setup/run instructions.
- [ ] Appropriate open-source LICENSE is present and visible in repository.
- [ ] Official Skill Pack-generated `devpost/scope.md`, `devpost/prd.md`, `devpost/spec.md` exist and are substantive.
- [ ] Public source repository works.
- [ ] Public demo video is 1–3 minutes and shows the core flow.
- [ ] Devpost form completed, including the Skill Pack explanation and age-of-majority checkbox.
