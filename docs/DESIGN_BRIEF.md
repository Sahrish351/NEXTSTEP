# Design Brief — NextStep

## Desired quality
The app must feel polished, distinctive, responsive, and ready to show in a short hackathon demo—not like a generic AI dashboard or unfinished template.

## Visual direction
- Editorial, optimistic, calm, modern.
- Warm ivory background (#FAF8F3).
- Deep forest green primary (#246B52).
- Dark text (#202720).
- Soft sage surfaces (#DCEBE1).
- Restrained coral accent (#E98770).
- Elegant display typography paired with highly readable sans-serif body text. Use web-safe/local fallback fonts if remote font loading fails.
- Use generous spacing, clean grid, carefully composed cards, subtle shadows, refined borders, and purposeful micro-interactions.
- Real imagery is optional; do not let stock photos dominate a productivity tool. Prefer an elegant illustration or simple custom CSS/SVG accents if suitable.

## Landing page
- Premium hero with a clear promise: “Make your next step obvious.”
- Short supporting text that explains the 7-day plan.
- Primary CTA: “Build my 7-day plan.”
- Small visual preview of a real sample plan, not fake analytics.
- Three short benefits: break down a goal, track progress, keep it simple.
- Clear privacy note: “Your plans stay in this browser.”
- Footer with only useful links and a small product identity.

## App workspace
- Compact top navigation with NextStep identity and “My plans.”
- Clear plan title and selected category.
- Seven day/task rows or cards with editable task names/descriptions, completion control, and progress.
- Progress indicator derived from real completed tasks.
- New-plan action and delete action.
- No fake notifications, fake charts, fake user counts, or dead buttons.

## Responsive behavior
- Must be usable at 360px mobile width, tablet, and desktop.
- Mobile: stacked layout, readable task cards, touch targets around 44px, no horizontal overflow.
- Desktop: balanced two-column hero and spacious task workspace.
- Forms and dialogs must fit small screens.
- Navigation should simplify gracefully on mobile.
- Check all screens and states at mobile width, not just the landing page.

## Interaction and accessibility
- All buttons must work.
- Use semantic headings and form labels.
- Visible keyboard focus and sufficient color contrast.
- Keyboard-operable controls.
- Respect reduced-motion preferences.
- Animation should be subtle and must not delay interactions.
- Provide validation, empty states, and error messages.
