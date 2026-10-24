import { Category, Task } from '../types';

interface TaskTemplate {
  dayNumber: number;
  title: string;
  description: string;
}

const TEMPLATE_BANK: Record<Category, TaskTemplate[]> = {
  Career: [
    {
      dayNumber: 1,
      title: 'Analyze role requirements & target skills',
      description: 'Review 2–3 job descriptions for this role. List the top 3 essential technical skills and 2 behavioral expectations.',
    },
    {
      dayNumber: 2,
      title: 'Master one foundational technical concept',
      description: 'Deep dive into one critical topic mentioned in the requirements. Summarize it in your own words as if explaining it to a peer.',
    },
    {
      dayNumber: 3,
      title: 'Solve one targeted hands-on challenge',
      description: 'Complete one small code challenge or technical scenario relevant to the job. Focus on clean logic and explaining your approach.',
    },
    {
      dayNumber: 4,
      title: 'Draft two structured STAR project stories',
      description: 'Prepare two real examples of challenges you solved (Situation, Task, Action, Result) highlighting your specific contributions.',
    },
    {
      dayNumber: 5,
      title: 'Rehearse standard and role-specific questions',
      description: 'Practice speaking your answers aloud for common questions ("Tell me about yourself", "How do you handle disagreements?").',
    },
    {
      dayNumber: 6,
      title: 'Conduct a timed mock session & note gaps',
      description: 'Run a 20-minute mock interview with a peer or record yourself answering 3 prompt questions. Identify 2 specific areas to sharpen.',
    },
    {
      dayNumber: 7,
      title: 'Review readiness & define your next outreach step',
      description: 'Synthesize your notes, polish your resume/portfolio links, and submit an application or message a recruiter with confidence.',
    },
  ],
  Study: [
    {
      dayNumber: 1,
      title: 'Map the syllabus & rank priority topics',
      description: 'Review your exam or course outline. Identify your highest-weight and least confident topics to establish a targeted focus.',
    },
    {
      dayNumber: 2,
      title: 'Deep dive into Topic 1 with active recall notes',
      description: 'Study the highest priority topic using concise summary notes or flashcards rather than passive reading.',
    },
    {
      dayNumber: 3,
      title: 'Complete 5–10 practice questions on Topic 1',
      description: 'Work through past exam questions or exercises without checking solutions first. Mark areas of confusion.',
    },
    {
      dayNumber: 4,
      title: 'Tackle Topic 2 & build a visual cheat sheet',
      description: 'Break down your second major topic. Create a one-page diagram, formula sheet, or concept map connecting the ideas.',
    },
    {
      dayNumber: 5,
      title: 'Simulate a timed practice test section',
      description: 'Set a 30-minute timer and complete a mixed set of problems under realistic exam conditions.',
    },
    {
      dayNumber: 6,
      title: 'Audit all mistakes & patch understanding gaps',
      description: 'Rework every problem you got wrong. Write down the underlying rule or concept you missed so you do not repeat it.',
    },
    {
      dayNumber: 7,
      title: 'Final confidence review & test-day preparation',
      description: 'Do a gentle 20-minute review of your cheat sheets, organize your stationery or digital files, and rest before test day.',
    },
  ],
  'Skill Building': [
    {
      dayNumber: 1,
      title: 'Define your baseline & configure your environment',
      description: 'Install required software, verify your toolchain, and set a specific definition of what competency looks like after 7 days.',
    },
    {
      dayNumber: 2,
      title: 'Complete one structured fundamentals lesson',
      description: 'Work through one high-quality lesson or chapter. Type out every example by hand rather than copy-pasting.',
    },
    {
      dayNumber: 3,
      title: 'Rebuild the exercise from memory',
      description: 'Recreate yesterday\'s exercise from scratch without looking at the reference guide. Note where your memory hesitated.',
    },
    {
      dayNumber: 4,
      title: 'Build a tiny standalone experiment',
      description: 'Create a micro-project applying the new skill to a creative problem of your own making, even if it is only 20 lines of code.',
    },
    {
      dayNumber: 5,
      title: 'Debug an intentional edge case or breakdown',
      description: 'Push your micro-project until it breaks. Investigate the error messages and understand how to recover gracefully.',
    },
    {
      dayNumber: 6,
      title: 'Document your learning & write 3 takeaways',
      description: 'Write a short markdown summary explaining the three most useful mental models you learned this week.',
    },
    {
      dayNumber: 7,
      title: 'Plan your next milestone project',
      description: 'Review your weekly progress, select your next medium-sized project, and schedule your ongoing practice blocks.',
    },
  ],
  'Personal Project': [
    {
      dayNumber: 1,
      title: 'Define project scope & minimum viable outcome',
      description: 'Write down exactly what problem this project solves, who it is for, and the single core journey that makes it functional.',
    },
    {
      dayNumber: 2,
      title: 'Sketch layout wireframes & map data flow',
      description: 'Draw the screens or steps on paper. Clearly identify what data comes in, what changes, and what is shown to the user.',
    },
    {
      dayNumber: 3,
      title: 'Initialize repository & set up folder structure',
      description: 'Create a clean repository, configure build tooling and dependencies, and establish basic layout shells.',
    },
    {
      dayNumber: 4,
      title: 'Implement the single most critical feature',
      description: 'Build the core interaction end-to-end. Focus purely on making it genuinely work before adding visual embellishments.',
    },
    {
      dayNumber: 5,
      title: 'Apply styling, typography & interactive polish',
      description: 'Refine visual hierarchy, accessible contrast, responsive spacing, and smooth transitions on mobile and desktop.',
    },
    {
      dayNumber: 6,
      title: 'Test edge cases & verify full user journey',
      description: 'Test empty inputs, mobile viewports, page refresh, and error states. Fix any broken controls or awkward alignments.',
    },
    {
      dayNumber: 7,
      title: 'Document setup, demo the project & celebrate',
      description: 'Write a clear README with run instructions, take a 60-second screen recording, and share your creation with a friend.',
    },
  ],
  Other: [
    {
      dayNumber: 1,
      title: 'Clarify target outcome & establish daily momentum',
      description: 'Write a specific description of what completing this goal looks like and schedule a dedicated 30-minute daily window.',
    },
    {
      dayNumber: 2,
      title: 'Gather references, supplies & eliminate distractions',
      description: 'Collect all required materials, clear your physical and digital workspace, and prepare your tools in advance.',
    },
    {
      dayNumber: 3,
      title: 'Complete Phase 1: The foundational milestone',
      description: 'Take your first decisive action block. Focus purely on starting and creating tangible early progress.',
    },
    {
      dayNumber: 4,
      title: 'Mid-week checkpoint & course correction',
      description: 'Assess what went well and where friction appeared. Adjust your pace or simplify your approach to stay on track.',
    },
    {
      dayNumber: 5,
      title: 'Complete Phase 2: The primary heavy lift',
      description: 'Execute the most challenging or demanding step of your goal while your energy and momentum are high.',
    },
    {
      dayNumber: 6,
      title: 'Refine, organize & polish all details',
      description: 'Review your work, address loose ends, and verify that all parts of your milestone meet your personal standard.',
    },
    {
      dayNumber: 7,
      title: 'Reflect on 7 days of consistency & set your next horizon',
      description: 'Review how far you came in 7 focused days, acknowledge your consistency, and define your next practical goal.',
    },
  ],
};

export function generateTasksForGoal(_goal: string, category: Category): Task[] {
  const templates = TEMPLATE_BANK[category] || TEMPLATE_BANK['Other'];
  return templates.map((tmpl) => ({
    id: `task-${tmpl.dayNumber}-${Date.now().toString(36)}`,
    dayNumber: tmpl.dayNumber,
    title: tmpl.title,
    description: tmpl.description,
    completed: false,
  }));
}
